export const calcCriticalRate = (player) => {
  const {
    cleverness,
    skillCriticalRate,
    accessoryCriticalRate,
  } = player;

  // https://yukihyo.xyz/archives/13757
  const clevernessCriticalRate = (1 + Math.max(cleverness - 30, 0) * 0.006) / 100;
  return clevernessCriticalRate + skillCriticalRate + accessoryCriticalRate
};
