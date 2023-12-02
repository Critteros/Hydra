import { Length, validateOrReject, ValidationError } from 'class-validator';

import { IsAtLeaseOnePropertyDefined } from '../IsAtLeastOnePropertyDefined';

describe('IsAtLeaseOnePropertyDefined', () => {
  class TestClass {
    @IsAtLeaseOnePropertyDefined()
    public testProperty?: string;

    @IsAtLeaseOnePropertyDefined()
    public testProperty2?: string;
  }

  it('should return false if all properties are undefined', async () => {
    const testClass = new TestClass();

    expect(testClass.testProperty).toBeUndefined();
    expect(testClass.testProperty2).toBeUndefined();

    await expect(validateOrReject(testClass)).rejects.toEqual(
      expect.arrayContaining([expect.any(ValidationError)]),
    );
  });

  it.each`
    propertyName
    ${'testProperty'}
    ${'testProperty2'}
  `(
    'should return true if one property is defined',
    async ({ propertyName }: { propertyName: keyof TestClass }) => {
      const testClass = new TestClass();

      testClass[propertyName] = 'test';

      expect(testClass[propertyName]).toBe('test');

      await expect(validateOrReject(testClass)).resolves.toBeUndefined();
    },
  );

  describe('Works nicely with other decorators', () => {
    class TestClassWithMultipleDecorators {
      @Length(1, 255)
      @IsAtLeaseOnePropertyDefined()
      public testProperty?: string;

      @IsAtLeaseOnePropertyDefined()
      @Length(1, 255)
      public testProperty2?: string;
    }

    it('should return false if all properties are undefined', async () => {
      const testClass = new TestClassWithMultipleDecorators();

      expect(testClass.testProperty).toBeUndefined();
      expect(testClass.testProperty2).toBeUndefined();

      await expect(validateOrReject(testClass)).rejects.toEqual(
        expect.arrayContaining([expect.any(ValidationError)]),
      );
    });

    it('should validate correctly if one property is defined', async () => {
      const testClass = new TestClassWithMultipleDecorators();

      testClass.testProperty = 'test';

      expect(testClass.testProperty).toBe('test');
      expect(testClass.testProperty2).toBeUndefined();

      await expect(validateOrReject(testClass)).resolves.toBeUndefined();
    });

    it('should use other validators for a given non undefined value', async () => {
      const testClass = new TestClassWithMultipleDecorators();
      testClass.testProperty = 'a'.repeat(256);

      expect(testClass.testProperty).toBe('a'.repeat(256));
      expect(testClass.testProperty2).toBeUndefined();

      await expect(validateOrReject(testClass)).rejects.toEqual(
        expect.arrayContaining([expect.any(ValidationError)]),
      );
    });

    it('validates correctly if both properties are defined', async () => {
      const testClass = new TestClassWithMultipleDecorators();

      testClass.testProperty = 'test';
      testClass.testProperty2 = 'test';

      expect(testClass.testProperty).toBe('test');
      expect(testClass.testProperty2).toBe('test');

      await expect(validateOrReject(testClass)).resolves.toBeUndefined();
    });

    it('validates correctly if both properties are defined and one is invalid', async () => {
      const testClass = new TestClassWithMultipleDecorators();

      testClass.testProperty = 'test';
      testClass.testProperty2 = 'a'.repeat(256);

      expect(testClass.testProperty).toBe('test');
      expect(testClass.testProperty2).toBe('a'.repeat(256));

      await expect(validateOrReject(testClass)).rejects.toEqual(
        expect.arrayContaining([expect.any(ValidationError)]),
      );
    });
  });
});
