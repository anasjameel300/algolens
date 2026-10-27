export function generateBubbleSortSteps(initialArray) {
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

  // Initial step
  recordStep(
    { pseudocode: 1, python: 1, cpp: 1, java: 1 },
    'Starting Bubble Sort on an array of ' + n + ' elements.',
    'Bubble Sort repeatedly scans adjacent pairs and swaps them if the left element is greater than the right.',
    {},
    'Ready'
  );

  for (let i = 0; i < n - 1; i++) {
    let swappedInThisPass = false;

    recordStep(
      { pseudocode: 3, python: 3, cpp: 3, java: 3 },
      `Beginning Pass ${i + 1} of ${n - 1}.`,
      `The unsorted boundary is from index 0 to ${n - i - 1}. Any elements past index ${n - i - 1} are already finalized.`,
      { pass: i + 1 },
      'New Pass'
    );

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      arr[j].state = 'comparing';
      arr[j + 1].state = 'comparing';

      const valA = arr[j].val;
      const valB = arr[j + 1].val;
      const willSwap = valA > valB;

      recordStep(
        { pseudocode: 6, python: 6, cpp: 6, java: 6 },
        `Comparing index ${j} (${valA}) and index ${j + 1} (${valB}).`,
        willSwap
          ? `${valA} > ${valB}: Condition met! These two elements are out of order and must be swapped.`
          : `${valA} <= ${valB}: Elements are already in relative ascending order. No swap required.`,
        { j, 'j+1': j + 1 },
        willSwap ? 'Swap Needed' : 'In Order'
      );

      if (willSwap) {
        swaps++;
        arr[j].state = 'swapping';
        arr[j + 1].state = 'swapping';

        // Perform swap in our array
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        swappedInThisPass = true;

        recordStep(
          { pseudocode: 7, python: 7, cpp: 7, java: 7 },
          `Swapped ${valA} with ${valB}.`,
          `Now ${valB} is at index ${j} and ${valA} is at index ${j + 1}.`,
          { j, 'j+1': j + 1 },
          'Swapped'
        );
      }

      // Revert states back to default (except sorted ones)
      arr[j].state = 'default';
      arr[j + 1].state = 'default';
    }

    // Mark the element that bubbled to the end as sorted
    arr[n - i - 1].state = 'sorted';
    recordStep(
      { pseudocode: 5, python: 5, cpp: 5, java: 5 },
      `Element ${arr[n - i - 1].val} has bubbled up to its correct final sorted position at index ${n - i - 1}.`,
      `The rightmost sorted region now has ${i + 1} finalized elements.`,
      { sorted: n - i - 1 },
      'Element Sorted'
    );

    if (!swappedInThisPass) {
      recordStep(
        { pseudocode: 10, python: 10, cpp: 10, java: 10 },
        'Early Termination: No swaps occurred during this entire pass!',
        'The array is confirmed to be fully sorted. Remaining passes skipped.',
        {},
        'Early Exit'
      );
      break;
    }
  }

  // Ensure all remaining elements are marked sorted
  for (let k = 0; k < n; k++) {
    arr[k].state = 'sorted';
  }

  recordStep(
    { pseudocode: 10, python: 11, cpp: 11, java: 11 },
    'Bubble Sort Complete! Entire array is sorted.',
    `Completed in ${operations} steps with ${comparisons} comparisons and ${swaps} swaps.`,
    {},
    'Completed'
  );

  return steps;
}
