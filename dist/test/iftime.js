"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var index_1 = require("../index");
describe("iftime", function () {
    it("Exact month - true", function (done) {
        assert.equal(index_1.default("*,*,*,jan", "2020-01-01"), true);
        done();
    });
    it("Exact month - false", function (done) {
        assert.equal(index_1.default("*,*,*,jan", "2020-10-09"), false);
        done();
    });
    it("Exact date - true", function (done) {
        assert.equal(index_1.default("*,*,1,jan", "2020-01-01"), true);
        done();
    });
    it("Exact date - false", function (done) {
        assert.equal(index_1.default("*,*,8,jan", "2020-01-01"), false);
        done();
    });
    it("Exact day - true", function (done) {
        assert.equal(index_1.default("*,wed,1,jan", "2020-01-01"), true);
        done();
    });
    it("Exact day - false", function (done) {
        assert.equal(index_1.default("*,wed,1,jan", "2020-01-01"), true);
        done();
    });
    it("Exact time - true", function (done) {
        assert.equal(index_1.default("10:10-10:20,wed,1,jan", "2020-01-01 10:15"), true);
        done();
    });
    it("Exact time - false", function (done) {
        assert.equal(index_1.default("11:10-11:20,wed,1,jan", "2020-01-01 10:15"), false);
        done();
    });
    it("Single time", function (done) {
        var error = false;
        try {
            index_1.default("10:15,wed,1,jan", "2020-01-01 10:15");
        }
        catch (err) {
            error = err.toString() === "Error: Invalid time interval";
        }
        assert.equal(error, true);
        done();
    });
    it("Invalid date", function (done) {
        var error = false;
        try {
            index_1.default("00:10-10:20,wed,1,jan", "dfgfghfgj");
        }
        catch (err) {
            error = err.toString() === "Error: Invalid source date";
        }
        assert.equal(error, true);
        done();
    });
    it("Invalid time interval", function (done) {
        var error = false;
        try {
            index_1.default("00:10-25:20,wed,1,jan", "2020-01-01 10:15");
        }
        catch (err) {
            error = err.toString() === "Error: Invalid time interval";
        }
        assert.equal(error, true);
        done();
    });
    it("Invalid time interval end", function (done) {
        var error = false;
        try {
            index_1.default("25:20-10:10,wed,1,jan", "2020-01-01 10:15");
        }
        catch (err) {
            error = err.toString() === "Error: Invalid time interval";
        }
        assert.equal(error, true);
        done();
    });
    it("Invalid day", function (done) {
        var error = false;
        try {
            index_1.default("00:10-10:20,www,9,jan", "2020-01-01 10:15");
        }
        catch (err) {
            error = err.toString() === "Error: Invalid days_of_week";
        }
        assert.equal(error, true);
        done();
    });
    it("Invalid day end", function (done) {
        var error = false;
        try {
            index_1.default("00:10-10:20,mon-www,9,jan", "2020-01-01 10:15");
        }
        catch (err) {
            error = err.toString() === "Error: Invalid days_of_week";
        }
        assert.equal(error, true);
        done();
    });
    it("Invalid date", function (done) {
        var error = false;
        try {
            index_1.default("00:10-10:20,wed,32,jan", "2020-01-01 10:15");
        }
        catch (err) {
            error = err.toString() === "Error: Invalid days_of_month";
        }
        assert.equal(error, true);
        done();
    });
    it("Invalid date end", function (done) {
        var error = false;
        try {
            index_1.default("00:10-10:20,wed,1-32,jan", "2020-01-01 10:15");
        }
        catch (err) {
            error = err.toString() === "Error: Invalid days_of_month";
        }
        assert.equal(error, true);
        done();
    });
    it("Invalid month", function (done) {
        var error = false;
        try {
            index_1.default("00:10-10:20,wed,1,www", "2020-01-01 10:15");
        }
        catch (err) {
            error = err.toString() === "Error: Invalid month";
        }
        assert.equal(error, true);
        done();
    });
    it("Invalid month end", function (done) {
        var error = false;
        try {
            index_1.default("00:10-10:20,wed,1,jan-www", "2020-01-01 10:15");
        }
        catch (err) {
            error = err.toString() === "Error: Invalid month";
        }
        assert.equal(error, true);
        done();
    });
    it("Day thu", function (done) {
        assert.equal(index_1.default("08:00-16:00,mon-thu,*,*", "2020-01-01 12:00"), true);
        done();
    });
});
