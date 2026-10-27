import React, { useState } from 'react';
import { Plus, Trash2, Search, RotateCcw, ArrowRight, Sparkles, Compass } from 'lucide-react';

let nextId = 100;

export function LinkedListVisualizer({ canvasTheme = 'dark' }) {
  const [nodes, setNodes] = useState([
    { id: 1, val: 15 },
    { id: 2, val: 42 },
    { id: 3, val: 68 },
    { id: 4, val: 91 }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentPointerIndex, setCurrentPointerIndex] = useState(null);
  const [actionMessage, setActionMessage] = useState('Singly Linked List ready with 4 nodes.');
  const [activeAction, setActiveAction] = useState('ready');
  const [isTraversing, setIsTraversing] = useState(false);

  // Prepend (Insert at Head) -> O(1)
  const handlePrepend = (e) => {
    e?.preventDefault();
    const val = Number(inputValue.trim());
    if (isNaN(val)) {
      setActionMessage('Please enter a valid numeric value.');
      setActiveAction('error');
      return;
    }
    const newNode = { id: ++nextId, val };
    setNodes([newNode, ...nodes]);
    setActionMessage(`Prepended ${val} to HEAD in O(1) time. newNode.next now points to previous head.`);
    setActiveAction('insert');
    setCurrentPointerIndex(0);
    setInputValue('');
  };

  // Append (Insert at Tail) -> O(n)
  const handleAppend = (e) => {
    e?.preventDefault();
    const val = Number(inputValue.trim());
    if (isNaN(val)) {
      setActionMessage('Please enter a valid numeric value.');
      setActiveAction('error');
      return;
    }
    const newNode = { id: ++nextId, val };
    setNodes([...nodes, newNode]);
    setActionMessage(`Appended ${val} to Tail. Traversed to tail and set tail.next = newNode.`);
    setActiveAction('insert');
    setCurrentPointerIndex(nodes.length);
    setInputValue('');
  };

  // Delete node with specific value
  const handleDelete = () => {
    const val = Number(inputValue.trim());
    if (isNaN(val)) {
      setActionMessage('Enter the value of the node you want to delete.');
      setActiveAction('error');
      return;
    }
    const targetIdx = nodes.findIndex((n) => n.val === val);
    if (targetIdx === -1) {
      setActionMessage(`Value ${val} not found in the linked list.`);
      setActiveAction('error');
      return;
    }

    const updated = nodes.filter((_, idx) => idx !== targetIdx);
    setNodes(updated);
    setActionMessage(`Deleted node with value ${val}. Previous node pointer bypassed to next.`);
    setActiveAction('delete');
    setCurrentPointerIndex(null);
    setInputValue('');
  };

  // Step-by-step traversal search
  const handleTraverseSearch = async () => {
    const val = Number(inputValue.trim());
    if (isNaN(val)) {
      setActionMessage('Enter a value to search along the linked list.');
      setActiveAction('error');
      return;
    }

    setIsTraversing(true);
    setActiveAction('traverse');

    for (let i = 0; i < nodes.length; i++) {
      setCurrentPointerIndex(i);
      setActionMessage(`Traversing: Inspecting node at index ${i} (value: ${nodes[i].val})...`);
      await new Promise((res) => setTimeout(res, 600));

      if (nodes[i].val === val) {
        setActionMessage(`Found target value ${val} at node position ${i}!`);
        setActiveAction('found');
        setIsTraversing(false);
        return;
      }
    }

    setActionMessage(`Search finished: Value ${val} not found. Reached NULL pointer.`);
    setActiveAction('error');
    setCurrentPointerIndex(null);
    setIsTraversing(false);
  };

  const handleReset = () => {
    setNodes([
      { id: 1, val: 15 },
      { id: 2, val: 42 },
      { id: 3, val: 68 },
      { id: 4, val: 91 }
    ]);
    setCurrentPointerIndex(null);
    setActionMessage('Linked list reset to 4 initial nodes.');
    setActiveAction('ready');
    setInputValue('');
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
            Length: <strong>{nodes.length} nodes</strong>
          </span>
        </div>
        <div className="banner-text-block">
          <span className="banner-text">{actionMessage}</span>
        </div>
      </div>

      {/* Stage: Linked List Nodes and Arrows */}
      <div className="linked-list-stage-container">
        {/* HEAD Pointer Tag */}
        <div className="head-pointer-indicator">
          <span className="head-label">HEAD</span>
          <ArrowRight size={18} className="head-arrow" />
        </div>

        <div className="nodes-chain-track">
          {nodes.length === 0 ? (
            <div className="empty-list-notice">
              <span>List is empty (HEAD points to NULL)</span>
            </div>
          ) : (
            nodes.map((node, index) => {
              const isCurrent = currentPointerIndex === index;
              return (
                <div key={node.id} className="node-wrapper-item">
                  {/* Current Pointer Marker */}
                  {isCurrent && (
                    <div className="current-pointer-pill">
                      <span>CURRENT</span>
                      <div className="pointer-down-triangle" />
                    </div>
                  )}

                  {/* Dual-compartment node: [ Data | Next ] */}
                  <div className={`linked-node-box ${isCurrent ? 'node-highlight' : ''}`}>
                    <div className="node-val-compartment">{node.val}</div>
                    <div className="node-next-compartment" title="Next Pointer Reference">
                      <span className="bullet-dot">•</span>
                    </div>
                  </div>

                  {/* Arrow linking to next node or null */}
                  <div className="node-link-arrow">
                    <div className="arrow-line" />
                    <ArrowRight size={16} className="arrow-head-icon" />
                  </div>
                </div>
              );
            })
          )}

          {/* NULL Terminator Box */}
          <div className="null-terminator-box">
            <span>NULL</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="custom-controls-bar">
        <div className="controls-form-group">
          <input
            type="number"
            className="custom-val-input"
            placeholder="Node value (e.g. 33)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTraversing}
          />

          <button
            className="custom-action-btn btn-insert"
            onClick={handlePrepend}
            disabled={isTraversing}
          >
            <Plus size={14} />
            <span>Prepend (Head) O(1)</span>
          </button>

          <button
            className="custom-action-btn btn-insert"
            onClick={handleAppend}
            disabled={isTraversing}
          >
            <Plus size={14} />
            <span>Append (Tail)</span>
          </button>

          <button
            className="custom-action-btn btn-delete"
            onClick={handleDelete}
            disabled={isTraversing}
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>

          <button
            className="custom-action-btn btn-search"
            onClick={handleTraverseSearch}
            disabled={isTraversing}
          >
            <Search size={14} />
            <span>Traverse & Find</span>
          </button>
        </div>

        <button className="custom-action-btn btn-reset" onClick={handleReset} disabled={isTraversing}>
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
