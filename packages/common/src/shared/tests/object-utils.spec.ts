import { deduplicateArray, mergeArrayWithPriority } from '../object-utils';

describe('deduplicateArray', () => {
  it.each`
    input                                 | output
    ${[1, 1, 2, 3, 4, 4, 5, 5, 5, 6]}     | ${[1, 2, 3, 4, 5, 6]}
    ${['a', 'a', 'b', 'c', 'c']}          | ${['a', 'b', 'c']}
    ${[null, null, undefined, 1, 1, 2]}   | ${[null, undefined, 1, 2]}
    ${[Symbol.for('a'), Symbol.for('a')]} | ${[Symbol.for('a')]}
  `('deduplicates simple array', ({ input, output }) => {
    expect(deduplicateArray(input)).toEqual(output);
  });

  it('deduplicates array of complex objects using selector', () => {
    const input = [
      { id: 1, name: 'John' },
      { id: 1, name: 'John' },
      { id: 2, name: 'Tan' },
      { id: 3, name: 'Iloh' },
      { id: 3, name: 'Iloh' },
    ];
    const output = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Tan' },
      { id: 3, name: 'Iloh' },
    ];

    expect(deduplicateArray(input)).not.toEqual(output);
    expect(deduplicateArray(input, (obj) => obj.id)).toEqual(output);
  });
});

describe('mergeArrayWithPriority', () => {
  it.each`
    priorityArray | array     | output
    ${[1, 2, 3]}  | ${[4, 5]} | ${[1, 2, 3, 4, 5]}
    ${['a', 'b']} | ${['c']}  | ${['a', 'b', 'c']}
    ${[null]}     | ${[1]}    | ${[null, 1]}
  `('merges simple arrays with priority', ({ priorityArray, array, output }) => {
    expect(mergeArrayWithPriority({ priorityArray, array })).toEqual(output);
  });

  it('merges array of complex objects with priority using selector', () => {
    const priorityArray = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Tan' },
      { id: 3, name: 'Iloh' },
    ];

    const array = [
      { id: 1, name: 'John2' },
      { id: 4, name: 'John4' },
      { id: 5, name: 'John5' },
      { id: 3, name: 'Iloh3' },
    ];

    const output = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Tan' },
      { id: 3, name: 'Iloh' },

      { id: 4, name: 'John4' },
      { id: 5, name: 'John5' },
    ];

    expect(
      mergeArrayWithPriority({
        priorityArray,
        array,
        selector: (obj) => obj.id,
      }),
    ).toEqual(output);
  });
});
