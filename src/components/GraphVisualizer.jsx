import React, { useState } from 'react';
import { Play, RotateCcw, GitBranch, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

const GRAPH_NODES = [
  { id: 'A', x: 80, y: 110 },
  { id: 'B', x: 220, y: 50 },
  { id: 'C', x: 220, y: 170 },
  { id: 'D', x: 380, y: 50 },
  { id: 'E', x: 380, y: 170 },
  { id: 'F', x: 520, y: 110 },
  { id: 'G', x: 300, y: 110 }
];

const WEIGHTED_EDGES = [
  { u: 'A', v: 'B', w: 4 },
  { u: 'A', v: 'C', w: 2 },
  { u: 'B', v: 'D', w: 5 },
  { u: 'B', v: 'G', w: 3 },
  { u: 'C', v: 'E', w: 6 },
  { u: 'C', v: 'G', w: 1 },
  { u: 'D', v: 'F', w: 2 },
  { u: 'E', v: 'F', w: 4 },
  { u: 'G', v: 'F', w: 7 }
];

const ADJ_LIST = {
  A: [
    { to: 'B', w: 4 },
    { to: 'C', w: 2 }
  ],
  B: [
    { to: 'A', w: 4 },
    { to: 'D', w: 5 },
    { to: 'G', w: 3 }
  ],
  C: [
    { to: 'A', w: 2 },
    { to: 'E', w: 6 },
    { to: 'G', w: 1 }
  ],
  D: [
    { to: 'B', w: 5 },
    { to: 'F', w: 2 }
  ],
  E: [
    { to: 'C', w: 6 },
    { to: 'F', w: 4 }
  ],
  F: [
    { to: 'D', w: 2 },
    { to: 'E', w: 4 },
    { to: 'G', w: 7 }
  ],
  G: [
    { to: 'B', w: 3 },
    { to: 'C', w: 1 },
    { to: 'F', w: 7 }
  ]
};

export function GraphVisualizer({ defaultMode = 'BFS', canvasTheme = 'dark' }) {
  const [visited, setVisited] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [frontier, setFrontier] = useState([]);
  const [distances, setDistances] = useState({
    A: 0,
    B: '∞',
    C: '∞',
    D: '∞',
    E: '∞',
    F: '∞',
    G: '∞'
  });
  const [actionMessage, setActionMessage] = useState(
    `Graph ready with 7 vertices and 9 weighted edges. Select ${defaultMode} to run.`
  );
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState(defaultMode);

  const runBFS = async () => {
    setIsRunning(true);
    setMode('BFS');
    setVisited([]);
    const queue = ['A'];
    const seen = new Set(['A']);
    const visitOrder = [];

    setFrontier([...queue]);
    setActionMessage('BFS starting at source vertex A. Level 0 enqueued.');

    while (queue.length > 0) {
      const u = queue.shift();
      setCurrentNode(u);
      visitOrder.push(u);
      setVisited([...visitOrder]);
      setFrontier([...queue]);

      setActionMessage(`Dequeued & visited [${u}]. Discovering unvisited neighbors...`);
      await new Promise((r) => setTimeout(r, 600));

      for (const edge of ADJ_LIST[u]) {
        const v = edge.to;
        if (!seen.has(v)) {
          seen.add(v);
          queue.push(v);
        }
      }
      setFrontier([...queue]);
      await new Promise((r) => setTimeout(r, 400));
    }

    setCurrentNode(null);
    setActionMessage(`BFS Complete! Level-order visit order: ${visitOrder.join(' → ')}`);
    setIsRunning(false);
  };

  const runDFS = async () => {
    setIsRunning(true);
    setMode('DFS');
    setVisited([]);
    const seen = new Set();
    const visitOrder = [];

    const dfsHelper = async (u) => {
      seen.add(u);
      visitOrder.push(u);
      setCurrentNode(u);
      setVisited([...visitOrder]);
      setActionMessage(`Visiting [${u}] and recursively diving deeper...`);
      await new Promise((r) => setTimeout(r, 600));

      for (const edge of ADJ_LIST[u]) {
        const v = edge.to;
        if (!seen.has(v)) {
          await dfsHelper(v);
        }
      }
    };

    setActionMessage('DFS starting at source vertex A (Depth First exploration).');
    await dfsHelper('A');

    setCurrentNode(null);
    setActionMessage(`DFS Complete! Deep exploration path: ${visitOrder.join(' → ')}`);
    setIsRunning(false);
  };

  const runDijkstra = async () => {
    setIsRunning(true);
    setMode('Dijkstra');
    setVisited([]);

    const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity, F: Infinity, G: Infinity };
    const settled = new Set();
    const visitOrder = [];

    const updateDisplayDist = () => {
      const formatted = {};
      Object.keys(dist).forEach((k) => {
        formatted[k] = dist[k] === Infinity ? '∞' : dist[k];
      });
      setDistances(formatted);
    };

    updateDisplayDist();
    setActionMessage("Dijkstra's Algorithm initialized. dist[A] = 0, all others = ∞.");

    while (settled.size < GRAPH_NODES.length) {
      let minNode = null;
      let minDist = Infinity;

      for (const node of GRAPH_NODES) {
        if (!settled.has(node.id) && dist[node.id] < minDist) {
          minDist = dist[node.id];
          minNode = node.id;
        }
      }

      if (!minNode || minDist === Infinity) break;

      setCurrentNode(minNode);
      settled.add(minNode);
      visitOrder.push(minNode);
      setVisited([...visitOrder]);

      setActionMessage(`Extracted closest settled vertex [${minNode}] with dist = ${minDist}. Relaxing outgoing edges...`);
      await new Promise((r) => setTimeout(r, 700));

      for (const edge of ADJ_LIST[minNode]) {
        const v = edge.to;
        const weight = edge.w;

        if (!settled.has(v)) {
          const newDist = dist[minNode] + weight;
          if (newDist < dist[v]) {
            dist[v] = newDist;
            updateDisplayDist();
            setActionMessage(`Relaxed edge (${minNode} → ${v}, w=${weight}): updated dist[${v}] = ${newDist}.`);
            await new Promise((r) => setTimeout(r, 500));
          }
        }
      }
    }

    setCurrentNode(null);
    setActionMessage("Dijkstra Complete! Shortest paths from source A to all vertices calculated.");
    setIsRunning(false);
  };

  const handleReset = () => {
    setVisited([]);
    setCurrentNode(null);
    setFrontier([]);
    setDistances({
      A: 0,
      B: '∞',
      C: '∞',
      D: '∞',
      E: '∞',
      F: '∞',
      G: '∞'
    });
    setActionMessage('Graph reset to initial unvisited state.');
    setIsRunning(false);
  };

  const getNodeCoords = (id) => GRAPH_NODES.find((n) => n.id === id);

  return (
    <div className={`custom-visualizer-card ${canvasTheme === 'light' ? 'theme-light' : ''}`}>
      {/* Banner */}
      <div className="workbench-banner-row">
        <div className="action-tag-cluster">
          <span className="workbench-status-pill pill-traversal">{mode}</span>
          <span className="live-metrics-summary">
            Visited: <strong>{visited.length}/7</strong>
            {mode === 'Dijkstra' ? (
              <span> • Target F Dist: <strong>{distances['F']}</strong></span>
            ) : (
              <span> • Frontier Size: <strong>{frontier.length}</strong></span>
            )}
          </span>
        </div>
        <div className="banner-text-block">
          <span className="banner-text">{actionMessage}</span>
        </div>
      </div>

      {/* SVG Canvas Stage */}
      <div className="graph-stage-container">
        <svg viewBox="0 0 600 230" className="graph-svg-canvas">
          {/* Edges with weights */}
          {WEIGHTED_EDGES.map((edge, idx) => {
            const u = getNodeCoords(edge.u);
            const v = getNodeCoords(edge.v);
            const isTraversed = visited.includes(edge.u) && visited.includes(edge.v);
            const midX = (u.x + v.x) / 2;
            const midY = (u.y + v.y) / 2;

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  stroke={isTraversed ? '#a855f7' : 'rgba(124, 92, 191, 0.4)'}
                  strokeWidth={isTraversed ? 3.5 : 2}
                />
                {/* Weight badge */}
                <circle cx={midX} cy={midY} r={9} fill="#1e1b2e" stroke="#7c5cbf" strokeWidth="1" />
                <text
                  x={midX}
                  y={midY + 3.5}
                  textAnchor="middle"
                  fill="#c084fc"
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="monospace"
                >
                  {edge.w}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {GRAPH_NODES.map((node) => {
            const isCurrent = currentNode === node.id;
            const isVisited = visited.includes(node.id);
            const inFrontier = frontier.includes(node.id);

            let nodeFill = '#241f38';
            let strokeColor = '#7c5cbf';

            if (isCurrent) {
              nodeFill = '#f59e0b';
              strokeColor = '#fde68a';
            } else if (isVisited) {
              nodeFill = '#7c5cbf';
              strokeColor = '#c084fc';
            } else if (inFrontier) {
              nodeFill = '#38bdf8';
              strokeColor = '#bae6fd';
            }

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r={isCurrent ? 20 : 17}
                  fill={nodeFill}
                  stroke={strokeColor}
                  strokeWidth={isCurrent ? 3.5 : 2.5}
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="800"
                  fontFamily="sans-serif"
                >
                  {node.id}
                </text>
                {/* Distance Badge for Dijkstra */}
                {mode === 'Dijkstra' && (
                  <text
                    textAnchor="middle"
                    dy="-24"
                    fill="#38bdf8"
                    fontSize="10"
                    fontWeight="800"
                    fontFamily="monospace"
                  >
                    d: {distances[node.id]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Frontier / Sequence Strip */}
        <div className="graph-info-strip">
          <div className="strip-col">
            <span className="strip-title">Visit Order:</span>
            <div className="chips-row">
              {visited.length === 0 ? (
                <span className="empty-hint">None</span>
              ) : (
                visited.map((v, i) => (
                  <span key={i} className="node-chip chip-visited">
                    {v}
                  </span>
                ))
              )}
            </div>
          </div>

          {mode === 'Dijkstra' ? (
            <div className="strip-col">
              <span className="strip-title">Distances Table:</span>
              <div className="chips-row">
                {Object.entries(distances).map(([k, d]) => (
                  <span key={k} className="dist-table-cell">
                    {k}: <strong>{d}</strong>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="strip-col">
              <span className="strip-title">Frontier Queue:</span>
              <div className="chips-row">
                {frontier.length === 0 ? (
                  <span className="empty-hint">Empty</span>
                ) : (
                  frontier.map((f, i) => (
                    <span key={i} className="node-chip chip-frontier">
                      {f}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="custom-controls-bar">
        <div className="traversal-btn-group">
          <button
            className={`traversal-pill-btn ${mode === 'BFS' ? 'active-pill' : ''}`}
            onClick={runBFS}
            disabled={isRunning}
          >
            <Play size={13} />
            <span>Run BFS</span>
          </button>

          <button
            className={`traversal-pill-btn ${mode === 'DFS' ? 'active-pill' : ''}`}
            onClick={runDFS}
            disabled={isRunning}
          >
            <Play size={13} />
            <span>Run DFS</span>
          </button>

          <button
            className={`traversal-pill-btn ${mode === 'Dijkstra' ? 'active-pill' : ''}`}
            onClick={runDijkstra}
            disabled={isRunning}
          >
            <Zap size={13} />
            <span>Run Dijkstra</span>
          </button>
        </div>

        <button className="custom-action-btn btn-reset" onClick={handleReset} disabled={isRunning}>
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
