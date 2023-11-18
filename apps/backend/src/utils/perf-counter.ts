import { hrtime } from 'node:process';

import { Time } from './time';

type NodeTimeType = ReturnType<typeof hrtime>;

export class PerfCounter {
  private startTime: NodeTimeType | null = null;
  private endTime: NodeTimeType | null = null;

  constructor() {
    this.startTime = hrtime();
  }

  /**
   * Stop the performance counter.
   *
   * @returns The time difference between start and end times.
   */
  public stop() {
    this.endTime = hrtime();
    const delta = this.calculateDelta();
    this.startTime = null;

    return delta;
  }

  /**
   * Reset the performance counter.
   *
   * @returns The time difference between the previous start time and the current time.
   */
  public reset() {
    this.endTime = hrtime();
    const delta = this.calculateDelta();
    this.startTime = hrtime();
    return delta;
  }

  /**
   * Calculate the time difference between start and end times.
   *
   * @returns The time difference.
   * @throws If the performance counter is not started or stopped.
   */
  private calculateDelta() {
    if (this.startTime === null || this.endTime === null) {
      throw new Error('PerfCounter is not started or stopped');
    }

    const [seconds, nanoseconds] = this.endTime;
    const [startSeconds, startNanoseconds] = this.startTime;

    const secondsDelta = Time.from(seconds - startSeconds, 's');
    const nanosecondsDelta = Time.from(nanoseconds - startNanoseconds, 'ns');

    return secondsDelta.add(nanosecondsDelta);
  }
}
