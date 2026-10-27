import React, { useState } from 'react';
import { Plus, Minus, Eye, RotateCcw, ArrowDown } from 'lucide-react';

export function QueueVisualizer({ canvasTheme = 'dark' }) {
  const [queue, setQueue] = useState([24, 58, 91]);
  const [inputValue, setInputValue] = useState('');
  const [actionMessage, setActionMessage] = useState('Queue initialized with 3 items. Ready for FIFO operations.');
  const [activeAction, setActiveAction] = useState('ready');

  const maxCapacity = 7;

  const handleEnqueue = (e) => {
    e?.preventDefault();
    const val = Number(inputValue.trim()) || Math.floor(Math.random() * 85) + 10;
    if (queue.length >= maxCapacity) {
      setActionMessage(`Queue Overflow! Cannot enqueue ${val} — maximum capacity reached.`);
      setActiveAction('error');
      return;
    }

    setQueue((prev) => [...prev, val]);
    setActionMessage(`Enqueued element (${val}) at REAR. Total items: ${queue.length + 1}.`);
    setActiveAction('enqueue');
    setInputValue('');
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setActionMessage('Queue Underflow! Cannot dequeue from an empty queue.');
      setActiveAction('error');
      return;
    }
    const dequeued = queue[0];
    setQueue((prev) => prev.slice(1));
    setActionMessage(`Dequeued element (${dequeued}) from FRONT. Remaining items: ${queue.length - 1}.`);
    setActiveAction('dequeue');
  };

  const handlePeek = () => {
    if (queue.length === 0) {
      setActionMessage('Queue is empty. Peek returned null.');
      setActiveAction('peek');
      return;
    }
    setActionMessage(`Peek inspection: Front item is ${queue[0]}.`);
    setActiveAction('peek');
  };

  const handleReset = () => {
    setQueue([18, 45, 72]);
    setActionMessage('Reset queue to default state.');
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

      {/* Main Queue Pipeline Stage */}
      <div className="queue-stage-area">
        <div className="queue-pipeline-container">
          <div className="queue-exit-lane">
            <span className="lane-label">FRONT (Exit)</span>
          </div>

          <div className="queue-items-track">
            {queue.length === 0 ? (
              <div className="queue-empty-label">Queue is Empty</div>
            ) : (
              queue.map((val, idx) => {
                const isFront = idx === 0;
                const isRear = idx === queue.length - 1;

                return (
                  <div key={idx} className={`queue-block-item ${isFront ? 'is-front' : ''} ${isRear ? 'is-rear' : ''}`}>
                    {isFront && (
                      <div className="queue-pointer-top front-tag">
                        <span className="p-badge">FRONT</span>
                        <ArrowDown size={12} />
                      </div>
                    )}
                    {isRear && (
                      <div className="queue-pointer-top rear-tag">
                        <span className="p-badge">REAR</span>
                        <ArrowDown size={12} />
                      </div>
                    )}

                    <span className="queue-val-text">{val}</span>
                    <span className="queue-idx-text">Pos {idx}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="queue-entry-lane">
            <span className="lane-label">REAR (Entry)</span>
          </div>
        </div>
      </div>

      {/* Control panel */}
      <div className="interactive-actions-bar">
        <form onSubmit={handleEnqueue} className="input-push-form">
          <input
            type="number"
            className="val-input-field"
            placeholder="Value..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="action-btn-primary">
            <Plus size={15} />
            <span>Enqueue(x)</span>
          </button>
        </form>

        <button className="action-btn-secondary" onClick={handleDequeue} disabled={queue.length === 0}>
          <Minus size={15} />
          <span>Dequeue()</span>
        </button>

        <button className="action-btn-secondary" onClick={handlePeek} disabled={queue.length === 0}>
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
