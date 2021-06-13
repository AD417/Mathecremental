/* eslint-disable prefer-const */
/* eslint-disable line-comment-position */
/* eslint-disable no-inline-comments */
"use strict";

let player, equ, hovering;
const getEl = x => document.getElementById(x);
const basePlayer = { 
  firstTick: Date.now(),
  lastTick: Date.now(),
  version: 0.001,

  quarks: 0, // You can't stop me Platonic

  quarkboosts: {
    add: 0,
    mult: 1,
    exp: 1,
  },

  equation: {
    level: 1,
  },

  add: {
    points: 0,
    upgs: [false, false, false, 0, 0, 0, 0, 0, 0],
  },

  resets: {
    add: 0,
  },

  stats: {
    solved: 0
  },

  testVar: "Anthios made this you forkin idiots"
};
let prod;

function tab(tabID) {
  let i;
  
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  let tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  getEl(`main-${[null, "math", "add", "mult", "exp", "options", "stats"][tabID]}`).style.display = "block";
}

function load() {
  tab(1);
  const parse = localStorage.getItem("mathSave");
  try {
    player = JSON.parse(atob(parse));
    player = check(player, basePlayer);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    newGame();
  }
  setup(); // Load in everything that is not updated on every tick. 
  // setupTemp();
  setInterval(loop, 50);
  setInterval(save, 10000);
}

function setup() {
  equ = player.equation;
  generateEquation();
  setupHoverDetection();
  if (player.resets.add > 0) getEl("tab-add").style.display = "inline-block";
}

function setupHoverDetection() {
  getEl("boost-add").setAttribute("onmouseover", "isHovering(true)");
  getEl("boost-add").setAttribute("onmouseout", "isHovering(false)");
}

function check(val, base) {
  if (base instanceof Object) {
    if (val === undefined) return base;
    let i;
    for (i in base) {
      val[i] = check(val[i], base[i]);
    }
    return val;
  } 
  if (val === undefined) return base;
  return val;
}

function newGame() {
  basePlayer.lastTick = Date.now();
  basePlayer.firstTick = Date.now();
  player = JSON.parse(JSON.stringify(basePlayer));
  setup();
}

function save() {
  if (canSave()) {
    localStorage.setItem("mathSave", btoa(JSON.stringify(player)));
    // eslint-disable-next-line no-console
    console.log("Game Saved.");
  }
}

function canSave() {
  return true; // Todo... not now, but eh.
}

function reset() {
  if (!confirm("are you suuuuuuuuurrrreeee????")) return;
  newGame();
}

function loop(diff) { // Runs at 20TPS
  if (!diff) {
    // eslint-disable-next-line no-param-reassign
    diff = Date.now() - player.lastTick;
    player.lastTick += diff;
  }

  updatePoints();
  updatePointGain();

  updateAddPoints();
  updateAddBlock();

  updateStatistics();
}

function updatePoints() {
  getEl("main-points").innerHTML = player.quarks;
}
function updatePointGain() {
  getEl("main-points-gain").innerHTML = getPointGain();
}


function updateStatistics() {
  return true;
}

function isHovering(value) {
  hovering = value;
}