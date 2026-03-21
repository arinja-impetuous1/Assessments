// Given: a = 78, b = 28, c = 100   Find the largest number

let a = 78, b = 28, c = 100;

let largest = (a > b && a > c) ? a :
              (b > c) ? b : c;

console.log(largest);