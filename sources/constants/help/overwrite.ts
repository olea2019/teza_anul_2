import { Argument } from '../../interfaces/arguments';
import { ARGUMENT_TYPES } from '../argumentTypes';

const aliases = ARGUMENT_TYPES.find(type => type.shortUnix === Argument.OVERWRITE);

export const OVERWRITE_HELP = `
If this flag is enabled and destination file is existent,
command will not ask to overwrite it or not (it will be overwrited).

Aliases:
${Object.values(aliases).join(' ')}
`;