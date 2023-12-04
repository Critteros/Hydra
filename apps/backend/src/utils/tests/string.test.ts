import { StringUtils } from '../string';

describe('StringUtils', () => {
  it.concurrent.each`
    str        | char    | expected
    ${'abc'}   | ${'a'}  | ${'bc'}
    ${'abc'}   | ${'b'}  | ${'abc'}
    ${'abc'}   | ${'c'}  | ${'abc'}
    ${'abc'}   | ${'d'}  | ${'abc'}
    ${'abc'}   | ${'ab'} | ${'c'}
    ${'abc'}   | ${'bc'} | ${'abc'}
    ${'aaa'}   | ${'a'}  | ${''}
    ${'aaa'}   | ${'aa'} | ${''}
    ${'aaabb'} | ${'a'}  | ${'bb'}
    ${'/sdfsdf/sdfsdf'} | ${'/'}  | ${'sdfsdf/sdfsdf'}
  `(
    'uses trimStart to tring $str to $expected using char $char',
    ({ str, char, expected }: Record<'str' | 'char' | 'expected', string>) => {
      expect(StringUtils.trimStart(str, char)).toBe(expected);
    },
  );

  it.concurrent.each`
    str        | char    | expected
    ${'abc'}   | ${'a'}  | ${'abc'}
    ${'abc'}   | ${'b'}  | ${'abc'}
    ${'abc'}   | ${'c'}  | ${'ab'}
    ${'abc'}   | ${'d'}  | ${'abc'}
    ${'abc'}   | ${'ab'} | ${'abc'}
    ${'abc'}   | ${'bc'} | ${'a'}
    ${'aaa'}   | ${'a'}  | ${''}
    ${'aaa'}   | ${'aa'} | ${''}
    ${'aaabb'} | ${'a'}  | ${'aaabb'}
    ${'aaabb'} | ${'b'}  | ${'aaa'}
  `(
    'uses trimEnd to tring $str to $expected using char $char',
    ({ str, char, expected }: Record<'str' | 'char' | 'expected', string>) => {
      expect(StringUtils.trimEnd(str, char)).toBe(expected);
    },
  );

  it.concurrent.each`
    str        | char    | expected
    ${'abc'}   | ${'a'}  | ${'bc'}
    ${'abc'}   | ${'b'}  | ${'abc'}
    ${'abc'}   | ${'c'}  | ${'ab'}
    ${'abc'}   | ${'d'}  | ${'abc'}
    ${'abc'}   | ${'ab'} | ${'c'}
    ${'abc'}   | ${'bc'} | ${'a'}
    ${'aaa'}   | ${'a'}  | ${''}
    ${'aaa'}   | ${'aa'} | ${''}
    ${'aaabb'} | ${'a'}  | ${'bb'}
    ${'aaabb'} | ${'b'}  | ${'aaa'}
  `(
    'uses trim to tring $str to $expected using char $char',
    ({ str, char, expected }: Record<'str' | 'char' | 'expected', string>) => {
      expect(StringUtils.trim(str, char)).toBe(expected);
    },
  );
});
