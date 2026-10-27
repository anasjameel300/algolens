import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Shuffle,
  TrendingDown,
  Edit3,
  Clock,
  ArrowDown,
  Code2,
  BookOpen,
  Activity,
  HelpCircle,
  AlertTriangle,
  Server,
  Sun,
  Moon,
  CheckCircle2,
  XCircle,
  Search
} from 'lucide-react';
import { StackVisualizer } from './StackVisualizer';
import { QueueVisualizer } from './QueueVisualizer';
import { LinkedListVisualizer } from './LinkedListVisualizer';
import { TreeVisualizer } from './TreeVisualizer';
import { HeapVisualizer } from './HeapVisualizer';
import { GraphVisualizer } from './GraphVisualizer';

const KNOWLEDGE_CHECKS = {
  'bubble-sort': {
    question: 'Under what condition does Bubble Sort run in its best-case O(n) time?',
    options: [
      { text: 'When the array is already sorted in ascending order', correct: true },
      { text: 'When the array is sorted in reverse order', correct: false },
      { text: 'When all array elements are distinct prime numbers', correct: false },
      { text: 'When the array size is a power of 2', correct: false }
    ],
    explanation: 'With an early termination flag, if zero swaps occur during pass 1, the algorithm verifies the array is already sorted and finishes in O(n) comparisons.'
  },
  'selection-sort': {
    question: 'Why is standard Selection Sort considered an UNSTABLE sorting algorithm?',
    options: [
      { text: 'Long-distance swaps can jump an equal element past an identical one', correct: true },
      { text: 'It uses auxiliary memory proportional to O(n)', correct: false },
      { text: 'It fails when negative integers are present', correct: false },
      { text: 'It changes execution time depending on initial element ordering', correct: false }
    ],
    explanation: 'When swapping the minimum element into place, it can jump past an identical element earlier in the array, destroying original relative order (e.g. [4a, 4b, 1] becomes [1, 4b, 4a]).'
  },
  'insertion-sort': {
    question: 'Why do production engines like Python’s Timsort use Insertion Sort for small slices (< 32 elements)?',
    options: [
      { text: 'Low constant overhead, high CPU cache locality, and near O(n) speed on partially sorted data', correct: true },
      { text: 'It has an absolute asymptotic worst-case guarantee of O(log n)', correct: false },
      { text: 'It requires zero comparisons on arrays with even length', correct: false },
      { text: 'It can run in parallel without locking memory', correct: false }
    ],
    explanation: 'Insertion Sort has minimal instructions and cache misses on small subarrays, making it the ideal base case for hybrid algorithms like Timsort.'
  },
  'merge-sort': {
    question: 'What is the primary operational trade-off of standard Merge Sort compared to Quick Sort?',
    options: [
      { text: 'It requires O(n) auxiliary memory to merge two sorted halves', correct: true },
      { text: 'Its worst-case time complexity degrades to O(n²)', correct: false },
      { text: 'It cannot preserve the relative order of duplicate elements', correct: false },
      { text: 'It only works if the array length is an exact power of 2', correct: false }
    ],
    explanation: 'Standard Merge Sort allocates temporary buffer space of size O(n) during the merge phase, which incurs extra memory allocation and cache overhead on large datasets.'
  },
  'quick-sort': {
    question: 'What causes Quick Sort to degrade to its catastrophic O(n²) worst-case time?',
    options: [
      { text: 'Unbalanced partitions where the chosen pivot is always the extreme minimum or maximum', correct: true },
      { text: 'Having an array with more than 1,000,000 elements', correct: false },
      { text: 'Using recursion instead of an iterative loop', correct: false },
      { text: 'Sorting floating-point numbers instead of integers', correct: false }
    ],
    explanation: 'If the pivot always ends up at one extreme (e.g. sorted input with first element pivot), partitions have sizes 0 and n-1, producing n recursion levels instead of log(n).'
  },
  'binary-search': {
    question: 'Why should you calculate midpoint as `low + (high - low) / 2` instead of `(low + high) / 2`?',
    options: [
      { text: 'To prevent integer 32-bit arithmetic overflow when `low + high` exceeds 2³¹ - 1', correct: true },
      { text: 'Because integer division truncates negative numbers unpredictably', correct: false },
      { text: 'It speeds up CPU pipeline branch prediction by 50%', correct: false },
      { text: 'To ensure the midpoint index is always an odd number', correct: false }
    ],
    explanation: 'In languages with fixed-width integers (Java, C, C++), adding two large 32-bit integers can overflow into a negative value, causing an out-of-bounds index crash.'
  },
  'linear-search': {
    question: 'When is Linear Search preferred over Binary Search?',
    options: [
      { text: 'When the collection is unsorted or stored in an unindexed singly linked list', correct: true },
      { text: 'When the collection contains more than 10,000,000 items', correct: false },
      { text: 'When you need O(1) guaranteed lookup time', correct: false },
      { text: 'Only when running on 32-bit hardware architectures', correct: false }
    ],
    explanation: 'Binary Search strictly requires random access (O(1) index lookup) and pre-sorted data. Linear Search works on arbitrary unsorted sequences and stream inputs.'
  },
  'jump-search': {
    question: 'What is the mathematically optimal jump block size (m) for an array of size n in Jump Search?',
    options: [
      { text: 'm = √n', correct: true },
      { text: 'm = n / 2', correct: false },
      { text: 'm = log₂(n)', correct: false },
      { text: 'm = n / 4', correct: false }
    ],
    explanation: 'The total operations are (n/m) jumps + (m - 1) linear steps. Differentiating with respect to m yields the minimum when m = √n, achieving O(√n) time complexity.'
  },
  'exponential-search': {
    question: 'What is the primary advantage of Exponential Search over standard Binary Search?',
    options: [
      { text: 'It excels on unbounded or infinite arrays where total length is unknown beforehand', correct: true },
      { text: 'It achieves O(1) best-case and O(1) worst-case time', correct: false },
      { text: 'It does not require the input array to be sorted', correct: false },
      { text: 'It works on cyclic linked lists without terminating', correct: false }
    ],
    explanation: 'Exponential search doubles its step (1, 2, 4, 8, 16...) until bounding the target, making it ideal for streaming APIs and infinite sequences where array length cannot be queried.'
  },
  'stack': {
    question: 'Which real-world software mechanism is directly powered by a LIFO Stack?',
    options: [
      { text: 'Browser back/forward history, undo/redo buffers, and the CPU call stack', correct: true },
      { text: 'Printer job scheduling and round-robin CPU thread dispatching', correct: false },
      { text: 'Hash map bucket collision resolution via chaining', correct: false },
      { text: 'Dijkstra shortest path edge relaxation tracking', correct: false }
    ],
    explanation: 'Stacks enforce Last-In, First-Out (LIFO), which maps 1:1 to function invocation return addresses, recursive backtracking, and editor undo histories.'
  },
  'queue': {
    question: 'In which graph traversal algorithm is a FIFO Queue an indispensable component?',
    options: [
      { text: 'Breadth-First Search (BFS)', correct: true },
      { text: 'Depth-First Search (DFS)', correct: false },
      { text: 'Binary Search', correct: false },
      { text: 'Quick Sort partitioning', correct: false }
    ],
    explanation: 'BFS explores graph or tree vertices level-by-level. A FIFO queue guarantees vertices discovered at level k are visited before vertices at level k+1.'
  },
  'linked-list': {
    question: 'What is the time complexity to insert a new node at the very beginning (HEAD) of a Singly Linked List?',
    options: [
      { text: 'O(1) Constant Time', correct: true },
      { text: 'O(n) Linear Time', correct: false },
      { text: 'O(log n) Logarithmic Time', correct: false },
      { text: 'O(n²) Quadratic Time', correct: false }
    ],
    explanation: 'Prepending only requires creating a node, setting `newNode.next = head`, and updating `head = newNode`. Zero elements need to be shifted in memory.'
  },
  'binary-search-tree': {
    question: 'What is the worst-case time complexity of searching an unbalanced Binary Search Tree (BST)?',
    options: [
      { text: 'O(n) — if keys are inserted in sorted order, forming a degenerate linked list', correct: true },
      { text: 'O(log n) guaranteed under all insertion sequences', correct: false },
      { text: 'O(1) constant time hash lookup', correct: false },
      { text: 'O(n log n) divide-and-conquer time', correct: false }
    ],
    explanation: 'Without balancing rotations, inserting keys sequentially creates a skewed single branch equivalent to a linked list, degrading search from O(log n) to O(n).'
  },
  'avl-tree': {
    question: 'What is the strict balance factor condition enforced by every node in an AVL tree?',
    options: [
      { text: 'Balance factor BF = Height(Left) - Height(Right) must be in {-1, 0, +1}', correct: true },
      { text: 'Both subtrees must contain an identical count of total elements', correct: false },
      { text: 'Every leaf node must be at exactly the same depth from the root', correct: false },
      { text: 'The root must always hold the arithmetic median of all keys', correct: false }
    ],
    explanation: 'An AVL tree strictly requires that for every node, the height difference between left and right subtrees is at most 1. Violations are instantly resolved via single or double rotations.'
  },
  'binary-heap': {
    question: 'In a 0-indexed binary heap array, what are the left and right children indices of node i?',
    options: [
      { text: 'Left = 2i + 1, Right = 2i + 2', correct: true },
      { text: 'Left = 2i, Right = 2i + 1', correct: false },
      { text: 'Left = i / 2, Right = (i + 1) / 2', correct: false },
      { text: 'Left = i + 1, Right = i + 2', correct: false }
    ],
    explanation: 'For a 0-indexed complete binary tree, the left child is always at 2i + 1 and the right child is at 2i + 2. The parent is found at Math.floor((i - 1) / 2).'
  },
  'graph-bfs': {
    question: 'Which shortest path property is guaranteed by Breadth-First Search (BFS)?',
    options: [
      { text: 'Finds the shortest path in terms of number of edges on unweighted graphs', correct: true },
      { text: 'Finds the minimum weight path on graphs with arbitrary negative weights', correct: false },
      { text: 'Always finds the minimum spanning tree of a graph', correct: false },
      { text: 'Identifies all topological sorts of a directed graph simultaneously', correct: false }
    ],
    explanation: 'Because BFS expands outward level-by-level, the first time a target vertex is reached, the path taken is guaranteed to have the minimum possible number of edges.'
  },
  'graph-dfs': {
    question: 'Which problem is best solved using Depth-First Search (DFS)?',
    options: [
      { text: 'Detecting cycles in a graph, topological sorting, and maze solving', correct: true },
      { text: 'Finding shortest path on weighted road networks', correct: false },
      { text: 'Distributing web server load in round-robin fashion', correct: false },
      { text: 'Finding minimum spanning tree in O(1) time', correct: false }
    ],
    explanation: 'DFS explores as deep as possible along each branch before backtracking, making it the standard algorithm for cycle detection (back edges) and topological sorting.'
  },
  'dijkstra': {
    question: 'Under what crucial condition does Dijkstra’s Algorithm FAIL to find the shortest path?',
    options: [
      { text: 'When the graph contains negative edge weights', correct: true },
      { text: 'When the graph is a directed acyclic graph (DAG)', correct: false },
      { text: 'When the graph has more than 100 vertices', correct: false },
      { text: 'When edge weights are floating-point numbers', correct: false }
    ],
    explanation: 'Dijkstra assumes that adding an edge to a path can never decrease its total cost (greedy property). Negative weights violate this invariant, requiring the Bellman-Ford algorithm.'
  }
};

