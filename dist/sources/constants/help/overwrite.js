"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arguments_1 = require("../../interfaces/arguments");
var argumentTypes_1 = require("../argumentTypes");
var aliases = argumentTypes_1.ARGUMENT_TYPES.find(function (type) { return type.shortUnix === arguments_1.Argument.OVERWRITE; });
exports.OVERWRITE_HELP = "\nIf this flag is enabled and destination file is existent,\ncommand will not ask to overwrite it or not (it will be overwrited).\n\nAliases:\n" + Object.values(aliases).join(' ') + "\n";
//# sourceMappingURL=overwrite.js.map