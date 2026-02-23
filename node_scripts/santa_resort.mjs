#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пути к файлам
const PATHS = {
  csv: path.resolve(__dirname, '../_local/SANTA.csv'),
  parsed: path.resolve(__dirname, '../_local/parced/data.js'),
  addresses: path.resolve(__dirname, '../src/data/addresses.ts'),
  backupDir: path.resolve(__dirname, '../_local/backups'),
};

// 🔧 Утилиты для работы с файлами
const ensureDir = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`📁 Создана директория: ${dirPath}`);
  }
};

const createBackup = async (filePath) => {
  try {
    await fs.access(filePath);
    const timestamp = new Date().toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_');
    const backupName = `addresses_${timestamp}.ts`;
    const backupPath = path.join(PATHS.backupDir, backupName);
    
    await ensureDir(PATHS.backupDir);
    await fs.copyFile(filePath, backupPath);
    console.log(`💾 Создана резервная копия: ${backupName}`);
    return true;
  } catch (error) {
    console.log('ℹ️ Файл для бэкапа не найден, создаём новый');
    return false;
  }
};

// 🎲 Алгоритм жеребьёвки без сдвигов
const reSortNoShift = (input) => {
  // ⏱️ ДОБАВИТЬ ЗДЕСЬ: Начало замера времени жеребьёвки
  const drawStartTime = performance.now();

  const ids = input.map(item => item.id);
  const n = ids.length;
  
  if (n < 2) {
    throw new Error('❌ Для жеребьёвки нужно минимум 2 участника');
  }
  
  console.log(`🎯 Начинаем жеребьёвку для ${n} участников...`);
  
  // 1. Создаём случайную перестановку (алгоритм Фишера-Йетса)
  const receivers = [...ids];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [receivers[i], receivers[j]] = [receivers[j], receivers[i]];
  }
  
  // 2. Исправляем совпадения "дарит сам себе"
  let corrections = 0;
  for (let i = 0; i < n; i++) {
    if (ids[i] === receivers[i]) {
      // Ищем кого-то для обмена
      let swapWith = (i + 1) % n;
      while (swapWith === i || 
             receivers[swapWith] === ids[i] || 
             receivers[i] === ids[swapWith]) {
        swapWith = (swapWith + 1) % n;
      }
      
      [receivers[i], receivers[swapWith]] = [receivers[swapWith], receivers[i]];
      corrections++;
    }
  }
  
  if (corrections > 0) {
    console.log(`🔄 Исправлено ${corrections} самопожертвований`);
  }
  
  // 3. Финальная проверка
  let conflicts = 0;
  for (let i = 0; i < n; i++) {
    if (ids[i] === receivers[i]) {
      conflicts++;
    }
  }
  
  if (conflicts > 0) {
    throw new Error(`❌ Обнаружено ${conflicts} конфликтов после коррекции!`);
  }
  
  console.log('✅ Жеребьёвка прошла успешно!');
  
  // 4. Создаём Map соответствий
  const newIds = new Map();
  const newSort = input.map((item, i) => {
    const result = {
      id_santa: parseInt(receivers[i], 10), // <- преобразуем в число
      wishes: item.wishes,
      ozon_address: item.ozon_address,
      gender: item.gender,
      wb_address: item.wb_address
    };
    newIds.set(item.id, receivers[i]);
    return result;
  });
    
  // ⏱️ ДОБАВИТЬ ЗДЕСЬ: Конец замера и вывод времени выполнения
  const drawDuration = performance.now() - drawStartTime;
  console.log(`⏱️  Время жеребьёвки: ${drawDuration.toFixed(2)} мс (${(drawDuration / 1000).toFixed(3)} сек)`);
  
  return { newSort, newIds };
};

