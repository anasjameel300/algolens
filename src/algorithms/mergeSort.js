export function generateMergeSortSteps(initialArray) {
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
    'Starting Merge Sort on array of ' + n + ' elements.',
    'Merge Sort is a Divide-and-Conquer algorithm: split the array into halves, sort each half recursively, and merge them.',
    {},
    'Ready'
  );

  function merge(left, mid, right) {
    recordStep(
      { pseudocode: 8, python: 10, cpp: 1, java: 1 },
      `Preparing to merge sorted subarrays [${left}..${mid}] and [${mid + 1}..${right}].`,
      `Left subarray has ${mid - left + 1} elements, Right subarray has ${right - mid} elements.`,
      { left, mid, right },
      'Merge Start'
    );

    const leftArr = [];
    const rightArr = [];

    for (let i = left; i <= mid; i++) {
      leftArr.push({ ...arr[i] });
      arr[i].state = 'comparing';
    }
    for (let j = mid + 1; j <= right; j++) {
      rightArr.push({ ...arr[j] });
      arr[j].state = 'pivot';
    }

    recordStep(
      { pseudocode: 9, python: 11, cpp: 2, java: 2 },
      `Copied elements into temporary buffers for comparison.`,
      `Left buffer has [${leftArr.map(x => x.val).join(', ')}], Right buffer has [${rightArr.map(x => x.val).join(', ')}].`,
      { left, mid, right },
      'Buffers Created'
    );

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      const valL = leftArr[i].val;
      const valR = rightArr[j].val;
      const pickLeft = valL <= valR;

      recordStep(
        { pseudocode: 11, python: 14, cpp: 6, java: 9 },
        `Comparing left buffer item (${valL}) with right buffer item (${valR}).`,
        pickLeft
          ? `${valL} <= ${valR}: Left item is smaller or equal. Placing ${valL} into position ${k}.`
          : `${valL} > ${valR}: Right item is strictly smaller. Placing ${valR} into position ${k}.`,
        { k, leftIdx: left + i, rightIdx: mid + 1 + j },
        pickLeft ? 'Pick Left' : 'Pick Right'
      );

      swaps++;
      if (pickLeft) {
        arr[k] = { ...leftArr[i], state: 'overwrite' };
        i++;
      } else {
        arr[k] = { ...rightArr[j], state: 'overwrite' };
        j++;
      }

      recordStep(
        { pseudocode: 11, python: 15, cpp: 6, java: 9 },
        `Placed ${arr[k].val} into index ${k}.`,
        `Progress in current merge: ${k - left + 1} of ${right - left + 1} merged.`,
        { k },
        'Merged Slot'
      );

      arr[k].state = 'default';
      k++;
    }

    while (i < leftArr.length) {
      swaps++;
      arr[k] = { ...leftArr[i], state: 'overwrite' };

      recordStep(
        { pseudocode: 12, python: 18, cpp: 9, java: 11 },
        `Copying remaining left buffer item (${arr[k].val}) into index ${k}.`,
        'Right buffer was exhausted, so remaining left items copy directly.',
        { k },
        'Drain Left'
      );

      arr[k].state = 'default';
      i++;
      k++;
    }

    while (j < rightArr.length) {
      swaps++;
      arr[k] = { ...rightArr[j], state: 'overwrite' };

      recordStep(
        { pseudocode: 12, python: 19, cpp: 10, java: 12 },
        `Copying remaining right buffer item (${arr[k].val}) into index ${k}.`,
        'Left buffer was exhausted, so remaining right items copy directly.',
        { k },
        'Drain Right'
      );

      arr[k].state = 'default';
      j++;
      k++;
    }

    for (let idx = left; idx <= right; idx++) {
      if (left === 0 && right === n - 1) {
        arr[idx].state = 'sorted';
      } else {
        arr[idx].state = 'default';
      }
    }

    recordStep(
      { pseudocode: 6, python: 8, cpp: 18, java: 18 },
      `Completed merge of subarray range [${left}..${right}].`,
      `Elements in range [${left}..${right}] are now locally sorted: [${arr.slice(left, right + 1).map(x => x.val).join(', ')}].`,
      { left, right },
      'Subarray Sorted'
    );
  }

  function mergeSortHelper(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    recordStep(
      { pseudocode: 3, python: 5, cpp: 15, java: 15 },
      `Dividing subarray [${left}..${right}] at mid index ${mid}.`,
      `Left half: [${left}..${mid}], Right half: [${mid + 1}..${right}].`,
      { left, mid, right },
      'Dividing'
    );

    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSortHelper(0, n - 1);

  for (let idx = 0; idx < n; idx++) {
    arr[idx].state = 'sorted';
  }

  recordStep(
    { pseudocode: 1, python: 1, cpp: 19, java: 19 },
    'Merge Sort Complete! Entire array is sorted.',
    `Completed with ${comparisons} comparisons and ${swaps} write operations.`,
    {},
    'Completed'
  );

  return steps;
}
