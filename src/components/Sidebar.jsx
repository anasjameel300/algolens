import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  Search,
  ArrowRight,
  Code2,
  Sliders,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ALGORITHM_DETAILS } from '../data/dsaData';
import { AlgoLensLogo } from './AlgoLensLogo';

export function Sidebar({ selectedId, onSelect, currentTab, onSelectTab }) {
  const [search, setSearch] = useState('');

  const sortingAlgos = ALGORITHM_DETAILS.filter((a) => a.category === 'sorting');
  const searchingAlgos = ALGORITHM_DETAILS.filter((a) => a.category === 'searching');
  const linearAlgos = ALGORITHM_DETAILS.filter((a) => a.category === 'linear-structures');
  const treeAlgos = ALGORITHM_DETAILS.filter((a) => a.category === 'trees');
  const graphAlgos = ALGORITHM_DETAILS.filter((a) => a.category === 'graphs');

  const filterMatches = (algo) =>
    algo.name.toLowerCase().includes(search.toLowerCase()) ||
    algo.tagline.toLowerCase().includes(search.toLowerCase());

  const filteredSorting = sortingAlgos.filter(filterMatches);
  const filteredSearching = searchingAlgos.filter(filterMatches);
  const filteredLinear = linearAlgos.filter(filterMatches);
  const filteredTrees = treeAlgos.filter(filterMatches);
  const filteredGraphs = graphAlgos.filter(filterMatches);

  return (
    <aside className="app-sidebar">
      {/* Brand Logo */}
      <div
        className="sidebar-brand"
        onClick={() => onSelectTab('overview')}
        style={{ cursor: 'pointer' }}
        title="Go to DSA Foundations Overview"
      >
        <AlgoLensLogo size={40} />
        <div className="brand-text-block">
          <h1 className="brand-name">AlgoLens</h1>
          <span className="brand-sub">DSA Learning Lab</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="sidebar-search">
        <Search size={15} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search algorithms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Navigation Sections */}
      <div className="sidebar-scroll-nav">
        {/* Section 1: Overview */}
        <div className="nav-group">
          <div className="nav-group-title">Foundations</div>
          <button
            className={`nav-item-btn ${currentTab === 'overview' ? 'active' : ''}`}
            onClick={() => onSelectTab('overview')}
          >
            <BookOpen size={16} className="item-icon" />
            <span className="item-title">What is DSA & Big-O?</span>
          </button>
        </div>

        {/* Section 2: Sorting */}
        <div className="nav-group">
          <div className="nav-group-title">
            <span>Sorting Algorithms</span>
            <span className="group-count">{sortingAlgos.length}</span>
          </div>

          <div className="nav-items-list">
            {filteredSorting.map((algo) => {
              const isSelected = currentTab === 'algorithm' && selectedId === algo.id;
              return (
                <button
                  key={algo.id}
                  className={`nav-item-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => onSelect(algo.id)}
                >
                  <span className="item-dot" />
                  <span className="item-title">{algo.name}</span>
                  <span className="item-badge">{algo.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Searching */}
        <div className="nav-group">
          <div className="nav-group-title">
            <span>Searching Algorithms</span>
            <span className="group-count">{searchingAlgos.length}</span>
          </div>

          <div className="nav-items-list">
            {filteredSearching.map((algo) => {
              const isSelected = currentTab === 'algorithm' && selectedId === algo.id;
              return (
                <button
                  key={algo.id}
                  className={`nav-item-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => onSelect(algo.id)}
                >
                  <span className="item-dot" />
                  <span className="item-title">{algo.name}</span>
                  <span className="item-badge">{algo.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Linear Data Structures */}
        <div className="nav-group">
          <div className="nav-group-title">
            <span>Data Structures</span>
            <span className="group-count">{linearAlgos.length}</span>
          </div>

          <div className="nav-items-list">
            {filteredLinear.map((algo) => {
              const isSelected = currentTab === 'algorithm' && selectedId === algo.id;
              return (
                <button
                  key={algo.id}
                  className={`nav-item-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => onSelect(algo.id)}
                >
                  <span className="item-dot" />
                  <span className="item-title">{algo.name}</span>
                  <span className="item-badge">{algo.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 5: Tree Structures */}
        <div className="nav-group">
          <div className="nav-group-title">
            <span>Tree Structures</span>
            <span className="group-count">{treeAlgos.length}</span>
          </div>

          <div className="nav-items-list">
            {filteredTrees.map((algo) => {
              const isSelected = currentTab === 'algorithm' && selectedId === algo.id;
              return (
                <button
                  key={algo.id}
                  className={`nav-item-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => onSelect(algo.id)}
                >
                  <span className="item-dot" />
                  <span className="item-title">{algo.name}</span>
                  <span className="item-badge">{algo.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 6: Graph Algorithms */}
        <div className="nav-group">
          <div className="nav-group-title">
            <span>Graph Algorithms</span>
            <span className="group-count">{graphAlgos.length}</span>
          </div>

          <div className="nav-items-list">
            {filteredGraphs.map((algo) => {
              const isSelected = currentTab === 'algorithm' && selectedId === algo.id;
              return (
                <button
                  key={algo.id}
                  className={`nav-item-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => onSelect(algo.id)}
                >
                  <span className="item-dot" />
                  <span className="item-title">{algo.name}</span>
                  <span className="item-badge">{algo.badge}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
