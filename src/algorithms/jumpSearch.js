export function generateJumpSearchSteps(initialArray, targetValue) {
  const steps = [];
  // Jump Search requires sorted array
  const sortedRaw = [...initialArray].map(v => typeof v === 'object' ? v.val : v).sort((a, b) => a - b);
  const target = targetValue !== undefined ? Number(targetValue) : sortedRaw[sortedRaw.length - 2] || sortedRaw[0];

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

  const stepSize = Math.floor(Math.sqrt(n));

  recordStep(
    { pseudocode: 1, python: 1, cpp: 1, java: 1 },
    `Starting Jump Search for target ${target} on sorted array.`,
    `Optimal block jump size m = √${n} = ${stepSize}. Jumping in blocks of ${stepSize}.`,
    { step: stepSize, target },
    'Ready'
  );

  let prev = 0;
  let step = stepSize;

  // Jumping blocks
  while (arr[Math.min(step, n) - 1].val < target) {
    comparisons++;
    const jumpIdx = Math.min(step, n) - 1;
    arr[jumpIdx].state = 'comparing';

    recordStep(
      { pseudocode: 3, python: 3, cpp: 3, java: 3 },
      `Jump to block end [${jumpIdx}] (val: ${arr[jumpIdx].val}): ${arr[jumpIdx].val} < ${target}.`,
      `Target must be in a later block. Jumping forward by ${stepSize}.`,
      { prev, step: jumpIdx, target },
      'Jumping'
    );

    arr[jumpIdx].state = 'eliminated';
    prev = step;
    step += stepSize;

    if (prev >= n) {
      recordStep(
        { pseudocode: 4, python: 4, cpp: 4, java: 4 },
        `Target ${target} not found. Jump boundary exceeded array length.`,
        `Checked all relevant blocks without finding target.`,
        {},
        'Not Found'
      );
      return steps;
    }
  }

  // Linear search phase within block
  recordStep(
    { pseudocode: 5, python: 5, cpp: 5, java: 5 },
    `Target is bounded between index ${prev} and index ${Math.min(step, n) - 1}.`,
    `Now performing backward linear search starting at index ${prev}.`,
    { prev, bound: Math.min(step, n) - 1, target },
    'Linear Scan'
  );

  while (arr[prev].val < target) {
    comparisons++;
    arr[prev].state = 'comparing';

    recordStep(
      { pseudocode: 6, python: 6, cpp: 6, java: 6 },
      `Linear check at index ${prev} (${arr[prev].val}): ${arr[prev].val} < ${target}.`,
      `Advancing index by 1.`,
      { i: prev, target },
      'Scanning'
    );

    arr[prev].state = 'eliminated';
    prev++;

    if (prev === Math.min(step, n)) {
      recordStep(
        { pseudocode: 7, python: 7, cpp: 7, java: 7 },
        `Reached block boundary without finding target ${target}. Target is not in the array.`,
        `Search terminated with 0 matches.`,
        {},
        'Not Found'
      );
      return steps;
    }
  }

  comparisons++;
  if (arr[prev].val === target) {
    arr[prev].state = 'sorted';
    recordStep(
      { pseudocode: 8, python: 8, cpp: 8, java: 8 },
      `SUCCESS! Target ${target} found at index ${prev}!`,
      `Total comparisons: ${comparisons}.`,
      { found: prev, target },
      'Match Found'
    );
  } else {
    arr[prev].state = 'comparing';
    recordStep(
      { pseudocode: 9, python: 9, cpp: 9, java: 9 },
      `Target ${target} not found! Encountered ${arr[prev].val} > ${target}.`,
      `Since array is sorted, target does not exist.`,
      { prev, target },
      'Not Found'
    );
  }

  return steps;
}
