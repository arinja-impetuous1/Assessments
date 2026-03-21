// 35 → Hot

// < 20 → Cold
// else → Moderate

let temp = 30;

let weather = temp > 35 ? 'Hot' :
              temp < 20 ? 'Cold' : 'Moderate';

console.log(weather);