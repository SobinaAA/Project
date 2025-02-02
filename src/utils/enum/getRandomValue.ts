/**
 * Returns a random value from an enum object.
 *
 * @template T - The type of the enum object.
 * @param {T} enumObject - The enum object to retrieve a random value from.
 * @returns {T[keyof T]} A random value from the provided enum object.
 */

export function getRandromEnumValue<T extends object>(
  enumObject: T
): T[keyof T] {
  const values = Object.values(enumObject);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
