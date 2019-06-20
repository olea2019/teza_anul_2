"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var help_1 = require("../constants/help");
var arguments_1 = require("../interfaces/arguments");
var arguments_2 = require("./arguments");
var HelpService = /** @class */ (function () {
    function HelpService() {
    }
    HelpService.prototype.show = function (commands) {
        if (commands === void 0) { commands = new arguments_2.ArgumentsService().allArguments; }
        if (commands.length === 1) {
            console.log(help_1.HELP.COMMAND);
            return this;
        }
        commands
            .filter(function (command) { return command !== arguments_1.Argument.HELP; })
            .forEach(function (command) { return console.log(help_1.HELP[command]); });
        if (commands.filter(function (command) { return command === arguments_1.Argument.HELP; }).length > 1) {
            console.log(help_1.HELP[arguments_1.Argument.HELP]);
        }
        return this;
    };
    return HelpService;
}());
exports.HelpService = HelpService;
//# sourceMappingURL=help.js.map