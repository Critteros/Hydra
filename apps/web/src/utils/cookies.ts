export function makeCookieString({
  name,
  value,
}: {
  name: string;
  value: string | number | boolean;
}) {
  return `${name}=${value};`;
}
