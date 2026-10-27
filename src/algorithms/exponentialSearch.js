import { generateBinarySearchSteps } from './binarySearch';

export function generateExponentialSearchSteps(initialArray, targetValue) {
  const steps = [];
  const sortedRaw = [...initialArray].map(v => typeof v === 'object' ? v.val : v).sort((a, b) => a - b);
  const target = targetValue !== undefined ? Number(targetValue) : sortedRaw[sortedRaw.length - 1] || sortedRaw[0];

  const arr = sortedRaw.map((val, index) => ({
    id: `item-${index}-${val}`,
    val,
    state: 'default'
  }));

  const n = arr.length;
  let comparisons = 0;
  let operations = 0;

  function recordStep(activeLines, explanation, subExplanation, pointers = {}, badge = 'Searching') {
    operations++;
    steps.push({
      array: arr.map(item => ({ ...item })),
      activeLines,
      explanation,
      subExplanation,
      metrics: { comparisons, swaps: 0, operations },
      pointers,
      badge
    });
  }

  recordStep(
    { pseudocode: 1, python: 1, cpp: 1, java: 1 },
    `Starting Exponential Search for target ${target} on sorted array.`,
    `Step 1: Check if element at index 0 matches target.`,
    { i: 0, target },
    'Ready'
  );

  comparisons++;
  if (arr[0].val === target) {
    arr[0].state = 'sorted';
    recordStep(
      { pseudocode: 2, python: 2, cpp: 2, java: 2 },
      `Target ${target} found immediately at index 0!`,
      `Finished with 1 comparison.`,
      { found: 0, target },
      'Match Found'
    );
    return steps;
  }

  arr[0].state = 'eliminated';
  let i = 1;

  // Exponential jumping: 1, 2, 4, 8, 16...
  while (i < n && arr[i].val <= target) {
    comparisons++;
    arr[i].state = 'comparing';

    recordStep(
      { pseudocode: 3, python: 3, cpp: 3, java: 3 },
      `Exponential jump to index ${i} (${arr[i].val}): ${arr[i].val} <= ${target}.`,
      `Doubling boundary step from index ${i} to ${i * 2}.`,
      { i, target },
      'Exponential Doubling'
    );

    arr[i].state = 'eliminated';
    i *= 2;
  }

  const left = Math.floor(i / 2);
  const right = Math.min(i, n - 1);

  recordStep(
    { pseudocode: 4, python: 4, cpp: 4, java: 4 },
    `Bounded target between index ${left} and index ${right}.`,
    `Now executing Binary Search over bounded range [${left}...${right}].`,
    { left, right, target },
    'Binary Search Range'
  );

  // Binary search over bounded range [left, right]
  let l = left;
  let r = right;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    comparisons++;
    arr[mid].state = 'comparing';

    recordStep(
      { pseudocode: 5, python: 5, cpp: 5, java: 5 },
      `Binary Search in range: Checking mid index ${mid} (${arr[mid].val}).`,
      `Target = ${target}. Range bounds: [${l}...${r}].`,
      { left: l, mid, right: r, target },
      'Binary Check'
    );

    if (arr[mid].val === target) {
      arr[mid].state = 'sorted';
      recordStep(
        { pseudocode: 6, python: 6, cpp: 6, java: 6 },
        `SUCCESS! Target ${target} found at index ${mid}!`,
        `Exponential search completed successfully with ${comparisons} comparisons.`,
        { found: mid, target },
        'Match Found'
      );
      return steps;
    }

    if (arr[mid].val < target) {
      arr[mid].state = 'eliminated';
      l = mid + 1;
    } else {
      arr[mid].state = 'eliminated';
      r = mid - 1;
    }
  }

  recordStep(
    { pseudocode: 7, python: 7, cpp: 7, java: 7 },
    `Target ${target} not found in array!`,
    `Search range exhausted without matches.`,
    {},
    'Not Found'
  );

  return steps;
}
