import { Argument } from '../../interfaces/arguments';
import { ARGUMENT_TYPES } from '../argumentTypes';

const aliases = ARGUMENT_TYPES.find(type => type.shortUnix === Argument.DELETE);

export const DELETE_HELP = `
Indicates command to try to delete source files.

Aliases:
${Object.values(aliases).join(' ')}
`;