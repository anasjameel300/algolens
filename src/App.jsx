import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ALGORITHM_DETAILS } from './data/dsaData';
import { getAlgorithmSteps } from './algorithms';

import { Sidebar } from './components/Sidebar';
import { AlgorithmView } from './components/AlgorithmView';
import { CourseOverview } from './components/CourseOverview';
import { CustomArrayDialog } from './components/CustomArrayDialog';

function generateInitialArray(size = 9, type = 'random') {
  if (type === 'random') {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 75) + 15);
  }
  if (type === 'reversed') {
    const step = Math.floor(70 / size);
    return Array.from({ length: size }, (_, i) => 90 - i * step);
  }
  if (type === 'nearly-sorted') {
    const arr = Array.from({ length: size }, (_, i) => Math.floor((i / size) * 70) + 15);
    if (size > 3) {
      const temp = arr[1];
      arr[1] = arr[2];
      arr[2] = temp;
    }
    return arr;
  }
  return Array.from({ length: size }, () => Math.floor(Math.random() * 75) + 15);
}

export function App() {
  const [currentTab, setCurrentTab] = useState('algorithm'); // 'algorithm' | 'overview'
  const [selectedAlgoId, setSelectedAlgoId] = useState('bubble-sort');
  const [rawArray, setRawArray] = useState(() => generateInitialArray(9, 'random'));
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const [searchTarget, setSearchTarget] = useState(null);

  const timerRef = useRef(null);

  const selectedAlgo =
    ALGORITHM_DETAILS.find((a) => a.id === selectedAlgoId) || ALGORITHM_DETAILS[0];

  // Reset or pick default search target when algorithm changes
  useEffect(() => {
    if (selectedAlgo?.category === 'searching') {
      const sorted = [...rawArray].sort((a, b) => a - b);
      // Pick an interesting target (e.g. 2nd to last element or 4th element)
      const defaultTarget = sorted[sorted.length > 3 ? sorted.length - 2 : 0];
      setSearchTarget(defaultTarget);
    } else {
      setSearchTarget(null);
    }
  }, [selectedAlgoId]);

  // Re-generate steps when algorithm, data, or searchTarget changes
  useEffect(() => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const generated = getAlgorithmSteps(selectedAlgoId, rawArray, searchTarget ?? undefined);
    setSteps(generated);
    setCurrentStepIndex(0);
  }, [selectedAlgoId, rawArray, searchTarget]);

  // Animation Playback Loop
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(50, Math.floor(750 / speed));

      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#4f46e5', '#38bdf8', '#10b981', '#f59e0b', '#ec4899']
            });
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  // Controls
  const handleTogglePlay = useCallback(() => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [currentStepIndex, steps.length]);

  const handleStepForward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
  }, [steps.length]);

  const handleStepBackward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const handleSeekStep = useCallback((stepIdx) => {
    setIsPlaying(false);
    setCurrentStepIndex(stepIdx);
  }, []);

  const handleSelectAlgorithm = (algoId) => {
    setSelectedAlgoId(algoId);
    setCurrentTab('algorithm');
  };

  const handleGeneratePreset = (presetType) => {
    setRawArray(generateInitialArray(rawArray.length, presetType));
  };

  const handleCustomNumbersSubmit = (numbers) => {
    setRawArray(numbers);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleStepForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleStepBackward();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTogglePlay, handleStepForward, handleStepBackward, handleReset]);

  const currentFrame = steps[currentStepIndex] || null;

  return (
    <div className="fullscreen-app-layout">
      {/* Sidebar with all functional categories and algorithms */}
      <Sidebar
        selectedId={selectedAlgoId}
        onSelect={handleSelectAlgorithm}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />

      {/* Main Full-Screen Content Area */}
      <main className="app-main-viewport">
        {currentTab === 'overview' ? (
          <CourseOverview
            onSelectAlgorithm={handleSelectAlgorithm}
            onLaunchVisualizer={() => setCurrentTab('algorithm')}
          />
        ) : (
          <AlgorithmView
            algorithm={selectedAlgo}
            frame={currentFrame}
            totalSteps={steps.length}
            currentStepIndex={currentStepIndex}
            isPlaying={isPlaying}
            speed={speed}
            searchTarget={searchTarget}
            onSetSearchTarget={setSearchTarget}
            onTogglePlay={handleTogglePlay}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onReset={handleReset}
            onSeekStep={handleSeekStep}
            onChangeSpeed={setSpeed}
            onGeneratePreset={handleGeneratePreset}
            onOpenCustomModal={() => setIsCustomDialogOpen(true)}
          />
        )}
      </main>

      {/* Custom Array Dialog */}
      <CustomArrayDialog
        isOpen={isCustomDialogOpen}
        onClose={() => setIsCustomDialogOpen(false)}
        onSubmitNumbers={handleCustomNumbersSubmit}
      />
    </div>
  );
}

export default App;
