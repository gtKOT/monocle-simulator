const summary = (results) => {
  const avg = (nums) => (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);

  const avgDamage = avg( results.map(({ totalDamage }) => totalDamage) );
  const avgCriticalCount = avg( results.map(({ criticalCount }) => criticalCount) );
  const avgCriticalUpTurnCount = avg( results.map(({ criticalUpTurnCount }) => criticalUpTurnCount) );
  const resultWhenMaxDamage = results.reduce((a, b) => a.totalDamage >= b.totalDamage ? a : b, { totalDamage: 0 });
  const resultWhenMinDamage = results.reduce((a, b) => a.totalDamage <= b.totalDamage ? a : b, { totalDamage: Number.MAX_SAFE_INTEGER });

  return {
    avgDamage,
    avgCriticalCount,
    avgCriticalUpTurnCount,
    resultWhenMaxDamage,
    resultWhenMinDamage
  };
}

export const report = (title, simulation) => {
  const {
    avgDamage,
    avgCriticalCount,
    avgCriticalUpTurnCount,
    resultWhenMaxDamage,
    resultWhenMinDamage
  } = summary(simulation.results);

  console.log(`----- ${title} -----`);

  console.log(`--- input`);
  console.log(`simulation count: ${simulation.input.simulateCount}`);
  console.log(`battle turns: ${simulation.input.battleTurns}`);
  console.log(`magical might: ${simulation.input.magicalMight}`);
  console.log(`critical rate: ${simulation.input.criticalRate}`);
  console.log(`max of critical up turn: ${simulation.input.maxCriticalUpTurns}`);

  console.log(`--- results`);
  console.log(`avg critical count: ${avgCriticalCount}`);
  console.log(`avg critical up turn count: ${avgCriticalUpTurnCount}`);
  console.log(`∴ avg 野良 critical count: ${(avgCriticalCount - avgCriticalUpTurnCount).toFixed(2)}`);
  console.log(`avg total damage: ${avgDamage}, avg total damage per turn: ${(avgDamage / simulation.input.battleTurns).toFixed(2)}`);
  console.log(`max total damage: ${resultWhenMaxDamage.totalDamage} (critical count: ${resultWhenMaxDamage.criticalCount}, critical up turn count: ${resultWhenMaxDamage.criticalUpTurnCount})`);
  console.log(`min total damage: ${resultWhenMinDamage.totalDamage} (critical count: ${resultWhenMinDamage.criticalCount}, critical up turn count: ${resultWhenMinDamage.criticalUpTurnCount})`);

  console.log(``);
}
