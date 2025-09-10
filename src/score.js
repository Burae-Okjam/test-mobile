export function score(answers) {
  let eRaw = 0,
    tRaw = 0,
    eCount = 0,
    tCount = 0;

  answers.forEach(({ key, score, reverse }) => {
    const val = reverse ? 6 - score : score;
    if (key === 'E') {
      eRaw += val;
      eCount += 1;
    } else if (key === 'T') {
      tRaw += val;
      tCount += 1;
    }
  });

  const norm = (raw, count) => {
    if (count === 0) return 0;
    const min = count * 1;
    const max = count * 5;
    return Math.round(((raw - min) / (max - min)) * 100);
  };

  const E = norm(eRaw, eCount);
  const T = norm(tRaw, tCount);
  const diff = E - T;
  let type;
  if (Math.abs(diff) < 10) type = 'MIX';
  else if (diff >= 10) type = 'E-DOM';
  else type = 'T-DOM';
  return { E, T, type };
}
