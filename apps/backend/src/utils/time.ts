export enum TimeUnits {
  SECONDS = 'seconds',
  MILISECONDS = 'miliseconds',
  MICROSECONDS = 'microseconds',
  NANOSECONDS = 'nanoseconds',
}

const shortcuts = {
  ['s']: TimeUnits.SECONDS,
  ['ms']: TimeUnits.MILISECONDS,
  ['us']: TimeUnits.MICROSECONDS,
  ['ns']: TimeUnits.NANOSECONDS,
} as const;
type Shortcuts = keyof typeof shortcuts;

const nsConversionUnits = {
  [TimeUnits.SECONDS]: {
    from: 1e9,
    to: 1 / 1e9,
  },
  [TimeUnits.MILISECONDS]: {
    from: 1e6,
    to: 1 / 1e6,
  },
  [TimeUnits.MICROSECONDS]: {
    from: 1e3,
    to: 1 / 1e3,
  },
  [TimeUnits.NANOSECONDS]: {
    from: 1,
    to: 1,
  },
} as const satisfies Record<TimeUnits, { from: number; to: number }>;

export class Time {
  private constructor(private readonly nsTime: number) {}

  static from(value: number, unit: TimeUnits | Shortcuts) {
    const timeUnit = Time.shortcutToMember(unit);
    const multiplier = nsConversionUnits[timeUnit].from;

    return new Time(value * multiplier);
  }

  static shortcutToMember(shortcut: Shortcuts | TimeUnits) {
    return Object.keys(shortcuts).includes(shortcut)
      ? shortcuts[shortcut as Shortcuts]
      : (shortcut as TimeUnits);
  }

  to(unit: TimeUnits | Shortcuts) {
    const timeUnit = Time.shortcutToMember(unit);
    const multiplier = nsConversionUnits[timeUnit].to;

    return this.nsTime * multiplier;
  }

  add(time: Time) {
    return new Time(this.nsTime + time.nsTime);
  }

  static add(...times: Time[]) {
    return times.reduce((acc, time) => acc.add(time), new Time(0));
  }

  subtract(time: Time) {
    return new Time(this.nsTime - time.nsTime);
  }

  static subtract(...times: Time[]) {
    return times.reduce((acc, time) => (acc === undefined ? time : acc.subtract(time)));
  }

  diff(time: Time) {
    return new Time(Math.abs(this.nsTime - time.nsTime));
  }
}
