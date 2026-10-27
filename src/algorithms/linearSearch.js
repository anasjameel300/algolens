export function generateLinearSearchSteps(initialArray, targetValue) {
  const steps = [];
  const target = targetValue !== undefined ? targetValue : initialArray[Math.floor(initialArray.length / 2)];

  const arr = initialArray.map((val, index) => ({
    id: `item-${index}-${val}`,
    val: val.val !== undefined ? val.val : val,
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
    `Starting Linear Search for target: ${target}.`,
    `Linear Search evaluates elements one by one from left to right until the target is found.`,
    { target },
    'Ready'
  );

  let found = false;

  for (let i = 0; i < n; i++) {
    comparisons++;
    arr[i].state = 'comparing';

    const isMatch = arr[i].val === target;

    recordStep(
      { pseudocode: 3, python: 3, cpp: 3, java: 3 },
      `Checking index ${i}: Is arr[${i}] (${arr[i].val}) equal to target ${target}?`,
      isMatch
        ? `Match found! Element at index ${i} equals ${target}.`
        : `No match. ${arr[i].val} != ${target}. Moving to index ${i + 1}.`,
      { i, target },
      isMatch ? 'Match Found' : 'Scanning'
    );

    if (isMatch) {
      arr[i].state = 'sorted'; // Success highlight
      found = true;
      recordStep(
        { pseudocode: 4, python: 4, cpp: 3, java: 3 },
        `Linear Search Completed successfully! Target found at index ${i}.`,
        `Total comparisons made: ${comparisons}.`,
        { i, target },
        'Completed'
      );
      break;
    } else {
      arr[i].state = 'eliminated';
    }
  }

  if (!found) {
    recordStep(
      { pseudocode: 5, python: 5, cpp: 5, java: 5 },
      `Target ${target} was not found in the array.`,
      `Searched all ${n} elements. Returned -1.`,
      { target },
      'Not Found'
    );
  }

  return steps;
}
