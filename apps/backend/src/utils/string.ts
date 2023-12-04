export class StringUtils {
  static readonly ALPHANUMERIC_REGEX = /[a-z0-9]/gi;
  static readonly NOT_ALPHANUMERIC_REGEX = /[^a-z0-9]/gi;

  static trimStart(str: string, char: string) {
    return str.replace(new RegExp(`^${char}+`), '');
  }
  static trimEnd(str: string, char: string) {
    return str.replace(new RegExp(`${char}+$`), '');
  }

  static trim(str: string, char: string) {
    return str.replace(new RegExp(`^${char}+|${char}+$`, 'g'), '');
  }
}
