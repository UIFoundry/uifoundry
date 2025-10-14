"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("k6/http");
exports.default = (function () {
    http_1.default.get("uifoundry.dev");
});
