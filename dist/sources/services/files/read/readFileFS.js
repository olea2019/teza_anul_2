"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var rxjs_1 = require("rxjs");
var arguments_1 = require("../../../interfaces/arguments");
var arguments_2 = require("../../arguments");
var progress_1 = require("../../progress");
var ReadFileFS = /** @class */ (function () {
    function ReadFileFS(source) {
        this.source = source;
    }
    ReadFileFS.prototype.read = function () {
        var _this = this;
        console.log("\nBegin copying file: " + this.source + " from file system");
        var subject = new rxjs_1.ReplaySubject(100 * (Math.pow(1024, 2)));
        subject.subscribe({ complete: function () { return _this.deleteFile(); } });
        this.getFileSize()
            .then(function (size) {
            var stream = _this.openStream(size);
            _this.initProgressBar(size, stream);
            return stream;
        })
            .then(function (stream) {
            stream.on('data', function (data) { return subject.next(data); });
            stream.on('error', function (error) {
                subject.error(error);
                console.error("\nAn error encoured while coping file: " + _this.source);
                console.error(error);
            });
            stream.once('close', function () {
                subject.complete();
                setTimeout(function () { return console.log("\nEnd copy of: " + _this.source + " from file system"); });
            });
        });
        return subject.asObservable();
    };
    ReadFileFS.prototype.initProgressBar = function (size, stream) {
        var subject = new rxjs_1.BehaviorSubject(0);
        stream.on('data', function () { return subject.next(stream.bytesRead); });
        stream.once('error', function (error) { return subject.error(error); });
        stream.once('close', function () { return subject.complete(); });
        console.log("file size: " + size + " bytes (" + this.getData(size) + ")");
        var progress = new progress_1.Progress(size, subject.asObservable(), subject.value);
        progress.start();
    };
    ReadFileFS.prototype.getData = function (value) {
        var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var index = Math.log(value) / Math.log(1024) | 0;
        var size = (value / (Math.pow(1024, index))).toString();
        var response = size.includes('.') ? size.slice(0, size.indexOf('.') + 3) : size;
        return response + " " + units[index];
    };
    ReadFileFS.prototype.openStream = function (size) {
        var limit = Math.min(Math.sqrt(size) | 0, 16 * (Math.pow(1024, 2)));
        return fs_1.createReadStream(this.source, {
            autoClose: true,
            highWaterMark: limit,
        });
    };
    ReadFileFS.prototype.getFileSize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return fs_1.stat(_this.source, function (error, data) { return error ? reject(error) : resolve(data.size); });
        });
    };
    ReadFileFS.prototype.deleteFile = function () {
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
    return ReadFileFS;
}());
exports.ReadFileFS = ReadFileFS;
//# sourceMappingURL=readFileFS.js.map