// 📊 Парсинг CSV файла без внешних зависимостей
const parseCSV = async () => {
  console.log(`📖 Читаем CSV файл: ${PATHS.csv}`);
  
  const csvContent = await fs.readFile(PATHS.csv, 'utf-8');
  const lines = csvContent.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    throw new Error('❌ CSV файл пуст или содержит только заголовок');
  }
  
  // Парсим заголовок
  const headers = parseCSVLine(lines[0]);
  console.log(`📊 Найдено ${lines.length - 1} записей`);
  
  // Парсим данные
  const pureAddresses = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const record = {};
    
    // Сопоставляем значения с заголовками
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    
    pureAddresses.push({
      id: record['Укажи уникальный номер, расположенный на сайте'],
      gender: record['Укажи свой гендер'],
      wishes: record['Укажи свои пожелания, если хочешь. Что хотелось/не хотелось бы получить.'] || '',
      ozon_address: record['ОЗОН Адрес'] || '',
      wb_address: record['ВБ Адрес'] || '',
      timestamp: record['Отметка времени']
    });
  }
  
  return pureAddresses;
};

// Вспомогательная функция для парсинга строки CSV
const parseCSVLine = (line) => {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Двойные кавычки внутри кавычек
        current += '"';
        i++; // Пропускаем следующую кавычку
      } else {
        // Начало/конец кавычек
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Конец поля
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Добавляем последнее поле
  result.push(current.trim());
  return result;
};

// 📝 Генерация Map для ручного контроля
const generateParsedFile = (data, assignments) => {
  let content = '// 🎅 ДАННЫЕ ТАЙНОГО САНТЫ (RAW PARSED DATA)\n';
  content += '// Сгенерировано автоматически\n\n';
  
  // 1. Исходные данные
  content += 'export const INIT_ADDRESSES = [\n';
  data.forEach((item, i) => {
    content += `  {\n`;
    content += `    id: "${item.id}",\n`;
    content += `    gender: "${item.gender}",\n`;
    content += `    wishes: ${JSON.stringify(item.wishes)},\n`;
    content += `    ozon_address: ${JSON.stringify(item.ozon_address)},\n`;
    content += `    wb_address: ${JSON.stringify(item.wb_address)},\n`;
    content += `    timestamp: "${item.timestamp}"\n`;
    content += `  }${i < data.length - 1 ? ',' : ''}\n`;
  });
  content += '];\n\n';
  
  // 2. Назначения (Map в виде объекта для читаемости)
  content += '// 🎲 РЕЗУЛЬТАТЫ ЖЕРЕБЬЁВКИ (Кто → Кому)\n';
  content += 'export const SANTA_ASSIGNMENTS = {\n';
  Array.from(assignments.entries()).forEach(([santaId, gifteeId], i, arr) => {
    const santaData = data.find(d => d.id === santaId);
    const gifteeData = data.find(d => d.id === gifteeId);
    content += `  "${santaId}": { // ${santaData?.gender || 'unknown'}`;
    if (santaData?.wishes) {
      content += ` (${santaData.wishes.substring(0, 30)}${santaData.wishes.length > 30 ? '...' : ''})`;
    }
    content += `\n`;
    content += `    giftee: "${gifteeId}", // ${gifteeData?.gender || 'unknown'}\n`;
    content += `  }${i < arr.length - 1 ? ',' : ''}\n`;
  });
  content += '};\n';
  
  return content;
};

