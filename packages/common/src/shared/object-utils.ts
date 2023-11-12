type SelectorFn<TData> = (data: TData) => unknown;

export function deduplicateArray<TData>(
  array: TData[],
  selector: SelectorFn<TData> = (data) => data,
): TData[] {
  const identifiers = array.map(selector);
  const uniqueIdentifiers = [...new Set(identifiers)];

  const deduplicatedArray = uniqueIdentifiers.map((identifier) => {
    return array.find((data) => selector(data) === identifier)!;
  });
  return deduplicatedArray;
}
