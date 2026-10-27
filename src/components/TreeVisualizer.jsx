import React, { useState } from 'react';
import { Plus, Search, Play, RotateCcw, Sparkles, Scale } from 'lucide-react';

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

function getHeight(node) {
  if (!node) return 0;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

function getBalanceFactor(node) {
  if (!node) return 0;
  return getHeight(node.left) - getHeight(node.right);
}

function rightRotate(y) {
  const x = y.left;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  return x;
}

function leftRotate(x) {
  const y = x.right;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  return y;
}

function insertNodeBST(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) {
    root.left = insertNodeBST(root.left, val);
  } else if (val > root.val) {
    root.right = insertNodeBST(root.right, val);
  }
  return root;
}

function insertNodeAVL(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) {
    root.left = insertNodeAVL(root.left, val);
  } else if (val > root.val) {
    root.right = insertNodeAVL(root.right, val);
  } else {
    return root; // No duplicates
  }

  const balance = getBalanceFactor(root);

  // Left Left
  if (balance > 1 && val < root.left.val) {
    return rightRotate(root);
  }
  // Right Right
  if (balance < -1 && val > root.right.val) {
    return leftRotate(root);
  }
  // Left Right
  if (balance > 1 && val > root.left.val) {
    root.left = leftRotate(root.left);
    return rightRotate(root);
  }
  // Right Left
  if (balance < -1 && val < root.right.val) {
    root.right = rightRotate(root.right);
    return leftRotate(root);
  }

  return root;
}

function buildInitialTree(isAVL = false) {
  let root = null;
  const initialValues = [50, 30, 70, 20, 40, 60, 80];
  initialValues.forEach((v) => {
    root = isAVL ? insertNodeAVL(root, v) : insertNodeBST(root, v);
  });
  return root;
}

