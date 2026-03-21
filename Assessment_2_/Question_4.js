// let b =['abcd','xyz','mnop']  convert 1st char to uppercase Abcd

let b = ['abcd', 'xyz', 'mnop'];

let result = b.map(x => x.charAt(0).toUpperCase() + x.slice(1));

console.log(result);
