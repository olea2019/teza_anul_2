"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_progress_1 = require("cli-progress");
var bar = new cli_progress_1.Bar({ etaBuffer: Math.pow(1000, 2) }, cli_progress_1.Presets.shades_classic);
var Progress = /** @class */ (function () {
    function Progress(total, source, initialValue) {
        this.total = total;
        this.source = source;
        this.initialValue = initialValue;
    }
    Progress.prototype.start = function () {
        bar.start(this.total, 0);
        var next = function (data) { return bar.update(data); };
        var complete = function () { return bar.stop(); };
        this.source.subscribe({ next: next, complete: complete });
        return this;
    };
    Progress.prototype.stop = function () {
        bar.stop();
        return this;
    };
    return Progress;
}());
exports.Progress = Progress;
//# sourceMappingURL=progress.js.map