const INTERVIEW_TIPS = {
  'bubble-sort': {
    trap: 'Forgetting the early exit boolean flag transforms best case from O(n) to O(n²).',
    system: 'Virtually never used in production software except as an introductory pedagogy demonstration.'
  },
  'selection-sort': {
    trap: 'Mistakenly assuming it is stable. It swaps across non-adjacent elements.',
    system: 'Useful on EE/microcontrollers where EEPROM write operations are extremely costly, because Selection Sort makes at most O(n) swaps.'
  },
  'insertion-sort': {
    trap: 'Thinking it is useless because of O(n²) worst case. In reality, it is blazingly fast on n < 32.',
    system: 'Used in the C++ STL std::sort (Introsort) and Java/Python Arrays.sort (Timsort) for small partitions.'
  },
  'merge-sort': {
    trap: 'Trying to sort arrays in-place with O(1) space. In-place merge sort is complex and has high constant factor.',
    system: 'The default sorting algorithm for Linked Lists and Java’s object collections where stability is mandatory.'
  },
  'quick-sort': {
    trap: 'Always picking arr[0] as pivot, leading to worst-case O(n²) on already sorted inputs.',
    system: 'Powers std::sort in C++, V8 JavaScript engine for primitive types, and high-performance database sorting engines.'
  },
  'binary-search': {
    trap: 'Off-by-one errors with while (low <= high) vs while (low < high) and integer overflow (low+high)/2.',
    system: 'Found in database B-Tree index lookups, Git bisect bug hunting, and IP routing prefix tables.'
  },
  'linear-search': {
    trap: 'Using linear search inside a loop, unintentionally creating an O(n²) bottleneck.',
    system: 'Standard fallback for tiny collections and streaming socket buffers where sorting is impossible.'
  },
  'jump-search': {
    trap: 'Applying jump search to unsorted or backwards-linked structures.',
    system: 'Used when binary search backward seeks are expensive, such as reading blocks sequentially from optical/magnetic media.'
  },
  'exponential-search': {
    trap: 'Assuming array bound is known. The primary purpose is searching when array size is unbounded.',
    system: 'Used in big data streaming pipelines and unbounded file search indexing.'
  },
  'stack': {
    trap: 'Unbounded recursive function calls exceeding stack memory, causing StackOverflowError.',
    system: 'Compilers for AST parsing, parenthesis balancing in IDE linters, browser history stacks.'
  },
  'queue': {
    trap: 'Implementing a queue with a dynamic array without circular pointers, causing O(n) dequeue shifts.',
    system: 'Kafka message brokers, OS task dispatching, printer spoolers, network packet buffers.'
  },
  'linked-list': {
    trap: 'Losing reference to the rest of the list by overwriting curr.next before caching the next node.',
    system: 'LRU cache eviction policies (combined with Hash Map), memory block allocation pools.'
  },
  'binary-search-tree': {
    trap: 'Ignoring skewness. A BST can easily degrade to a linked list if keys arrive sequentially.',
    system: 'Foundation for associative containers, filesystem directory trees, and prefix dictionaries.'
  },
  'avl-tree': {
    trap: 'Forgetting that single rotation is insufficient when child and grandchild have opposite zigzag signs (requires double rotation).',
    system: 'High-lookup databases where read queries vastly outnumber writes, guaranteeing strict O(log n) depth.'
  },
  'binary-heap': {
    trap: 'Confusing a binary heap with a binary search tree. A heap does NOT maintain left < right order; it only maintains parent >= children.',
    system: 'Dijkstra shortest path priority queues, OS scheduler priority timers, Huffman coding compression.'
  },
  'graph-bfs': {
    trap: 'Marking a node as visited after dequeuing instead of when enqueuing, causing duplicate nodes in the queue.',
    system: 'Social network friend suggestions (degrees of separation), web crawlers, GPS unweighted route finding.'
  },
  'graph-dfs': {
    trap: 'Failing to track a visited set in cyclic graphs, causing infinite recursion loops.',
    system: 'Compiler dependency resolution, circuit dead-lock analysis, maze and puzzle solvers.'
  },
  'dijkstra': {
    trap: 'Applying Dijkstra to graphs with negative weights or cycles. Use Bellman-Ford instead.',
    system: 'Google Maps navigation, OSPF (Open Shortest Path First) internet routing protocol.'
  }
};

