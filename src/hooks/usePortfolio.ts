import { useState, useEffect } from 'react';
import { PortfolioData } from '../types/portfolio';

const initialEmptyData: PortfolioData = {
  profile: {
    name: '',
    role: '',
    bio: '',
  },
  about: {
    intro: '',
    tools: [],
    skills: [],
    clients: [],
    experience: [],
  },
  contact: {
    headline: '',
    email: '',
    address: '',
    note: '',
  },
  totalProjects: 0,
  projects: [],
};

interface UsePortfolioResult {
  data: PortfolioData;
  loading: boolean;
  error: Error | null;
}

export function usePortfolio(): UsePortfolioResult {
  const [data, setData] = useState<PortfolioData>(initialEmptyData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        // Base-relative URL for GitHub Pages compatibility
        const basePath = import.meta.env.BASE_URL || './';
        const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
        const res = await fetch(`${normalizedBase}data/portfolio.json`);

        if (!res.ok) {
          throw new Error(`Failed to load portfolio.json: status ${res.status}`);
        }

        const json: PortfolioData = await res.json();
        if (!isMounted) return;

        if (json && Array.isArray(json.projects)) {
          setData(json);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Failed to load portfolio.json:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
