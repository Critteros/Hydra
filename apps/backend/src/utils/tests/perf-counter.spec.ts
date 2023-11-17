import { PerfCounter } from '../perf-counter';

describe('Test PerfCounter', () => {
  it('measures execution time', () => {
    const perfCounter = new PerfCounter();
    const delta = perfCounter.stop();
    expect(delta.to('ms')).toBeGreaterThanOrEqual(0);
  });
});
