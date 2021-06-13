/* eslint-disable line-comment-position */
/* eslint-disable no-inline-comments */
"use strict";

class Upgrade {
  // eslint-disable-next-line max-params
  constructor(name, desc, effect, cost, ID) {
    this.id = ID;
    this.name = name;
    this.desc = desc;
    this.effect = effect;
    this.cost = cost;
    this.enabled = true; // Keeping this for later
  }
  
  get bought() {
    return player.upgs[ID];
  }
  
  set bought(x) {
    player.upgs[ID] = x;
  }
  
  canAfford() {
    return (player.dual.gte(this.cost));
  }
  
  buy() {
    if (!this.canAfford() || this.bought) return false;
    player.dual.minus(this.cost);
    this.bought = true;
    return true;
  }
}
  
class Repeatable extends Upgrade { 
  // eslint-disable-next-line max-params
  constructor(name, desc, effect, cost, ID, maxLvl) {
    super(name, desc, effect, cost, ID);
    this.max = maxLvl;
  }
  //
  // get cost() {
  //   return 21;
  // }
  
  maxxed() {
    return (this.bought >= this.max);
  }
  
  buy() {
    if (!this.canAfford() || this.maxxed()) return false;
    player.dual.minus(this.cost);
    this.bought++;
    return true;
  }
}

function getPointGain() {
  let gain = 1;
  gain += player.quarkboosts.add;
  gain *= player.quarkboosts.mult;
  gain = Math.pow(gain, player.quarkboosts.exp);
  return gain;
}
