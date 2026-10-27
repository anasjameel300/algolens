# 🔍 AlgoLens — Interactive Data Structures & Algorithms Visualizer

<p align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/layers.svg" width="64" height="64" alt="AlgoLens Logo" />
</p>

<p align="center">
  <strong>An intuitive, interactive, and all-around learning platform designed to demystify Data Structures and Algorithms through real-time memory visualizers, multi-language code tracing, interview insights, and concept check challenges.</strong>
</p>

<p align="center">
  <a href="#-core-features"><img src="https://img.shields.io/badge/Algorithms-15%2B%20Implemented-7c5cbf?style=for-the-badge" alt="Algorithms"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/React-19.3-61dafb?style=for-the-badge&logo=react" alt="React 19"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite" alt="Vite"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge" alt="License"></a>
</p>

---

## 📖 Table of Contents
- [✨ Key Features](#-key-features)
- [🧩 Supported Algorithms & Data Structures](#-supported-algorithms--data-structures)
- [🎨 Design Aesthetics & Studio Themes](#-design-aesthetics--studio-themes)
- [💡 Interactive Learning Features](#-interactive-learning-features)
- [⌨️ Keyboard Shortcuts](#️-keyboard-shortcuts)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Features

- **Real-Time Interactive Workbenches**: Control animations step-by-step with play, pause, seek scrubber, variable speeds (0.5x, 1x, 2x), randomizer, and custom array inputs.
- **Custom Search Targets**: Unlike traditional visualizers that hardcode search results, AlgoLens lets you choose any target number or select quick-pick absent numbers (e.g., `999 (Not In List)`) to visualize search boundary collapse and not-found handling.
- **Synchronized Multi-Language Code Engine**: Side-by-side code tabs for **Pseudocode**, **Python**, **C++**, and **Java** with real-time active line highlighting (`▶`) synchronized with the visualizer.
- **Deep-Dive Conceptual Foundations**: Detailed step-by-step logic breakdown, invariant rules, and trade-offs (*"When to Choose"*).
- **Interview Traps & Production Systems**: Real-world engineering insights highlighting classic LeetCode traps (integer overflow in mid calculations, stability bugs, recursion depth) and production use cases (Timsort in Python, B-Trees in databases, BFS in networking).
- **Knowledge Check Quizzes**: Interactive interview-style challenges on every algorithm page with instant feedback and pedagogical explanations.
- **Master Complexity Comparison Matrix**: Global Big-O comparison table (Best, Average, Worst Time, Space Complexity, Stability) across all 15 algorithms.

---

## 🧩 Supported Algorithms & Data Structures

AlgoLens covers all core computer science domains with tailored visualizer stages:

### 1. 🔄 Sorting Algorithms
- **Bubble Sort**: Intuitive adjacent swap comparison with early-termination flag.
- **Selection Sort**: Unstable minimum-element extraction and boundary movement.
- **Insertion Sort**: Card-in-hand sorted subarray insertion with high cache locality.
- **Merge Sort**: Divide-and-conquer recursive partitioning and merging.
- **Quick Sort**: Lomuto partitioning with live pivot selection and pointer swapping.

### 2. 🎯 Searching Algorithms
- **Linear Search**: Sequential scan across arbitrary or unsorted sequences.
- **Binary Search**: Logarithmic range halving with `[low, mid, high]` pointer chips.
- **Jump Search**: Fixed block hopping with optimal step size $m = \sqrt{n}$ followed by backward linear scan.
- **Exponential Search**: Unbounded range doubling ($1, 2, 4, 8, \dots, 2^k$) bounding the search window for binary search.

### 3. 📦 Linear Data Structures
- **Stack (LIFO)**: Vertical cylinder visualizer with `Push(x)`, `Pop()`, `Peek()`, live `TOP` pointer, and overflow/underflow protections.
- **Queue (FIFO)**: Horizontal pipeline visualizer with `Enqueue(x)`, `Dequeue()`, `Peek()`, and simultaneous `FRONT` and `REAR` pointers.
- **Singly Linked List**: Dynamic node chain visualizer (`[Data | Next •]`) with `Prepend (O(1))`, `Append (O(n))`, `Delete(val)`, and animated `Traverse` pointer hops.

### 4. 🌲 Trees & Priority Heaps
- **Binary Search Tree (BST)**: 2D hierarchical SVG tree with invariant insertion, key search path tracing, and In-Order, Pre-Order, and Post-Order traversals.
- **AVL Tree**: Self-balancing BST with automatic Left-Left, Right-Right, Left-Right, and Right-Left rotations and real-time Balance Factor ($BF$) monitoring.
- **Binary Heap (Max-Heap Priority Queue)**: Dual-stage view showing both the complete binary tree structure and the contiguous array memory storage (`arr[i]`, `arr[2i+1]`, `arr[2i+2]`) with bubble-up and bubble-down heapify animations.

### 5. 🕸️ Graph Algorithms
- **Breadth-First Search (BFS)**: Level-order network traversal tracking the FIFO discovery queue.
- **Depth-First Search (DFS)**: Recursive branch exploration with backtracking and path order chips.
- **Dijkstra's Algorithm**: Shortest path computation on a weighted graph with priority relaxation and real-time distances table ($dist[u] + w < dist[v]$).

---

## 🎨 Design Aesthetics & Studio Themes

AlgoLens avoids generic dark-mode templates in favor of a cohesive, human-centered design:
- **Studio Midnight Theme**: A warm slate-violet canvas (`#1c1929`) accented with subtle lavender glass borders (`rgba(124, 92, 191, 0.22)`) and neon pointer tags.
- **Studio Light Theme**: A crisp, frosted white/lavender studio canvas with subtle dot-matrix grid alignment, perfect for presentations and daylight study sessions.
- **One-Click Theme Toggle**: Switch seamlessly between `🌙 Studio Dark` and `☀️ Studio Light` modes directly from the workbench header.

---

## 💡 Interactive Learning Features

```
┌──────────────────────────────────────────────────────────────┐
│  💡 Knowledge Check Challenge                                │
│  Question: Under what condition does Bubble Sort run in O(n)?│
│  [A] When the array is already sorted in ascending order (✓) │
│  [B] When the array is in reverse order                      │
│  [C] When all elements are prime numbers                     │
│  [D] When array size is a power of 2                         │
└──────────────────────────────────────────────────────────────┘
```

- **Interactive Quizzes**: Every algorithm includes targeted conceptual multiple-choice questions with immediate explanations.
- **Interview Traps**: Real warnings about off-by-one errors, overflow, recursion limits, and stability misunderstandings.
- **Real-World Systems**: Explains why real software engines (Linux kernel, V8 JS engine, Java Collections, Git) select specific algorithms.

---

## ⌨️ Keyboard Shortcuts

Speed up your study sessions with built-in hotkeys:

| Key | Action |
| :--- | :--- |
| <kbd>Space</kbd> | Play / Pause Visualizer Animation |
| <kbd>→</kbd> (Right Arrow) | Step Forward one state |
| <kbd>←</kbd> (Left Arrow) | Step Backward one state |
| <kbd>R</kbd> | Reset Visualizer to Initial State |

---

## 🛠️ Tech Stack

- **Frontend Core**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Styling**: Vanilla CSS (Custom design token architecture with HSL pastel accents, glassmorphic cards, and zero heavy CSS framework overhead)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 📂 Project Structure

```bash
algolens/
├── index.html                 # App shell, Google Fonts, metadata
├── package.json               # Dependencies and build scripts
├── vite.config.js             # Vite configuration with React plugin
├── src/
│   ├── main.jsx               # React DOM entry point
│   ├── App.jsx                # Application state, playback engine, shortcuts
│   ├── index.css              # Unified design system & studio theme tokens
│   ├── algorithms/            # Pure algorithmic step generation engines
│   │   ├── binarySearch.js
│   │   ├── bubbleSort.js
│   │   ├── exponentialSearch.js
│   │   ├── insertionSort.js
│   │   ├── jumpSearch.js
│   │   ├── linearSearch.js
│   │   ├── mergeSort.js
│   │   ├── quickSort.js
│   │   ├── selectionSort.js
│   │   └── index.js
│   ├── components/            # Reusable React visualizer components
│   │   ├── AlgoLensLogo.jsx        # Handcrafted vector logo (lens + tree)
│   │   ├── AlgorithmView.jsx       # Unified algorithm lab view
│   │   ├── CourseOverview.jsx      # Foundations overview & Big-O table
│   │   ├── CustomArrayDialog.jsx   # Custom numeric array modal
│   │   ├── GraphVisualizer.jsx     # BFS, DFS, Dijkstra graph canvas
│   │   ├── HeapVisualizer.jsx      # Dual tree & array memory heap workbench
│   │   ├── LinkedListVisualizer.jsx# Singly Linked list workbench
│   │   ├── QueueVisualizer.jsx     # FIFO queue pipeline
│   │   ├── Sidebar.jsx             # Categorized search & navigation
│   │   ├── StackVisualizer.jsx     # LIFO stack vessel
│   │   └── TreeVisualizer.jsx      # 2D BST and AVL tree canvas
│   └── data/
│       └── dsaData.js         # Comprehensive curriculum, pseudocode, Big-O
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or newer)
- npm, pnpm, or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/algolens.git
   cd algolens
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to launch the platform.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add new algorithms (e.g., Red-Black Trees, Trie, Bellman-Ford, Kruskal's MST) or enhance visualizer animations:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingAlgorithm`).
3. Commit your Changes (`git commit -m 'Add AmazingAlgorithm visualizer'`).
4. Push to the Branch (`git push origin feature/AmazingAlgorithm`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for students, educators, and software engineers preparing for technical interviews.
</p>
