export function generateBinarySearchSteps(initialArray, targetValue) {
  const steps = [];
  // Binary search requires sorted array
  const sortedRaw = [...initialArray].sort((a, b) => a - b);
  const target = targetValue !== undefined ? targetValue : sortedRaw[Math.floor(sortedRaw.length / 2)];

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
    `Starting Binary Search for target value: ${target}.`,
    `Binary Search requires a sorted array. We have initialized search range across all ${n} elements.`,
    { target },
    'Ready'
  );

  let left = 0;
  let right = n - 1;
  let foundIndex = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;

    // Mark current search window
    for (let k = 0; k < n; k++) {
      if (k < left || k > right) {
        arr[k].state = 'eliminated';
      } else {
        arr[k].state = 'default';
      }
    }

    arr[mid].state = 'comparing';

    recordStep(
      { pseudocode: 5, python: 5, cpp: 5, java: 5 },
      `Inspecting middle element arr[${mid}] = ${arr[mid].val}. (Search window: [${left}..${right}])`,
      `Formula: mid = floor((${left} + ${right}) / 2) = ${mid}. Comparing ${arr[mid].val} with target ${target}.`,
      { left, mid, right, target },
      'Check Mid'
    );

    if (arr[mid].val === target) {
      foundIndex = mid;
      arr[mid].state = 'sorted'; // success state

      recordStep(
        { pseudocode: 6, python: 6, cpp: 6, java: 6 },
        `Target ${target} found at index ${mid}!`,
        `Comparison arr[${mid}] == ${target} is True. Search terminates successfully in O(log n) time.`,
        { mid, target },
        'Target Found'
      );
      break;
    } else if (arr[mid].val < target) {
      recordStep(
        { pseudocode: 8, python: 8, cpp: 7, java: 7 },
        `arr[${mid}] (${arr[mid].val}) < ${target}: Target is strictly greater.`,
        `Eliminating the entire left half [${left}..${mid}]. Moving left pointer to mid + 1 (${mid + 1}).`,
        { left, mid, right, target },
        'Narrow Window'
      );

      for (let k = left; k <= mid; k++) {
        arr[k].state = 'eliminated';
      }
      left = mid + 1;
    } else {
      recordStep(
        { pseudocode: 10, python: 10, cpp: 8, java: 8 },
        `arr[${mid}] (${arr[mid].val}) > ${target}: Target is strictly smaller.`,
        `Eliminating the entire right half [${mid}..${right}]. Moving right pointer to mid - 1 (${mid - 1}).`,
        { left, mid, right, target },
        'Narrow Window'
      );

      for (let k = mid; k <= right; k++) {
        arr[k].state = 'eliminated';
      }
      right = mid - 1;
    }
  }

  if (foundIndex === -1) {
    for (let k = 0; k < n; k++) arr[k].state = 'eliminated';
    recordStep(
      { pseudocode: 11, python: 11, cpp: 10, java: 10 },
      `Target ${target} does not exist in this array.`,
      `Left pointer (${left}) exceeded right pointer (${right}). Search window is empty.`,
      { left, right, target },
      'Not Found'
    );
  }

  return steps;
}
