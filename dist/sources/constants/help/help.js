"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arguments_1 = require("../../interfaces/arguments");
var argumentTypes_1 = require("../argumentTypes");
var aliases = argumentTypes_1.ARGUMENT_TYPES.find(function (type) { return type.shortUnix === arguments_1.Argument.HELP; });
exports.HELP_HELP = "\nShow help information about command and about it flags.\n\nAliases:\n" + Object.values(aliases).join(' ') + "\n\nSyntax:\ncopy [--flag] " + Object.values(aliases).join(' | ') + "\n\n";
//# sourceMappingURL=help.js.map