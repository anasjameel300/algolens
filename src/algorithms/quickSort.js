export function generateQuickSortSteps(initialArray) {
  const steps = [];
  const arr = initialArray.map((item, index) => ({
    id: item.id || `bar-${index}-${item.val}`,
    val: item.val !== undefined ? item.val : item,
    state: 'default'
  }));

  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  let operations = 0;

  function recordStep(activeLines, explanation, subExplanation, pointers = {}, badge = 'Inspecting') {
    operations++;
    steps.push({
      array: arr.map(item => ({ ...item })),
      activeLines,
      explanation,
      subExplanation,
      metrics: { comparisons, swaps, operations },
      pointers,
      badge
    });
  }

  recordStep(
    { pseudocode: 1, python: 1, cpp: 13, java: 13 },
    'Starting Quick Sort on array of ' + n + ' elements.',
    'Quick Sort picks a pivot element, partitions the array around it, and then recursively sorts the sub-arrays.',
    {},
    'Ready'
  );

  function partition(low, high) {
    const pivotVal = arr[high].val;
    arr[high].state = 'pivot';

    recordStep(
      { pseudocode: 8, python: 8, cpp: 2, java: 2 },
      `Selected pivot = ${pivotVal} at index ${high} (end of partition [${low}..${high}]).`,
      `We will rearrange elements so that everything < ${pivotVal} goes to the left, and everything >= ${pivotVal} goes to the right.`,
      { low, high, pivot: high },
      'Pivot Selected'
    );

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      arr[j].state = 'comparing';

      const isLess = arr[j].val < pivotVal;

      recordStep(
        { pseudocode: 11, python: 11, cpp: 5, java: 5 },
        `Comparing arr[${j}] (${arr[j].val}) with pivot (${pivotVal}).`,
        isLess
          ? `${arr[j].val} < ${pivotVal}: Condition met! Increment boundary pointer i to ${i + 1} and swap with index ${j}.`
          : `${arr[j].val} >= ${pivotVal}: Element is greater or equal to pivot, stays on the right partition.`,
        { low, high, pivot: high, i: i >= low ? i : undefined, j },
        isLess ? 'Less Than Pivot' : 'Greater/Equal'
      );

      if (isLess) {
        i++;
        if (i !== j) {
          swaps++;
          arr[i].state = 'swapping';
          arr[j].state = 'swapping';

          const valI = arr[i].val;
          const valJ = arr[j].val;

          recordStep(
            { pseudocode: 13, python: 13, cpp: 7, java: 7 },
            `Swapping index ${i} (${valI}) and index ${j} (${valJ}).`,
            `Moving smaller element (${valJ}) into the left partition.`,
            { i, j, pivot: high },
            'Swapping'
          );

          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }

        arr[i].state = 'default';
      }

      arr[j].state = 'default';
    }

    // Swap pivot into place at i + 1
    const pivotTarget = i + 1;
    swaps++;
    arr[pivotTarget].state = 'swapping';
    arr[high].state = 'swapping';

    recordStep(
      { pseudocode: 14, python: 14, cpp: 10, java: 9 },
      `Placing pivot ${pivotVal} into its final sorted position at index ${pivotTarget}.`,
      `Swapping index ${pivotTarget} (${arr[pivotTarget].val}) with pivot at index ${high}.`,
      { pivotTarget, pivotOrig: high },
      'Place Pivot'
    );

    const temp = arr[pivotTarget];
    arr[pivotTarget] = arr[high];
    arr[high] = temp;

    // Pivot is now in its permanent sorted place
    arr[pivotTarget].state = 'sorted';
    if (high !== pivotTarget) {
      arr[high].state = 'default';
    }

    recordStep(
      { pseudocode: 15, python: 15, cpp: 11, java: 11 },
      `Pivot ${pivotVal} is now locked in place at index ${pivotTarget}!`,
      `Left partition: indices [${low}..${pivotTarget - 1}], Right partition: indices [${pivotTarget + 1}..${high}].`,
      { sorted: pivotTarget },
      'Pivot Locked'
    );

    return pivotTarget;
  }

  function quickSortHelper(low, high) {
    if (low < high) {
      recordStep(
        { pseudocode: 2, python: 2, cpp: 14, java: 14 },
        `QuickSort called on sub-range [${low}..${high}].`,
        `Array segment length: ${high - low + 1} elements.`,
        { low, high },
        'Subarray Call'
      );

      const pi = partition(low, high);

      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high && low >= 0 && low < n) {
      arr[low].state = 'sorted';
      recordStep(
        { pseudocode: 2, python: 2, cpp: 14, java: 14 },
        `Subarray of single element at index ${low} (${arr[low].val}) is already trivially sorted.`,
        '',
        { sorted: low },
        'Single Element'
      );
    }
  }

  quickSortHelper(0, n - 1);

  for (let idx = 0; idx < n; idx++) {
    arr[idx].state = 'sorted';
  }

  recordStep(
    { pseudocode: 1, python: 6, cpp: 19, java: 19 },
    'Quick Sort Complete! Entire array is sorted.',
    `Completed in ${operations} steps with ${comparisons} comparisons and ${swaps} swaps.`,
    {},
    'Completed'
  );

  return steps;
}
