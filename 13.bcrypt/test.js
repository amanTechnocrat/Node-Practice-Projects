// const tt = (s) => {
//     let ee = []
//     let str = ""
//     for (let i = 0; i < s.length; i++) {
//         if (i == 0) {
//             ee.push(s[i])
//         }
//         else if (s[i] == ee[ee.length - 1]) {
//             ee.push(s[i])
//         }
//         else {
//             console.log("dd", i);
//             str = `${str}${ee.length}${ee[ee.length - 1]}`
//             console.log(ee[ee.length - 1])
//             console.log("l", ee.length);;
//             ee = []
//             ee.push(s[i])
//         }
//     }
//     str = `${str}${ee.length}${ee[ee.length - 1]}`
//     return str
// }

// console.log(tt("10"));

// var employee = {
//     name : "Aditya Chaturvedi",
//     "fun":((a)=>{
//         console.log(a);
//     })
//     };
//     // console.log(employee.name)
//     // employee.name = "Rahul Khanna";
//     // console.log(e); // Rahul Khanna
//     employee.fun(3)

let aa = [4,6,0,4]
 let b = aa.reduce((p,c)=>{
     console.log("p",p);
     console.log(c);
})