import * as uuid from 'uuid';

import { uniqueFilename } from '../file-storage';

jest.mock('uuid');

describe('Test uniqueFilename', () => {
  const mockUUIDValue = 'mock-uuid-value';
  const transformedUUIDValue = mockUUIDValue.replace(/-/g, '');

  it.concurrent.each`
    originalFilename | expected
    ${'test.txt'}    | ${`${transformedUUIDValue}-test.txt`}
    ${'test'}        | ${`${transformedUUIDValue}-test`}
    ${'test.test'}   | ${`${transformedUUIDValue}-test.test`}
    ${'test.test.'}  | ${`${transformedUUIDValue}-test.test`}
    ${'test.test..'} | ${`${transformedUUIDValue}-test.test`}
    ${'t/t/.t'}      | ${`${transformedUUIDValue}-t_t_.t`}
    ${'t$t$.t.'}     | ${`${transformedUUIDValue}-t_t_.t`}
    ${'t$t$.t..'}    | ${`${transformedUUIDValue}-t_t_.t`}
    ${'t$t$.t...'}   | ${`${transformedUUIDValue}-t_t_.t`}
    ${'TtTtTtTtTt'}  | ${`${transformedUUIDValue}-tttttttttt`}
  `('produces $expected filename from $originalFilename', ({ originalFilename, expected }) => {
    jest.spyOn(uuid, 'v4').mockReturnValue(mockUUIDValue);
    expect(uniqueFilename(originalFilename as string)).toBe(expected);
  });
});
