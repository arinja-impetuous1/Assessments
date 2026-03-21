// let d=[1,2,3,4,5]
// filter no div by both 3 and 5

let d = [1, 2, 3, 4, 5];

let result = d.filter(x => x % 3 === 0 && x % 5 === 0);

console.log(result);