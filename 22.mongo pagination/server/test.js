let a =[75,85,69]

let b = a.toString().split(',')

let r =b.map((b)=>{
    return parseInt(b[1])
})
console.log(r);