export interface CategoryScore {
  yes: number;
  no: number;
  sometimes: number;
}

export interface CategoryScores {
  connection?: CategoryScore;
  authenticity?: CategoryScore;
  emotional_regulation?: CategoryScore;
  autonomy?: CategoryScore;
  meaning?: CategoryScore;
  mindfulness?: CategoryScore;
}

export interface QuizAnalysis {
  primaryConcerns: string[];
  strengthAreas: string[];
  recommendedExercises: string[];
  personalityProfile: string;
}

/**
 * Analyze quiz responses and generate personalized insights
 */
export function analyzeQuizResults(categoryScores: CategoryScores): QuizAnalysis {
  const concerns: string[] = [];
  const strengths: string[] = [];
  const exercises: string[] = [];

  // Analyze connection
  if (categoryScores.connection) {
    const score = categoryScores.connection;
    if (score.yes >= 2) {
      concerns.push('connection');
      exercises.push('Active Listening Practice', 'Vulnerability Exercises', 'Community Building');
    } else if (score.no >= 2) {
      strengths.push('connection');
    }
  }

  // Analyze authenticity
  if (categoryScores.authenticity) {
    const score = categoryScores.authenticity;
    if (score.yes >= 2) {
      concerns.push('authenticity');
      exercises.push('Values Clarification', 'Authentic Communication', 'Self-Expression Journaling');
    } else if (score.no >= 2) {
      strengths.push('authenticity');
    }
  }

  // Analyze emotional regulation
  if (categoryScores.emotional_regulation) {
    const score = categoryScores.emotional_regulation;
    if (score.yes >= 1) {
      concerns.push('emotional_regulation');
      exercises.push('Emotion Tracking', 'Grounding Techniques', 'Mindful Breathing');
    } else if (score.no >= 1) {
      strengths.push('emotional_regulation');
    }
  }

  // Analyze autonomy
  if (categoryScores.autonomy) {
    const score = categoryScores.autonomy;
    if (score.no >= 2) {
      concerns.push('autonomy');
      exercises.push('Boundary Setting', 'Decision Making Practice', 'Personal Agency Reflection');
    } else if (score.yes >= 2) {
      strengths.push('autonomy');
    }
  }

  // Analyze meaning
  if (categoryScores.meaning) {
    const score = categoryScores.meaning;
    if (score.no >= 1) {
      concerns.push('meaning');
      exercises.push('Purpose Exploration', 'Values Mapping', 'Legacy Writing');
    } else if (score.yes >= 1) {
      strengths.push('meaning');
    }
  }

  // Analyze mindfulness
  if (categoryScores.mindfulness) {
    const score = categoryScores.mindfulness;
    if (score.no >= 1) {
      concerns.push('mindfulness');
      exercises.push('Present Moment Awareness', 'Mindful Observation', 'Body Scan Meditation');
    } else if (score.yes >= 1) {
      strengths.push('mindfulness');
    }
  }

  // Determine personality profile
  const profile = determinePersonalityProfile(concerns, strengths);

  return {
    primaryConcerns: concerns,
    strengthAreas: strengths,
    recommendedExercises: exercises,
    personalityProfile: profile
  };
}

/**
 * Determine overall personality profile based on patterns
 */
function determinePersonalityProfile(concerns: string[], strengths: string[]): string {
  // The Explorer - Seeks meaning and purpose
  if (concerns.includes('meaning') && strengths.includes('autonomy')) {
    return 'The Explorer';
  }

  // The Connector - Focuses on relationships
  if (concerns.includes('connection') || (strengths.includes('connection') && strengths.includes('authenticity'))) {
    return 'The Connector';
  }

  // The Guardian - Values boundaries and self-protection
  if (concerns.includes('autonomy') && concerns.includes('emotional_regulation')) {
    return 'The Guardian';
  }

  // The Seeker - Pursuing self-knowledge
  if (concerns.includes('authenticity') && concerns.includes('mindfulness')) {
    return 'The Seeker';
  }

  // The Balanced - Generally well-integrated
  if (strengths.length >= 3) {
    return 'The Balanced';
  }

  // The Emerging - Beginning the journey
  if (concerns.length >= 4) {
    return 'The Emerging';
  }

  return 'The Individual';
}

/**
 * Get profile description based on personality type
 */
export function getProfileDescription(profile: string): string {
  const descriptions: Record<string, string> = {
    'The Explorer': 'You are driven by a quest for meaning and purpose. You value autonomy and seek to understand your place in the world.',
    'The Connector': 'Relationships and authentic connection are central to your experience. You thrive on meaningful interactions with others.',
    'The Guardian': 'You prioritize self-protection and emotional boundaries. Building inner strength and resilience is important to you.',
    'The Seeker': 'Self-knowledge and authentic living guide your path. You\'re committed to understanding yourself deeply.',
    'The Balanced': 'You demonstrate integration across multiple areas of life. You have developed strong self-awareness and healthy patterns.',
    'The Emerging': 'You are at the beginning of a transformative journey. There is significant opportunity for growth and self-discovery.',
    'The Individual': 'You have a unique pattern of strengths and growth areas that make you distinctly you.'
  };

  return descriptions[profile] || descriptions['The Individual'];
}

/**
 * Get recommended daily practice based on primary concerns
 */
export function getRecommendedDailyPractice(concerns: string[]): string[] {
  const practices: string[] = [];

  if (concerns.includes('connection')) {
    practices.push('Reach out to one person today with genuine curiosity');
  }

  if (concerns.includes('authenticity')) {
    practices.push('Express one authentic thought or feeling today');
  }

  if (concerns.includes('emotional_regulation')) {
    practices.push('Take three conscious breaths when feeling overwhelmed');
  }

  if (concerns.includes('autonomy')) {
    practices.push('Make one decision based solely on your own values');
  }

  if (concerns.includes('meaning')) {
    practices.push('Reflect on what brought you joy or meaning today');
  }

  if (concerns.includes('mindfulness')) {
    practices.push('Spend 5 minutes in present-moment awareness');
  }

  return practices.length > 0 ? practices : ['Set one small intention for your day'];
}