// 📝 Генерация финального TypeScript файла
const generateAddressesFile = (data, assignments, newSort) => {
  let content = '// 🎅 ДАННЫЕ ТАЙНОГО САНТЫ\n';
  content += '// Сгенерировано автоматически. НЕ РЕДАКТИРУЙТЕ ВРУЧНУЮ!\n\n';
  
  // 1. Комментированный вывод назначений
  content += '// 🎲 РЕЗУЛЬТАТЫ ЖЕРЕБЬЁВКИ (Map<string, string>)\n';
  content += '// Формат: ID Санты → ID Получателя\n';
  content += '/*\n';
  Array.from(assignments.entries()).forEach(([santaId, gifteeId]) => {
    const santaData = data.find(d => d.id === santaId);
    const gifteeData = data.find(d => d.id === gifteeId);
    content += `  ${santaId} → ${gifteeId} (${santaData?.gender} → ${gifteeData?.gender})\n`;
  });
  content += '*/\n\n';
  
  // 2. Интерфейс для значений Map - ИЗМЕНЕНИЕ: id_santa теперь не нужен в объекте
  content += 'export type DeliveryDataKeys = "gender" | "wishes" | "ozon_address" | "wb_address";\n';
  content += 'export type DeliveryDataValue = string;\n\n';

  content += 'export type DeliveryData = Record<DeliveryDataKeys, DeliveryDataValue>\n\n';

  // 3. Создаём Map вместо массива - ИЗМЕНЕНИЕ ЗДЕСЬ
  content += 'export const DELIVERY_DATA = new Map<number, DeliveryData>([\n';
  
  // Группируем записи по id_santa (ключу Map)
  const mapEntries = new Map();
  newSort.forEach(item => {
    if (!mapEntries.has(item.id_santa)) {
      mapEntries.set(item.id_santa, []);
    }
    mapEntries.get(item.id_santa).push(item);
  });
  
  // Генерируем записи для Map
  const entriesArray = [];
  newSort.forEach((item, i) => {
    entriesArray.push(`  [ ${item.id_santa}, {\n`);
    entriesArray.push(`    gender: "${item.gender}",\n`);
    entriesArray.push(`    wishes: ${JSON.stringify(item.wishes)},\n`);
    entriesArray.push(`    ozon_address: ${JSON.stringify(item.ozon_address)},\n`);
    entriesArray.push(`    wb_address: ${JSON.stringify(item.wb_address)}\n`);
    entriesArray.push(`  }]${i < newSort.length - 1 ? ',' : ''}\n`);
  });
  
  content += entriesArray.join('');
  content += ']);';
   
  return content;
};

// 🚀 Основная функция
const main = async () => {
  console.log('🎅 ЗАПУСК РАСПРЕДЕЛИТЕЛЯ ТАЙНОГО САНТЫ');
  console.log('='.repeat(50));
  
  try {
    // 1. Чтение и парсинг CSV
    const data = await parseCSV();
    
    if (data.length === 0) {
      throw new Error('❌ CSV файл пуст или содержит некорректные данные');
    }
    
    // 2. Жеребьёвка
    const { newSort, newIds } = reSortNoShift(data);
    
    // 3. Сохраняем распарсенные данные для контроля
    await ensureDir(path.dirname(PATHS.parsed));
    const parsedContent = generateParsedFile(data, newIds);
    await fs.writeFile(PATHS.parsed, parsedContent, 'utf-8');
    console.log(`📄 Сохранены распарсенные данные: ${PATHS.parsed}`);
    
    // 4. Делаем бэкап старого файла
    await createBackup(PATHS.addresses);
    
    // 5. Генерируем новый файл адресов
    const addressesContent = generateAddressesFile(data, newIds, newSort);
    await ensureDir(path.dirname(PATHS.addresses));
    await fs.writeFile(PATHS.addresses, addressesContent, 'utf-8');
    
    console.log('='.repeat(50));
    console.log('✅ ВСЁ ГОТОВО!');
    console.log(`📁 Новые данные сохранены в: ${PATHS.addresses}`);
    console.log(`🎁 Участников обработано: ${data.length}`);
    
    // Показываем несколько примеров назначений
    console.log('\n🔍 Результат назначений:');
    // const sampleAssignments = Array.from(newIds.entries()).slice(0, 3);
    const sampleAssignments = Array.from(newIds.entries());
    sampleAssignments.forEach(([santaId, gifteeId]) => {
      const santa = data.find(d => d.id === santaId);
      const giftee = data.find(d => d.id === gifteeId);
      console.log(`   ${santaId} → ${gifteeId} (${santa?.gender} → ${giftee?.gender})`);
    });
    
  } catch (error) {
    console.error('❌ ОШИБКА:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

// Запуск
main();