// 只从完整内容板块的边界选位置，640px 是正文距离，不包含广告高度。
export function chooseAdPositions(candidates, contentHeight, isHome = false) {
  const minimum = 640;
  const safe = candidates.filter((item) =>
    item.offset >= minimum && contentHeight - item.offset >= minimum
  );

  if (isHome) {
    const selected = [];
    let previous = 0;
    for (const item of safe) {
      if (item.offset - previous >= minimum) {
        selected.push(item);
        previous = item.offset;
      }
    }
    return selected;
  }

  // 短页不插中间广告；中等页取中部，长页优先取约三分之一和三分之二。
  if (contentHeight >= minimum * 3) {
    let pair;
    let bestScore = Infinity;
    for (let i = 0; i < safe.length; i++) {
      for (let j = i + 1; j < safe.length; j++) {
        if (safe[j].offset - safe[i].offset < minimum) continue;
        const score = Math.abs(safe[i].offset - contentHeight / 3)
          + Math.abs(safe[j].offset - contentHeight * 2 / 3);
        if (score < bestScore) {
          bestScore = score;
          pair = [safe[i], safe[j]];
        }
      }
    }
    if (pair) return pair;
  }
  if (contentHeight < minimum * 2 || !safe.length) return [];
  return [safe.reduce((best, item) =>
    Math.abs(item.offset - contentHeight / 2) < Math.abs(best.offset - contentHeight / 2)
      ? item : best
  )];
}
