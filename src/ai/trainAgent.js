"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RLAgent_1 = require("./RLAgent");
var os_1 = require("os");
var path_1 = require("path");
var rlAgent = new RLAgent_1.default();
rlAgent.train(10000);
var filePath = path_1.default.join((0, os_1.homedir)(), "Developer/web/personal-project/tictactoe-ml/src/models/qtable.json");
//rlAgent.saveQTable("~/Developer/web/personal-project/tictactoe-ml/src/models")
rlAgent.saveQTable(filePath);
