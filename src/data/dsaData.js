export const DSA_INTRO = {
  title: "Understanding Data Structures & Algorithms",
  subtitle: "The foundational blueprint behind every efficient software system",
  description: 
    "Data Structures organize and store data effectively, while Algorithms provide the step-by-step rules to process and solve problems using that data. Choosing the right algorithm transforms slow, sluggish programs into lightning-fast applications.",
  pillars: [
    {
      id: "time-complexity",
      title: "Time Complexity",
      tagline: "How execution time scales as input size (n) grows",
      badge: "Big-O Notation",
      summary: "Measures the number of elementary operations rather than clock time, ensuring your analysis holds true across any hardware or machine.",
      bullets: [
        "O(1): Constant time (instant lookup)",
        "O(log n): Logarithmic (halves problem space, e.g. Binary Search)",
        "O(n): Linear (inspects each item once)",
        "O(n log n): Efficient divide-and-conquer sorting (Merge, Quick)",
        "O(n²): Quadratic (nested loops, comparison sorts)"
      ]
    },
    {
      id: "space-complexity",
      title: "Space Complexity",
      tagline: "Auxiliary memory required during algorithm execution",
      badge: "Memory Footprint",
      summary: "Evaluates how much extra RAM or recursion stack space the algorithm demands beyond the input itself.",
      bullets: [
        "In-Place (O(1)): Modifies data directly with minimal variables",
        "Linear Space (O(n)): Allocates temporary arrays (e.g. Merge Sort)",
        "Stack Space (O(log n)): Recursion depth in divide-and-conquer"
      ]
    },
    {
      id: "stability",
      title: "Algorithm Stability",
      tagline: "Preserving original order of equal items",
      badge: "Data Integrity",
      summary: "A stable sort guarantees that two elements with identical values maintain their original relative order from the input.",
      bullets: [
        "Stable: Bubble Sort, Insertion Sort, Merge Sort",
        "Unstable: Quick Sort, Selection Sort, Heap Sort",
        "Crucial for multi-column sorting (e.g. sorting students by grade, then by name)"
      ]
    }
  ],
  categories: [
    {
      id: "sorting",
      name: "Sorting Algorithms",
      count: 5,
      description: "Rearranging data in ascending or descending order. The benchmark problem in computational science.",
      algorithms: ["bubble-sort", "selection-sort", "insertion-sort", "merge-sort", "quick-sort"]
    },
    {
      id: "searching",
      name: "Searching Algorithms",
      count: 4,
      description: "Locating specific elements or patterns within linear, block-stepped, and exponentially bounded collections.",
      algorithms: ["binary-search", "linear-search", "jump-search", "exponential-search"]
    },
    {
      id: "linear-structures",
      name: "Linear Data Structures",
      count: 3,
      description: "Sequential storage models including dynamic nodes, LIFO stacks, and FIFO queues.",
      algorithms: ["stack", "queue", "linked-list"]
    },
    {
      id: "trees",
      name: "Tree Structures & Heaps",
      count: 3,
      description: "Hierarchical non-linear models: BST, self-balancing AVL trees, and binary priority heaps.",
      algorithms: ["binary-search-tree", "avl-tree", "binary-heap"]
    },
    {
      id: "graphs",
      name: "Graph Algorithms",
      count: 3,
      description: "Traversing interconnected networks, discovering frontiers, and solving shortest paths.",
      algorithms: ["graph-bfs", "graph-dfs", "dijkstra"]
    }
  ]
};

