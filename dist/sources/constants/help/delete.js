"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arguments_1 = require("../../interfaces/arguments");
var argumentTypes_1 = require("../argumentTypes");
var aliases = argumentTypes_1.ARGUMENT_TYPES.find(function (type) { return type.shortUnix === arguments_1.Argument.DELETE; });
exports.DELETE_HELP = "\nIndicates command to try to delete source files.\n\nAliases:\n" + Object.values(aliases).join(' ') + "\n";
//# sourceMappingURL=delete.js.map