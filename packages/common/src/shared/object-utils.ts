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

export function mergeArrayWithPriority<TData>({
  array,
  priorityArray,
  selector = (data) => data,
}: {
  array: TData[];
  priorityArray: TData[];
  selector?: SelectorFn<TData>;
}) {
  const priorityList = [...priorityArray];

  array.forEach((entry) => {
    const index = priorityList.findIndex((priorityEntry) => {
      return selector(priorityEntry) === selector(entry);
    });

    if (index == -1) {
      priorityList.push(entry);
    }

    return;
  });

  return priorityList;
}