export const ALGORITHM_DETAILS = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "sorting",
    categoryLabel: "Sorting",
    badge: "O(n²)",
    difficulty: "Beginner",
    tagline: "Repeatedly swaps adjacent elements if they are out of order until the largest bubble to the top.",
    overview:
      "Bubble Sort is the most intuitive comparison-based sorting algorithm. It compares consecutive elements in an array and swaps them if the left is larger than the right. Across multiple passes, the largest unsorted numbers gradually 'bubble' up to the end of the array, just like air bubbles rising in water.",
    whenToUse: "Excellent for educational purposes, small arrays (< 20 elements), and detecting whether an array is already sorted in O(n) time.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1) Auxiliary",
    stability: "Stable",
    inPlace: "Yes",
    howItWorks: [
      "Scan the array from index 0 to n - 1.",
      "Compare adjacent elements: arr[j] and arr[j + 1].",
      "If arr[j] > arr[j + 1], swap their positions.",
      "After pass 1, the maximum element is locked at index n - 1.",
      "Repeat for subsequent passes, decreasing the active boundary by 1 each time.",
      "If a full pass occurs with 0 swaps, terminate early as the list is fully sorted."
    ],
    code: {
      pseudocode: `function bubbleSort(arr):
  n = length(arr)
  for i from 0 to n - 1:
    swapped = false
    for j from 0 to n - i - 2:
      if arr[j] > arr[j + 1]:
        swap(arr[j], arr[j + 1])
        swapped = true
    if not swapped:
      break // already sorted!`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
    }
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    category: "sorting",
    categoryLabel: "Sorting",
    badge: "O(n²)",
    difficulty: "Beginner",
    tagline: "Repeatedly finds the smallest item from the unsorted section and places it at the beginning.",
    overview:
      "Selection Sort divides the array into a sorted prefix and an unsorted suffix. In each iteration, it searches the entire unsorted region for the minimum element, and then performs a single swap to position that minimum right after the sorted section.",
    whenToUse: "When memory write operations are significantly more costly than reads (e.g. Flash memory or EEPROM), since Selection Sort performs at most O(n) swaps.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1) Auxiliary",
    stability: "Unstable",
    inPlace: "Yes",
    howItWorks: [
      "Initialize sorted boundary i = 0.",
      "Assume index i holds the current minimum (minIdx = i).",
      "Inspect remaining items from j = i + 1 to n - 1.",
      "If any arr[j] < arr[minIdx], update minIdx = j.",
      "After finishing the scan, swap arr[i] with arr[minIdx].",
      "Increment i and repeat until the entire array is sorted."
    ],
    code: {
      pseudocode: `function selectionSort(arr):
  n = length(arr)
  for i from 0 to n - 1:
    minIdx = i
    for j from i + 1 to n - 1:
      if arr[j] < arr[minIdx]:
        minIdx = j
    if minIdx != i:
      swap(arr[i], arr[minIdx])`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        int minIdx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) swap(arr[i], arr[minIdx]);
    }
}`,
      java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`
    }
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "sorting",
    categoryLabel: "Sorting",
    badge: "O(n²)",
    difficulty: "Beginner",
    tagline: "Builds the sorted list one item at a time by inserting each element into its proper position.",
    overview:
      "Insertion Sort works the same way humans sort playing cards in hand. It takes elements one by one from the unsorted portion and shifts larger items in the sorted portion to the right to make room, then inserts the element in its exact spot.",
    whenToUse: "Extremely effective for small arrays (< 30 items) or arrays that are already nearly sorted. Widely utilized as the final step in advanced hybrid sorts like Timsort.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1) Auxiliary",
    stability: "Stable",
    inPlace: "Yes",
    howItWorks: [
      "The first element (index 0) is already considered sorted.",
      "Select the next element as the 'key' (arr[i]).",
      "Compare 'key' with elements to its left (from index i - 1 down to 0).",
      "Shift every element greater than key one position to the right.",
      "Insert key into the vacated slot (arr[j + 1] = key).",
      "Repeat for all remaining items."
    ],
    code: {
      pseudocode: `function insertionSort(arr):
  n = length(arr)
  for i from 1 to n - 1:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
      arr[j + 1] = arr[j]
      j = j - 1
    arr[j + 1] = key`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      cpp: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}`,
      java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    }
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    category: "sorting",
    categoryLabel: "Sorting",
    badge: "O(n log n)",
    difficulty: "Intermediate",
    tagline: "Divide and conquer: recursively splits the array in halves, sorts them, and merges them back.",
    overview:
      "Merge Sort is a quintessential divide-and-conquer algorithm. It continually halves the array until individual 1-element subarrays remain (which are trivially sorted), then repeatedly merges adjacent subarrays back together in sorted order.",
    whenToUse: "When guaranteed O(n log n) performance is strictly required regardless of input order, when stability is mandatory, or when sorting linked lists and external files.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(n) Auxiliary",
    stability: "Stable",
    inPlace: "No",
    howItWorks: [
      "Divide: find mid = (left + right) / 2 to split the array in half.",
      "Conquer: recursively call mergeSort on the left half and right half.",
      "Combine: merge the two sorted halves by comparing their front elements.",
      "Place smaller element into the target array and advance its pointer.",
      "Copy any remaining elements from either half."
    ],
    code: {
      pseudocode: `function mergeSort(arr, l, r):
  if l < r:
    m = floor((l + r) / 2)
    mergeSort(arr, l, m)
    mergeSort(arr, m + 1, r)
    merge(arr, l, m, r)

function merge(arr, l, m, r):
  create temp arrays L and R
  while items remain in L and R:
    pick smaller element into arr
  copy remaining items`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    res = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            res.append(left[i]); i += 1
        else:
            res.append(right[j]); j += 1
    res.extend(left[i:])
    res.extend(right[j:])
    return res`,
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> L(arr.begin() + l, arr.begin() + m + 1);
    vector<int> R(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < L.size() && j < R.size()) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < L.size()) arr[k++] = L[i++];
    while (j < R.size()) arr[k++] = R[j++];
}
void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
      java: `void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
    }
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    category: "sorting",
    categoryLabel: "Sorting",
    badge: "O(n log n)",
    difficulty: "Advanced",
    tagline: "Picks a pivot, partitions elements into smaller and larger groups, then recursively sorts them.",
    overview:
      "Quick Sort is renowned for its speed in practice. It selects a 'pivot' element and re-arranges the array so that every element smaller than the pivot lies to its left, and every element larger lies to its right. The pivot is then locked into its permanent position, and the left and right halves are sorted recursively.",
    whenToUse: "Fastest general in-memory sorting algorithm for typical random inputs. Excellent CPU cache performance due to localized memory access.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(log n) Stack",
    stability: "Unstable",
    inPlace: "Yes",
    howItWorks: [
      "Select a pivot element (commonly the rightmost element).",
      "Partitioning: scan elements with pointer j. Maintain pointer i for smaller elements boundary.",
      "If arr[j] < pivot, increment i and swap arr[i] with arr[j].",
      "After scanning, swap pivot (arr[high]) with arr[i + 1]. Pivot is now locked in place.",
      "Recursively apply Quick Sort to sub-arrays: [low..i] and [i + 2..high]."
    ],
    code: {
      pseudocode: `function quickSort(arr, low, high):
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)

