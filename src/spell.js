// ダメージ振れは省略

export const dormoor = (magicalMight) => {
  // https://yukihyo.xyz/archives/33326
  if (magicalMight <= 999) {
    return (magicalMight - 340) * (259 / 659) + 162;
  } else {
    return (magicalMight - 999) * (125 / 500) + 421;
  }
};

export const dolmadon = (magicalMight) => {
  // https://yukihyo.xyz/archives/33421
  if (magicalMight <= 999) {
    return (magicalMight - 483) * (492 / 516) + 360;
  } else {
    return (magicalMight - 999) * (167 / 501) + 852;
  }
};
