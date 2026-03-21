// let e = [1,2,3,4,5] /  
// square each element and then filter out even no

let e = [1, 2, 3, 4, 5];

let result = e
    .map(x => x * x)          
    .filter(x => x % 2 === 0); 

console.log(result);