export const ALPHANUMERIC_REGEX = /[a-z0-9]/gi;
export const NOT_ALPHANUMERIC_REGEX = /[^a-z0-9]/gi;

export function trimStart(str: string, char: string) {
  return str.replace(new RegExp(`^${char}+`), '');
}
export function trimEnd(str: string, char: string) {
  return str.replace(new RegExp(`${char}+$`), '');
}

export function trim(str: string, char: string) {
  return str.replace(new RegExp(`^${char}+|${char}+$`, 'g'), '');
}
