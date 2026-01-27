import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { reSort } from '../src/utils/resort.js';

const fileName = '25-26';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async () => {
  console.log('🎅 Начинаю процесс обработки адресов...\n');
  
  // Пути к файлам
  const rootDir = path.join(__dirname, '..');
  const pureFilePath = path.join(rootDir, '_local', `pure_20${fileName}.js`);
  const outputFilePath = path.join(rootDir, 'src', 'data', 'addresses.ts');
  const backupDir = path.join(rootDir, '_local', 'backups');
  
  try {
    // 🔍 Чтение исходного файла
    console.log('📖 Читаю исходные данные...');
    
    // Читаем файл как строку
    const pureFileContent = fs.readFileSync(pureFilePath, 'utf8');
    
    // Извлекаем массив из файла
    const arrayMatch = pureFileContent.match(/const pureAddresses = (\[[\s\S]*?\])/);
    if (!arrayMatch) {
      throw new Error('❌ Не удалось найти массив pureAddresses в файле');
    }
    
    // Преобразуем строку в массив
    const pureAddresses = eval(arrayMatch[1]);
    console.log(`✅ Прочитано ${pureAddresses.length} адресов\n`);
    
    // 🔄 Обработка данных
    console.log('🔄 Выполняю сортировку...');
    const sortedData = reSort(pureAddresses);
    
    // 🔢 Преобразуем id_santa в число
    console.log('🔢 Преобразую id_santa в числовой формат...');
    const processedData = sortedData.map(item => ({
      ...item,
      id_santa: Number(item.id_santa)
    }));
    
    console.log(`✅ Получено ${processedData.length} отсортированных записей\n`);
    
    // 💾 Проверка существования файла назначения
    if (fs.existsSync(outputFilePath)) {
      console.log('📦 Создаю резервную копию старого файла...');
      
      // Создаем папку для бэкапов, если ее нет
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      
      // Генерируем имя для бэкапа с timestamp
      const timestamp = new Date().toISOString()
        .replace(/[:.]/g, '-')
        .replace('T', '_')
        .split('.')[0];
      const backupFileName = `adresses_(pure_20${fileName})_${timestamp}.ts`;
      const backupPath = path.join(backupDir, backupFileName);
      
      // Копируем старый файл
      fs.copyFileSync(outputFilePath, backupPath);
      console.log(`✅ Бэкап создан: ${backupFileName}\n`);
    }
    
    // ✨ Формируем содержимое нового файла
    console.log('✍️ Формирую новый файл...');
    
    // Функция для красивого форматирования массива
    const formatArray = (data) => {
      const lines = data.map(item => {
        const itemStr = JSON.stringify(item, null, 2)
          .replace(/"(\w+)":/g, '$1:')  // Убираем кавычки у ключей
          .replace(/"([^"]+)":/g, '$1:'); // Для всех ключей
        
        // Разбиваем на строки и делаем правильный отступ
        const itemLines = itemStr.split('\n').map((line, index) => {
          if (index === 0) return line;
          return '  ' + line;
        });
        
        return itemLines.join('\n');
      });
      
      return `[\n${lines.map(item => `  ${item}`).join(',\n')}\n]`;
    };
    
    const fileContent = `export interface Address {
  id_santa: number;
  wishes: string;
  ozon_address: string;
  gender: string;
  wb_address: string;
}

export const ADDRESSES: Readonly<Address[]> = ${formatArray(processedData)};
`;
    
    // 📝 Записываем новый файл
    // Создаем папку, если ее нет
    const outputDir = path.dirname(outputFilePath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputFilePath, fileContent, 'utf8');
    
    // 🎉 Завершение
    console.log(`✅ Файл успешно создан: ${path.relative(rootDir, outputFilePath)}`);
    console.log(`\n🎄 Обработка завершена успешно! 🎄`);
    console.log(`📊 Проверка типов:`);
    console.log(`   - id_santa: number ${typeof processedData[0]?.id_santa === 'number' ? '✅' : '❌'}`);
    console.log(`   - Первая запись: { id_santa: ${processedData[0]?.id_santa}, ... }`);
    
  } catch (error) {
    console.error(`\n❌ Ошибка: ${error.message}`);
    console.error('🔧 Стек вызовов:', error.stack);
    process.exit(1);
  }
};

// Запуск основной функции
main();