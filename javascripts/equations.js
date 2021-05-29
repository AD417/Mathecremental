"use strict";
// I intend for there to be 10 levels, ranging from basic arithmetic to mid-level algebra. 
function generateEquation() {
  switch (equ.level) {
  case 1:
  case 2:
  default: 
    equ = {
      level: equ.level || 1,
      a: 1 + Math.floor(9 * Math.random()),
      b: 1 + Math.floor(9 * Math.random()),
    };
    break;
  case 3:
    equ = {
      level: 3,
      a: 1 + Math.floor(99 * Math.random()),
      b: 1 + Math.floor(a * Math.random()),
    };
  }
  writeEquation();
}

function writeEquation() {
  const element = getEl("math-equation");
  switch (equ.level) {
  case 1: 
    element.innerHTML = `${equ.a} + ${equ.b} = ?`;
    break;
  case 2: 
    element.innerHTML = `${equ.a} * ${equ.b} = ?`;
    break;
  case 3:
    element.innerHTML = `${equ.a} - ${equ.b} = ?`;
  }
}

function submitAns() {
  // Aite fuck off Eslint, I dont need to mention its base 10. 
  const answer = parseInt(getEl("math-input").value, 10); 
  if (checkAns(answer)) {
    player.points++;
    generateEquation();
    getEl("math-input").value = "";
  }
}

function checkAns(answer) {
  let correct = false;
  switch (equ.level) {
  case 1:
    correct = (answer === equ.a + equ.b);
    break;
  case 2:
    correct = (answer === equ.a * equ.b);
    break;
  case 3:
    correct = (answer === equ.a - equ.b);
    break;
  default:
    correct = false;
  }
  return correct;
}
