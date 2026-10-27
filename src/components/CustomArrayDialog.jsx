import React, { useState } from 'react';
import { X, Check, AlertCircle, Sparkles } from 'lucide-react';

export function CustomArrayDialog({ isOpen, onClose, onSubmitNumbers }) {
  const [inputText, setInputText] = useState('45, 18, 92, 33, 7, 64, 21, 50');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const samplePresets = [
    { label: 'Sample Array', val: '45, 18, 92, 33, 7, 64, 21, 50' },
    { label: 'Descending', val: '80, 70, 60, 50, 40, 30, 20, 10' },
    { label: 'Nearly Sorted', val: '12, 18, 25, 42, 36, 50, 65, 80' },
    { label: 'Duplicates', val: '30, 75, 30, 85, 30, 75, 85, 15' },
    { label: 'Quick 6', val: '24, 8, 42, 16, 50, 12' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const tokens = inputText
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (tokens.length < 3) {
      setError('Please provide at least 3 numbers to visualize.');
      return;
    }

    if (tokens.length > 25) {
      setError('For optimal clarity in the viewer, please limit input to 25 items.');
      return;
    }

    const numbers = [];
    for (const t of tokens) {
      const num = Number(t);
      if (isNaN(num)) {
        setError(`"${t}" is not a valid number.`);
        return;
      }
      if (num < 1 || num > 99) {
        setError(`Number ${num} is out of bounds. Please enter numbers between 1 and 99.`);
        return;
      }
      numbers.push(num);
    }

    onSubmitNumbers(numbers);
    onClose();
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog-card" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="dialog-title-row">
            <Sparkles size={18} className="dialog-icon" />
            <h3 className="dialog-title">Custom Data Input</h3>
          </div>
          <button className="dialog-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="dialog-form">
          <p className="dialog-hint">
            Enter positive integers (1 to 99) separated by commas:
          </p>

          <input
            type="text"
            className={`dialog-input ${error ? 'has-error' : ''}`}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (error) setError('');
            }}
            autoFocus
          />

          {error && (
            <div className="dialog-error-row">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div className="dialog-presets-row">
            <span className="preset-label">Presets:</span>
            {samplePresets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="preset-chip"
                onClick={() => {
                  setInputText(p.val);
                  setError('');
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="dialog-actions-row">
            <button type="button" className="btn-dialog-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-dialog-apply">
              <Check size={15} />
              <span>Apply Data</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
