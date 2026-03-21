// let d =[1,2,3,4,5] Square only even no

let d = [1, 2, 3, 4, 5];

let result = d.map(x => x % 2 === 0 ? x * x : x);

console.log(result);