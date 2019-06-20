"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var openReadFile_1 = require("./sources/functions/openReadFile");
var arguments_1 = require("./sources/interfaces/arguments");
var arguments_2 = require("./sources/services/arguments");
var concat_1 = require("./sources/services/files/concat");
var writeFile_1 = require("./sources/services/files/writeFile");
var help_1 = require("./sources/services/help");
var fs_1 = require("fs");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var timer, argumentsService, inputFiles, outputFile, timeToWait_1, readersPromises, readers, concat, writer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timer = 'process';
                    console.time(timer);
                    argumentsService = new arguments_2.ArgumentsService();
                    if (argumentsService.hasArgument(arguments_1.Argument.HELP)) {
                        new help_1.HelpService().show();
                        process.exit(0);
                    }
                    inputFiles = argumentsService.inputFiles, outputFile = argumentsService.outputFile;
                    if (!(fs_1.existsSync(outputFile) && !argumentsService.hasArgument(arguments_1.Argument.OVERWRITE))) return [3 /*break*/, 2];
                    timeToWait_1 = 5000;
                    console.log("output file (" + outputFile + "), already exists");
                    console.log("it will be overwirted, press " + (process.platform === 'darwin' ? 'cmnd' : 'ctrl') + " + c to stop");
                    console.log("process is stopped for " + timeToWait_1 + " ms (" + timeToWait_1 / 1000 + " s)");
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, timeToWait_1); })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    readersPromises = inputFiles.map(function (fileName) { return openReadFile_1.openReadFile(fileName); });
                    return [4 /*yield*/, Promise.all(readersPromises)];
                case 3:
                    readers = _a.sent();
                    concat = new concat_1.ConcatService(readers);
                    writer = new writeFile_1.WriteFile(concat.concat(), outputFile);
                    writer.write().subscribe(null, null, function () { return console.timeEnd(timer); });
                    return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=main.js.map