#!/usr/bin/env node
import Tea from "./class/Tea";
import UpdateChecker from "./class/UpdateChecker";

const updater = new UpdateChecker("https://raw.githubusercontent.com/lazybytez/tea/develop/package.json");
updater.checkForUpdates();

new Tea();
