import * as utils from '../objects';

it('should exclude properties from object', () => {
  const obj = {
    foo: 'bar',
    bar: 'baz',
    baz: 'foo',
  };

  expect(utils.exclude(obj, ['foo', 'bar'])).toEqual({ baz: 'foo' });
});
