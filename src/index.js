import { calcCriticalRate } from './critical-rate.js';
import { simulate } from './simulator.js';
import { report } from './reporter.js';

const magicalMight = 1093;
const cleverness = 435;

const fanSkillCriticalRate = 0.015;
const sageSkillCriticalRate = 0.008;
const gananCriticalRate = 0.01 // ガナン帝国の勲章（会心伝承なし）
const monocleCriticalRate = 0.11;

const baseCriticalRate = calcCriticalRate({
  cleverness,
  skillCriticalRate: fanSkillCriticalRate + sageSkillCriticalRate,
  accessoryCriticalRate: gananCriticalRate
});
const withMonocleCriticalRate = calcCriticalRate({
  cleverness,
  skillCriticalRate: fanSkillCriticalRate + sageSkillCriticalRate,
  accessoryCriticalRate: gananCriticalRate + monocleCriticalRate
});

const simulateCount = 1000;
const battleTurns = 110;
const maxCriticalUpTurns = 1;

const baseSimulation = simulate(simulateCount, battleTurns, magicalMight, baseCriticalRate, maxCriticalUpTurns);
const monocleSimulation = simulate(simulateCount, battleTurns, magicalMight, withMonocleCriticalRate, maxCriticalUpTurns);

report('base', baseSimulation, battleTurns);
report('monocle', monocleSimulation, battleTurns);
