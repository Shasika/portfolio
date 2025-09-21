'use client';

import { useState, useEffect } from 'react';

interface Project {
  title: string;
  description: string;
  image?: string;
  liveUrl?: string;
  adminUrl?: string;
  credentials?: {
    username: string;
    password: string;
  };
  tech: string[];
  features: string[];
  isInternal?: boolean;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  tech: string[];
}

interface Skills {
  backend: string[];
  frontend: string[];
  databases: string[];
  tools: string[];
  soft: string[];
}

interface Personal {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
}

interface About {
  intro: string;
  secondParagraph: string;
}

interface Achievement {
  title: string;
  award: string;
  description: string;
}

interface Education {
  degree: string;
  period: string;
  institution: string;
}

interface QuickFact {
  label: string;
  value: string;
}

interface NavigationItem {
  name: string;
  href: string;
}

interface HomeStats {
  stats: Array<{
    value: string;
    label: string;
  }>;
  roleTitle: string;
  specialization: {
    text: string;
    skills: string[];
  };
}

export function useJsonData<T>(endpoint: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

// Specific hooks for typed data
export function useProjects() {
  return useJsonData<Project[]>('/data/projects.json');
}

export function useExperience() {
  return useJsonData<Experience[]>('/data/experience.json');
}

export function useSkills() {
  return useJsonData<Skills>('/data/skills.json');
}

export function usePersonal() {
  return useJsonData<Personal>('/data/personal.json');
}

export function useAbout() {
  return useJsonData<About>('/data/about.json');
}

export function useAchievements() {
  return useJsonData<Achievement[]>('/data/achievements.json');
}

export function useEducation() {
  return useJsonData<Education>('/data/education.json');
}

export function useQuickFacts() {
  return useJsonData<QuickFact[]>('/data/quick-facts.json');
}

export function useNavigation() {
  return useJsonData<NavigationItem[]>('/data/navigation.json');
}

export function useHomeStats() {
  return useJsonData<HomeStats>('/data/home-stats.json');
}