export function AlgorithmView({
  algorithm,
  frame,
  totalSteps,
  currentStepIndex,
  isPlaying,
  speed,
  searchTarget,
  onSetSearchTarget,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onReset,
  onSeekStep,
  onChangeSpeed,
  onGeneratePreset,
  onOpenCustomModal
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('pseudocode');
  const [copied, setCopied] = useState(false);
  const [canvasTheme, setCanvasTheme] = useState('dark');
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [customTargetInput, setCustomTargetInput] = useState(searchTarget ?? '');

  useEffect(() => {
    if (searchTarget !== null && searchTarget !== undefined) {
      setCustomTargetInput(searchTarget);
    }
  }, [searchTarget]);

  const visualizerSectionRef = useRef(null);
  const codeSectionRef = useRef(null);
  const explanationSectionRef = useRef(null);
  const quizSectionRef = useRef(null);

  if (!algorithm) return null;

  const currentCode = algorithm.code[selectedLanguage] || '';
  const lines = currentCode.split('\n');
  const activeLineNum = frame?.activeLines ? frame.activeLines[selectedLanguage] : null;

  const quiz = KNOWLEDGE_CHECKS[algorithm.id] || {
    question: `What is the worst-case time complexity of ${algorithm.name}?`,
    options: [
      { text: algorithm.timeComplexity?.worst || 'O(n²)', correct: true },
      { text: 'O(1)', correct: false },
      { text: 'O(log n)', correct: false },
      { text: 'O(n!)', correct: false }
    ],
    explanation: `The worst-case complexity of ${algorithm.name} is ${algorithm.timeComplexity?.worst || 'O(n²)'}.`
  };

  const tips = INTERVIEW_TIPS[algorithm.id] || {
    trap: 'Always consider boundary edge cases (empty collections, duplicates, already sorted input).',
    system: 'Fundamental building block in computer science systems.'
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (ref) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuizSelect = (idx) => {
    setSelectedQuizOption(idx);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const array = frame?.array || [];
  const pointerMap = frame?.pointers || {};
  const metrics = frame?.metrics || { comparisons: 0, swaps: 0 };
  const explanation = frame?.explanation || 'Visualizer initialized. Ready to begin.';
  const subExplanation = frame?.subExplanation || '';
  const badge = frame?.badge || 'Ready';

  const maxVal = Math.max(...array.map((item) => item.val), 100);

  return (
    <div className="algorithm-page-container">
      {/* 1. Header Hero Card */}
      <section className="algo-hero-header">
        <div className="hero-top-meta">
          <div className="meta-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="category-pill">{algorithm.categoryLabel}</span>
            <span className="category-pill" style={{ background: '#f5f3fa', color: 'var(--text-secondary)' }}>
              {algorithm.difficulty}
            </span>
            <span className="category-pill" style={{ background: 'var(--accent-purple)', color: '#ffffff', borderColor: 'var(--accent-purple)' }}>
              {algorithm.badge}
            </span>
          </div>

          <div className="quick-jump-links">
            <button className="jump-link-btn" onClick={() => scrollToSection(explanationSectionRef)}>
              <BookOpen size={14} />
              <span>How It Works</span>
            </button>
            <button className="jump-link-btn" onClick={() => scrollToSection(codeSectionRef)}>
              <Code2 size={14} />
              <span>Source Code</span>
            </button>
            <button className="jump-link-btn jump-highlight" onClick={() => scrollToSection(visualizerSectionRef)}>
              <Play size={14} fill="currentColor" />
              <span>Interactive Visualizer</span>
            </button>
          </div>
        </div>

        <h1 className="algo-page-title">{algorithm.name}</h1>
        <p className="algo-page-tagline">{algorithm.tagline}</p>

        {/* Complexity Summary Badges Matrix */}
        <div className="complexity-cards-row">
          <div className="complexity-metric-card">
            <span className="comp-label">Best Case</span>
            <span className="comp-value val-best">{algorithm.timeComplexity.best}</span>
          </div>
          <div className="complexity-metric-card">
            <span className="comp-label">Average Case</span>
            <span className="comp-value val-avg">{algorithm.timeComplexity.average}</span>
          </div>
          <div className="complexity-metric-card">
            <span className="comp-label">Worst Case</span>
            <span className="comp-value val-worst">{algorithm.timeComplexity.worst}</span>
          </div>
          <div className="complexity-metric-card">
            <span className="comp-label">Space Complexity</span>
            <span className="comp-value val-space">{algorithm.spaceComplexity}</span>
          </div>
          <div className="complexity-metric-card">
            <span className="comp-label">Stability</span>
            <span className="comp-value">{algorithm.stability}</span>
          </div>
          <div className="complexity-metric-card">
            <span className="comp-label">In-Place</span>
            <span className="comp-value">{algorithm.inPlace}</span>
          </div>
        </div>
      </section>

      {/* 2. Conceptual Explanation: Step-by-Step Logic */}
      <section className="algo-content-section" ref={explanationSectionRef}>
        <div className="section-header-row">
          <div className="section-title-wrapper">
            <BookOpen size={20} className="section-icon" />
            <div>
              <h2 className="section-heading">How It Works</h2>
              <p className="section-subheading">Step-by-step invariant logic and algorithmic execution order</p>
            </div>
          </div>
        </div>

        <div className="explanation-card">
          <p className="explanation-overview-text">{algorithm.overview}</p>

          <h3 className="block-subtitle">Step-by-Step Execution</h3>
          <div className="steps-numbered-grid">
            {algorithm.howItWorks.map((stepText, idx) => (
              <div key={idx} className="step-guide-card">
                <div className="step-number-badge">{idx + 1}</div>
                <p className="step-guide-text">{stepText}</p>
              </div>
            ))}
          </div>

          <div className="tradeoffs-block">
            <h4 className="block-subtitle" style={{ marginBottom: '4px' }}>When to Choose {algorithm.name}:</h4>
            <p className="tradeoffs-text">{algorithm.whenToUse}</p>
          </div>
        </div>
      </section>

      {/* 3. Implementation Code Display */}
      <section className="algo-content-section" ref={codeSectionRef}>
        <div className="section-header-row">
          <div className="section-title-wrapper">
            <Code2 size={20} className="section-icon" />
            <div>
              <h2 className="section-heading">Code Implementation</h2>
              <p className="section-subheading">Production-ready source code with synchronized line execution highlighting</p>
            </div>
          </div>

          {/* Language selector tabs */}
          <div className="code-lang-selector">
            {[
              { id: 'pseudocode', label: 'Pseudocode' },
              { id: 'python', label: 'Python' },
              { id: 'cpp', label: 'C++' },
              { id: 'java', label: 'Java' }
            ].map((lang) => (
              <button
                key={lang.id}
                className={`lang-tab-pill ${selectedLanguage === lang.id ? 'active' : ''}`}
                onClick={() => setSelectedLanguage(lang.id)}
              >
                {lang.label}
              </button>
            ))}

            <button className="copy-code-action" onClick={handleCopyCode} title="Copy code">
              {copied ? <Check size={14} className="copied-check" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="code-display-card">
          <div className="code-window-topbar">
            <div className="window-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <span className="code-window-title">
              {algorithm.name} • {selectedLanguage.toUpperCase()}
            </span>
            <span className="code-engine-badge">Synced Trace</span>
          </div>

          <pre className="code-pre">
            <code>
              {lines.map((lineText, idx) => {
                const lineNum = idx + 1;
                const isActive = activeLineNum === lineNum;

                return (
                  <div
                    key={idx}
                    className={`code-line ${isActive ? 'line-active' : ''}`}
                  >
                    <span className="line-no">
                      {isActive ? <span className="active-arrow">▶</span> : lineNum}
                    </span>
                    <span className="line-text">{lineText || ' '}</span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </section>

      {/* 4. Interactive Real-Time Visualizer */}
      <section className="algo-content-section" ref={visualizerSectionRef}>
        <div className="section-header-row">
          <div className="section-title-wrapper">
            <Activity size={20} className="section-icon" />
            <div>
              <h2 className="section-heading">Interactive Visualizer</h2>
              <p className="section-subheading">
                Step through the algorithm or interact with controls to watch memory state mutations in real time
              </p>
            </div>
          </div>

          <div className="visualizer-header-controls">
            {/* Canvas Theme Toggle (Violet Studio vs Light Studio) */}
            <button
              className="theme-toggle-pill"
              onClick={() => setCanvasTheme(canvasTheme === 'dark' ? 'light' : 'dark')}
              title="Toggle canvas theme (Studio Dark / Studio Light)"
            >
              {canvasTheme === 'dark' ? (
                <>
                  <Sun size={13} />
                  <span>Light Studio</span>
                </>
              ) : (
                <>
                  <Moon size={13} />
                  <span>Dark Studio</span>
                </>
              )}
            </button>

            {algorithm.id !== 'stack' &&
              algorithm.id !== 'queue' &&
              algorithm.id !== 'linked-list' &&
              algorithm.id !== 'binary-search-tree' &&
              algorithm.id !== 'avl-tree' &&
              algorithm.id !== 'binary-heap' &&
              !algorithm.id.startsWith('graph') &&
              algorithm.id !== 'dijkstra' && (
                <span className="step-counter-tag">
                  Step <strong>{currentStepIndex + 1}</strong> of {totalSteps}
                </span>
              )}
          </div>
        </div>

        {/* Dynamic Visualizer Switch based on Data Structure or Algorithm Category */}
        {algorithm.id === 'stack' ? (
          <StackVisualizer canvasTheme={canvasTheme} />
        ) : algorithm.id === 'queue' ? (
          <QueueVisualizer canvasTheme={canvasTheme} />
        ) : algorithm.id === 'linked-list' ? (
          <LinkedListVisualizer canvasTheme={canvasTheme} />
        ) : algorithm.id === 'binary-search-tree' ? (
          <TreeVisualizer mode="bst" canvasTheme={canvasTheme} />
        ) : algorithm.id === 'avl-tree' ? (
          <TreeVisualizer mode="avl" canvasTheme={canvasTheme} />
        ) : algorithm.id === 'binary-heap' ? (
          <HeapVisualizer canvasTheme={canvasTheme} />
        ) : algorithm.id === 'graph-bfs' ? (
          <GraphVisualizer defaultMode="BFS" canvasTheme={canvasTheme} />
        ) : algorithm.id === 'graph-dfs' ? (
          <GraphVisualizer defaultMode="DFS" canvasTheme={canvasTheme} />
        ) : algorithm.id === 'dijkstra' ? (
          <GraphVisualizer defaultMode="Dijkstra" canvasTheme={canvasTheme} />
        ) : (
          <div className={`visualizer-workbench-card ${canvasTheme === 'light' ? 'theme-light' : ''}`}>
            {/* Action announcement banner */}
            <div className="action-announcement-bar">
              <div className="action-tag-cluster">
                <span className={`status-pill pill-${(badge || 'ready').toLowerCase().replace(/\s+/g, '-')}`}>
                  {badge || 'Active'}
                </span>
                <div className="live-metrics-summary">
                  <span>Comparisons: <strong>{metrics.comparisons}</strong></span>
                  <span className="dot-sep">•</span>
                  <span>Swaps/Writes: <strong>{metrics.swaps}</strong></span>
                </div>
              </div>

              <div className="action-text-content">
                <strong className="action-main">{explanation}</strong>
                {subExplanation && <span className="action-sub"> — {subExplanation}</span>}
              </div>
            </div>

            {/* Target Selector Bar for Searching Algorithms */}
            {algorithm.category === 'searching' && (
              <div className="search-target-toolbar">
                <div className="target-input-group">
                  <span className="target-label">Target to Find:</span>
                  <input
                    type="number"
                    className="target-number-input"
                    placeholder="e.g. 45"
                    value={customTargetInput}
                    onChange={(e) => setCustomTargetInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = Number(customTargetInput);
                        if (!isNaN(val)) onSetSearchTarget?.(val);
                      }
                    }}
                  />
                  <button
                    className="apply-target-btn"
                    onClick={() => {
                      const val = Number(customTargetInput);
                      if (!isNaN(val)) onSetSearchTarget?.(val);
                    }}
                  >
                    <Search size={14} />
                    <span>Search</span>
                  </button>
                </div>

                <div className="quick-targets-row">
                  <span className="quick-pick-title">Quick Picks:</span>
                  {array.slice(0, 5).map((item, idx) => (
                    <button
                      key={idx}
                      className={`quick-pick-pill ${searchTarget === item.val ? 'active-pick' : ''}`}
                      onClick={() => {
                        setCustomTargetInput(item.val);
                        onSetSearchTarget?.(item.val);
                      }}
                    >
                      {item.val}
                    </button>
                  ))}
                  <button
                    className={`quick-pick-pill pill-not-found ${searchTarget === 999 ? 'active-pick' : ''}`}
                    onClick={() => {
                      setCustomTargetInput(999);
                      onSetSearchTarget?.(999);
                    }}
                    title="Search an element not present in the array"
                  >
                    999 (Not In List)
                  </button>
                </div>
              </div>
            )}

            {/* Canvas cards stage */}
            <div className="workbench-stage-container">
              {array.map((item, index) => {
                const heightPercent = Math.max(22, Math.min(88, (item.val / maxVal) * 88));
                const stateClass = `card-state-${item.state || 'default'}`;
                const activePointers = pointerMap[index] || [];

                return (
                  <div key={item.id || index} className={`array-column-item ${stateClass}`}>
                    {/* Floating pointer stack */}
                    <div className="pointer-stack">
                      {activePointers.map((p) => (
                        <span key={p} className={`pointer-chip pointer-${p.replace('+', 'plus')}`}>
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Animated vertical column bar */}
                    <div
                      className="card-bar"
                      style={{
                        height: `${heightPercent}%`
                      }}
                    >
                      <span className="card-number">{item.val}</span>
                    </div>

                    {/* Index subscript */}
                    <span className="index-label">idx: {index}</span>
                  </div>
                );
              })}
            </div>

            {/* Unified Controls Footer */}
            <div className="workbench-controls-bar">
              {/* Timeline scrubber bar */}
              <div className="scrubber-row">
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, totalSteps - 1)}
                  value={currentStepIndex}
                  onChange={(e) => onSeekStep(Number(e.target.value))}
                  className="timeline-slider"
                />
              </div>

              <div className="controls-actions-row">
                {/* Playback actions */}
                <div className="actions-left">
                  <button className="ctrl-btn-round" onClick={onReset} title="Reset (R)">
                    <RotateCcw size={18} />
                  </button>

                  <button
                    className="ctrl-btn-round"
                    onClick={onStepBackward}
                    disabled={currentStepIndex <= 0}
                    title="Step Backward (Left Arrow)"
                  >
                    <SkipBack size={18} />
                  </button>

                  <button
                    className={`ctrl-btn-play ${isPlaying ? 'playing' : ''}`}
                    onClick={onTogglePlay}
                    title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    className="ctrl-btn-round"
                    onClick={onStepForward}
                    disabled={currentStepIndex >= totalSteps - 1}
                    title="Step Forward (Right Arrow)"
                  >
                    <SkipForward size={18} />
                  </button>

                  <div className="speed-pills-row">
                    {[0.5, 1, 2].map((s) => (
                      <button
                        key={s}
                        className={`speed-pill ${speed === s ? 'active' : ''}`}
                        onClick={() => onChangeSpeed(s)}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Data presets & custom modal */}
                <div className="actions-right">
                  <button
                    className="data-action-btn"
                    onClick={() => onGeneratePreset('random')}
                    title="Random values"
                  >
                    <Shuffle size={14} />
                    <span>Random</span>
                  </button>

                  <button
                    className="data-action-btn"
                    onClick={() => onGeneratePreset('reversed')}
                    title="Reversed values"
                  >
                    <TrendingDown size={14} />
                    <span>Reversed</span>
                  </button>

                  <button
                    className="data-action-btn custom-highlight"
                    onClick={onOpenCustomModal}
                    title="Enter custom array"
                  >
                    <Edit3 size={14} />
                    <span>Custom Array</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5. Real-World Engineering & Interview Insights */}
      <section className="algo-content-section">
        <div className="section-header-row">
          <div className="section-title-wrapper">
            <Server size={20} className="section-icon" />
            <div>
              <h2 className="section-heading">Interview Insights & Real-World Systems</h2>
              <p className="section-subheading">Practical engineering trade-offs and common technical interview traps</p>
            </div>
          </div>
        </div>

        <div className="insights-cards-grid">
          <div className="insight-card trap-card">
            <div className="insight-header">
              <AlertTriangle size={18} className="insight-icon icon-trap" />
              <h3 className="insight-title">Common Interview Trap</h3>
            </div>
            <p className="insight-text">{tips.trap}</p>
          </div>

          <div className="insight-card system-card">
            <div className="insight-header">
              <Server size={18} className="insight-icon icon-system" />
              <h3 className="insight-title">Where It’s Used in Production</h3>
            </div>
            <p className="insight-text">{tips.system}</p>
          </div>
        </div>
      </section>

      {/* 6. Interactive Knowledge Check (Quiz) */}
      <section className="algo-content-section" ref={quizSectionRef}>
        <div className="section-header-row">
          <div className="section-title-wrapper">
            <HelpCircle size={20} className="section-icon" />
            <div>
              <h2 className="section-heading">Knowledge Check</h2>
              <p className="section-subheading">Test your comprehension with an instant interview-style challenge</p>
            </div>
          </div>
        </div>

        <div className="quiz-card-box">
          <div className="quiz-question-row">
            <span className="quiz-q-badge">Question</span>
            <h3 className="quiz-question-title">{quiz.question}</h3>
          </div>

          <div className="quiz-options-list">
            {quiz.options.map((opt, idx) => {
              const isSelected = selectedQuizOption === idx;
              let optionClass = 'quiz-option-btn';

              if (quizSubmitted) {
                if (opt.correct) {
                  optionClass += ' option-correct';
                } else if (isSelected && !opt.correct) {
                  optionClass += ' option-incorrect';
                }
              } else if (isSelected) {
                optionClass += ' option-selected';
              }

              return (
                <button
                  key={idx}
                  className={optionClass}
                  onClick={() => !quizSubmitted && handleQuizSelect(idx)}
                >
                  <div className="option-marker">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="option-text">{opt.text}</span>
                  {quizSubmitted && opt.correct && (
                    <CheckCircle2 size={18} className="quiz-icon-check" />
                  )}
                  {quizSubmitted && isSelected && !opt.correct && (
                    <XCircle size={18} className="quiz-icon-x" />
                  )}
                </button>
              );
            })}
          </div>

          {quizSubmitted && (
            <div className="quiz-feedback-box">
              <div className="feedback-header">
                <strong>Explanation:</strong>
              </div>
              <p className="feedback-body">{quiz.explanation}</p>
              <button className="quiz-retry-btn" onClick={handleResetQuiz}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
