import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

export type TabType = 'HOME' | 'PROJECTS' | 'ABOUT' | 'CONTACT';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  designerName: string;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  designerName,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: TabType) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: TabType[] = ['HOME', 'PROJECTS', 'ABOUT', 'CONTACT'];

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('HOME')}
          className="brand-logo"
          aria-label="Home"
        >
          <span className="brand-name">{designerName || 'CHOI JIN WON'}</span>
          <span className="brand-subtitle">Design Portfolio</span>
        </button>

        {/* Right Nav & Theme Switch */}
        <div className="header-right">
          {/* Desktop Navigation */}
          <nav className="nav-menu" aria-label="Main Navigation">
            {navItems.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleNavClick(tab)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme Mode"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown animate-fadeIn">
          {navItems.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleNavClick(tab)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ textAlign: 'left' }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
