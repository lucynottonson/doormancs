"use client";

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase/client";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (data) {
        setProfile(data);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <main className="container">
          <div className="spinner"></div>
        </main>
      </>
    );
  }

 return (
    <>
      <div className="container">
 

        <section className="section section-center">
          <h1 className="heading-xl">
            About DCS
          </h1>
          <div className="content-box text-lead">
            HERO SECTION AND CHANGE CLASS FOR EMPHASIS
          </div>
        </section>

<div className="card-stack">

      <div className="card card-color-1 mb-xl">
            <h3 className="heading-md">Who am I?</h3>
            <p className="text-top">
                    Great first question. I cannot answer that, but I can tell you what has led me here and why you should take anything I say seriously. 
                    I do not have a psychology degree, nor have I ever completed even one college level psychology class. I am a junior in college and study philosophy. 
                    For a very brief period of time, I was a neuroscience major, and then a bio major, and then an English major. When I started college, in 2020, I thought I would be in grad school right now, doing research on psychiatric medication. 
                    But, as they say, things do not always go as planned. 
            </p>
            <p className="text-top">
Despite my current position, I have arguably spent more time learning psychology than I have learning anything else. Not clinical psychology, but psychology as its true definition: a study of the human mind. I was led to this by my own experience,
and whether I developed this interest as a result of my experience, or formed it independently is a mystery to me. If you ask my mother how long I have been mentally unwell, she will tell you that I was anxious at birth. 
            </p>
            <p>
                I was diagnosed young with Asperger's (which no longer exists), ADHD, and generalized anxiety disorder. 
I was also labeled as "gifted," which resulted in every struggle I had being dismissed as a 
byproduct of my intelligence rather than something worth addressing. By high school, I was cycling through diagnoses and 
medications with no change whatsoever. I felt like I was always being treated as an experiment or a fascinating case study.
clinicians were interested in my "unique brain" but made no effort to undertand my experience. My "unique" and "gifted" brain was never a source of 
pride to me, but rather a great burden which I blamed for what I felt was a complete incompatibility with the world around me.

            </p>
        </div>
          <div className="card card-color-1 mb-xl">
            <h3 className="heading-md">Who is This For?</h3>
            <p className="text-top">
                    TEXT!!!!!
            </p>
        </div>
          <div className="card card-color-1 mb-xl">
            <h3 className="heading-md">DCS Philosophy</h3>
            <p className="text-top">
                    TEXT!!!!!
            </p>
        </div>

          <div className="card card-color-1 mb-xl">
            <h3 className="heading-md">What's Here</h3>
            <p className="text-top">
                    TEXT!!!!!
            </p>
        </div>
          <div className="card card-color-1 mb-xl">
            <h3 className="heading-md">Our Values</h3>
            <p className="text-top">
                    TEXT!!!!!
            </p>
        </div>
    
        <div className="card card-color-1 mb-xl">
            <h3 className="heading-md">Why Doorman?</h3>
            <p className="text-top">
                When I was trying to decide what to call this site, I lighted upon the idea of parodying one of the most aggravating parts of contemporary psychology, which is its excessive and unnecessary use of acronyms. Initially, I created a very complicated system that I cannot explain, nor do I remember, involving creating a masterlist of words I thought described my vision for the site, finding similar words and synonyms to those words, extracting the first letter of each, and creating various 10 letter strings of them to put into an online scrabble cheat website. 
                My aim was to find a random and nonsensical word that I could spell with letters associated with the site's values. Eventually I landed on DOORMAN, which I liked as not only a nonsensical acronym, but a direct parody of "DEARMAN," which, to those unfamiliar, Is a DBT communication skill that absolutely does not need an acronym to remember.
                So that was it! And for the sake of the story, here are the words I used to create doorman:
            </p>
            <p className="text-top">
D - Dignity (as a vague synonym/replacement word for "Respect," because I needed a D (see why this process is so stupid?)
            </p>
            <p className="text-top">
O - Openness/Open-mindedness
            </p>
            <p className="text-top">
O - Optionality (as it is optional, meaning you do not have to use the website. I know, really good)               
            </p>
            <p className="text-top">
R - Realism
            </p>
            <p className="text-top">
M - Mitigation (as the only synonym I could think of for "harm reduction")
            </p>
            <p className="text-top">
A - Autonomy
            </p>
            <p className="text-top">
N - Nonconformity
            </p>
            <p className="text-top">
                See, isn't that lovely? Now you can remember what the site is all about using this handy acronym! 
            </p>
            <p className="text-top">
                Anyway, the "cognitive sovereignty" part came after, as I didn't just want to name it DOORMAN. I know it's a little wordy, but it's exactly what I meant and it describes exactly what the site is about. Cognitive sovereignty is, in my opinion, the only reasonable and realistic goal for the alleviation of psychological suffering, and lack of cognitive sovereignty is one of the greatest strains possible for the human psyche. I believe, and hope to convince you, that cognitive sovereignty is the solution. Should I have sacrificed precision to create a catchy and more memorable brand identity? I don't know. Is the point of making something having the best possible brand identity? So that was basically my thought process. And there you have it! The project is named.
            </p>
          </div>
            <div className="card card-color-1 mb-xl">
            <h3 className="heading-md">Important Disclaimers</h3>
            <p className="text-top">
                    TEXT!!!!!
            </p>
        </div>
        </div>
       </div>
        <footer>
          <div className="footer-content">
            <p className="mt-sm">This site is under active development. More resources and tools coming soon.</p>
          </div>
        </footer>
    </>
  );
}