import { generateBubbleSortSteps } from './bubbleSort';
import { generateSelectionSortSteps } from './selectionSort';
import { generateInsertionSortSteps } from './insertionSort';
import { generateMergeSortSteps } from './mergeSort';
import { generateQuickSortSteps } from './quickSort';
import { generateBinarySearchSteps } from './binarySearch';
import { generateLinearSearchSteps } from './linearSearch';
import { generateJumpSearchSteps } from './jumpSearch';
import { generateExponentialSearchSteps } from './exponentialSearch';

export function getAlgorithmSteps(algorithmId, array, target) {
  switch (algorithmId) {
    case 'bubble-sort':
      return generateBubbleSortSteps(array);
    case 'selection-sort':
      return generateSelectionSortSteps(array);
    case 'insertion-sort':
      return generateInsertionSortSteps(array);
    case 'merge-sort':
      return generateMergeSortSteps(array);
    case 'quick-sort':
      return generateQuickSortSteps(array);
    case 'binary-search':
      return generateBinarySearchSteps(array, target);
    case 'linear-search':
      return generateLinearSearchSteps(array, target);
    case 'jump-search':
      return generateJumpSearchSteps(array, target);
    case 'exponential-search':
      return generateExponentialSearchSteps(array, target);
    default:
      return generateBubbleSortSteps(array);
  }
}
