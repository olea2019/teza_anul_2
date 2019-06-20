"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var ConcatService = /** @class */ (function () {
    function ConcatService(readers) {
        this.readers = readers.slice();
    }
    ConcatService.prototype.concat = function () {
        var subject = new rxjs_1.ReplaySubject();
        this.subscribeToFirst(subject);
        return subject.asObservable();
    };
    ConcatService.prototype.subscribeToFirst = function (subject) {
        var _a;
        if (this.readers.length === 0) {
            return;
        }
        (_a = this.readers
            .shift()
            .read()).subscribe.apply(_a, this.subscriptionCallbacks(subject));
    };
    ConcatService.prototype.subscriptionCallbacks = function (subject) {
        var _this = this;
        return [
            function (data) { return subject.next(data); },
            null,
            function () { return _this.subscribeToFirst(subject); },
        ];
    };
    return ConcatService;
}());
exports.ConcatService = ConcatService;
//# sourceMappingURL=concat.js.map