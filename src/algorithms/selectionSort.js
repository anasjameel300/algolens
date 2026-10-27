export function generateSelectionSortSteps(initialArray) {
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
    { pseudocode: 1, python: 1, cpp: 1, java: 1 },
    'Starting Selection Sort on array of ' + n + ' elements.',
    'Selection Sort searches the unsorted portion for the minimum element and places it into the next sorted slot.',
    {},
    'Ready'
  );

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    arr[minIdx].state = 'pivot'; // use pivot style for current minimum

    recordStep(
      { pseudocode: 4, python: 4, cpp: 4, java: 4 },
      `Starting iteration ${i + 1}. Candidate minimum set to index ${i} (${arr[i].val}).`,
      `We will now scan the rest of the array (indices ${i + 1} to ${n - 1}) to check if any smaller element exists.`,
      { i, min: minIdx },
      'Select Min'
    );

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      arr[j].state = 'comparing';

      const isSmaller = arr[j].val < arr[minIdx].val;

      recordStep(
        { pseudocode: 6, python: 6, cpp: 6, java: 6 },
        `Comparing current minimum ${arr[minIdx].val} (at index ${minIdx}) with element ${arr[j].val} (at index ${j}).`,
        isSmaller
          ? `Found smaller value! ${arr[j].val} < ${arr[minIdx].val}. Updating candidate minimum index to ${j}.`
          : `${arr[j].val} >= ${arr[minIdx].val}. Current minimum (${arr[minIdx].val}) remains the smallest so far.`,
        { i, min: minIdx, j },
        isSmaller ? 'New Minimum' : 'Comparing'
      );

      if (isSmaller) {
        if (minIdx !== i) {
          arr[minIdx].state = 'default';
        }
        minIdx = j;
        arr[minIdx].state = 'pivot';
      } else {
        arr[j].state = 'default';
      }
    }

    if (minIdx !== i) {
      swaps++;
      arr[i].state = 'swapping';
      arr[minIdx].state = 'swapping';

      const valI = arr[i].val;
      const valMin = arr[minIdx].val;

      recordStep(
        { pseudocode: 9, python: 9, cpp: 9, java: 9 },
        `Swapping index ${i} (${valI}) with discovered minimum at index ${minIdx} (${valMin}).`,
        `Placing the minimum value (${valMin}) into its finalized sorted slot at index ${i}.`,
        { i, min: minIdx },
        'Swapping'
      );

      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    } else {
      recordStep(
        { pseudocode: 8, python: 8, cpp: 8, java: 8 },
        `Element ${arr[i].val} at index ${i} is already the minimum in the unsorted portion.`,
        'No swap needed for this iteration.',
        { i },
        'No Swap'
      );
    }

    // Reset minIdx if it was not i
    if (minIdx !== i) {
      arr[minIdx].state = 'default';
    }
    // Mark slot i as sorted
    arr[i].state = 'sorted';

    recordStep(
      { pseudocode: 3, python: 3, cpp: 3, java: 3 },
      `Index ${i} (${arr[i].val}) is now permanently sorted!`,
      `Sorted region on the left now covers indices 0 to ${i}.`,
      { sorted: i },
      'Element Sorted'
    );
  }

  // Last element is naturally sorted
  arr[n - 1].state = 'sorted';

  recordStep(
    { pseudocode: 1, python: 11, cpp: 11, java: 11 },
    'Selection Sort Complete! Entire array is sorted.',
    `Completed with ${comparisons} comparisons and ${swaps} swaps.`,
    {},
    'Completed'
  );

  return steps;
}
