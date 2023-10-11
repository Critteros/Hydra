import { Command, CommandRunner, Option } from 'nest-commander';

interface BasicCommandOptions {
  string?: string;
}

@Command({ name: 'basic', description: 'A basic command' })
export class BasicCommand extends CommandRunner {
  async run(passedParam: string[], options?: BasicCommandOptions) {
    if (options?.string) {
      console.log(`You passed the string option with the value of ${options.string}`);
    }
  }
  @Option({
    flags: '-s, --string <string>',
    description: 'A string option',
  })
  parseString(value: string) {
    return value;
  }
}
