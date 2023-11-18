import { Time } from '../time';

const epsilon = 1e-10;

describe('Test time', () => {
  it.concurrent.each`
    inputUnit | inputValue | outputUnit | outputValue
    ${'ns'}   | ${1}       | ${'ms'}    | ${1e-6}
    ${'ms'}   | ${500}     | ${'s'}     | ${0.5}
    ${'s'}    | ${2}       | ${'us'}    | ${2e6}
    ${'us'}   | ${100}     | ${'ns'}    | ${100e3}
    ${'s'}    | ${0.5}     | ${'ms'}    | ${500}
    ${'ms'}   | ${1000}    | ${'s'}     | ${1}
    ${'us'}   | ${500}     | ${'ns'}    | ${500e3}
    ${'ns'}   | ${1e9}     | ${'s'}     | ${1}
  `(
    'converts from $inputValue $inputUnit to $outputValue $outputUnit',
    ({ inputUnit, inputValue, outputUnit, outputValue }) => {
      const time = Time.from(inputValue, inputUnit);

      expect(time.to(outputUnit)).toBeCloseTo(outputValue, epsilon);
    },
  );

  it.concurrent.each`
    input1Unit | input1Value | input2Unit | input2Value | outputValueMs
    ${'ns'}    | ${1}        | ${'ms'}    | ${1}        | ${1.000001}
    ${'us'}    | ${500}      | ${'us'}    | ${500}      | ${1}
    ${'ms'}    | ${250}      | ${'s'}     | ${1}        | ${1_250}
    ${'s'}     | ${2}        | ${'ms'}    | ${500}      | ${2_500}
    ${'s'}     | ${0.5}      | ${'us'}    | ${500}      | ${500.5}
    ${'ms'}    | ${1000}     | ${'ns'}    | ${500}      | ${1_000.0005}
    ${'us'}    | ${750}      | ${'s'}     | ${1.5}      | ${1_500.75}
  `(
    'adds $input1Value $input1Unit and $input2Value $input2Unit',
    ({ input1Unit, input1Value, input2Unit, input2Value, outputValueMs }) => {
      const time1 = Time.from(input1Value, input1Unit);
      const time2 = Time.from(input2Value, input2Unit);

      expect(Time.add(time1, time2).to('ms')).toBeCloseTo(outputValueMs, epsilon);
    },
  );

  it.concurrent.each`
    input1Unit | input1Value | input2Unit | input2Value | outputValueMs
    ${'ns'}    | ${1}        | ${'ms'}    | ${1}        | ${-0.999999}
    ${'us'}    | ${500}      | ${'us'}    | ${500}      | ${0}
    ${'ms'}    | ${250}      | ${'s'}     | ${1}        | ${-750}
    ${'s'}     | ${2}        | ${'ms'}    | ${500}      | ${1_500}
    ${'s'}     | ${0.5}      | ${'us'}    | ${500}      | ${499.5}
    ${'ms'}    | ${1000}     | ${'ns'}    | ${500}      | ${999.9995}
    ${'us'}    | ${750}      | ${'s'}     | ${1.5}      | ${-1_499.25}
  `(
    'subtracts $input2Value $input2Unit from $input1Value $input1Unit',
    ({ input1Unit, input1Value, input2Unit, input2Value, outputValueMs }) => {
      const time1 = Time.from(input1Value, input1Unit);
      const time2 = Time.from(input2Value, input2Unit);

      expect(Time.subtract(time1, time2).to('ms')).toBeCloseTo(outputValueMs, epsilon);
    },
  );
});
