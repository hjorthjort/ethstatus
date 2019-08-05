#!/usr/bin/env node

addrs = require("./addresses.json");

rq = require("request");
printf = require("printf");

const API = "http://api.ethplorer.io/";
const KEY = "?apiKey=freekey";


const formatResponse = (err, resp, body) => {
    if (err) {
        return err["message"];
    }
    let res = JSON.parse(body);
    if (res["error"]) {
        return res["error"]["message"];
    }
    let tokensArr = [];
    tokensArr.push({"key": "ETH", "bal": res["ETH"]["balance"]});

    let tokens = res["tokens"];
    if (tokens) {
        for (let i = 0; i < tokens.length; i++) {
            let tok = tokens[i];
            let name = tok["tokenInfo"]["symbol"];
            let bal = tok["balance"];
            tokensArr.push({"key": name, "bal": bal});
        }
    }
    let lhsLen = Math.max(...tokensArr.map(entry => entry["key"].length)) + 2;
    let outputArr = tokensArr.map(entry => printf("\x1b[1m%"+lhsLen+"s: \x1b[0m%s", entry["key"], entry["bal"]));
    return outputArr.join("\n");
};


const printPretty = (addr) => (err, resp, body) => {
    console.log(" \x1b[1m\x1b[4m" + addr); // Make bright.
    console.log("\x1b[0m\n" + formatResponse(err, resp, body) + "\n"); // Reset color.
};


// Main.
addrs = addrs.split(",");
for (let i = 0; i < addrs.length; i++) {
    let addr = addrs[i];
    let request = API + "getAddressInfo/" + addr + KEY;
    rq.get(API + "getAddressInfo/" + addr  + KEY, printPretty(addr));
}
