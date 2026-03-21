// ≥ 90 → A
// ≥ 75 → B
// ≥ 50 → C
// else → Fail

let marks = 78;

let grade = marks >= 90 ? 'A' :
            marks >= 75 ? 'B' :
            marks >= 50 ? 'C' : 'Fail';

console.log(grade);