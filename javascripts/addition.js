"use strict";

function updateAddPoints() {
  const gain = getAddGain(), el = getEl("prestige-add");
  if (gain >= 1 || player.resets.add !== 0) {
    el.style.visibility = "visible";
    el.innerText = `Prestige for ${gain} addition points`;
  } else {
    el.style.visibility = "hidden";
    el.innerText = `Prestige for 0 addition points`;
  }
  getEl("add-points").innerText = player.add.points;
}

function getAddGain() {
  return Math.floor(Math.pow(player.quarks / 10, 1 / 2));
}

function resetAdd() {
  const gain = getAddGain();
  if (gain === 0) return;
  player.quarks = 0;
  player.add.points += gain;
  player.resets.add++;
  if (player.resets.add === 1) {
    getEl("tab-add").style.display = "inline-block";
    tab(2);
    save(); 
    // Not really needed, but eh. 
  }

}
// ------------------------------------------

function buyAdd() {
  // Eventually, there may be a parameter to buy a custom amount. I doubt it. 
  // Just slap a "buy max" right below this for automation.
  const cost = getAddCost();
  if (player.add.points < cost) return;

  player.add.points -= cost;
  player.quarkboosts.add += 1;
  // Either this value's change or the way it's effect is interpolated from this value will need tweaks.
}

function getAddCost() {
  return Math.ceil(Math.pow(1.5, player.quarkboosts.add));
}

function getAddEffect() {
  return player.quarkboosts.add;
  // TODO: change this value based on upgrades and the mult stuff. 
}

function updateAddBlock() {
  // Hurr hurr
  getEl("boost-add-amount").innerHTML = `+${getAddEffect()}`;
  getEl("boost-add-cost").innerHTML = `Cost: ${getAddCost()} AP`;
  getEl("boost-add-next").innerHTML = `Next: +${getAddEffect() + 1}`;
  // If (hovering) getEl("boost-add-next").innerHTML = `Next: +${getAddEffect()}`;
  // else getEl("boost-add-next").innerHTML = "";
}