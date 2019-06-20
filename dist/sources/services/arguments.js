"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var argumentTypes_1 = require("../constants/argumentTypes");
var ArgumentsService = /** @class */ (function () {
    function ArgumentsService() {
    }
    Object.defineProperty(ArgumentsService.prototype, "allArguments", {
        get: function () {
            return process.argv
                .map(function (value) {
                return argumentTypes_1.ARGUMENT_TYPES.find(function (type) { return type.longUnix === value || type.shortUnix === value || type.windows === value; });
            })
                .filter(function (value) { return value; })
                .map(function (value) { return value.shortUnix; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArgumentsService.prototype, "inputFiles", {
        get: function () {
            return this.allFiles.slice(0, -1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArgumentsService.prototype, "outputFile", {
        get: function () {
            var allFiles = this.allFiles;
            return allFiles[allFiles.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArgumentsService.prototype, "allFiles", {
        get: function () {
            return process.argv
                .slice(2)
                .filter(function (value) {
                return argumentTypes_1.ARGUMENT_TYPES.find(function (type) { return type.longUnix === value || type.shortUnix === value || type.windows === value; }) === undefined;
            });
        },
        enumerable: true,
        configurable: true
    });
    ArgumentsService.prototype.hasArgument = function (argument) {
        return this.allArguments.includes(argument);
    };
    return ArgumentsService;
}());
exports.ArgumentsService = ArgumentsService;
//# sourceMappingURL=arguments.js.map