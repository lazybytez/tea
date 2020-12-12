#!/usr/bin/env node
// import UpdateChecker from "./classes/UpdateChecker";
import Tea from "./classes/Tea";

function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}

const datetime = new Date();
console.log(datetime);

console.log(addDays(datetime, 5));

// if (dateInCache !== currentDate) {
//     const updater = new UpdateChecker();
//     updater.url = "https://raw.githubusercontent.com/lazybytez/tea/develop/package.json";
//     updater.checkForUpdates();
// }

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
 * - Execute 'tea brew:pnpm:bas'
 */
