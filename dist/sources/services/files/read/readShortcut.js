"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var rxjs_1 = require("rxjs");
var windows_shortcuts_1 = require("windows-shortcuts");
var arguments_1 = require("../../../interfaces/arguments");
var arguments_2 = require("../../arguments");
var readFileFS_1 = require("./readFileFS");
var ReadShortcut = /** @class */ (function () {
    function ReadShortcut(source) {
        this.source = source;
    }
    ReadShortcut.prototype.read = function () {
        var _this = this;
        var subject = new rxjs_1.ReplaySubject();
        subject.subscribe({
            complete: function () { return _this.deleteFile(); },
        });
        console.log("\nSearch original file for: " + this.source);
        this.readShortcutTarget()
            .then(function (targetPath) { return new readFileFS_1.ReadFileFS(targetPath).read(); })
            .then(function (observable) { return observable.subscribe(function (data) { return subject.next(data); }, function (error) { return subject.error(error); }, function () { return subject.complete(); }); })
            .catch(function (error) {
            subject.error(error);
            console.error("\nAn error happened searching original file for: " + _this.source);
            console.error(error);
        });
        return subject.asObservable();
    };
    ReadShortcut.prototype.readShortcutTarget = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return windows_shortcuts_1.query(_this.source, function (error, _a) {
            var target = _a.target;
            return (console.log(target, error), error ? reject(error) : resolve(target));
        }); });
    };
    ReadShortcut.prototype.deleteFile = function () {
        var _this = this;
        var argumentsService = new arguments_2.ArgumentsService();
        if (!argumentsService.hasArgument(arguments_1.Argument.DELETE)) {
            return this;
        }
        fs_1.unlink(this.source, function (error) { return error
            ? (console.error("Can't delete " + _this.source + ", an error encoured"), console.error(error))
            : console.log(_this.source + " deleted succesful."); });
        return this;
    };
    return ReadShortcut;
}());
exports.ReadShortcut = ReadShortcut;
//# sourceMappingURL=readShortcut.js.map