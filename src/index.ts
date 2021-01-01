#!/usr/bin/env node
import Tea from "./class/Tea";
import Teatimer from "./class/Teatimer";
import Teapot from "./class/Teapot";

const cacher = new Teapot();
cacher.writeCache(__dirname + "/../example/brew.tea.yml");

const updater = new Teatimer("https://raw.githubusercontent.com/lazybytez/tea/develop/package.json");
updater.checkForUpdates();

new Tea();
