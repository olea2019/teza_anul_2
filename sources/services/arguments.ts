import { ARGUMENT_TYPES } from '../constants/argumentTypes';
import { Argument } from '../interfaces/arguments';

export class ArgumentsService {

  public get allArguments(): Argument[] {
    return process.argv
      .map(
        value =>
          ARGUMENT_TYPES.find(
            type => type.longUnix === value || type.shortUnix === value || type.windows === value
          ),
      )
      .filter(value => value)
      .map(value => value.shortUnix);
  }

  public get inputFiles(): string[] {
    return this.allFiles.slice(0, -1);
  }

  public get outputFile(): string {
    const allFiles = this.allFiles;
    return allFiles[allFiles.length - 1];
  }

  public get allFiles(): string[] {
    return process.argv
      .slice(2)
      .filter(
        value =>
          ARGUMENT_TYPES.find(
            type => type.longUnix === value || type.shortUnix === value || type.windows === value
          ) === undefined
      );
  }

  public hasArgument(argument: Argument): boolean {
    return this.allArguments.includes(argument);
  }

}
