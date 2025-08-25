let player = {
  name: "",
  avatar: "assets/avatar1.png",
  wins: 0,
  losses: 0,
  hp: 100
};

let enemy = {};
const enemies = [
  { name: "Паук", hp: 100, avatar: "assets/spider.png" },
  { name: "Тролль", hp: 120, avatar: "assets/troll.png" }
];

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function registerPlayer() {
  let name = document.getElementById("playerNameInput").value;
  if (!name) return alert("Введите имя");
  player.name = name;
  document.getElementById("playerNameDisplay").textContent = name;
  document.getElementById("charName").textContent = name;
  showPage("home");
}

function updateName() {
  let newName = document.getElementById("newName").value;
  if (!newName) return;
  player.name = newName;
  document.getElementById("playerNameDisplay").textContent = newName;
  document.getElementById("charName").textContent = newName;
}

function changeAvatar() {
  player.avatar = player.avatar.includes("1") ? "assets/avatar2.png" : "assets/avatar1.png";
  document.getElementById("avatar").src = player.avatar;
}

function startFight() {
  enemy = { ...enemies[Math.floor(Math.random() * enemies.length)] };
  player.hp = 100;
  enemy.hp = enemy.name === "Тролль" ? 120 : 100;

  // имена
  document.getElementById("playerTitle").textContent = player.name;
  document.getElementById("enemyTitle").textContent = enemy.name;

  // аватарки
  document.getElementById("playerFightAvatar").src = player.avatar;
  document.getElementById("enemyFightAvatar").src = enemy.avatar;

  // HP
  document.getElementById("playerHP").textContent = player.hp;
  document.getElementById("enemyHP").textContent = enemy.hp;

  // очистка лога
  document.getElementById("battleLog").innerHTML = "";

  showPage("fight");
}

function makeMove() {
  let attack = document.querySelector("input[name='attack']:checked");
  let defends = [...document.querySelectorAll("input[name='defend']:checked")];
  if (!attack || defends.length !== 2) return alert("Выберите 1 атаку и 2 защиты");

  let attackZone = attack.value;
  let zones = ["Голова", "Тело", "Ноги"];
  let enemyAttack = zones[Math.floor(Math.random() * zones.length)];
  let enemyDefend = zones[Math.floor(Math.random() * zones.length)];

  let playerDamage = (enemyDefend === attackZone) ? 0 : 20;
  let enemyDamage = defends.includes(enemyAttack) ? 0 : 10;

  enemy.hp -= playerDamage;
  player.hp -= enemyDamage;

  log(player.name + " атакует " + attackZone + " → " + playerDamage + " урона");
  log(enemy.name + " атакует " + enemyAttack + " → " + enemyDamage + " урона");

  document.getElementById("playerHP").textContent = Math.max(player.hp, 0);
  document.getElementById("enemyHP").textContent = Math.max(enemy.hp, 0);

  if (enemy.hp <= 0) {
    log("Победа!");
    player.wins++;
    document.getElementById("wins").textContent = player.wins;
  } else if (player.hp <= 0) {
    log("Поражение...");
    player.losses++;
    document.getElementById("losses").textContent = player.losses;
  }
}

function log(text) {
  let logBox = document.getElementById("battleLog");
  let p = document.createElement("p");
  p.textContent = text;
  logBox.appendChild(p);
  logBox.scrollTop = logBox.scrollHeight;
}

function endFight() {
  showPage("home");
}
