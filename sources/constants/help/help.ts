import { Argument } from '../../interfaces/arguments';
import { ARGUMENT_TYPES } from '../argumentTypes';

const aliases = ARGUMENT_TYPES.find(type => type.shortUnix === Argument.HELP);

export const HELP_HELP = `
Show help information about command and about it flags.

Aliases:
${Object.values(aliases).join(' ')}

Syntax:
copy [--flag] ${Object.values(aliases).join(' | ')}

`;