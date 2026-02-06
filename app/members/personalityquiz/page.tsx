"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";
import PersonalityQuiz from '../../components/PersonalityQuiz';
import QuizResults from '../../components/QuizResults';

export default function QuizPage() {
  const [user, setUser] = useState<any>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    checkUserAndQuizStatus();
  }, []);

  const checkUserAndQuizStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      window.location.href = '/auth';
      return;
    }

    setUser(session.user);

    // Check if user has completed the quiz
    const { data: profile } = await supabase
      .from('profiles')
      .select('personality_quiz_completed')
      .eq('id', session.user.id)
      .single();

    if (profile?.personality_quiz_completed) {
      setQuizCompleted(true);
      setShowResults(true);
    }

    setLoading(false);
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    setShowResults(true);
    // Optionally reload or redirect
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="section section-center">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <>      
      <div className="container">
        {!quizCompleted ? (
          <>
            <section className="section section-center mb-lg">
              <h1 className="heading-xl">Discover Your Profile</h1>
              <p className="text-lead">
                This assessment will help us understand your unique patterns and recommend personalized practices.
              </p>
            </section>

            <PersonalityQuiz 
              userId={user.id} 
              onComplete={handleQuizComplete}
            />
          </>
        ) : showResults ? (
          <>
            <QuizResults userId={user.id} />
            
            <div className="section section-center mt-lg">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to retake the assessment? This will replace your current results.')) {
                    setShowResults(false);
                    setQuizCompleted(false);
                  }
                }}
                className="btn-pill"
              >
                Retake Assessment
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}