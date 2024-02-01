const { workerData,parentPort } = require('worker_threads');

let counter = 0
for (let index = 0; index < 20000000000/workerData.thread_count; index++) {
  counter++
}

parentPort.postMessage(counter)