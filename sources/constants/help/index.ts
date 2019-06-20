import { Argument } from '../../interfaces/arguments';
import { COMMAND_HELP } from './command';
import { DELETE_HELP } from './delete';
import { HELP_HELP } from './help';
import { OVERWRITE_HELP } from './overwrite';

export const HELP = {
  [Argument.DELETE]: DELETE_HELP,
  [Argument.HELP]: HELP_HELP,
  [Argument.OVERWRITE]: OVERWRITE_HELP,
  COMMAND: COMMAND_HELP,
  '': COMMAND_HELP,
  [undefined as any]: COMMAND_HELP,
  [null as any]: COMMAND_HELP,
};
