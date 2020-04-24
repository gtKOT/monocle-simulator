import {dormoor} from "./spell.js";

class BattleCondition {
  constructor(maxCriticalUpTurns) {
    this.maxCriticalUpTurns = maxCriticalUpTurns;
    this.remainingCriticalUpTurns = 0;
  }

  update() {
    if (this.remainingCriticalUpTurns === 0) {
      if (Math.random() <= 0.25) { // 攻撃時25%で暴走アップ
        this.remainingCriticalUpTurns = this.maxCriticalUpTurns;
      }
    } else {
      this.remainingCriticalUpTurns -= 1;
    }
  }
}

const calcDamage = (spell, magicalMight, isCritical) => {
  const awakeningRate = 1; // 魔力かくせい
  const skillRate = 0.05 // 賢者扇 装備時ドルマ系呪文+5%
  const beltRate = 0.13; // 闇13%
  const jewelRate = 0.055; // ドルマ系呪文の極意 Lv6
  const criticalDamageRate = isCritical ? 1.6 : 1; // 本当は1.4-1.8倍
  const damage = spell(magicalMight) * (1 + awakeningRate) * (1 + skillRate + beltRate + jewelRate) * criticalDamageRate;
  return Math.floor(damage);
};

const simulateBattle = (battleTurns, magicalMight, criticalRate, maxCriticalUpTurns) => {
  const condition = new BattleCondition(maxCriticalUpTurns);

  const turnResults = [...Array(battleTurns)].map(() => {
    const isCriticalUpTurn = condition.remainingCriticalUpTurns >= 1;
    const isCritical = isCriticalUpTurn ? true : (Math.random() <= (criticalRate / 2));
    const damage = calcDamage(dormoor, magicalMight, isCritical);

    condition.update();

    return {
      damage,
      isCritical,
      isCriticalUpTurn
    };
  });

  return {
    totalDamage: turnResults.map(({ damage }) => damage).reduce((a, b) => a + b, 0),
    criticalCount: turnResults.filter(({ isCritical }) => isCritical).length,
    criticalUpTurnCount: turnResults.filter(({ isCriticalUpTurn }) => isCriticalUpTurn).length,
  };
};

export const simulate = (simulateCount, battleTurns, magicalMight, criticalRate, maxCriticalUpTurns) => ({
  input: {
    simulateCount,
    battleTurns,
    magicalMight,
    criticalRate,
    maxCriticalUpTurns
  },
  results: [...Array(simulateCount)].map(() => simulateBattle(battleTurns, magicalMight, criticalRate, maxCriticalUpTurns))
});
