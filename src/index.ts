#!/usr/bin/env node
import UpdateChecker from "./classes/UpdateChecker";
//import IgnoredFilesCache from "./classes/IgnoredFilesCache";
import Tea from "./classes/Tea";

const checker = new UpdateChecker();
checker.url = "https://raw.githubusercontent.com/lazybytez/tea/develop/package.json";
checker.checkForUpdates();

//new IgnoredFilesCache();
new Tea();

/**
 * TODO:
 *
 * - check for updates
 * - check for file permission. (cache)
 * - get all .dcc.json files
 * - get args
 * - let the user navigate in these files
 * - let the user execute the commands or get help
 *
 * Goal:
 *
 * - Execute 'dcc run:pnpm:bas'
 */
