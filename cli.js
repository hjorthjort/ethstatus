#!/usr/bin/env node

rq = require("request");
fs = require("fs");

const API = "http://api.ethplorer.io/";
const KEY = "?apiKey=freekey";



const printResponse = (err, resp, body) => {
    let res = JSON.parse(body);
    let outputArr = [];
    outputArr.push("ETH: " + res["ETH"]["balance"]);

    let tokens = res["tokens"];
    if (tokens) {
        for (let i = 0; i < tokens.length; i++) {
            let tok = tokens[i];
            let name = tok["tokenInfo"]["name"];
            let bal = tok["balance"];
            outputArr.push(name + ": " + bal);
        }
    }
    console.log(outputArr.join("\n"));
};


// Main.

fs.readFile("address.txt", (err, addr) => {
    addr = "" + addr;
    addr = addr.trim();
    let request = API + "getAddressInfo/" + addr + KEY;
    rq.get(API + "getAddressInfo/" + addr  + KEY, printResponse);
});
