const inventoryEl = document.getElementById('inventory');
const productionEl = document.getElementById('production');
const statsEl = document.getElementById('stats');
const craftBtn = document.getElementById('craft-btn');
const resetBtn = document.getElementById('reset-btn');

const baseInventory = [
  { name: 'Iron Ore', qty: 12, desc: '가볍게 정제된 금속 원석' },
  { name: 'Oak Log', qty: 8, desc: '탄성 좋은 목재' },
  { name: 'Mana Crystal', qty: 4, desc: '마력을 머금은 결정체' },
  { name: 'Leather Strip', qty: 10, desc: '제작용 보강재' }
];

const baseStats = [
  { name: 'Craft Efficiency', value: 72 },
  { name: 'Critical Success', value: 14 },
  { name: 'Resource Bonus', value: 18 }
];

let inventory = [...baseInventory];
let stats = [...baseStats];
let crafted = false;

function renderInventory() {
  inventoryEl.innerHTML = inventory
    .map(
      (item) => `
      <div class="card">
        <strong>${item.name}</strong>
        <small>보유량: ${item.qty}</small>
        <p class="card-desc">${item.desc}</p>
      </div>
    `
    )
    .join('');
}

function renderProduction() {
  const slots = productionEl.querySelectorAll('.slot');
  slots.forEach((slot) => (slot.innerHTML = ''));

  if (crafted) {
    const [slotA, slotB, slotC, result] = slots;
    slotA.innerHTML = `<div class="item-name">Iron Ingot</div><p class="item-desc">Ore ×3</p>`;
    slotB.innerHTML = `<div class="item-name">Oak Plank</div><p class="item-desc">Log ×2</p>`;
    slotC.innerHTML = `<div class="item-name">Mana Thread</div><p class="item-desc">Crystal ×1 + Leather</p>`;
    result.innerHTML = `<div class="item-name">Arcane Bow</div><p class="item-desc">정밀 제작 성공! 추가 옵션 부여</p>`;
  }
}

function renderStats() {
  statsEl.innerHTML = stats
    .map(
      (stat) => `
        <div class="stat-row">
          <span class="name">${stat.name}</span>
          <span class="value">${stat.value}%</span>
        </div>
      `
    )
    .join('');
}

function craftOnce() {
  if (crafted) return;

  crafted = true;
  inventory = inventory.map((item) => {
    if (item.name === 'Iron Ore') return { ...item, qty: item.qty - 3 };
    if (item.name === 'Oak Log') return { ...item, qty: item.qty - 2 };
    if (item.name === 'Mana Crystal') return { ...item, qty: item.qty - 1 };
    if (item.name === 'Leather Strip') return { ...item, qty: item.qty - 1 };
    return item;
  });

  stats = stats.map((stat) => {
    if (stat.name === 'Craft Efficiency') return { ...stat, value: stat.value + 5 };
    if (stat.name === 'Critical Success') return { ...stat, value: stat.value + 3 };
    if (stat.name === 'Resource Bonus') return { ...stat, value: stat.value + 2 };
    return stat;
  });

  renderInventory();
  renderProduction();
  renderStats();
}

function resetState() {
  crafted = false;
  inventory = [...baseInventory];
  stats = [...baseStats];
  renderInventory();
  renderProduction();
  renderStats();
}

craftBtn.addEventListener('click', craftOnce);
resetBtn.addEventListener('click', resetState);

renderInventory();
renderProduction();
renderStats();
