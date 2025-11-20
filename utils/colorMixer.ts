// utils/colorMixer.ts
export type Color = {
  r: number;
  g: number;
  b: number;
  name?: string; // для удобства идентификации цвета
};

// Базовые цвета
export const baseColors: Record<string, Color> = {
  red: { r: 255, g: 0, b: 0, name: 'red' },
  green: { r: 0, g: 255, b: 0, name: 'green' },
  blue: { r: 0, g: 0, b: 255, name: 'blue' },
};

// Словарь известных комбинаций цветов
export const colorCombinations: Record<string, Color> = {
  'red+green': { r: 255, g: 255, b: 0, name: 'yellow' },
  'green+red': { r: 255, g: 255, b: 0, name: 'yellow' },
  'red+blue': { r: 255, g: 0, b: 255, name: 'purple' },
  'blue+red': { r: 255, g: 0, b: 255, name: 'purple' },
  'green+blue': { r: 0, g: 255, b: 255, name: 'cyan' },
  'blue+green': { r: 0, g: 255, b: 255, name: 'cyan' },
};

// Функция смешивания цветов с возможностью передать ratio
export function mixColors(c1: Color, c2: Color, ratio: number = 0.5): Color {
  // Если есть имена — сначала проверяем словарь
  if (c1.name && c2.name) {
    const key1 = `${c1.name}+${c2.name}`;
    const key2 = `${c2.name}+${c1.name}`;
    const combo = colorCombinations[key1] || colorCombinations[key2];
    if (combo) return combo;
  }

  // fallback — усреднение с учётом ratio
  return {
    r: Math.min(255, Math.round(c1.r * ratio + c2.r * (1 - ratio))),
    g: Math.min(255, Math.round(c1.g * ratio + c2.g * (1 - ratio))),
    b: Math.min(255, Math.round(c1.b * ratio + c2.b * (1 - ratio))),
  };
}

// Преобразование Color в стиль
export function rgbToStyle(c: Color): string {
  return `rgb(${c.r},${c.g},${c.b})`;
}

// Проверка совпадения с целевым цветом
export function isColorMatch(c1: Color, c2: Color, tolerance = 15): boolean {
  return (
    Math.abs(c1.r - c2.r) <= tolerance &&
    Math.abs(c1.g - c2.g) <= tolerance &&
    Math.abs(c1.b - c2.b) <= tolerance
  );
}
