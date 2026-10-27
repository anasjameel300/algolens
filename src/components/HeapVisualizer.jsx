import React, { useState } from 'react';
import { Plus, ArrowDown, RotateCcw, Sparkles } from 'lucide-react';

export function HeapVisualizer({ canvasTheme = 'dark' }) {
  // Max-Heap array
  const [heap, setHeap] = useState([95, 75, 80, 55, 60, 50, 65]);
  const [inputValue, setInputValue] = useState('');
  const [actionMessage, setActionMessage] = useState('Max-Heap initialized. Root always stores maximum element.');
  const [activeAction, setActiveAction] = useState('ready');
  const [highlightIndices, setHighlightIndices] = useState([]);

  // Insert (Bubble Up)
  const handleInsert = async (e) => {
    e?.preventDefault();
    const val = Number(inputValue.trim());
    if (isNaN(val) || val <= 0 || val > 99) {
      setActionMessage('Please enter a number between 1 and 99.');
      setActiveAction('error');
      return;
    }
    if (heap.length >= 15) {
      setActionMessage('Heap is full for visual display (max 15 nodes).');
      setActiveAction('error');
      return;
    }

    const newHeap = [...heap, val];
    setHeap(newHeap);
    setInputValue('');
    setActiveAction('insert');
    setActionMessage(`Inserted ${val} at index ${newHeap.length - 1}. Heapifying up...`);

    let curr = newHeap.length - 1;
    setHighlightIndices([curr]);

    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      await new Promise((r) => setTimeout(r, 600));

      if (newHeap[curr] > newHeap[parent]) {
        setActionMessage(`Bubble Up: Child ${newHeap[curr]} > Parent ${newHeap[parent]}. Swapping.`);
        setHighlightIndices([curr, parent]);
        const tmp = newHeap[curr];
        newHeap[curr] = newHeap[parent];
        newHeap[parent] = tmp;
        setHeap([...newHeap]);
        curr = parent;
      } else {
        break;
      }
    }

    await new Promise((r) => setTimeout(r, 400));
    setActionMessage(`Heap invariant satisfied! Root is ${newHeap[0]}.`);
    setActiveAction('completed');
    setHighlightIndices([]);
  };

  // Extract Max (Bubble Down)
  const handleExtractMax = async () => {
    if (heap.length === 0) {
      setActionMessage('Heap is empty! Nothing to extract.');
      setActiveAction('error');
      return;
    }

    const maxVal = heap[0];
    if (heap.length === 1) {
      setHeap([]);
      setActionMessage(`Extracted max value: ${maxVal}. Heap is now empty.`);
      setActiveAction('completed');
      return;
    }

    const newHeap = [...heap];
    const last = newHeap.pop();
    newHeap[0] = last;
    setHeap([...newHeap]);
    setActiveAction('delete');
    setActionMessage(`Extracted max ${maxVal}. Moved last element ${last} to root. Heapifying down...`);

    let curr = 0;
    setHighlightIndices([0]);

    while (true) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      let largest = curr;

      if (left < newHeap.length && newHeap[left] > newHeap[largest]) {
        largest = left;
      }
      if (right < newHeap.length && newHeap[right] > newHeap[largest]) {
        largest = right;
      }

      if (largest !== curr) {
        await new Promise((r) => setTimeout(r, 600));
        setActionMessage(`Bubble Down: Swapping index ${curr} (${newHeap[curr]}) with larger child index ${largest} (${newHeap[largest]}).`);
        setHighlightIndices([curr, largest]);
        const tmp = newHeap[curr];
        newHeap[curr] = newHeap[largest];
        newHeap[largest] = tmp;
        setHeap([...newHeap]);
        curr = largest;
      } else {
        break;
      }
    }

    await new Promise((r) => setTimeout(r, 400));
    setActionMessage(`Extracted ${maxVal} in O(log n). Max-Heap invariant restored.`);
    setActiveAction('completed');
    setHighlightIndices([]);
  };

  const handleReset = () => {
    setHeap([95, 75, 80, 55, 60, 50, 65]);
    setHighlightIndices([]);
    setActionMessage('Max-Heap reset to initial 7 items.');
    setActiveAction('ready');
    setInputValue('');
  };

  // Coordinates for complete binary tree up to 3 levels (15 nodes)
  const getNodePos = (idx) => {
    const level = Math.floor(Math.log2(idx + 1));
    const levelPos = idx - (Math.pow(2, level) - 1);
    const totalInLevel = Math.pow(2, level);
    const spacing = 620 / (totalInLevel + 1);
    const x = spacing * (levelPos + 1);
    const y = 35 + level * 65;
    return { x, y };
  };

  return (
    <div className={`custom-visualizer-card ${canvasTheme === 'light' ? 'theme-light' : ''}`}>
      {/* Banner */}
      <div className="workbench-banner-row">
        <div className="action-tag-cluster">
          <span className={`workbench-status-pill pill-${activeAction}`}>
            {activeAction.toUpperCase()}
          </span>
          <span className="live-metrics-summary">
            Heap Size: <strong>{heap.length}</strong> • Max Item: <strong>{heap[0] ?? 'N/A'}</strong>
          </span>
        </div>
        <div className="banner-text-block">
          <span className="banner-text">{actionMessage}</span>
        </div>
      </div>

      {/* Visualizer Dual Stage: Tree View on Top, Array View Below */}
      <div className="heap-dual-stage">
        {/* SVG Tree View */}
        <div className="heap-tree-view">
          <svg viewBox="0 0 620 220" className="tree-svg-canvas">
            {/* Edges */}
            {heap.map((_, i) => {
              const left = 2 * i + 1;
              const right = 2 * i + 2;
              const parentPos = getNodePos(i);

              return (
                <g key={`edges-${i}`}>
                  {left < heap.length && (
                    <line
                      x1={parentPos.x}
                      y1={parentPos.y}
                      x2={getNodePos(left).x}
                      y2={getNodePos(left).y}
                      stroke="rgba(124, 92, 191, 0.45)"
                      strokeWidth="2.5"
                    />
                  )}
                  {right < heap.length && (
                    <line
                      x1={parentPos.x}
                      y1={parentPos.y}
                      x2={getNodePos(right).x}
                      y2={getNodePos(right).y}
                      stroke="rgba(124, 92, 191, 0.45)"
                      strokeWidth="2.5"
                    />
                  )}
                </g>
              );
            })}

            {/* Tree Nodes */}
            {heap.map((val, i) => {
              const pos = getNodePos(i);
              const isHighlight = highlightIndices.includes(i);
              const isRoot = i === 0;

              return (
                <g key={`node-${i}`} transform={`translate(${pos.x}, ${pos.y})`}>
                  <circle
                    r={isHighlight ? 21 : 18}
                    fill={isHighlight ? '#f59e0b' : isRoot ? '#7c5cbf' : '#2d2745'}
                    stroke={isHighlight ? '#fde68a' : '#c084fc'}
                    strokeWidth={isHighlight ? 3 : 2}
                  />
                  <text
                    textAnchor="middle"
                    dy="5"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="800"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                  <text
                    textAnchor="middle"
                    dy="-24"
                    fill="#94a3b8"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    [{i}]
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Array Representation Bar below Tree */}
        <div className="heap-array-strip">
          <span className="strip-title">Array Memory Storage (arr[i]):</span>
          <div className="strip-cells-row">
            {heap.map((val, i) => {
              const isHighlight = highlightIndices.includes(i);
              return (
                <div key={i} className={`array-memory-cell ${isHighlight ? 'cell-active' : ''}`}>
                  <span className="cell-val">{val}</span>
                  <span className="cell-idx">idx: {i}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="custom-controls-bar">
        <div className="controls-form-group">
          <input
            type="number"
            className="custom-val-input"
            placeholder="Item (1-99)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button className="custom-action-btn btn-insert" onClick={handleInsert}>
            <Plus size={14} />
            <span>Insert (Push) O(log n)</span>
          </button>

          <button className="custom-action-btn btn-delete" onClick={handleExtractMax}>
            <ArrowDown size={14} />
            <span>Extract Max (Pop)</span>
          </button>
        </div>

        <button className="custom-action-btn btn-reset" onClick={handleReset}>
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
