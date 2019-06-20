import { Argument } from '../interfaces/arguments';

export interface ArgumentType {
  shortUnix: Argument;
  longUnix: string;
  windows: string;
}

export const ARGUMENT_TYPES: ArgumentType[] = [
  { shortUnix: Argument.ASCII, longUnix: '--ascii', windows: '/A' },
  { shortUnix: Argument.BINARY, longUnix: '--binary', windows: '/B' },
  { shortUnix: Argument.DELETE, longUnix: '--delete', windows: '/D' },
  { shortUnix: Argument.ENCRYPT, longUnix: '--encrypt', windows: '/E' },
  { shortUnix: Argument.HELP, longUnix: '--help', windows: '/H' },
  { shortUnix: Argument.INTERACTIVE, longUnix: '--interactive', windows: '/I' },
  { shortUnix: Argument.LINK, longUnix: '--link', windows: '/L' },
  { shortUnix: Argument.NETWORK_FILES, longUnix: '--network', windows: '/Z' },
  { shortUnix: Argument.OVERWRITE, longUnix: '--overwrite', windows: '/O' },
  { shortUnix: Argument.SHORT_NAME, longUnix: '--short-name', windows: '/N' },
  { shortUnix: Argument.VERIFY, longUnix: '--verify', windows: '/V' },
];