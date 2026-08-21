import React, { useState } from 'react';
import { usePortfolio } from './hooks/usePortfolio';
import { useTheme } from './hooks/useTheme';
import { Header, TabType } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectModal } from './components/ProjectModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectItem } from './types/portfolio';

export const App: React.FC = () => {
  const { data, loading } = usePortfolio();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('PROJECT');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  if (loading && !data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 36,
              height: 36,
              border: '2px solid var(--border-medium)',
              borderTopColor: 'var(--text-primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px auto',
            }}
          />
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Loading Portfolio...
          </p>
        </div>
      </div>
    );
  }

  const { profile, about, contact, projects } = data;

  return (
    <div className="app-container">
      {/* Subtle Background Glow */}
      <div className="bg-ambient-glow" />

      {/* Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        designerName={profile.name}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* TAB 1: PROJECT */}
        {activeTab === 'PROJECT' && (
          <div className="animate-fadeIn">
            {/* Rich Designer Hero Section */}
            <HeroSection
              profile={profile}
              skills={about.skills}
              totalProjects={projects.length}
              clientCount={about.clients?.length || 39}
              onNavigate={setActiveTab}
            />

            {/* 115 Project Works Grid */}
            <ProjectGrid
              projects={projects}
              onSelectProject={setSelectedProject}
            />
          </div>
        )}

        {/* TAB 2: ABOUT */}
        {activeTab === 'ABOUT' && <AboutSection about={about} />}

        {/* TAB 3: CONTACT */}
        {activeTab === 'CONTACT' && <ContactSection contact={contact} />}
      </main>

      {/* Project Detail View Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          projects={projects}
          onClose={() => setSelectedProject(null)}
          onSelectProject={setSelectedProject}
        />
      )}

      {/* Footer */}
      <Footer designerName={profile.name} />
    </div>
  );
};

export default App;
