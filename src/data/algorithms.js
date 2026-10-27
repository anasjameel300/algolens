export const ALGORITHMS = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    badge: 'Comparison Based',
    tagline: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stability: 'Stable',
    inPlace: 'Yes',
    summary:
      'Bubble Sort works by repeatedly swapping adjacent elements that are out of order. In each pass, the largest unsorted element "bubbles up" to its correct position at the end of the array, similar to air bubbles rising in water.',
    howItWorks: [
      'Iterate through the array from left to right.',
      'Compare each pair of adjacent elements: `arr[j]` and `arr[j + 1]`.',
      'If `arr[j] > arr[j + 1]`, swap them.',
      'Repeat the process for `n - 1` passes. After pass `i`, the last `i` elements are guaranteed to be sorted.',
      'Optimization: If an entire pass completes without a single swap, the array is already sorted and we can terminate early.'
    ],
    pros: [
      'Extremely simple to understand and implement.',
      'Detects already sorted arrays in O(n) time with a swapped flag.',
      'In-place sorting with O(1) auxiliary space and stable.'
    ],
    cons: [
      'Inefficient O(n²) time complexity for large datasets.',
      'Makes excessive swap operations compared to Insertion Sort.'
    ],
    code: {
      pseudocode: [
        'function bubbleSort(A):',
        '  n = length(A)',
        '  for i = 0 to n - 1:',
        '    swapped = false',
        '    for j = 0 to n - i - 2:',
        '      if A[j] > A[j + 1]:',
        '        swap(A[j], A[j + 1])',
        '        swapped = true',
        '    if not swapped:',
        '      break // already sorted'
      ].join('\n'),
      python: [
        'def bubble_sort(arr):',
        '    n = len(arr)',
        '    for i in range(n):',
        '        swapped = False',
        '        for j in range(0, n - i - 1):',
        '            if arr[j] > arr[j + 1]:',
        '                arr[j], arr[j + 1] = arr[j + 1], arr[j]',
        '                swapped = True',
        '        if not swapped:',
        '            break',
        '    return arr'
      ].join('\n'),
      cpp: [
        'void bubbleSort(vector<int>& arr) {',
        '    int n = arr.size();',
        '    for (int i = 0; i < n - 1; ++i) {',
        '        bool swapped = false;',
        '        for (int j = 0; j < n - i - 1; ++j) {',
        '            if (arr[j] > arr[j + 1]) {',
        '                swap(arr[j], arr[j + 1]);',
        '                swapped = true;',
        '            }',
        '        }',
        '        if (!swapped) break;',
        '    }',
        '}'
      ].join('\n'),
      java: [
        'public static void bubbleSort(int[] arr) {',
        '    int n = arr.length;',
        '    for (int i = 0; i < n - 1; i++) {',
        '        boolean swapped = false;',
        '        for (int j = 0; j < n - i - 1; j++) {',
        '            if (arr[j] > arr[j + 1]) {',
        '                int temp = arr[j];',
        '                arr[j] = arr[j + 1];',
        '                arr[j + 1] = temp;',
        '                swapped = true;',
        '            }',
        '        }',
        '        if (!swapped) break;',
        '    }',
        '}'
      ].join('\n')
    }
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    badge: 'Comparison Based',
    tagline: 'Divides the list into sorted and unsorted regions, repeatedly selecting the minimum unsorted item.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stability: 'Unstable',
    inPlace: 'Yes',
    summary:
      'Selection Sort divides the array into two parts: a sorted subarray built from left to right, and an unsorted subarray. In every iteration, it finds the smallest element in the unsorted portion and swaps it with the first unsorted position.',
    howItWorks: [
      'Set `i = 0` as the starting boundary of the unsorted segment.',
      'Assume `arr[i]` is the minimum, storing index `minIdx = i`.',
      'Scan the rest of the array (`j = i + 1` to `n - 1`). If `arr[j] < arr[minIdx]`, update `minIdx = j`.',
      'After checking all unsorted elements, swap `arr[i]` and `arr[minIdx]`.',
      'Increment `i` and repeat until the entire array is sorted.'
    ],
    pros: [
      'Simple logic with at most O(n) swaps—beneficial when write operations are expensive (e.g., flash memory).',
      'In-place with O(1) auxiliary memory.',
      'Consistent performance across all inputs.'
    ],
    cons: [
      'Always makes O(n²) comparisons even if array is already sorted.',
      'Standard implementation is not stable.'
    ],
    code: {
      pseudocode: [
        'function selectionSort(A):',
        '  n = length(A)',
        '  for i = 0 to n - 1:',
        '    minIdx = i',
        '    for j = i + 1 to n - 1:',
        '      if A[j] < A[minIdx]:',
        '        minIdx = j',
        '    if minIdx != i:',
        '      swap(A[i], A[minIdx])'
      ].join('\n'),
      python: [
        'def selection_sort(arr):',
        '    n = len(arr)',
        '    for i in range(n):',
        '        min_idx = i',
        '        for j in range(i + 1, n):',
        '            if arr[j] < arr[min_idx]:',
        '                min_idx = j',
        '        if min_idx != i:',
        '            arr[i], arr[min_idx] = arr[min_idx], arr[i]',
        '    return arr'
      ].join('\n'),
      cpp: [
        'void selectionSort(vector<int>& arr) {',
        '    int n = arr.size();',
        '    for (int i = 0; i < n - 1; ++i) {',
        '        int minIdx = i;',
        '        for (int j = i + 1; j < n; ++j) {',
        '            if (arr[j] < arr[minIdx]) minIdx = j;',
        '        }',
        '        if (minIdx != i) swap(arr[i], arr[minIdx]);',
        '    }',
        '}'
      ].join('\n'),
      java: [
        'public static void selectionSort(int[] arr) {',
        '    int n = arr.length;',
        '    for (int i = 0; i < n - 1; i++) {',
        '        int minIdx = i;',
        '        for (int j = i + 1; j < n; j++) {',
        '            if (arr[j] < arr[minIdx]) minIdx = j;',
        '        }',
        '        if (minIdx != i) {',
        '            int temp = arr[i];',
        '            arr[i] = arr[minIdx];',
        '            arr[minIdx] = temp;',
        '        }',
        '    }',
        '}'
      ].join('\n')
    }
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    badge: 'Comparison Based',
    tagline: 'Builds the final sorted array one item at a time, just like sorting playing cards in hand.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stability: 'Stable',
    inPlace: 'Yes',
    summary:
      'Insertion Sort iterates through the array and inserts each element into its proper position within the already sorted subarray on the left by shifting larger elements one position to the right.',
    howItWorks: [
      'The first element is considered already sorted.',
      'Pick the next element as `key = arr[i]`.',
      'Compare `key` with elements in the sorted portion from right to left (`j = i - 1` down to `0`).',
      'Shift elements greater than `key` one position right.',
      'Place `key` into its discovered open slot (`arr[j + 1] = key`).',
      'Repeat for all remaining elements.'
    ],
    pros: [
      'Very efficient for small datasets (often used in hybrid algorithms like Timsort).',
      'O(n) linear time for nearly sorted data.',
      'Online algorithm: can sort a list as it receives it.',
      'Stable and in-place.'
    ],
    cons: [
      'O(n²) time complexity when array is in reverse order.',
      'Requires many shifts if small elements are situated towards the end.'
    ],
    code: {
      pseudocode: [
        'function insertionSort(A):',
        '  n = length(A)',
        '  for i = 1 to n - 1:',
        '    key = A[i]',
        '    j = i - 1',
        '    while j >= 0 and A[j] > key:',
        '      A[j + 1] = A[j]',
        '      j = j - 1',
        '    A[j + 1] = key'
      ].join('\n'),
      python: [
        'def insertion_sort(arr):',
        '    for i in range(1, len(arr)):',
        '        key = arr[i]',
        '        j = i - 1',
        '        while j >= 0 and arr[j] > key:',
        '            arr[j + 1] = arr[j]',
        '            j -= 1',
        '        arr[j + 1] = key',
        '    return arr'
      ].join('\n'),
      cpp: [
        'void insertionSort(vector<int>& arr) {',
        '    int n = arr.size();',
        '    for (int i = 1; i < n; ++i) {',
        '        int key = arr[i];',
        '        int j = i - 1;',
        '        while (j >= 0 && arr[j] > key) {',
        '            arr[j + 1] = arr[j];',
        '            --j;',
        '        }',
        '        arr[j + 1] = key;',
        '    }',
        '}'
      ].join('\n'),
      java: [
        'public static void insertionSort(int[] arr) {',
        '    int n = arr.length;',
        '    for (int i = 1; i < n; i++) {',
        '        int key = arr[i];',
        '        int j = i - 1;',
        '        while (j >= 0 && arr[j] > key) {',
        '            arr[j + 1] = arr[j];',
        '            j--;',
        '        }',
        '        arr[j + 1] = key;',
        '    }',
        '}'
      ].join('\n')
    }
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    badge: 'Divide & Conquer',
    tagline: 'Recursively divides the array in halves, sorts each half, and merges them back together in order.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    stability: 'Stable',
    inPlace: 'No',
    summary:
      'Merge Sort is a classic divide-and-conquer algorithm. It divides the input array into two equal halves, calls itself for the two halves, and then merges the two sorted halves into a single sorted array.',
    howItWorks: [
      'Find the middle point to divide the array into two halves: `mid = (left + right) / 2`.',
      'Call `mergeSort` on the left half (`left` to `mid`).',
      'Call `mergeSort` on the right half (`mid + 1` to `right`).',
      'Merge the two halves: compare the current elements of left and right subarrays, place smaller one into the main array.',
      'Copy any remaining elements.'
    ],
    pros: [
      'Guaranteed O(n log n) time complexity in all cases (best, average, worst).',
      'Stable sorting algorithm (preserves relative order of duplicates).',
      'Well-suited for linked lists and external sorting (huge datasets on disk).'
    ],
    cons: [
      'Requires O(n) additional memory for temporary arrays.',
      'Overhead of recursive calls and extra copying for small arrays.'
    ],
    code: {
      pseudocode: [
        'function mergeSort(A, left, right):',
        '  if left >= right: return',
        '  mid = floor((left + right) / 2)',
        '  mergeSort(A, left, mid)',
        '  mergeSort(A, mid + 1, right)',
        '  merge(A, left, mid, right)',
        '',
        'function merge(A, left, mid, right):',
        '  create temp arrays L and R',
        '  while L and R have items:',
        '    pick smaller item into A',
        '  copy remaining items'
      ].join('\n'),
      python: [
        'def merge_sort(arr):',
        '    if len(arr) <= 1:',
        '        return arr',
        '    mid = len(arr) // 2',
        '    left = merge_sort(arr[:mid])',
        '    right = merge_sort(arr[mid:])',
        '    return merge(left, right)',
        '',
        'def merge(left, right):',
        '    res = []',
        '    i = j = 0',
        '    while i < len(left) and j < len(right):',
        '        if left[i] <= right[j]:',
        '            res.append(left[i]); i += 1',
        '        else:',
        '            res.append(right[j]); j += 1',
        '    res.extend(left[i:])',
        '    res.extend(right[j:])',
        '    return res'
      ].join('\n'),
      cpp: [
        'void merge(vector<int>& arr, int l, int m, int r) {',
        '    vector<int> left(arr.begin() + l, arr.begin() + m + 1);',
        '    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);',
        '    int i = 0, j = 0, k = l;',
        '    while (i < left.size() && j < right.size()) {',
        '        if (left[i] <= right[j]) arr[k++] = left[i++];',
        '        else arr[k++] = right[j++];',
        '    }',
        '    while (i < left.size()) arr[k++] = left[i++];',
        '    while (j < right.size()) arr[k++] = right[j++];',
        '}',
        'void mergeSort(vector<int>& arr, int l, int r) {',
        '    if (l >= r) return;',
        '    int m = l + (r - l) / 2;',
        '    mergeSort(arr, l, m);',
        '    mergeSort(arr, m + 1, r);',
        '    merge(arr, l, m, r);',
        '}'
      ].join('\n'),
      java: [
        'void merge(int[] arr, int l, int m, int r) {',
        '    int n1 = m - l + 1, n2 = r - m;',
        '    int[] L = new int[n1]; int[] R = new int[n2];',
        '    for (int i = 0; i < n1; ++i) L[i] = arr[l + i];',
        '    for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];',
        '    int i = 0, j = 0, k = l;',
        '    while (i < n1 && j < n2) {',
        '        if (L[i] <= R[j]) arr[k++] = L[i++];',
        '        else arr[k++] = R[j++];',
        '    }',
        '    while (i < n1) arr[k++] = L[i++];',
        '    while (j < n2) arr[k++] = R[j++];',
        '}',
        'void mergeSort(int[] arr, int l, int r) {',
        '    if (l < r) {',
        '        int m = l + (r - l) / 2;',
        '        mergeSort(arr, l, m);',
        '        mergeSort(arr, m + 1, r);',
        '        merge(arr, l, m, r);',
        '    }',
        '}'
      ].join('\n')
    }
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    badge: 'Divide & Conquer',
    tagline: 'Picks an element as pivot and partitions the array around it such that smaller items go left, larger go right.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    stability: 'Unstable',
    inPlace: 'Yes',
    summary:
      'Quick Sort chooses a "pivot" element from the array and partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot. Sub-arrays are then sorted recursively.',
    howItWorks: [
      'Choose a pivot element (Lomuto partition uses the rightmost element).',
      'Partitioning: maintain pointer `i` indicating the boundary of elements smaller than pivot.',
      'Scan with pointer `j` from `low` to `high - 1`. If `arr[j] < pivot`, increment `i` and swap `arr[i]` with `arr[j]`.',
      'Finally, swap `arr[i + 1]` with the pivot `arr[high]`. Pivot is now at its final sorted position.',
      'Recursively apply Quick Sort to the left partition (`low` to `i`) and right partition (`i + 2` to `high`).'
    ],
    pros: [
      'Extremely fast in practice with low hidden constant factors.',
      'In-place sorting with O(log n) call stack auxiliary space.',
      'Cache-friendly memory access patterns.'
    ],
    cons: [
      'Worst case is O(n²) when the pivot chosen is consistently the smallest or largest element.',
      'Not a stable sort.'
    ],
    code: {
      pseudocode: [
        'function quickSort(A, low, high):',
        '  if low < high:',
        '    pi = partition(A, low, high)',
        '    quickSort(A, low, pi - 1)',
        '    quickSort(A, pi + 1, high)',
        '',
        'function partition(A, low, high):',
        '  pivot = A[high]',
        '  i = low - 1',
        '  for j = low to high - 1:',
        '    if A[j] < pivot:',
        '      i = i + 1',
        '      swap(A[i], A[j])',
        '  swap(A[i + 1], A[high])',
        '  return i + 1'
      ].join('\n'),
      python: [
        'def quick_sort(arr, low, high):',
        '    if low < high:',
        '        pi = partition(arr, low, high)',
        '        quick_sort(arr, low, pi - 1)',
        '        quick_sort(arr, pi + 1, high)',
        '',
        'def partition(arr, low, high):',
        '    pivot = arr[high]',
        '    i = low - 1',
        '    for j in range(low, high):',
        '        if arr[j] < pivot:',
        '            i += 1',
        '            arr[i], arr[j] = arr[j], arr[i]',
        '    arr[i + 1], arr[high] = arr[high], arr[i + 1]',
        '    return i + 1'
      ].join('\n'),
      cpp: [
        'int partition(vector<int>& arr, int low, int high) {',
        '    int pivot = arr[high];',
        '    int i = low - 1;',
        '    for (int j = low; j < high; ++j) {',
        '        if (arr[j] < pivot) {',
        '            ++i;',
        '            swap(arr[i], arr[j]);',
        '        }',
        '    }',
        '    swap(arr[i + 1], arr[high]);',
        '    return i + 1;',
        '}',
        'void quickSort(vector<int>& arr, int low, int high) {',
        '    if (low < high) {',
        '        int pi = partition(arr, low, high);',
        '        quickSort(arr, low, pi - 1);',
        '        quickSort(arr, pi + 1, high);',
        '    }',
        '}'
      ].join('\n'),
      java: [
        'int partition(int[] arr, int low, int high) {',
        '    int pivot = arr[high];',
        '    int i = low - 1;',
        '    for (int j = low; j < high; j++) {',
        '        if (arr[j] < pivot) {',
        '            i++;',
        '            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;',
        '        }',
        '    }',
        '    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;',
        '    return i + 1;',
        '}',
        'void quickSort(int[] arr, int low, int high) {',
        '    if (low < high) {',
        '        int pi = partition(arr, low, high);',
        '        quickSort(arr, low, pi - 1);',
        '        quickSort(arr, pi + 1, high);',
        '    }',
        '}'
      ].join('\n')
    }
  }
];
