"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var arguments_1 = require("../../interfaces/arguments");
var command_1 = require("./command");
var delete_1 = require("./delete");
var help_1 = require("./help");
var overwrite_1 = require("./overwrite");
exports.HELP = (_a = {},
    _a[arguments_1.Argument.DELETE] = delete_1.DELETE_HELP,
    _a[arguments_1.Argument.HELP] = help_1.HELP_HELP,
    _a[arguments_1.Argument.OVERWRITE] = overwrite_1.OVERWRITE_HELP,
    _a.COMMAND = command_1.COMMAND_HELP,
    _a[''] = command_1.COMMAND_HELP,
    _a[undefined] = command_1.COMMAND_HELP,
    _a[null] = command_1.COMMAND_HELP,
    _a);
//# sourceMappingURL=index.js.map