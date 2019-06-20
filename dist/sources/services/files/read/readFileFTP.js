"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var rxjs_1 = require("rxjs");
var ReadFileFTP = /** @class */ (function () {
    function ReadFileFTP(source) {
        this.source = source;
    }
    ReadFileFTP.prototype.read = function () {
        var _this = this;
        var subject = new rxjs_1.ReplaySubject();
        console.log("\nBegin reciving and coping file from: " + this.source);
        http_1.get(this.source, function (response) {
            if (response.statusCode >= 400) {
                subject.error(response.statusMessage);
                console.error("\nAn error happened while tring to get " + _this.source);
                console.error(response.statusCode + " " + response.statusMessage);
            }
            var complete = function () {
                subject.complete();
                console.log("\nEnd copying " + _this.source);
            };
            response.once('end', complete);
            response.once('close', complete);
            response.once('error', function (error) {
                subject.error(error);
                console.error("\nAn error happened while reciving " + _this.source);
                console.error(error);
            });
            response.on('data', function (data) { return subject.next(data); });
        });
        return subject.asObservable();
    };
    return ReadFileFTP;
}());
exports.ReadFileFTP = ReadFileFTP;
//# sourceMappingURL=readFileFTP.js.map