export function generateInsertionSortSteps(initialArray) {
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
    'Starting Insertion Sort on array of ' + n + ' elements.',
    'Insertion Sort builds the sorted array one element at a time by shifting elements to insert the current key into its correct spot.',
    {},
    'Ready'
  );

  // The first element is trivially sorted
  arr[0].state = 'sorted';
  recordStep(
    { pseudocode: 3, python: 2, cpp: 2, java: 2 },
    `Single element prefix [${arr[0].val}] at index 0 is already considered sorted.`,
    'Now starting the loop from index i = 1.',
    { sorted: 0 },
    'Prefix Sorted'
  );

  for (let i = 1; i < n; i++) {
    const keyItem = { ...arr[i] };
    const keyVal = keyItem.val;
    arr[i].state = 'pivot'; // Highlight the key being inserted

    recordStep(
      { pseudocode: 4, python: 3, cpp: 3, java: 3 },
      `Selected key element = ${keyVal} at index ${i}.`,
      `We will compare this key with elements to its left (indices ${i - 1} down to 0) to find its target position.`,
      { key: i, i },
      'Key Picked'
    );

    let j = i - 1;

    while (j >= 0) {
      comparisons++;
      arr[j].state = 'comparing';

      const isGreater = arr[j].val > keyVal;

      recordStep(
        { pseudocode: 6, python: 5, cpp: 5, java: 5 },
        `Comparing key (${keyVal}) with arr[${j}] (${arr[j].val}).`,
        isGreater
          ? `${arr[j].val} > ${keyVal}: Condition met! We must shift ${arr[j].val} one position right to index ${j + 1}.`
          : `${arr[j].val} <= ${keyVal}: Found target slot! ${keyVal} is greater than or equal to ${arr[j].val}.`,
        { j, key: i },
        isGreater ? 'Shift Required' : 'Position Found'
      );

      if (isGreater) {
        swaps++;
        // Shift arr[j] to arr[j + 1]
        arr[j + 1] = { ...arr[j], state: 'overwrite' };
        arr[j].state = 'default';

        recordStep(
          { pseudocode: 7, python: 6, cpp: 6, java: 6 },
          `Shifted element ${arr[j + 1].val} to index ${j + 1}.`,
          `Vacating index ${j} for insertion or further shifting.`,
          { j, 'shifted-to': j + 1 },
          'Shifted'
        );

        j--;
      } else {
        arr[j].state = 'sorted';
        break;
      }
    }

    // Insert key at j + 1
    arr[j + 1] = { ...keyItem, state: 'swapping' };

    recordStep(
      { pseudocode: 9, python: 8, cpp: 8, java: 8 },
      `Inserting key ${keyVal} into index ${j + 1}.`,
      `The sorted subarray now extends from index 0 through index ${i}.`,
      { inserted: j + 1 },
      'Key Inserted'
    );

    // Re-mark sorted prefix
    for (let k = 0; k <= i; k++) {
      arr[k].state = 'sorted';
    }
  }

  recordStep(
    { pseudocode: 1, python: 9, cpp: 10, java: 10 },
    'Insertion Sort Complete! Array is now fully sorted.',
    `Completed in ${operations} steps with ${comparisons} comparisons and ${swaps} element shifts.`,
    {},
    'Completed'
  );

  return steps;
}
