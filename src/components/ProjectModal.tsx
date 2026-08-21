import React, { useEffect, useState, useRef } from 'react';
import { ProjectItem } from '../types/portfolio';
import { X, ChevronLeft, ChevronRight, LayoutGrid, Calendar, Layers, ImageOff } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem;
  projects: ProjectItem[];
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  projects,
  onClose,
  onSelectProject,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // 1. Lock background body scroll while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 2. Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prevProject) onSelectProject(prevProject);
      if (e.key === 'ArrowRight' && nextProject) onSelectProject(nextProject);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, prevProject, nextProject, onSelectProject]);

  // 3. Scroll position detection for sticky header shrinking
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleScroll = () => {
      setIsScrolled(overlay.scrollTop > 60);
    };

    overlay.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      overlay.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Reset scroll when switching project
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      setIsScrolled(false);
    }
  }, [project.id]);

  // Determine list of detail images
  const customList = (project.customDetailImages || []).filter((url) => typeof url === 'string' && url.trim() !== '');
  const fetchedList = (project.detailImages || []).filter((url) => typeof url === 'string' && url.trim() !== '');
  const fallbackSingle = project.customImage?.trim() || project.image?.trim();

  const displayImages = customList.length > 0
    ? customList
    : (fetchedList.length > 0 ? fetchedList : (fallbackSingle ? [fallbackSingle] : []));

  const handleOverlayScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 90);
  };

  return (
    <div
      className="project-detail-overlay"
      ref={overlayRef}
      onScroll={handleOverlayScroll}
      onClick={onClose}
    >
      <div className="project-detail-container" onClick={(e) => e.stopPropagation()}>
        {/* Sticky Control Bar with Dynamic Compact Title */}
        <div className={`detail-top-bar ${isScrolled ? 'has-scrolled-title' : ''}`}>
          <button
            onClick={onClose}
            className="detail-action-btn back-btn"
            aria-label="Back to project list"
          >
            <LayoutGrid size={16} />
            <span className="hide-mobile">PROJECT LIST</span>
          </button>

          {/* 1-Line Compact Title on Scroll */}
          <div className="detail-compact-title-wrap">
            <span className="detail-compact-badge">{project.category?.trim() || '미지정'}</span>
            <span className="detail-compact-title" title={project.title}>
              {project.title}
            </span>
          </div>

          <div className="detail-nav-group">
            <button
              disabled={!prevProject}
              onClick={() => prevProject && onSelectProject(prevProject)}
              className={`detail-action-btn ${!prevProject ? 'disabled' : ''}`}
              title={prevProject ? `Previous: ${prevProject.title}` : 'No previous project'}
              aria-label="Previous project"
            >
              <ChevronLeft size={18} />
              <span className="hide-mobile">PREV</span>
            </button>

            <span className="detail-page-counter">
              {currentIndex + 1} / {projects.length}
            </span>

            <button
              disabled={!nextProject}
              onClick={() => nextProject && onSelectProject(nextProject)}
              className={`detail-action-btn ${!nextProject ? 'disabled' : ''}`}
              title={nextProject ? `Next: ${nextProject.title}` : 'No next project'}
              aria-label="Next project"
            >
              <span className="hide-mobile">NEXT</span>
              <ChevronRight size={18} />
            </button>

            <button
              onClick={onClose}
              className="detail-close-btn"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Project Header Info (Rich multiple lines in natural flow) */}
        <header className="detail-header-section">
          <div className="detail-meta-row">
            <span className="detail-category-badge">
              <Layers size={13} />
              {project.category || 'Portfolio'}
            </span>
            {project.date && (
              <span className="detail-date-badge">
                <Calendar size={13} />
                {project.date}
              </span>
            )}
          </div>

          <h1 className="detail-main-title">{project.title}</h1>

          {project.caption && (
            <p className="detail-main-caption">{project.caption}</p>
          )}
        </header>

        {/* Detail Images Flow */}
        <div className="detail-images-container">
          <div className="detail-images-body">
            {displayImages.length > 0 ? (
              displayImages.map((imgUrl, idx) => (
                <div key={idx} className="detail-img-wrapper">
                  <img
                    src={imgUrl}
                    alt={`${project.title} - detail ${idx + 1}`}
                    loading="lazy"
                    className="detail-flow-img"
                    onError={(e) => {
                      (e.currentTarget.style.display = 'none');
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="detail-empty-placeholder">
                <ImageOff size={36} style={{ opacity: 0.3 }} />
                <p>No detail images available for this project.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="detail-bottom-nav">
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ margin: '0 auto' }}
          >
            <LayoutGrid size={16} />
            <span>Back to All Projects</span>
          </button>
        </div>
      </div>
    </div>
  );
};