function partition(arr, low, high):
  pivot = arr[high]
  i = low - 1
  for j = low to high - 1:
    if arr[j] < pivot:
      i = i + 1
      swap(arr[i], arr[j])
  swap(arr[i + 1], arr[high])
  return i + 1`,
      python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; ++j) {
        if (arr[j] < pivot) {
            ++i;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      java: `int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
    return i + 1;
}`
    }
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "searching",
    categoryLabel: "Searching",
    badge: "O(log n)",
    difficulty: "Beginner",
    tagline: "Finds an item in a sorted array by repeatedly dividing the search space in half.",
    overview:
      "Binary Search is an extraordinarily fast search algorithm that operates on sorted collections. It compares the target value to the middle element: if equal, it stops. If smaller, it eliminates the right half; if larger, it eliminates the left half. It cuts the search space in half at every step.",
    whenToUse: "Whenever looking up elements in sorted lists, databases, or monotonic search spaces (e.g. finding square roots, threshold values).",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)"
    },
    spaceComplexity: "O(1) Iterative",
    stability: "N/A",
    inPlace: "Yes",
    howItWorks: [
      "Ensure array is sorted in ascending order.",
      "Set search pointers: left = 0, right = n - 1.",
      "Calculate middle index: mid = floor((left + right) / 2).",
      "If arr[mid] == target: found! Return mid.",
      "If target < arr[mid]: search left half (right = mid - 1).",
      "If target > arr[mid]: search right half (left = mid + 1).",
      "Repeat until left > right (target not found)."
    ],
    code: {
      pseudocode: `function binarySearch(arr, target):
  left = 0
  right = length(arr) - 1
  while left <= right:
    mid = floor((left + right) / 2)
    if arr[mid] == target:
      return mid // target found
    else if arr[mid] < target:
      left = mid + 1 // look in right half
    else:
      right = mid - 1 // look in left half
  return -1 // target not in array`,
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      cpp: `int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      java: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
    }
  },
  {
    id: "linear-search",
    name: "Linear Search",
    category: "searching",
    categoryLabel: "Searching",
    badge: "O(n)",
    difficulty: "Beginner",
    tagline: "Sequentially checks every element in the collection until the target is found or list ends.",
    overview:
      "Linear Search is the simplest search algorithm. It scans through elements one by one from beginning to end without requiring the data to be ordered or sorted.",
    whenToUse: "For small, unsorted arrays or when data arrives as a stream where pre-sorting is impractical.",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)"
    },
    spaceComplexity: "O(1) Auxiliary",
    stability: "N/A",
    inPlace: "Yes",
    howItWorks: [
      "Start at index i = 0.",
      "Compare arr[i] with target.",
      "If arr[i] == target: return index i.",
      "Otherwise increment i and check next element.",
      "If end of array is reached, target is not present."
    ],
    code: {
      pseudocode: `function linearSearch(arr, target):
  for i from 0 to length(arr) - 1:
    if arr[i] == target:
      return i // found
  return -1 // not found`,
      python: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1`,
      cpp: `int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`
    }
  },
  {
    id: "stack",
    name: "Stack Data Structure",
    category: "linear-structures",
    categoryLabel: "Data Structures",
    badge: "O(1) Ops",
    difficulty: "Beginner",
    tagline: "Last-In, First-Out (LIFO) linear collection where additions and removals occur exclusively at the top.",
    overview:
      "A Stack is an abstract data type adhering to the Last-In, First-Out (LIFO) principle. Think of a stack of physical plates: you can only push a new plate onto the top, and when you need one, you pop it from the top. It is the fundamental mechanism driving execution call stacks, recursion, undo/redo buffers, and expression parsing.",
    whenToUse: "Function call management, syntax validation (balanced parentheses), evaluating postfix/prefix notations, and backtracking algorithms.",
    timeComplexity: {
      best: "O(1) Push/Pop",
      average: "O(1) Push/Pop",
      worst: "O(1) Push/Pop"
    },
    spaceComplexity: "O(n) Capacity",
    stability: "N/A",
    inPlace: "Yes",
    howItWorks: [
      "Initialize an empty container and pointer top = -1.",
      "Push operation: increment top and insert new element at top.",
      "Pop operation: inspect element at top, remove it, and decrement top.",
      "Peek operation: read element at top without removing it.",
      "Overflow/Underflow: check if stack is full before pushing, or empty before popping."
    ],
    code: {
      pseudocode: `class Stack:
  items = []

  function push(val):
    items.append(val)

  function pop():
    if isEmpty(): error "Underflow"
    return items.removeLast()

  function peek():
    if isEmpty(): return null
    return items[length - 1]

  function isEmpty():
    return length(items) == 0`,
      python: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, val):
        self.items.append(val)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("Pop from empty stack")

    def peek(self):
        return self.items[-1] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0`,
      cpp: `class Stack {
private:
    vector<int> items;
public:
    void push(int val) { items.push_back(val); }
    int pop() {
        if (items.empty()) throw runtime_error("Underflow");
        int top = items.back();
        items.pop_back();
        return top;
    }
    int peek() const { return items.empty() ? -1 : items.back(); }
    bool isEmpty() const { return items.empty(); }
};`,
      java: `public class Stack {
    private ArrayList<Integer> items = new ArrayList<>();

    public void push(int val) { items.add(val); }
    public int pop() {
        if (items.isEmpty()) throw new IllegalStateException("Underflow");
        return items.remove(items.size() - 1);
    }
    public int peek() {
        return items.isEmpty() ? -1 : items.get(items.size() - 1);
    }
    public boolean isEmpty() { return items.isEmpty(); }
}`
    }
  },
  {
    id: "queue",
    name: "Queue Data Structure",
    category: "linear-structures",
    categoryLabel: "Data Structures",
    badge: "O(1) Ops",
    difficulty: "Beginner",
    tagline: "First-In, First-Out (FIFO) sequential collection where elements enqueue at rear and dequeue from front.",
    overview:
      "A Queue operates under the First-In, First-Out (FIFO) rule, exactly like waiting in line at a ticket counter: the first person to join the queue is the first to be served. Queues are indispensable for asynchronous request handling, BFS tree/graph traversals, print spooling, and CPU task scheduling.",
    whenToUse: "Breadth-First Search (BFS), buffering streaming packets, job schedulers, and rate limiters.",
    timeComplexity: {
      best: "O(1) Enqueue/Dequeue",
      average: "O(1) Enqueue/Dequeue",
      worst: "O(1) Enqueue/Dequeue"
    },
    spaceComplexity: "O(n) Capacity",
    stability: "N/A",
    inPlace: "Yes",
    howItWorks: [
      "Maintain two pointers: front (removal point) and rear (insertion point).",
      "Enqueue: place the incoming element at rear and advance rear pointer.",
      "Dequeue: extract element at front and advance front pointer.",
      "Peek: read the front-most item without modifying the queue.",
      "Empty state: front == rear or size == 0."
    ],
    code: {
      pseudocode: `class Queue:
  items = []

  function enqueue(val):
    items.append(val)

  function dequeue():
    if isEmpty(): error "Underflow"
    return items.removeFirst()

  function peek():
    if isEmpty(): return null
    return items[0]

  function isEmpty():
    return length(items) == 0`,
      python: `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, val):
        self.items.append(val)

    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        raise IndexError("Dequeue from empty queue")

    def peek(self):
        return self.items[0] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0`,
      cpp: `#include <queue>
class Queue {
private:
    std::queue<int> q;
public:
    void enqueue(int val) { q.push(val); }
    int dequeue() {
        if (q.empty()) throw runtime_error("Underflow");
        int front = q.front();
        q.pop();
        return front;
    }
    int peek() const { return q.empty() ? -1 : q.front(); }
    bool isEmpty() const { return q.empty(); }
};`,
      java: `import java.util.LinkedList;
public class Queue {
    private LinkedList<Integer> q = new LinkedList<>();

    public void enqueue(int val) { q.addLast(val); }
    public int dequeue() {
        if (q.isEmpty()) throw new IllegalStateException("Underflow");
        return q.removeFirst();
    }
    public int peek() { return q.isEmpty() ? -1 : q.getFirst(); }
    public boolean isEmpty() { return q.isEmpty(); }
}`
    }
  },
  {
    id: "binary-search-tree",
    name: "Binary Search Tree (BST)",
    category: "trees",
    categoryLabel: "Tree Structures",
    badge: "O(log n) Avg",
    difficulty: "Intermediate",
    tagline: "Hierarchical node structure where left subtree holds smaller keys and right subtree holds larger keys.",
    overview:
      "A Binary Search Tree (BST) is a binary tree where every node satisfies the BST invariant: all keys in its left subtree are strictly less than the node's key, and all keys in its right subtree are strictly greater. This property yields efficient O(log n) average search, insertion, and deletion while supporting sorted Inorder traversals.",
    whenToUse: "Dynamic symbol tables, autocomplete dictionaries, priority indexes, and range query lookups.",
    timeComplexity: {
      best: "O(log n)",
      average: "O(log n)",
      worst: "O(n) Unbalanced"
    },
    spaceComplexity: "O(n) Storage",
    stability: "N/A",
    inPlace: "Yes",
    howItWorks: [
      "Root: top-most node of the tree.",
      "Insertion: compare new value with current node. If smaller, descend left; if larger, descend right until an empty spot is reached.",
      "Search: follow left/right branches matching the key until found or reaching null.",
      "Inorder Traversal: Left -> Root -> Right yields all keys in sorted ascending order.",
      "Preorder: Root -> Left -> Right (great for tree serialization).",
      "Postorder: Left -> Right -> Root (ideal for bottom-up deletion)."
    ],
    code: {
      pseudocode: `class Node:
  key, left = null, right = null

function insert(root, val):
  if root is null: return new Node(val)
  if val < root.key:
    root.left = insert(root.left, val)
  else if val > root.key:
    root.right = insert(root.right, val)
  return root

function inorder(root):
  if root is null: return
  inorder(root.left)
  print(root.key)
  inorder(root.right)`,
      python: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def inorder(root):
    if root:
        inorder(root.left)
        print(root.key, end=' ')
        inorder(root.right)`,
      cpp: `struct Node {
    int key;
    Node *left = nullptr, *right = nullptr;
    Node(int val) : key(val) {}
};

Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->key) root->left = insert(root->left, val);
    else if (val > root->key) root->right = insert(root->right, val);
    return root;
}
void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->key << " ";
    inorder(root->right);
}`,
      java: `class Node {
    int key;
    Node left, right;
    Node(int val) { key = val; }
}

