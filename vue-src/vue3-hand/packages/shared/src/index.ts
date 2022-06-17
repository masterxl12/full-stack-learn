export const isObject = (value: any): boolean =>
  typeof value === "object" && value !== null;

export const isIntegerKey = (key: string) => parseInt(key) + '' === key;

export const hasOwn = (target: any, key: string) => Object.prototype.hasOwnProperty.call(target, key);