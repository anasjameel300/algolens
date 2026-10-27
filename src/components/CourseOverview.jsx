import React from 'react';
import { BookOpen, Sparkles, Clock, HardDrive, ShieldCheck, ArrowRight, Play, Table } from 'lucide-react';
import { DSA_INTRO, ALGORITHM_DETAILS } from '../data/dsaData';

export function CourseOverview({ onSelectAlgorithm, onLaunchVisualizer }) {
  return (
    <div className="course-overview-container">
      {/* Hero Banner */}
      <section className="overview-hero-card">
        <div className="hero-content">
          <span className="hero-tag">Comprehensive Learning Lab</span>
          <h2 className="hero-title">{DSA_INTRO.title}</h2>
          <p className="hero-subtitle">{DSA_INTRO.subtitle}</p>
          <p className="hero-desc">{DSA_INTRO.description}</p>
        </div>
      </section>

      {/* Core Educational Pillars */}
      <section className="pillars-section">
        <h3 className="section-title">Core Computational Pillars</h3>
        <div className="pillars-grid">
          {DSA_INTRO.pillars.map((pillar) => (
            <div key={pillar.id} className="pillar-card">
              <span className="pillar-badge">{pillar.badge}</span>
              <h4 className="pillar-title">{pillar.title}</h4>
              <p className="pillar-tagline">{pillar.tagline}</p>
              <p className="pillar-summary">{pillar.summary}</p>
              <ul className="pillar-bullets">
                {pillar.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Category Explorer */}
      <section className="categories-section">
        <h3 className="section-title">Explore Algorithms & Data Structures</h3>
        <div className="category-cards-grid">
          {DSA_INTRO.categories.map((cat) => {
            const algos = ALGORITHM_DETAILS.filter((a) => a.category === cat.id);

            return (
              <div key={cat.id} className="category-group-card">
                <div className="category-group-header">
                  <div className="group-header-text">
                    <h4 className="group-title">{cat.name}</h4>
                    <p className="group-desc">{cat.description}</p>
                  </div>
                  <span className="group-badge">
                    {algos.length} {cat.id.includes('structure') || cat.id === 'trees' ? 'Structures' : 'Algorithms'}
                  </span>
                </div>

                <div className="category-algos-list">
                  {algos.map((algo) => (
                    <div
                      key={algo.id}
                      className="category-algo-row"
                      onClick={() => onSelectAlgorithm(algo.id)}
                    >
                      <div className="row-left">
                        <span className="algo-row-name">{algo.name}</span>
                        <span className="algo-row-tagline">{algo.tagline}</span>
                      </div>

                      <div className="row-right">
                        <span className="row-complexity-badge">{algo.badge}</span>
                        <button
                          className="row-visualize-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectAlgorithm(algo.id);
                            onLaunchVisualizer();
                          }}
                        >
                          <Play size={13} fill="currentColor" />
                          <span>Visualize</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Master Complexity Cheat Sheet */}
      <section className="pillars-section">
        <h3 className="section-title">Master Big-O Complexity Comparison Matrix</h3>
        <p className="section-subtitle-text">
          Instant comparison of Time and Space bounds across all foundational structures and algorithms
        </p>

        <div className="complexity-table-card">
          <table className="complexity-matrix-table">
            <thead>
              <tr>
                <th>Algorithm / Structure</th>
                <th>Category</th>
                <th>Best Time</th>
                <th>Average Time</th>
                <th>Worst Time</th>
                <th>Space Complexity</th>
                <th>Stability</th>
              </tr>
            </thead>
            <tbody>
              {ALGORITHM_DETAILS.map((algo) => (
                <tr
                  key={algo.id}
                  className="table-clickable-row"
                  onClick={() => onSelectAlgorithm(algo.id)}
                  title={`Open ${algo.name} interactive view`}
                >
                  <td className="table-algo-name">
                    <strong>{algo.name}</strong>
                  </td>
                  <td>
                    <span className="table-category-tag">{algo.categoryLabel}</span>
                  </td>
                  <td>
                    <span className="matrix-time-pill best">{algo.timeComplexity.best}</span>
                  </td>
                  <td>
                    <span className="matrix-time-pill avg">{algo.timeComplexity.average}</span>
                  </td>
                  <td>
                    <span className="matrix-time-pill worst">{algo.timeComplexity.worst}</span>
                  </td>
                  <td>
                    <span className="matrix-space-pill">{algo.spaceComplexity}</span>
                  </td>
                  <td>
                    <span className={`matrix-stability-pill ${algo.stability === 'Stable' ? 'is-stable' : ''}`}>
                      {algo.stability}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
