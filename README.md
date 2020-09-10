# IFTIME

[![Build Status](https://travis-ci.org/rundef/iftime.svg?branch=master)](https://travis-ci.org/rundef/iftime)
[![Node version required](https://img.shields.io/node/v/iftime.svg)](https://www.npmjs.com/package/iftime)
[![Latest Stable Version](https://img.shields.io/npm/v/iftime.svg)](https://www.npmjs.com/package/iftime)

## Installation

```bash
npm install iftime
```

## Description

A lightweight package to imitate Asterisk * IFTIME function

```bash
iftime(<time range>,<days of week>,<days of month>,<months>, date_to_compare);

<time range>= <hour>’:'<minute>’-‘<hour>’:'<minute> | “*”<br>
<days of week> = <dayname> | <dayname>’-‘<dayname> | “*”<br>
<dayname> = “sun” | “mon” | “tue” | “wed” | “thu” | “fri” | “sat” | "*"
<days of month> = <daynum> | <daynum>’-‘<daynum> | “*”
<daynum> = a number, 1 to 31, inclusive
<hour> = a number, 0 to 23, inclusive
<minute> = a number, 0 to 59, inclusive
<months> = <monthname> | <monthname>’-‘<monthname> | “*”
<monthname> = “jan” | “feb” | “mar” | “apr” | “may” | “jun” | “jul” | “aug” | “sep” | “oct” | “nov” | “dec”

daynames and monthnames are not case-sensitive.
date_to_compare defaults to current datetime.
```

### Usage

```js
import iftime from "iftime";

iftime("*,*,*,jan", "2020-01-01"); // TRUE
iftime("*,*,*,jan", "2020-10-09"); // FALSE
iftime("*,*,1,jan", "2020-01-01"); // TRUE
iftime("*,*,8,jan", "2020-01-01"); // FALSE
iftime("*,wed,1,jan", "2020-01-01"); // TRUE
iftime("*,wed,1,jan", "2020-01-01"); // FALSE
iftime("10:10-10:20,wed,1,jan", "2020-01-01 10:15"); // TRUE
iftime("11:10-11:20,wed,1,jan", "2020-01-01 10:15") // FALSE
iftime("10:15,wed,1,jan", "2020-01-01 10:15"); // throws Error: Invalid time interval
iftime("00:10-10:20,wed,1,jan", "dfgfghfgj"); // throws Error: Invalid source date!
iftime("00:10-25:20,wed,1,jan", "2020-01-01 10:15"); // throws Error: Invalid time interval
iftime("25:20-10:10,wed,1,jan", "2020-01-01 10:15"); // throws Error: Invalid time interval
iftime("00:10-10:20,www,9,jan", "2020-01-01 10:15"); // throws Error: Invalid days_of_week
iftime("00:10-10:20,mon-www,9,jan", "2020-01-01 10:15"); // throws Error: Invalid days_of_week
iftime("00:10-10:20,wed,32,jan", "2020-01-01 10:15"); // throws Error: Invalid days_of_month
iftime("00:10-10:20,wed,1-32,jan", "2020-01-01 10:15"); // throws Error: Invalid days_of_month
iftime("00:10-10:20,wed,1,www", "2020-01-01 10:15"); // throws Error: Invalid month
iftime("00:10-10:20,wed,1,jan-www", "2020-01-01 10:15"); // throws Error: Invalid month

```