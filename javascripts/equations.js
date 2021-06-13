/* eslint-disable line-comment-position */
/* eslint-disable no-inline-comments */
"use strict";

class Equation {
  // eslint-disable-next-line max-params
  constructor(type, a, b) {
    this.type = type; // 0 = add, 1 = sub, 2 = mult, 3 = div
    this.a = a;
    // The only time the above is undefined on init is if the operation is division. 
    this.b = b;
  }

  get answer() {
    let ans;
    switch (this.type) {
    case 0:
      ans = this.a + this.b;
      break;
    case 1:
      ans = this.a - this.b;
      break;
    case 2:
      ans = this.a * this.b;
      break;
    case 3:
      ans = this.a / this.b;
      break;
    default:
      throw new SyntaxError();
    }
    return ans;
  }

  toString() {
    return `${this.a} ${["+", "-", "*", "/"][this.type]} ${this.b} = ?`;
  }


}

// I intend for there to be 10 levels, ranging from basic arithmetic to mid-level algebra and maybe some calculus
function generateEquation() {
  let type, a, b;
  switch (equ.level) {
  case 1:
  default: 
    // Basic Math operators. 
    equ = {
      problem: new Equation(0, Math.floor(10 * Math.random()), Math.floor(10 * Math.random())),
      level: 1,
    };
    break;
  case 2: 
    type = Math.floor(4 * Math.random());
    if (type === 3) { // Division
      a = Math.floor(1 + 9 * Math.random());
      b = a * Math.floor(10 * Math.random());
      equ.problem = new Equation(type, b, a);
    } else {
      equ.problem = new Equation(type, Math.floor(10 * Math.random()), Math.floor(10 * Math.random()));
    }
    break;
  case 3:
    break; // No idea what to put here yet.
  }
  writeEquation();
}

function writeEquation() {
  const symbol = ["+", "-", "*", "/"][equ.problem.type];
  getEl("math-equation").innerHTML = `${equ.problem.a} ${symbol} ${equ.problem.b} = ?`;
}

function submitAns() {
  // Aite fuck off Eslint, I dont need to mention its base 10. 
  const answer = parseInt(getEl("math-input").value, 10); 
  if (checkAns(answer)) {
    player.quarks += getPointGain();
    player.stats.solved++;
    generateEquation();
    getEl("math-input").value = "";
  }
}

function checkAns(answer) {
  // Ignore the fact that there are going to be a number of levels where this validation may fail.
  return (equ.problem.answer === answer);
}
