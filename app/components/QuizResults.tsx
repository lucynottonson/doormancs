"use client";

import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase/client";

interface QuizResultsProps {
  userId: string;
}

interface RankedConcern {
  category: string;
  rank: number;
  label: string;
}

interface QuizData {
  quiz_type: string;
  concern_ranking: RankedConcern[];
  completed_at: string;
}

const CONCERN_DESCRIPTIONS: Record<string, string> = {
  connection: 'Feeling understood and connected to others in meaningful ways',
  authenticity: 'Being true to yourself and expressing your real thoughts and feelings',
  emotional_regulation: 'Managing and understanding your emotions in healthy ways',
  autonomy: 'Having control over your life and setting healthy boundaries',
  meaning: 'Understanding your purpose and having clear life direction',
  mindfulness: 'Being present and aware in your daily life'
};

const RECOMMENDED_EXERCISES: Record<string, string[]> = {
  connection: [
    'Active Listening Practice',
    'Vulnerability Exercises', 
    'Community Building Activities',
    'Empathy Development'
  ],
  authenticity: [
    'Values Clarification',
    'Authentic Communication Practice',
    'Self-Expression Journaling',
    'Identity Exploration'
  ],
  emotional_regulation: [
    'Emotion Tracking & Naming',
    'Grounding Techniques',
    'Mindful Breathing',
    'Body Scan Meditation'
  ],
  autonomy: [
    'Boundary Setting Practice',
    'Decision Making Exercises',
    'Personal Agency Reflection',
    'Self-Advocacy Skills'
  ],
  meaning: [
    'Purpose Exploration',
    'Values Mapping',
    'Legacy Writing',
    'Goal Setting & Alignment'
  ],
  mindfulness: [
    'Present Moment Awareness',
    'Mindful Observation',
    'Meditation Practice',
    'Sensory Grounding'
  ]
};

export default function QuizResults({ userId }: QuizResultsProps) {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizResults();
  }, [userId]);

  const loadQuizResults = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('quiz_type, concern_ranking, completed_at')
        .eq('user_id', userId)
        .eq('quiz_type', 'personality_assessment')
        .single();

      if (error) {
        console.error('Error loading quiz results:', error);
        setLoading(false);
        return;
      }

      if (data) {
        setQuizData(data);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="section section-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!quizData || !quizData.concern_ranking || quizData.concern_ranking.length === 0) {
    return (
      <div className="section section-center">
        <div className="alert alert-info">
          No assessment results found. Complete the assessment to see your concerns.
        </div>
      </div>
    );
  }

  const completedDate = new Date(quizData.completed_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const topConcern = quizData.concern_ranking[0];
  const topExercises = RECOMMENDED_EXERCISES[topConcern.category] || [];

  return (
    <div className="section">
      <h2 className="heading-lg text-center mb-lg">Your Primary Concerns</h2>

      <div className="card card-color-2 mb-lg">
        <p className="text-secondary mb-lg text-center">
          Based on your responses, these are the areas ranked by how much they affect your daily life.
        </p>

        <div className="concern-ranking-list">
          {quizData.concern_ranking.map((concern) => (
            <div key={concern.category} className="concern-ranking-item" style={{ cursor: 'default' }}>
              <div className="concern-rank-number">{concern.rank}</div>
              <div className="concern-content">
                <h4 className="concern-title">{concern.label}</h4>
                <p className="concern-description">
                  {CONCERN_DESCRIPTIONS[concern.category]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-secondary mt-md text-center" style={{ fontSize: '0.85rem' }}>
          Completed: {completedDate}
        </p>
      </div>

      <div className="grid-2">
        <div className="card card-color-5">
          <h3 className="heading-md mb-md">Top Priority Focus</h3>
          <div className="content-box mb-md">
            <h4 className="text-accent mb-sm">{topConcern.label}</h4>
            <p className="text-secondary">
              This is your #1 ranked concern. We recommend starting here with focused exercises and practices.
            </p>
          </div>
          <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
            Working on your top concern often creates positive ripple effects across other areas of your life.
          </p>
        </div>

        <div className="card card-color-3">
          <h3 className="heading-md mb-md">Recommended Exercises</h3>
          <p className="mb-md" style={{ fontSize: '0.95rem' }}>
            Start with these practices for {topConcern.label}:
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {topExercises.map((exercise, index) => (
              <li key={index} style={{ 
                padding: '0.75rem 0',
                borderBottom: index < topExercises.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}>
                <span style={{ marginRight: '0.5rem', color: 'var(--accent-primary)' }}>→</span>
                {exercise}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section-featured mt-lg">
        <h3 className="heading-md text-center mb-md">Next Steps</h3>
        <div className="flex-wrap">
          <div className="btn-pill">Explore Exercises</div>
          <div className="btn-pill">Set Daily Intentions</div>
          <div className="btn-pill">Track Progress</div>
          <div className="btn-pill">Journal Reflections</div>
        </div>
        <p className="text-center mt-md">
          Your ranked concerns will help us recommend personalized content and track your growth over time.
        </p>
      </div>
    </div>
  );
}