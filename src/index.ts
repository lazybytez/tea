#!/usr/bin/env node
import Tea from "./class/Tea";
import Teatimer from "./class/Teatimer";

const updater = new Teatimer("https://raw.githubusercontent.com/lazybytez/tea/develop/package.json");
updater.checkForUpdates();

new Tea();
