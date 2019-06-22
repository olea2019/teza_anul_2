import { Argument } from '../interfaces/arguments';

export interface ArgumentType {
  shortUnix: Argument;
  longUnix: string;
  windows: string;
}

export const ARGUMENT_TYPES: ArgumentType[] = [
  { shortUnix: Argument.DELETE, longUnix: '--delete', windows: '/D' },
  { shortUnix: Argument.HELP, longUnix: '--help', windows: '/H' },
  { shortUnix: Argument.OVERWRITE, longUnix: '--overwrite', windows: '/O' },
];