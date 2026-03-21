// let b=[1,2,3,2,3,4,5,6,5,4]
// filter out duplicate

let b = [1, 2, 3, 2, 3, 4, 5, 6, 5, 4];

let result = [...new Set(b)];

console.log(result);