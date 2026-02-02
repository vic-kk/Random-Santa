export const reSortDerangement = (input, full) => {
  const ids = input.map(item => item.id);
  const n = ids.length;
  
  if (n < 2) throw new Error('Нужно минимум 2 участника');
  
  // Алгоритм Саттоло для случайного беспорядка (derangement)
  // Гарантирует, что ни один элемент не останется на своём месте
  const receivers = [...ids];
  
  // Алгоритм Саттоло - модификация Фишера-Йетса
  for (let i = n - 1; i > 0; i--) {
    // Выбираем j из [0, i-1] (не включая i!)
    const j = Math.floor(Math.random() * i);
    [receivers[i], receivers[j]] = [receivers[j], receivers[i]];
  }
  
  // Дополнительная проверка для n=2 (особый случай)
  if (n === 2 && receivers[0] === ids[0]) {
    [receivers[0], receivers[1]] = [receivers[1], receivers[0]];
  }
  
  // Создаём результат
  const newIds = new Map(ids.map((id, i) => [id, receivers[i]]));
  const newSort = input.map((item, i) => ({
    id_santa: receivers[i],
    ...item
  }));
  
  return full ? { newSort, newIds } : newSort;
};