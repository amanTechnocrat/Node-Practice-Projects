function splitToChunks(array, parts) {
    let result = [];
    for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i))) 
    }
    return result.filter((val)=>val.length != 0)
}

let arr = [{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"},{"a":"ss"}]

console.log(splitToChunks(arr,20))