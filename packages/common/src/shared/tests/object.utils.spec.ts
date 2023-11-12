import { deduplicateArray } from '../object-utils';

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
