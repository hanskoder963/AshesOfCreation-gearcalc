const helmetSlot = document.getElementById("helmet");
const chosenGearList = document.querySelector(".chosen-gear-list");

console.log("Helmet slot:", helmetSlot);
console.log("Chosen gear list:", chosenGearList);
const gearData = [
  {
    name: "Rividium Helm",
    type: "helmet",
    icon: "gear/helmet/rividium-helm-icon.webp",
    rarity: "Common",
    stats: {
      armor: { min: 53, max: 56 },
      magicResist: 14,
      constitution: 5,
    },
  },
  {
    rarity: "Uncommon",
    stats: {
      armor: { min: 57, max: 61 },
      magicResist: { min: 15, max: 16 },
      constitution: { min: 5, max: 6 },
      magicalCastingSpeedRating: { min: 1, max: 6 },
    },
  },
  {
    rarity: "Rare",
    stats: {
      armor: { min: 62, max: 68 },
      magicResist: { min: 16, max: 17 },
      constitution: { min: 6, max: 7 },
      magicalCastingSpeedRating: { min: 7, max: 9 },
      magicalCriticalPowerRating: { min: 1, max: 7 },
    },
  },
  {
    rarity: "Heroic",
    stats: {
      armor: { min: 69, max: 78 },
      magicResist: { min: 18, max: 20 },
      constitution: { min: 7, max: 8 },
      magicalCastingSpeedRating: { min: 9, max: 10 },
      magicalCriticalPowerRating: { min: 7, max: 9 },
      maxMana: { min: 4, max: 71 },
    },
  },
  {
    rarity: "Epic",
    stats: {
      armor: { min: 78, max: 87 },
      magicResist: { min: 20, max: 22 },
      constitution: { min: 8, max: 10 },
      magicalCastingSpeedRating: { min: 10, max: 13 },
      magicalCriticalPowerRating: { min: 9, max: 12 },
      maxMana: { min: 74, max: 118 },
    },
  },
  {
    rarity: "Legendary",
    stats: {
      armor: { min: 87, max: 101 },
      magicResist: { min: 22, max: 26 },
    },
    secondaryStat: { type: "Constitution", min: 10, max: 12 },
    tertiaryStat: {
      magicalCastingSpeedRating: { min: 13, max: 17 },
      magicalCriticalPowerRating: { min: 12, max: 16 },
      maxMana: { min: 121, max: 189 },
    },
  },
];

function createGearbox(gear) {
  const box = document.createElement("a");
  box.classList.add("gear-box");
  box.style.cursor = "pointer";

  const icon = document.createElement("img");
  icon.src = gear.icon;
  icon.alt = gear.name;
  icon.style.width = "50px";
  icon.style.height = "50px";

  const name = document.createElement("div");
  name.textContent = gear.name;

  const stats = document.createElement("div");
  stats.innerHTML = `
  <p>Armor: ${gear.stats.armor.min} - ${gear.stats.armor.max}</p>
  <p>Magic Resist: ${gear.stats.magicResist}</p>
  <p>${gear.secondaryStat.type}: ${gear.stats.constitution}</p>
  `;
}
document.querySelectorAll(".slot").forEach((slot) => {
  slot.addEventListener("click", () => {
    console.log(`${slot.id} clicked`);
    // Håndter logikk for hver slot her
  });
});

// helmetSlot.addEventListener('click', () => {
//   console.log('Helmet slot clicked');
//   chosenGearList.innerHTML = ''; // clear previous content

//   const commonGear = gearData[0];
//   const gearListBox = document.createElement('a');

//   gearListBox.classList.add('gear-box');
//   gearListBox.style.cursor = 'pointer';

//   const gearIcon = document.createElement('img');
//   gearIcon.src = commonGear.icon;
//   gearIcon.alt = commonGear.name;
//   gearIcon.style.width = '50px';
//   gearIcon.style.height = '50px';

//   const gearName = document.createElement('div');
//   gearName.textContent = `${commonGear.name}`;

//   const gearStats = document.createElement('div');
//   gearStats.innerHTML = `
//     <p>Armor: ${commonGear.stats.armor.min} - ${commonGear.stats.armor.max}</p>
//     <p>Magic Resist: ${commonGear.stats.magicResist}</p>
//     <p>Constitution: ${commonGear.stats.constitution}</p>
//   `; // endre rettning på gear text setup

//   gearListBox.appendChild(gearIcon);
//   gearListBox.appendChild(gearName);
//   gearListBox.appendChild(gearStats);

//   gearListBox.addEventListener('click', () => {
//     showRaritySelection(gearData);
//   });

//   chosenGearList.appendChild(gearListBox);
// });

function showRaritySelection(gearData) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
    <h2>Select Rarity for ${gearData[0].name}</h2>
    <ul class="rarity-list">
      ${gearData
        .map(
          (gear, index) =>
            `<li class="rarity-option" data-rarity="${gear.rarity}" data-index="${index}">
              ${gear.rarity}
            </li>`
        )
        .join("")}
    </ul>
    <button class="close-popup">Close</button>
  `;

  popup.querySelector(".close-popup").addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  popup.querySelectorAll(".rarity-option").forEach((option) => {
    option.addEventListener("click", (e) => {
      const selectedRarity = e.target.getAttribute("data-rarity");
      const index = e.target.getAttribute("data-index");
      const selectedGear = gearData[index];

      const gearLink = document.createElement("a");
      gearLink.href = `/db/item/${selectedGear.name.replace(
        /\s+/g,
        "_"
      )}?rarity=${index}`;
      gearLink.textContent = `${selectedGear.name} with ${selectedRarity} rarity`;
      gearLink.className = "text-brand underline";

      console.log(`Generated link: ${gearLink.href}`);
      document.body.removeChild(overlay);
    });
  });

  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}
