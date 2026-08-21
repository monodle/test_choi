import React, { useState } from 'react';
import { AboutInfo } from '../types/portfolio';
import { ChevronDown, ChevronUp, Briefcase, Wrench, Code2, Building2, ChevronsUpDown } from 'lucide-react';

interface AboutSectionProps {
  about: AboutInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  // All years expanded by default
  const [expandedYears, setExpandedYears] = useState<Set<string>>(() => {
    return new Set(about.experience.map((g) => g.year));
  });
  const [imageError, setImageError] = useState(false);

  const allYears = about.experience.map((g) => g.year);
  const isAllExpanded = expandedYears.size === allYears.length;

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  const toggleAllYears = () => {
    if (isAllExpanded) {
      setExpandedYears(new Set());
    } else {
      setExpandedYears(new Set(allYears));
    }
  };

  // Base URL normalization for GitHub Pages compatibility
  const basePath = import.meta.env.BASE_URL || './';
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const imageSrc = about.image
    ? (about.image.startsWith('http') ? about.image : `${normalizedBase}${about.image.replace(/^\//, '')}`)
    : '';

  return (
    <section className="about-container animate-fadeIn">
      {/* Profile & Biography Hero Block */}
      <div className="about-hero-block">
        {imageSrc && !imageError && (
          <div className="about-profile-media">
            <img
              src={imageSrc}
              alt="Designer Profile"
              className="about-profile-img"
              onError={() => setImageError(true)}
            />
          </div>
        )}

        <div className="about-hero-text">
          <span className="section-label">Biography</span>
          <h2 className="about-heading">
            디지털 환경의 본질을 짚고<br className="hide-mobile" />
            지속 가능한 가치를 만드는 디자이너
          </h2>
          <p className="about-text">{about.intro}</p>
        </div>
      </div>

      {/* Tools & Skills Grid */}
      <div className="about-skills-section">
        {/* Tools */}
        <div className="skills-block">
          <div className="section-subheading">
            <Wrench size={16} className="subheading-icon" />
            <span>Tools & Software</span>
          </div>
          <div className="badges-grid">
            {about.tools.map((tool) => (
              <span key={tool} className="badge-item">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="skills-block">
          <div className="section-subheading">
            <Code2 size={16} className="subheading-icon" />
            <span>Design & Dev Skills</span>
          </div>
          <div className="badges-grid">
            {about.skills.map((skill) => (
              <span key={skill} className="badge-item highlight">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Clients */}
      <div className="about-clients-section">
        <div className="section-subheading" style={{ marginBottom: 16 }}>
          <Building2 size={16} className="subheading-icon" />
          <span>Clients & Partnerships ({about.clients.length})</span>
        </div>
        <div className="clients-grid">
          {about.clients.map((client) => (
            <div key={client} className="client-card">
              {client}
            </div>
          ))}
        </div>
      </div>

      {/* Career History (Expanded by default) */}
      <div className="about-timeline-section">
        <div className="timeline-top-header">
          <div className="section-subheading">
            <Briefcase size={16} className="subheading-icon" />
            <span>Career History & Projects</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="timeline-range-badge">2002 — 2018</span>
            <button
              onClick={toggleAllYears}
              className="detail-action-btn"
              style={{ padding: '4px 10px', fontSize: '0.7rem', border: '1px solid var(--border-subtle)' }}
              title={isAllExpanded ? 'Collapse All' : 'Expand All'}
            >
              <ChevronsUpDown size={13} />
              <span>{isAllExpanded ? 'Collapse All' : 'Expand All'}</span>
            </button>
          </div>
        </div>

        <div className="timeline-accordion">
          {about.experience.map((group) => {
            const isExpanded = expandedYears.has(group.year);
            return (
              <div key={group.year} className="timeline-item">
                <button
                  onClick={() => toggleYear(group.year)}
                  className="timeline-header"
                  aria-expanded={isExpanded}
                >
                  <div className="timeline-header-left">
                    <span className="timeline-year">{group.year}</span>
                    <span className="timeline-count">{group.items.length} works</span>
                  </div>
                  <div className="timeline-toggle-icon">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="timeline-body">
                    {group.items.map((item, idx) => (
                      <div key={idx} className="timeline-entry">
                        <div className="timeline-entry-header">
                          <span className="timeline-month">{item.month}월</span>
                          <span className="timeline-client">{item.client}</span>
                        </div>
                        <span className="timeline-desc">{item.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
