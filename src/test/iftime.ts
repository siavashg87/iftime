import * as assert from "assert";
import iftime from "../index";

describe("iftime", () => {
  it("Exact month - true", (done) => {
    assert.equal(iftime("*,*,*,jan", "2020-01-01"), true);
    done();
  });
  it("Exact month - false", (done) => {
    assert.equal(iftime("*,*,*,jan", "2020-10-09"), false);
    done();
  });
  it("Exact date - true", (done) => {
    assert.equal(iftime("*,*,1,jan", "2020-01-01"), true);
    done();
  });
  it("Exact date - false", (done) => {
    assert.equal(iftime("*,*,8,jan", "2020-01-01"), false);
    done();
  });
  it("Exact day - true", (done) => {
    assert.equal(iftime("*,wed,1,jan", "2020-01-01"), true);
    done();
  });
  it("Exact day - false", (done) => {
    assert.equal(iftime("*,wed,1,jan", "2020-01-01"), true);
    done();
  });
  it("Exact time - true", (done) => {
    assert.equal(iftime("10:10-10:20,wed,1,jan", "2020-01-01 10:15"), true);
    done();
  });
  it("Exact time - false", (done) => {
    assert.equal(iftime("11:10-11:20,wed,1,jan", "2020-01-01 10:15"), false);
    done();
  });
  it("Single time", (done) => {
    let error: boolean = false;
    try {
      iftime("10:15,wed,1,jan", "2020-01-01 10:15");
    } catch (err) {
      error = err.toString() === "Error: Invalid time interval";
    }
    assert.equal(error, true);
    done();
  });
  it("Invalid date", (done) => {
    let error: boolean = false;
    try {
      iftime("00:10-10:20,wed,1,jan", "dfgfghfgj");
    } catch (err) {
      error = err.toString() === "Error: Invalid source date";
    }
    assert.equal(error, true);
    done();
  });
  it("Invalid time interval", (done) => {
    let error: boolean = false;
    try {
      iftime("00:10-25:20,wed,1,jan", "2020-01-01 10:15");
    } catch (err) {
      error = err.toString() === "Error: Invalid time interval";
    }
    assert.equal(error, true);
    done();
  });
  it("Invalid time interval end", (done) => {
    let error: boolean = false;
    try {
      iftime("25:20-10:10,wed,1,jan", "2020-01-01 10:15");
    } catch (err) {
      error = err.toString() === "Error: Invalid time interval";
    }
    assert.equal(error, true);
    done();
  });
  it("Invalid day", (done) => {
    let error: boolean = false;
    try {
      iftime("00:10-10:20,www,9,jan", "2020-01-01 10:15");
    } catch (err) {
      error = err.toString() === "Error: Invalid days_of_week";
    }
    assert.equal(error, true);
    done();
  });
  it("Invalid day end", (done) => {
    let error: boolean = false;
    try {
      iftime("00:10-10:20,mon-www,9,jan", "2020-01-01 10:15");
    } catch (err) {
      error = err.toString() === "Error: Invalid days_of_week";
    }
    assert.equal(error, true);
    done();
  });
  it("Invalid date", (done) => {
    let error: boolean = false;
    try {
      iftime("00:10-10:20,wed,32,jan", "2020-01-01 10:15");
    } catch (err) {
      error = err.toString() === "Error: Invalid days_of_month";
    }
    assert.equal(error, true);
    done();
  });
  it("Invalid date end", (done) => {
    let error: boolean = false;
    try {
      iftime("00:10-10:20,wed,1-32,jan", "2020-01-01 10:15");
    } catch (err) {
      error = err.toString() === "Error: Invalid days_of_month";
    }
    assert.equal(error, true);
    done();
  });
  it("Invalid month", (done) => {
    let error: boolean = false;
    try {
      iftime("00:10-10:20,wed,1,www", "2020-01-01 10:15");
    } catch (err) {
      error = err.toString() === "Error: Invalid month";
    }
    assert.equal(error, true);
    done();
  });
  it("Invalid month end", (done) => {
    let error: boolean = false;
    try {
      iftime("00:10-10:20,wed,1,jan-www", "2020-01-01 10:15");
    } catch (err) {
      error = err.toString() === "Error: Invalid month";
    }
    assert.equal(error, true);
    done();
  });

  it("Day thu", (done) => {
    assert.equal(iftime("08:00-16:00,mon-thu,*,*", "2020-01-01 12:00"), true);
    done();
  });
});