export function TreeVisualizer({ mode = 'bst', canvasTheme = 'dark' }) {
  const isAVL = mode === 'avl';
  const [tree, setTree] = useState(() => buildInitialTree(isAVL));
  const [inputValue, setInputValue] = useState('');
  const [actionMessage, setActionMessage] = useState(
    isAVL
      ? 'AVL Self-Balancing Tree ready. Height balance factor strictly maintained between -1 and +1.'
      : 'Binary Search Tree ready with 7 initial nodes.'
  );
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [traversalResult, setTraversalResult] = useState([]);
  const [activeAction, setActiveAction] = useState('ready');

  const handleInsert = (e) => {
    e?.preventDefault();
    const val = Number(inputValue.trim());
    if (isNaN(val) || val <= 0 || val > 99) {
      setActionMessage('Please enter a valid positive integer between 1 and 99.');
      setActiveAction('error');
      return;
    }

    if (isAVL) {
      setTree((prev) => insertNodeAVL(prev ? { ...prev } : null, val));
      setActionMessage(`Inserted node ${val} into AVL Tree with automatic rotation re-balancing.`);
    } else {
      setTree((prev) => insertNodeBST(prev ? { ...prev } : null, val));
      setActionMessage(`Inserted node ${val} adhering to BST invariant (left < root < right).`);
    }

    setActiveAction('insert');
    setHighlightedNodes([val]);
    setInputValue('');
  };

  const handleSearch = () => {
    const val = Number(inputValue.trim());
    if (isNaN(val)) {
      setActionMessage('Enter a number in the box to search.');
      setActiveAction('error');
      return;
    }

    const path = [];
    let curr = tree;
    let found = false;

    while (curr) {
      path.push(curr.val);
      if (curr.val === val) {
        found = true;
        break;
      } else if (val < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    setHighlightedNodes(path);
    if (found) {
      setActionMessage(`Search success! Found key ${val} following path: [${path.join(' -> ')}].`);
      setActiveAction('success');
    } else {
      setActionMessage(`Key ${val} does not exist in this tree. Path checked: [${path.join(' -> ')}].`);
      setActiveAction('error');
    }
  };

  const handleTraversal = (type) => {
    const sequence = [];

    const inorder = (node) => {
      if (!node) return;
      inorder(node.left);
      sequence.push(node.val);
      inorder(node.right);
    };

    const preorder = (node) => {
      if (!node) return;
      sequence.push(node.val);
      preorder(node.left);
      preorder(node.right);
    };

    const postorder = (node) => {
      if (!node) return;
      postorder(node.left);
      postorder(node.right);
      sequence.push(node.val);
    };

    if (type === 'inorder') {
      inorder(tree);
      setActionMessage('In-Order Traversal (Left, Root, Right) always produces strictly sorted ascending order.');
    } else if (type === 'preorder') {
      preorder(tree);
      setActionMessage('Pre-Order Traversal (Root, Left, Right) is used to clone or serialize tree hierarchy.');
    } else {
      postorder(tree);
      setActionMessage('Post-Order Traversal (Left, Right, Root) is ideal for bottom-up node deletions.');
    }

    setTraversalResult(sequence);
    setHighlightedNodes(sequence);
    setActiveAction('traversal');
  };

  const handleReset = () => {
    setTree(buildInitialTree(isAVL));
    setHighlightedNodes([]);
    setTraversalResult([]);
    setActionMessage(
      isAVL
        ? 'AVL Tree reset to balanced state.'
        : 'Binary Search Tree reset to initial 7 nodes.'
    );
    setActiveAction('ready');
    setInputValue('');
  };

  // Layout node coordinates recursively
  const renderTree = (node, x, y, dx, level = 0) => {
    if (!node) return null;

    const leftX = x - dx;
    const rightX = x + dx;
    const nextY = y + 54;
    const isHighlighted = highlightedNodes.includes(node.val);
    const bf = getBalanceFactor(node);

    return (
      <g key={`${node.val}-${level}-${x}`}>
        {/* Branch Lines */}
        {node.left && (
          <line
            x1={x}
            y1={y}
            x2={leftX}
            y2={nextY}
            stroke="rgba(124, 92, 191, 0.45)"
            strokeWidth="2.5"
          />
        )}
        {node.right && (
          <line
            x1={x}
            y1={y}
            x2={rightX}
            y2={nextY}
            stroke="rgba(124, 92, 191, 0.45)"
            strokeWidth="2.5"
          />
        )}

        {/* Node Circle */}
        <circle
          cx={x}
          cy={y}
          r={isHighlighted ? 20 : 17}
          fill={isHighlighted ? '#f59e0b' : '#7c5cbf'}
          stroke={isHighlighted ? '#fde68a' : '#c084fc'}
          strokeWidth={isHighlighted ? 3 : 2}
          className="tree-node-circle"
        />

        {/* Node Value Label */}
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="12"
          fontWeight="800"
          fontFamily="monospace"
        >
          {node.val}
        </text>

        {/* AVL Balance Factor Badge */}
        {isAVL && (
          <text
            x={x}
            y={y - 23}
            textAnchor="middle"
            fill={Math.abs(bf) > 1 ? '#f43f5e' : '#38bdf8'}
            fontSize="10"
            fontWeight="700"
            fontFamily="monospace"
          >
            BF: {bf > 0 ? `+${bf}` : bf}
          </text>
        )}

        {/* Render Children */}
        {renderTree(node.left, leftX, nextY, dx * 0.52, level + 1)}
        {renderTree(node.right, rightX, nextY, dx * 0.52, level + 1)}
      </g>
    );
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
            Tree Height: <strong>{getHeight(tree)}</strong>
            {isAVL && <span> • Balancing: <strong>Strict AVL</strong></span>}
          </span>
        </div>
        <div className="banner-text-block">
          <span className="banner-text">{actionMessage}</span>
        </div>
      </div>

      {/* SVG Canvas Stage */}
      <div className="tree-stage-container">
        <svg viewBox="0 0 600 240" className="tree-svg-canvas">
          {tree && renderTree(tree, 300, 36, 130)}
        </svg>

        {traversalResult.length > 0 && (
          <div className="traversal-display-strip">
            <span className="traversal-label">Sequence:</span>
            <div className="traversal-chips-row">
              {traversalResult.map((val, idx) => (
                <span key={idx} className="traversal-chip">
                  {val}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="custom-controls-bar">
        <div className="controls-form-group">
          <input
            type="number"
            className="custom-val-input"
            placeholder="Node value (1-99)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button className="custom-action-btn btn-insert" onClick={handleInsert}>
            <Plus size={14} />
            <span>Insert</span>
          </button>

          <button className="custom-action-btn btn-search" onClick={handleSearch}>
            <Search size={14} />
            <span>Search Key</span>
          </button>
        </div>

        <div className="traversal-btn-group">
          <button className="traversal-pill-btn" onClick={() => handleTraversal('inorder')}>
            In-Order
          </button>
          <button className="traversal-pill-btn" onClick={() => handleTraversal('preorder')}>
            Pre-Order
          </button>
          <button className="traversal-pill-btn" onClick={() => handleTraversal('postorder')}>
            Post-Order
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
