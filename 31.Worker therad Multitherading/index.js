const express = require('express');
const { Worker } = require('worker_threads')
const THREAD_COUNT = 4

const app = express()

function CrWTh() {
    return new Promise((resolve, reject) => {
        const aworker = new Worker('./WithuseCores.js', {
            workerData: { thread_count: THREAD_COUNT }
        })
        aworker.on('message', (data) => {
            resolve(data)
        })
        aworker.on('error', (err) => {
            reject(`An error occured ${err}`)
        })
    })
}

app.get("/nonblocking", (req, res) => {
    res.send("hi")
})

app.get("/blocking", async (req, res) => {

    //Advance
    // const workerPromise = []
    // for (let index = 0; index < THREAD_COUNT; index++) {
    //     workerPromise.push(CrWTh())
    // }
    // const th_result = await Promise.all(workerPromise)
    // const total = th_result.reduce((partialSum, a) => partialSum + a, 0)
    // res.send(`Total is ${total}`)

    
    //iNTERMEDIATE
    // const aworker = new Worker('./worker.js')
    // aworker.on('message', (data) => {
    //     res.send(`Total is ${data}`)
    // })
    // aworker.on('error', (err) => {
    //     res.send(`Error ${err}`)
    // })

    //NORMAL
    let counter = 0
    for (let index = 0; index < 20000000000; index++) {
        counter++
    }
    res.send(`Total is ${counter}`)
})

app.listen(9999)