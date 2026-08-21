import React from 'react';
import { Sparkles, ArrowRight, Layers, Award, Briefcase, Code2 } from 'lucide-react';
import { ProfileInfo } from '../types/portfolio';
import { TabType } from './Header';

interface HeroSectionProps {
  profile: ProfileInfo;
  skills: string[];
  totalProjects: number;
  clientCount: number;
  onNavigate: (tab: TabType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  skills,
  totalProjects,
  clientCount,
  onNavigate,
}) => {
  const capabilityList = (skills && skills.length > 0) ? skills : [
    'Web Design',
    'Advertising Design',
    'Planning',
    'HTML5 / CSS3',
    'Javascript',
  ];

  return (
    <section className="hero-section">
      {/* Top Editorial Meta Row */}
      <div className="hero-meta-row">
        <div className="hero-role-badge">
          <Sparkles size={13} className="hero-sparkle-icon" />
          <span>{profile.role || 'Web & Digital Designer'}</span>
        </div>

        <div className="hero-status-tag">
          <span className="dot pulse" />
          <span className="hero-status-text">Available for Projects & Collaboration</span>
        </div>
      </div>

      {/* Main Big Editorial Headline */}
      <div className="hero-main-header">
        <h1 className="hero-title">
          {profile.name || 'CHOI JIN WON'}
        </h1>
        <p className="hero-subtitle">
          Crafting Purposeful Digital Experiences, Web Solutions & Visual Identities
        </p>
      </div>

      {/* Two Column Intro + Stats Box */}
      <div className="hero-content-grid">
        {/* Left: Bio narrative & Fast Action CTA */}
        <div className="hero-bio-block">
          <p className="hero-bio">
            {profile.bio}
          </p>

          <div className="hero-action-buttons">
            <button
              onClick={() => onNavigate('ABOUT')}
              className="hero-btn primary"
              aria-label="View designer profile"
            >
              <span>About Designer</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => onNavigate('CONTACT')}
              className="hero-btn secondary"
              aria-label="Contact designer"
            >
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Right: Key Designer Stats Cards */}
        <div className="hero-stats-panel">
          <div className="hero-stat-card">
            <div className="stat-icon-wrap">
              <Layers size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{totalProjects}+</span>
              <span className="stat-label">Archived Works</span>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="stat-icon-wrap">
              <Award size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-number">20+</span>
              <span className="stat-label">Years Career</span>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="stat-icon-wrap">
              <Briefcase size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{clientCount}+</span>
              <span className="stat-label">Top Brand Clients</span>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="stat-icon-wrap">
              <Code2 size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-number">All-Rounder</span>
              <span className="stat-label">Design & Dev</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Ticker / Pill Badges */}
      <div className="hero-expertise-bar">
        <span className="expertise-label">Core Capabilities</span>
        <div className="expertise-tags">
          {capabilityList.map((skill) => (
            <span key={skill} className="expertise-pill">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
