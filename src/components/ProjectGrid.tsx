import React, { useState, useMemo } from 'react';
import { ProjectItem } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { Search, Layers } from 'lucide-react';

interface ProjectGridProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onSelectProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const query = searchQuery.toLowerCase().trim();
    return projects.filter(
      (p) =>
        p.title?.toLowerCase().includes(query) ||
        p.caption?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
    );
  }, [projects, searchQuery]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 24, filteredProjects.length));
  };

  return (
    <section className="animate-fadeIn">
      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="counter-badge">
          <Layers size={16} style={{ color: 'var(--accent-gold)' }} />
          <span>
            Showing <strong>{visibleProjects.length}</strong> of <strong>{filteredProjects.length}</strong> Works
          </span>
        </div>

        {/* Search Bar */}
        <div className="search-wrapper">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(24);
            }}
            placeholder="Search 115 projects..."
            className="search-input"
          />
        </div>
      </div>

      {/* Grid */}
      {visibleProjects.length > 0 ? (
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onSelectProject}
            />
          ))}
        </div>
      ) : (
        <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '0.9rem' }}>No projects found matching "{searchQuery}".</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="load-more-wrap">
          <button onClick={handleLoadMore} className="btn-primary">
            <span>Load More Projects ({filteredProjects.length - visibleCount} left)</span>
          </button>
        </div>
      )}
    </section>
  );
};
