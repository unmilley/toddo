export const areObjectsEqual = (obj1: any, obj2: any): boolean => JSON.stringify(obj1) === JSON.stringify(obj2)

export const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true // Сравнение по ссылке
  if (obj1 == null || obj2 == null) return false // Одно из них null
  if (typeof obj1 !== typeof obj2) return false // Разные типы

  if (typeof obj1 === 'object') {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) return false // Разное количество ключей

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false // Ключи не совпадают или значения не равны
      }
    }
    return true
  }

  return false // Для примитивных типов, если они не равны
}
