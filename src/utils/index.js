export function toKebabCase(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

export function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}