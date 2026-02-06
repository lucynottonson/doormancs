"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import { ALL_QUIZ_QUESTIONS, CATEGORY_INFO, QuizQuestion } from '@/lib/quizQuestions';

interface QuizResponse {
  question_id: string;
  answer: 'yes' | 'no' | 'sometimes';
}

interface Concern {
  category: string;
  label: string;
  description: string;
}

interface PersonalityQuizProps {
  userId: string;
  onComplete?: () => void;
  onCrisisDetected?: () => void;
}

export default function PersonalityQuiz({ userId, onComplete, onCrisisDetected }: PersonalityQuizProps) {
  const [step, setStep] = useState<'questions' | 'ranking' | 'complete'>('questions');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [identifiedConcerns, setIdentifiedConcerns] = useState<Concern[]>([]);
  const [rankedConcerns, setRankedConcerns] = useState<Concern[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crisisDetected, setCrisisDetected] = useState(false);

  const currentQuestion = ALL_QUIZ_QUESTIONS[currentQuestionIndex];
  const currentSection = currentQuestion?.section || '';
  const progress = ((currentQuestionIndex + 1) / ALL_QUIZ_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === ALL_QUIZ_QUESTIONS.length - 1;

  // Check if this is the first question of a new section
  const isNewSection = currentQuestionIndex === 0 || 
    (currentQuestionIndex > 0 && ALL_QUIZ_QUESTIONS[currentQuestionIndex - 1].section !== currentSection);

  const handleAnswer = (answer: 'yes' | 'no' | 'sometimes') => {
    const newResponse: QuizResponse = {
      question_id: currentQuestion.id,
      answer
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    // Check for crisis
    if (currentQuestion.isCrisis && answer === 'yes') {
      setCrisisDetected(true);
      if (onCrisisDetected) {
        onCrisisDetected();
      }
    }

    if (isLastQuestion) {
      // Move to ranking step
      const concerns = identifyConcerns(updatedResponses);
      setIdentifiedConcerns(concerns);
      setRankedConcerns(concerns);
      setStep('ranking');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const identifyConcerns = (finalResponses: QuizResponse[]): Concern[] => {
    const categoryScores: Record<string, { yes: number; no: number; sometimes: number }> = {};

    // Calculate scores per category
    finalResponses.forEach((response) => {
      const question = ALL_QUIZ_QUESTIONS.find(q => q.id === response.question_id);
      if (!question) return;

      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { yes: 0, no: 0, sometimes: 0 };
      }

      categoryScores[question.category][response.answer]++;
    });

    // Identify concerns based on responses
    const concerns: Concern[] = [];

    Object.entries(categoryScores).forEach(([category, scores]) => {
      // Skip crisis category from concerns list (handled separately)
      if (category === 'crisis') return;

      // For most categories, "yes" indicates a concern
      // For autonomy, meaning, mindfulness - "no" indicates a concern
      const isReversed = ['autonomy', 'meaning', 'mindfulness'].includes(category);
      
      const concernScore = isReversed ? scores.no : scores.yes;
      const positiveScore = isReversed ? scores.yes : scores.no;

      // Add as concern if there are more concerning answers than positive ones
      if (concernScore > positiveScore || (concernScore > 0 && positiveScore === 0)) {
        const categoryInfo = CATEGORY_INFO[category];
        if (categoryInfo) {
          concerns.push({
            category,
            label: categoryInfo.label,
            description: categoryInfo.description
          });
        }
      }
    });

    // If no concerns identified, still show at least one
    if (concerns.length === 0) {
      const firstCategory = Object.keys(categoryScores).filter(c => c !== 'crisis')[0];
      const categoryInfo = CATEGORY_INFO[firstCategory];
      if (categoryInfo) {
        concerns.push({
          category: firstCategory,
          label: categoryInfo.label,
          description: categoryInfo.description
        });
      }
    }

    return concerns;
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === index) return;

    const newConcerns = [...rankedConcerns];
    const draggedItem = newConcerns[draggedIndex];
    
    newConcerns.splice(draggedIndex, 1);
    newConcerns.splice(index, 0, draggedItem);
    
    setRankedConcerns(newConcerns);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSaveRanking = async () => {
    setLoading(true);
    setError(null);

    try {
      const categoryScores = calculateCategoryScores(responses);
      
      // Create ranking with priority numbers (1 = highest priority)
      const ranking = rankedConcerns.map((concern, index) => ({
        category: concern.category,
        rank: index + 1,
        label: concern.label
      }));

      // Save to Supabase
      const { error: saveError } = await supabase
        .from('quiz_responses')
        .upsert({
          user_id: userId,
          quiz_type: 'personality_assessment',
          responses: responses,
          category_scores: categoryScores,
          concern_ranking: ranking,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,quiz_type'
        });

      if (saveError) {
        console.error('Error saving quiz:', saveError);
        setError('Failed to save quiz results');
        setLoading(false);
        return;
      }

      // Update profile to indicate quiz completion
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          personality_quiz_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) {
        console.error('Error updating profile:', profileError);
      }

      setStep('complete');
      setLoading(false);

      if (onComplete) {
        setTimeout(() => onComplete(), 2000);
      }
    } catch (err) {
      console.error('Error in handleSaveRanking:', err);
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const calculateCategoryScores = (finalResponses: QuizResponse[]) => {
    const scores: Record<string, { yes: number; no: number; sometimes: number }> = {};

    finalResponses.forEach((response) => {
      const question = ALL_QUIZ_QUESTIONS.find(q => q.id === response.question_id);
      if (!question) return;

      if (!scores[question.category]) {
        scores[question.category] = { yes: 0, no: 0, sometimes: 0 };
      }

      scores[question.category][response.answer]++;
    });

    return scores;
  };

  const handleBackFromRanking = () => {
    setStep('questions');
    setCurrentQuestionIndex(ALL_QUIZ_QUESTIONS.length - 1);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setResponses(responses.slice(0, -1));
    }
  };

  // Complete step
  if (step === 'complete') {
    return (
      <div className="section section-center">
        <div className="card card-color-5">
          <h2 className="heading-lg mb-md">Assessment Complete! ✨</h2>
          <p className="text-lead">
            Your responses have been saved and will help customize your experience.
          </p>
          {crisisDetected && (
            <div className="alert alert-warning mt-md">
              Based on your responses, we recommend reaching out for support. Resources are available.
            </div>
          )}
          <div className="spinner mt-md"></div>
        </div>
      </div>
    );
  }

  // Ranking step
  if (step === 'ranking') {
    return (
      <div className="section section-center">
        <div className="quiz-container">
          <div className="quiz-header mb-md">
            <h2 className="heading-md">Rank Your Concerns</h2>
            <p className="text-secondary">
              Drag to reorder from most impactful (top) to least impactful (bottom)
            </p>
          </div>

          <div className="card card-color-2 mb-lg">
            <h3 className="heading-md mb-md text-center">Your Primary Concerns</h3>
            <p className="text-secondary mb-lg text-center">
              Based on your responses, these are the areas that may need attention. 
              Drag them to rank by how much each affects your daily life.
            </p>

            <div className="concern-ranking-list">
              {rankedConcerns.map((concern, index) => (
                <div
                  key={concern.category}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`concern-ranking-item ${draggedIndex === index ? 'dragging' : ''}`}
                >
                  <div className="concern-rank-number">{index + 1}</div>
                  <div className="concern-content">
                    <h4 className="concern-title">{concern.label}</h4>
                    <p className="concern-description">{concern.description}</p>
                  </div>
                  <div className="concern-drag-handle">⋮⋮</div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="alert alert-error mb-md">
              {error}
            </div>
          )}

          <div className="quiz-navigation">
            <button
              onClick={handleBackFromRanking}
              disabled={loading}
              className="btn-pill"
            >
              ← Back to Questions
            </button>

            <button
              onClick={handleSaveRanking}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Saving...' : 'Save Ranking →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Questions step
  return (
    <div className="section section-center">
      <div className="quiz-container">
        <div className="quiz-header mb-md">
          <h2 className="heading-md">Comprehensive Assessment</h2>
          <p className="text-secondary">
            Question {currentQuestionIndex + 1} of {ALL_QUIZ_QUESTIONS.length}
          </p>
        </div>

        <div className="progress-bar mb-md">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {isNewSection && (
          <div className="quiz-section-header mb-md">
            <h3 className="heading-md text-center">{currentSection}</h3>
          </div>
        )}

        <div className="quiz-question-card card card-color-2 mb-lg">
          <h3 className="heading-md mb-lg text-center">
            {currentQuestion.question}
          </h3>

          <div className="quiz-options">
            <button
              onClick={() => handleAnswer('yes')}
              className="quiz-option-btn"
              disabled={loading}
            >
              <span className="quiz-option-icon">✓</span>
              <span className="quiz-option-text">Yes</span>
            </button>

            <button
              onClick={() => handleAnswer('no')}
              className="quiz-option-btn"
              disabled={loading}
            >
              <span className="quiz-option-icon">✗</span>
              <span className="quiz-option-text">No</span>
            </button>

            <button
              onClick={() => handleAnswer('sometimes')}
              className="quiz-option-btn"
              disabled={loading}
            >
              <span className="quiz-option-icon">~</span>
              <span className="quiz-option-text">Sometimes / I Don't Know</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error mb-md">
            {error}
          </div>
        )}

        <div className="quiz-navigation">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0 || loading}
            className="btn-pill"
          >
            ← Back
          </button>

          <p className="text-secondary">
            {currentQuestionIndex > 0 && `${currentQuestionIndex} answered`}
          </p>
        </div>
      </div>
    </div>
  );
}