public class BST {
    Node insert(Node root, int val) {
        if (root == null) return new Node(val);
        if (val < root.key) root.left = insert(root.left, val);
        else if (val > root.key) root.right = insert(root.right, val);
        return root;
    }
    void inorder(Node root) {
        if (root == null) return;
        inorder(root.left);
        System.out.print(root.key + " ");
        inorder(root.right);
    }
}`
    }
  },
  {
    id: "graph-bfs",
    name: "Breadth-First Search (BFS)",
    category: "graphs",
    categoryLabel: "Graph Algorithms",
    badge: "O(V + E)",
    difficulty: "Intermediate",
    tagline: "Explores vertices level-by-level using a queue, guaranteeing the shortest path in unweighted graphs.",
    overview:
      "Breadth-First Search (BFS) is a graph traversal algorithm that visits vertices in increasing order of their distance from the source. It starts at a chosen source vertex, explores all its immediate neighbors (level 1), then explores all neighbors of those neighbors (level 2), utilizing a FIFO Queue to govern exploration.",
    whenToUse: "Finding the shortest path in unweighted graphs, peer-to-peer network discovery, web crawlers, and finding connected components.",
    timeComplexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)"
    },
    spaceComplexity: "O(V) Queue & Visited",
    stability: "N/A",
    inPlace: "No",
    howItWorks: [
      "Enqueue the starting node and mark it as visited.",
      "While queue is not empty: dequeue current vertex u.",
      "Process vertex u.",
      "For every unvisited adjacent neighbor v of u: mark v as visited and enqueue v.",
      "Guarantees that when a node is visited, it has been reached via the fewest possible edges."
    ],
    code: {
      pseudocode: `function bfs(graph, start):
  visited = set()
  queue = [start]
  visited.add(start)

  while queue is not empty:
    curr = queue.pop(0)
    process(curr)
    for neighbor in graph[curr]:
      if neighbor not in visited:
        visited.add(neighbor)
        queue.append(neighbor)`,
      python: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])

    while queue:
        curr = queue.popleft()
        print(f"Visited: {curr}")
        for neighbor in graph[curr]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
      cpp: `void bfs(const unordered_map<int, vector<int>>& adj, int start) {
    unordered_set<int> visited;
    queue<int> q;
    visited.insert(start);
    q.push(start);

    while (!q.empty()) {
        int curr = q.front(); q.pop();
        cout << curr << " ";
        for (int neighbor : adj.at(curr)) {
            if (!visited.count(neighbor)) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
}`,
      java: `public static void bfs(Map<Integer, List<Integer>> adj, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> q = new LinkedList<>();
    visited.add(start);
    q.add(start);

    while (!q.isEmpty()) {
        int curr = q.poll();
        System.out.print(curr + " ");
        for (int neighbor : adj.getOrDefault(curr, List.of())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                q.add(neighbor);
            }
        }
    }
}`
    }
  },
  {
    id: "graph-dfs",
    name: "Depth-First Search (DFS)",
    category: "graphs",
    categoryLabel: "Graph Algorithms",
    badge: "O(V + E)",
    difficulty: "Intermediate",
    tagline: "Explores as deep as possible along each branch before backtracking, using recursion or an explicit stack.",
    overview:
      "Depth-First Search (DFS) traverses a graph by plunging as deeply as possible along each branch before backtracking. It visits a vertex, dives into the first available unvisited neighbor, and keeps going until reaching a dead end, then unwinds and tries the next branch. It powers topological sorting, cycle detection, and maze solving.",
    whenToUse: "Topological sorting in DAGs, cycle detection, solving mazes/puzzles, and strongly connected components (Kosaraju's/Tarjan's).",
    timeComplexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)"
    },
    spaceComplexity: "O(V) Recursion Stack",
    stability: "N/A",
    inPlace: "No",
    howItWorks: [
      "Start at vertex u and mark it visited.",
      "Iterate through each neighbor v of u.",
      "If v is unvisited: recursively call DFS(v).",
      "When all neighbors of u are explored, backtrack to the predecessor.",
      "Repeats until all reachable nodes from the start are discovered."
    ],
    code: {
      pseudocode: `function dfs(graph, curr, visited):
  visited.add(curr)
  process(curr)

  for neighbor in graph[curr]:
    if neighbor not in visited:
      dfs(graph, neighbor, visited)`,
      python: `def dfs(graph, curr, visited=None):
    if visited is None:
        visited = set()
    visited.add(curr)
    print(f"Visited: {curr}")

    for neighbor in graph[curr]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited`,
      cpp: `void dfs(const unordered_map<int, vector<int>>& adj, int curr, unordered_set<int>& visited) {
    visited.insert(curr);
    cout << curr << " ";
    for (int neighbor : adj.at(curr)) {
        if (!visited.count(neighbor)) {
            dfs(adj, neighbor, visited);
        }
    }
}`,
      java: `public static void dfs(Map<Integer, List<Integer>> adj, int curr, Set<Integer> visited) {
    visited.add(curr);
    System.out.print(curr + " ");
    for (int neighbor : adj.getOrDefault(curr, List.of())) {
        if (!visited.contains(neighbor)) {
            dfs(adj, neighbor, visited);
        }
    }
}`
    }
  },
  {
    id: "jump-search",
    name: "Jump Search",
    category: "searching",
    categoryLabel: "Searching",
    badge: "O(√n)",
    difficulty: "Beginner",
    tagline: "Searches sorted arrays by skipping ahead in fixed blocks of √n, then performing linear search backwards.",
    overview:
      "Jump Search is an intermediate searching algorithm for sorted arrays. Instead of inspecting elements one-by-one (O(n)) or jumping all over the array (O(log n)), it skips ahead in fixed blocks of optimal step size m = √n. Once a block is found where arr[block] > target, it performs a localized linear search backwards to find the exact target.",
    whenToUse: "When binary search jumping is expensive (e.g. system seeks on magnetic tapes, or jumping forward is cheaper than jumping backward).",
    timeComplexity: {
      best: "O(1)",
      average: "O(√n)",
      worst: "O(√n)"
    },
    spaceComplexity: "O(1) Auxiliary",
    stability: "N/A",
    inPlace: "Yes",
    howItWorks: [
      "Compute block step size: step = floor(√n).",
      "Jump forward: compare arr[min(step, n) - 1] with target.",
      "If element < target: record previous boundary and jump forward by step.",
      "Repeat until arr[step] >= target or end of array is reached.",
      "Perform linear search starting from previous boundary up to step.",
      "If element is found, return index; otherwise, target is not present."
    ],
    code: {
      pseudocode: `function jumpSearch(arr, target):
  n = length(arr)
  step = floor(sqrt(n))
  prev = 0

  while arr[min(step, n) - 1] < target:
    prev = step
    step += floor(sqrt(n))
    if prev >= n: return -1

  while arr[prev] < target:
    prev++
    if prev == min(step, n): return -1

  if arr[prev] == target: return prev
  return -1`,
      python: `import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0

    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1

    while arr[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1

    return prev if arr[prev] == target else -1`,
      cpp: `int jumpSearch(const vector<int>& arr, int target) {
    int n = arr.size();
    int step = sqrt(n);
    int prev = 0;
    while (arr[min(step, n) - 1] < target) {
        prev = step;
        step += sqrt(n);
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == min(step, n)) return -1;
    }
    return arr[prev] == target ? prev : -1;
}`,
      java: `public static int jumpSearch(int[] arr, int target) {
    int n = arr.length;
    int step = (int) Math.floor(Math.sqrt(n));
    int prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += (int) Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == Math.min(step, n)) return -1;
    }
    return arr[prev] == target ? prev : -1;
}`
    }
  },
  {
    id: "exponential-search",
    name: "Exponential Search",
    category: "searching",
    categoryLabel: "Searching",
    badge: "O(log n)",
    difficulty: "Intermediate",
    tagline: "Finds the search range by exponentially doubling bounds (1, 2, 4, 8, ...), then runs binary search.",
    overview:
      "Exponential Search finds the range in which the target element resides by checking indices at powers of 2 (1, 2, 4, 8, 16...). Once an index i is reached where arr[i] >= target, it performs a Binary Search between range [i/2 .. min(i, n - 1)]. It is especially useful for unbounded, infinite, or streaming sorted collections.",
    whenToUse: "Searching in unbounded or streamed sorted datasets where the array length is unknown beforehand, or when target is likely near the start.",
    timeComplexity: {
      best: "O(1)",
      average: "O(log i)",
      worst: "O(log n)"
    },
    spaceComplexity: "O(1) Auxiliary",
    stability: "N/A",
    inPlace: "Yes",
    howItWorks: [
      "Check if first element arr[0] == target.",
      "Initialize boundary i = 1.",
      "While i < n and arr[i] <= target: double the bound i = i * 2.",
      "Perform Binary Search in subarray range [i/2 .. min(i, n - 1)].",
      "Return discovered index or -1 if absent."
    ],
    code: {
      pseudocode: `function exponentialSearch(arr, target):
  if arr[0] == target: return 0
  n = length(arr)
  i = 1
  while i < n and arr[i] <= target:
    i = i * 2
  return binarySearch(arr, target, i / 2, min(i, n - 1))`,
      python: `def exponential_search(arr, target):
    if not arr: return -1
    if arr[0] == target: return 0
    n = len(arr)
    i = 1
    while i < n and arr[i] <= target:
        i *= 2
    # Binary search within [i // 2, min(i, n - 1)]
    low, high = i // 2, min(i, n - 1)
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1`,
      cpp: `int exponentialSearch(const vector<int>& arr, int target) {
    if (arr.empty()) return -1;
    if (arr[0] == target) return 0;
    int n = arr.size(), i = 1;
    while (i < n && arr[i] <= target) i *= 2;
    int l = i / 2, r = min(i, n - 1);
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == target) return m;
        if (arr[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
      java: `public static int exponentialSearch(int[] arr, int target) {
    if (arr.length == 0) return -1;
    if (arr[0] == target) return 0;
    int n = arr.length, i = 1;
    while (i < n && arr[i] <= target) i *= 2;
    int l = i / 2, r = Math.min(i, n - 1);
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == target) return m;
        if (arr[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`
    }
  },
  {
    id: "linked-list",
    name: "Singly Linked List",
    category: "linear-structures",
    categoryLabel: "Data Structures",
    badge: "O(1) Head",
    difficulty: "Beginner",
    tagline: "Sequential collection of nodes where each node stores a data value and a pointer reference to the next node.",
    overview:
      "A Singly Linked List is a linear data structure whose elements are not stored at contiguous memory locations. Instead, each node consists of two parts: a data field and a 'next' reference pointing to the memory address of the subsequent node. This enables O(1) dynamic insertions and deletions at the head without memory reallocations.",
    whenToUse: "When frequent insertions and deletions at arbitrary positions are needed, or when memory availability is non-contiguous.",
    timeComplexity: {
      best: "O(1) Prepend",
      average: "O(n) Access",
      worst: "O(n) Search"
    },
    spaceComplexity: "O(n) Nodes",
    stability: "N/A",
    inPlace: "Yes",
    howItWorks: [
      "Head: pointer holding reference to the initial node.",
      "Insert at Head: create new node, point its next to current head, update head = new node (O(1)).",
      "Insert at Tail: traverse list to last node (where next == null) and attach new node (O(n)).",
      "Delete: adjust predecessor's next pointer to bypass target node.",
      "Traversal: iterate pointer curr = curr.next until reaching null."
    ],
    code: {
      pseudocode: `class Node:
  val, next = null

class LinkedList:
  head = null

  function prepend(val):
    newNode = Node(val)
    newNode.next = head
    head = newNode

  function delete(val):
    if head.val == val: head = head.next; return
    curr = head
    while curr.next and curr.next.val != val:
      curr = curr.next
    if curr.next: curr.next = curr.next.next`,
      python: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def prepend(self, val):
        new_node = Node(val)
        new_node.next = self.head
        self.head = new_node

    def delete(self, val):
        if not self.head: return
        if self.head.val == val:
            self.head = self.head.next
            return
        curr = self.head
        while curr.next and curr.next.val != val:
            curr = curr.next
        if curr.next:
            curr.next = curr.next.next`,
      cpp: `struct Node {
    int val;
    Node* next = nullptr;
    Node(int v) : val(v) {}
};

class LinkedList {
public:
    Node* head = nullptr;
    void prepend(int val) {
        Node* node = new Node(val);
        node->next = head;
        head = node;
    }
    void remove(int val) {
        if (!head) return;
        if (head->val == val) { head = head->next; return; }
        Node* curr = head;
        while (curr->next && curr->next->val != val) curr = curr->next;
        if (curr->next) curr->next = curr->next->next;
    }
};`,
      java: `class Node {
    int val;
    Node next;
    Node(int v) { val = v; }
}

public class LinkedList {
    Node head;
    public void prepend(int val) {
        Node node = new Node(val);
        node.next = head;
        head = node;
    }
    public void delete(int val) {
        if (head == null) return;
        if (head.val == val) { head = head.next; return; }
        Node curr = head;
        while (curr.next != null && curr.next.val != val) curr = curr.next;
        if (curr.next != null) curr.next = curr.next.next;
    }
}`
    }
  },
  {
    id: "avl-tree",
    name: "AVL Tree (Self-Balancing BST)",
    category: "trees",
    categoryLabel: "Tree Structures",
    badge: "O(log n) Strict",
    difficulty: "Advanced",
    tagline: "Height-balanced Binary Search Tree that executes rotations to prevent O(n) degeneration.",
    overview:
      "An AVL Tree (named after inventors Adelson-Velsky and Landis) is a self-balancing Binary Search Tree. For every node, the heights of its left and right subtrees differ by at most 1 (Balance Factor in {-1, 0, 1}). Whenever an insertion or deletion violates this invariant, four rotation types (LL, RR, LR, RL) restore balance in O(1) time.",
    whenToUse: "Databases, lookup tables, and graphics rendering where lookup frequency vastly exceeds insertion frequency.",
    timeComplexity: {
      best: "O(log n)",
      average: "O(log n)",
      worst: "O(log n) Strict"
    },
    spaceComplexity: "O(n) Storage",
    stability: "N/A",
    inPlace: "Yes",
    howItWorks: [
      "Balance Factor: height(left_subtree) - height(right_subtree).",
      "Left-Left (LL) Heavy: perform a single Right Rotation around the unbalanced node.",
      "Right-Right (RR) Heavy: perform a single Left Rotation around the unbalanced node.",
      "Left-Right (LR) Heavy: Left Rotate left child, then Right Rotate node.",
      "Right-Left (RL) Heavy: Right Rotate right child, then Left Rotate node.",
      "Guarantees maximum tree height <= 1.44 log2(n), preventing degradation into linked lists."
    ],
    code: {
      pseudocode: `function rightRotate(y):
  x = y.left
  T2 = x.right
  x.right = y
  y.left = T2
  updateHeights(y, x)
  return x

function leftRotate(x):
  y = x.right
  T2 = y.left
  y.left = x
  x.right = T2
  updateHeights(x, y)
  return y`,
      python: `class AVLNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

def right_rotate(y):
    x = y.left
    T2 = x.right
    x.right = y
    y.left = T2
    y.height = 1 + max(get_h(y.left), get_h(y.right))
    x.height = 1 + max(get_h(x.left), get_h(x.right))
    return x`,
      cpp: `int getBalance(Node* N) {
    if (!N) return 0;
    return height(N->left) - height(N->right);
}`,
      java: `int getBalance(Node N) {
    if (N == null) return 0;
    return height(N.left) - height(N.right);
}`
    }
  },
  {
    id: "binary-heap",
    name: "Binary Heap (Priority Queue)",
    category: "trees",
    categoryLabel: "Tree Structures",
    badge: "O(log n) Heapify",
    difficulty: "Intermediate",
    tagline: "Complete binary tree satisfying the heap property, efficiently stored directly in a compact 1D array.",
    overview:
      "A Binary Heap is a complete binary tree that maintains the Heap Invariant: in a Max Heap, every parent node is >= its children; in a Min Heap, every parent is <= its children. Because complete binary trees have zero wasted slots, heaps are stored without pointers in an array: parent(i) = (i-1)/2, left(i) = 2i+1, right(i) = 2i+2.",
    whenToUse: "Priority queues, Dijkstra's algorithm, Huffman coding, and Heap Sort (guaranteed in-place O(n log n)).",
    timeComplexity: {
      best: "O(1) Peek",
      average: "O(log n) Insert/Extract",
      worst: "O(log n)"
    },
    spaceComplexity: "O(1) Auxiliary (In Array)",
    stability: "Unstable",
    inPlace: "Yes",
    howItWorks: [
      "Insert: append element to array end (bottom of tree), then Heapify-Up (bubble up until parent >= child).",
      "Extract Max: swap root with last item, remove last item, then Heapify-Down (sink root down with larger child).",
      "Array representation: index i has children at 2*i + 1 and 2*i + 2.",
      "Build Heap: running heapify-down on non-leaf nodes builds a heap in O(n) linear time."
    ],
    code: {
      pseudocode: `function heapifyDown(arr, n, i):
  largest = i
  l = 2 * i + 1
  r = 2 * i + 2
  if l < n and arr[l] > arr[largest]: largest = l
  if r < n and arr[r] > arr[largest]: largest = r
  if largest != i:
    swap(arr[i], arr[largest])
    heapifyDown(arr, n, largest)`,
      python: `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
      cpp: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i, l = 2*i + 1, r = 2*i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}`,
      java: `void heapify(int[] arr, int n, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;
        heapify(arr, n, largest);
    }
}`
    }
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Shortest Path",
    category: "graphs",
    categoryLabel: "Graph Algorithms",
    badge: "O((V + E) log V)",
    difficulty: "Advanced",
    tagline: "Finds the shortest distance from a single source vertex to all other vertices in a non-negative weighted graph.",
    overview:
      "Dijkstra's Algorithm is a greedy shortest-path algorithm for graphs with non-negative edge weights. It maintains tentative distances from the source to every vertex, repeatedly extracts the unvisited vertex with the minimum distance using a priority queue, and 'relaxes' its outgoing edges to discover shorter paths.",
    whenToUse: "GPS navigation systems (Google Maps, OpenStreetMap), IP routing protocols (OSPF, IS-IS), and flight connection schedulers.",
    timeComplexity: {
      best: "O((V + E) log V)",
      average: "O((V + E) log V)",
      worst: "O(V² ) with Matrix"
    },
    spaceComplexity: "O(V) Distance Map & PQ",
    stability: "N/A",
    inPlace: "No",
    howItWorks: [
      "Initialize dist[src] = 0, dist[v] = ∞ for all other vertices.",
      "Insert (dist=0, src) into a Priority Queue.",
      "While PQ is not empty: extract vertex u with minimal dist.",
      "For each weighted neighbor (v, weight) of u: if dist[u] + weight < dist[v], update dist[v] and push into PQ.",
      "Terminates when all reachable vertices have finalized shortest paths."
    ],
    code: {
      pseudocode: `function dijkstra(graph, src):
  dist = {v: infinity for v in graph}
  dist[src] = 0
  pq = PriorityQueue([(0, src)])

  while pq is not empty:
    d, u = pq.extractMin()
    if d > dist[u]: continue
    for v, weight in graph[u]:
      if dist[u] + weight < dist[v]:
        dist[v] = dist[u] + weight
        pq.insert((dist[v], v))
  return dist`,
      python: `import heapq

def dijkstra(graph, src):
    dist = {node: float('inf') for node in graph}
    dist[src] = 0
    pq = [(0, src)]

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    return dist`,
      cpp: `vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int src) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    vector<int> dist(V, 1e9);
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      java: `public int[] dijkstra(int V, List<List<int[]>> adj, int src) {
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    pq.add(new int[]{0, src});
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        if (d > dist[u]) continue;
        for (int[] edge : adj.get(u)) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.add(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}`
    }
  }
];


