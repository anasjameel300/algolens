import React, { useState } from 'react';
import { Plus, Minus, Eye, RotateCcw, ArrowRight } from 'lucide-react';

export function StackVisualizer({ canvasTheme = 'dark' }) {
  const [stack, setStack] = useState([15, 42, 68]);
  const [inputValue, setInputValue] = useState('');
  const [actionMessage, setActionMessage] = useState('Stack initialized with 3 items. Ready for LIFO operations.');
  const [activeAction, setActiveAction] = useState('ready');

  const maxCapacity = 6;

  const handlePush = (e) => {
    e?.preventDefault();
    const val = Number(inputValue.trim()) || Math.floor(Math.random() * 85) + 10;
    if (stack.length >= maxCapacity) {
      setActionMessage(`Stack Overflow! Cannot push ${val} — maximum capacity of ${maxCapacity} reached.`);
      setActiveAction('error');
      return;
    }

    setStack((prev) => [...prev, val]);
    setActionMessage(`Pushed element (${val}) onto top of stack. New TOP index is ${stack.length}.`);
    setActiveAction('push');
    setInputValue('');
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setActionMessage('Stack Underflow! Cannot pop — the stack is completely empty.');
      setActiveAction('error');
      return;
    }
    const popped = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setActionMessage(`Popped element (${popped}) from top of stack. New TOP index is ${stack.length - 2 >= 0 ? stack.length - 2 : 'empty'}.`);
    setActiveAction('pop');
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setActionMessage('Stack is empty. Peek returned null.');
      setActiveAction('peek');
      return;
    }
    const topItem = stack[stack.length - 1];
    setActionMessage(`Peek inspection: Element at top is ${topItem} (Index: ${stack.length - 1}).`);
    setActiveAction('peek');
  };

  const handleReset = () => {
    setStack([20, 50, 75]);
    setActionMessage('Reset stack to default state.');
    setActiveAction('ready');
  };

  return (
    <div className={`custom-visualizer-card ${canvasTheme === 'light' ? 'theme-light' : ''}`}>
      {/* Action banner */}
      <div className="workbench-banner-row">
        <span className={`workbench-status-pill pill-${activeAction}`}>
          {activeAction.toUpperCase()}
        </span>
        <span className="workbench-banner-text">{actionMessage}</span>
      </div>

      {/* Main Interactive Stage */}
      <div className="stack-stage-area">
        <div className="stack-vessel">
          <div className="stack-items-column">
            {stack.length === 0 ? (
              <div className="stack-empty-label">Stack is Empty</div>
            ) : (
              [...stack].reverse().map((val, revIdx) => {
                const actualIndex = stack.length - 1 - revIdx;
                const isTop = actualIndex === stack.length - 1;

                return (
                  <div
                    key={actualIndex}
                    className={`stack-block-item ${isTop ? 'is-top' : ''}`}
                  >
                    {isTop && (
                      <div className="top-pointer-indicator">
                        <span className="pointer-tag">TOP</span>
                        <ArrowRight size={14} className="pointer-arrow" />
                      </div>
                    )}
                    <span className="stack-block-val">{val}</span>
                    <span className="stack-block-idx">Index {actualIndex}</span>
                  </div>
                );
              })
            )}
          </div>
          <div className="stack-base-floor" />
        </div>

        {/* Stack info sidebar */}
        <div className="stack-metrics-panel">
          <div className="metric-chip">
            <span className="metric-chip-label">Current Size</span>
            <span className="metric-chip-val">{stack.length} / {maxCapacity}</span>
          </div>
          <div className="metric-chip">
            <span className="metric-chip-label">Top Element</span>
            <span className="metric-chip-val">{stack.length > 0 ? stack[stack.length - 1] : 'None'}</span>
          </div>
          <div className="metric-chip">
            <span className="metric-chip-label">LIFO Rule</span>
            <span className="metric-chip-val">Last-In, First-Out</span>
          </div>
        </div>
      </div>

      {/* Control panel */}
      <div className="interactive-actions-bar">
        <form onSubmit={handlePush} className="input-push-form">
          <input
            type="number"
            className="val-input-field"
            placeholder="Value..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="action-btn-primary">
            <Plus size={15} />
            <span>Push(x)</span>
          </button>
        </form>

        <button className="action-btn-secondary" onClick={handlePop} disabled={stack.length === 0}>
          <Minus size={15} />
          <span>Pop()</span>
        </button>

        <button className="action-btn-secondary" onClick={handlePeek} disabled={stack.length === 0}>
          <Eye size={15} />
          <span>Peek()</span>
        </button>

        <button className="action-btn-secondary" onClick={handleReset}>
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
