// COMPREHENSIVE QUIZ QUESTIONS
// Organized by category with crisis detection

export interface QuizQuestion {
  id: string;
  question: string;
  category: string;
  section: string;
  isCrisis?: boolean; 
}

// =============================================================================
// CRISIS & SUICIDALITY (Priority screening - shown first)
// =============================================================================

export const CRISIS_QUESTIONS: QuizQuestion[] = [
  {
    id: 'crisis_1',
    question: 'I wish I were dead so that I would not suffer',
    category: 'crisis',
    section: 'Immediate Safety',
    isCrisis: true
  },
  {
    id: 'crisis_2',
    question: 'I think of suicide often',
    category: 'crisis',
    section: 'Immediate Safety',
    isCrisis: true
  },
  {
    id: 'crisis_3',
    question: 'I have made plans for ending my life',
    category: 'crisis',
    section: 'Immediate Safety',
    isCrisis: true
  },
  {
    id: 'crisis_4',
    question: 'I have attempted suicide before and still want to try again',
    category: 'crisis',
    section: 'Immediate Safety',
    isCrisis: true
  },
  {
    id: 'crisis_5',
    question: 'I have thoughts of harming others',
    category: 'crisis',
    section: 'Immediate Safety',
    isCrisis: true
  },
  {
    id: 'crisis_6',
    question: 'The only reason I haven\'t ended my life is to avoid hurting those who care about me',
    category: 'crisis',
    section: 'Immediate Safety',
    isCrisis: true
  }
];

// =============================================================================
// MEANING & EXISTENTIAL DISTRESS
// =============================================================================

export const MEANING_QUESTIONS: QuizQuestion[] = [
  {
    id: 'meaning_1',
    question: 'My life feels meaningless or without purpose',
    category: 'meaning',
    section: 'Purpose & Meaning'
  },
  {
    id: 'meaning_2',
    question: 'I feel clear about my purpose and direction',
    category: 'meaning',
    section: 'Purpose & Meaning'
  },
  {
    id: 'meaning_3',
    question: 'Everyone else seems to have passions and purposes while I fall behind',
    category: 'meaning',
    section: 'Purpose & Meaning'
  },
  {
    id: 'meaning_4',
    question: 'I lost years to mental health and fear being behind even if I recover',
    category: 'meaning',
    section: 'Purpose & Meaning'
  },
  {
    id: 'meaning_5',
    question: 'Since I thought I\'d die by now, I have no idea what to do with my life',
    category: 'meaning',
    section: 'Purpose & Meaning'
  },
  {
    id: 'meaning_6',
    question: 'I don\'t enjoy my life',
    category: 'meaning',
    section: 'Purpose & Meaning'
  },
  {
    id: 'meaning_7',
    question: 'I\'ve lost touch with my previous religion, spirituality, or sense of meaning',
    category: 'meaning',
    section: 'Purpose & Meaning'
  },
  {
    id: 'meaning_8',
    question: 'I don\'t feel connected to anything greater than myself',
    category: 'meaning',
    section: 'Purpose & Meaning'
  },
  {
    id: 'meaning_9',
    question: 'I no longer feel awe or wonder',
    category: 'meaning',
    section: 'Purpose & Meaning'
  },
  {
    id: 'meaning_10',
    question: 'What would truly make me happy is not possible for me to attain',
    category: 'meaning',
    section: 'Purpose & Meaning'
  }
];

// =============================================================================
// EMOTIONAL REGULATION
// =============================================================================

export const EMOTIONAL_REGULATION_QUESTIONS: QuizQuestion[] = [
  {
    id: 'emotion_1',
    question: 'I feel overwhelmed by my emotions',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_2',
    question: 'I struggle to identify what my needs are or why I\'m upset',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_3',
    question: 'I have difficulty labeling or identifying my emotions',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_4',
    question: 'I only identify feelings when they physically manifest',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_5',
    question: 'I feel physically overwhelmed by emotions and can\'t control my physical response',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_6',
    question: 'I struggle to hold back from doing impulsive things out of extreme emotions',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_7',
    question: 'I often feel out of control over myself and my actions',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_8',
    question: 'I act impulsively and regret it later',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_9',
    question: 'I swing between extreme emotions that seem to come from nowhere',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_10',
    question: 'I rarely feel like I have emotions - my thoughts feel rational and separate from emotions',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_11',
    question: 'I suppress emotions to make practical decisions, as emotions are fleeting',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  },
  {
    id: 'emotion_12',
    question: 'I enter states of heightened distress where I\'m prone to impulsive actions or self-harm',
    category: 'emotional_regulation',
    section: 'Emotions & Regulation'
  }
];

// =============================================================================
// AUTONOMY & CONTROL
// =============================================================================

export const AUTONOMY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'autonomy_1',
    question: 'I feel like I have control over my life',
    category: 'autonomy',
    section: 'Control & Autonomy'
  },
  {
    id: 'autonomy_2',
    question: 'I have difficulty setting boundaries with others',
    category: 'autonomy',
    section: 'Control & Autonomy'
  },
  {
    id: 'autonomy_3',
    question: 'I make decisions based on my own values',
    category: 'autonomy',
    section: 'Control & Autonomy'
  },
  {
    id: 'autonomy_4',
    question: 'I feel out of control of my environment',
    category: 'autonomy',
    section: 'Control & Autonomy'
  },
  {
    id: 'autonomy_5',
    question: 'I respond to feeling out of control by trying to control things within myself',
    category: 'autonomy',
    section: 'Control & Autonomy'
  },
  {
    id: 'autonomy_6',
    question: 'I\'m afraid admitting how I feel will result in my autonomy being taken away',
    category: 'autonomy',
    section: 'Control & Autonomy'
  },
  {
    id: 'autonomy_7',
    question: 'I often act on behalf of others rather than making decisions for myself',
    category: 'autonomy',
    section: 'Control & Autonomy'
  },
  {
    id: 'autonomy_8',
    question: 'I can\'t set boundaries and forget what they are when someone feels unsafe',
    category: 'autonomy',
    section: 'Control & Autonomy'
  },
  {
    id: 'autonomy_9',
    question: 'I feel unreasonably angry when illogical or purposeless rules are imposed on me',
    category: 'autonomy',
    section: 'Control & Autonomy'
  },
  {
    id: 'autonomy_10',
    question: 'I dislike following instructions',
    category: 'autonomy',
    section: 'Control & Autonomy'
  },
  {
    id: 'autonomy_11',
    question: 'If I don\'t believe something is right, I won\'t do it or will be extremely resentful',
    category: 'autonomy',
    section: 'Control & Autonomy'
  }
];

// =============================================================================
// AUTHENTICITY & SELF-EXPRESSION
// =============================================================================

export const AUTHENTICITY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'authentic_1',
    question: 'I often hide my true feelings from others',
    category: 'authenticity',
    section: 'Authenticity & Expression'
  },
  {
    id: 'authentic_2',
    question: 'I struggle to express what I really think',
    category: 'authenticity',
    section: 'Authenticity & Expression'
  },
  {
    id: 'authentic_3',
    question: 'I wish I was a completely different person',
    category: 'authenticity',
    section: 'Authenticity & Expression'
  },
  {
    id: 'authentic_4',
    question: 'I constantly feel shame about who I am',
    category: 'authenticity',
    section: 'Authenticity & Expression'
  },
  {
    id: 'authentic_5',
    question: 'I can\'t express who I really am without ridicule or social consequences',
    category: 'authenticity',
    section: 'Authenticity & Expression'
  },
  {
    id: 'authentic_6',
    question: 'I can only succeed if I change who I am or pretend to be someone else',
    category: 'authenticity',
    section: 'Authenticity & Expression'
  },
  {
    id: 'authentic_7',
    question: 'I don\'t want to conform to social expectations yet feel constrained by them',
    category: 'authenticity',
    section: 'Authenticity & Expression'
  },
  {
    id: 'authentic_8',
    question: 'I view my body as distant from my identity - a carrier for my brain',
    category: 'authenticity',
    section: 'Authenticity & Expression'
  },
  {
    id: 'authentic_9',
    question: 'Everything I do has to be my own original idea or thought',
    category: 'authenticity',
    section: 'Authenticity & Expression'
  }
];

// =============================================================================
// CONNECTION & RELATIONSHIPS
// =============================================================================

export const CONNECTION_QUESTIONS: QuizQuestion[] = [
  {
    id: 'connection_1',
    question: 'I feel like no one understands me',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_2',
    question: 'I worry about being judged by others',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_3',
    question: 'I feel lonely often but push others away when they get too close',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_4',
    question: 'I have emotionally volatile relationships with lots of arguing and conflict',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_5',
    question: 'I can\'t engage in conflict and often agree just to avoid it',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_6',
    question: 'When people are angry with me, I assume they\'re right and feel ashamed',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_7',
    question: 'I\'m rarely sure if I\'m right or wrong in conflicts and often take inappropriate blame',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_8',
    question: 'My friends view me as a therapist, not a person, despite my own problems',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_9',
    question: 'I can\'t relate to most people or enjoy what normal people enjoy',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_10',
    question: 'I\'ve been called odd, strange, or eccentric and don\'t know why',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_11',
    question: 'I can\'t be alone and need a partner or friend there always',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_12',
    question: 'I choose one person as my closest confidant and expect the same from them',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_13',
    question: 'I get angry or jealous when people closest to me give attention to others',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_14',
    question: 'I need to know what people closest to me are thinking/feeling at all times',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_15',
    question: 'I constantly worry that people I love will die',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_16',
    question: 'I can\'t trust other people and worry everyone is trying to deceive or manipulate me',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_17',
    question: 'I\'m afraid to make connections who will expect too much from me',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_18',
    question: 'I have drastically different opinions of people depending on if I\'m talking to them',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_19',
    question: 'I\'m in constant push-pull relationship dynamics',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_20',
    question: 'I\'m afraid to tell people if I\'m upset and build resentment over time',
    category: 'connection',
    section: 'Connection & Relationships'
  },
  {
    id: 'connection_21',
    question: 'I obsess over people from afar and never actually talk to them',
    category: 'connection',
    section: 'Connection & Relationships'
  }
];

// =============================================================================
// MINDFULNESS & PRESENCE
// =============================================================================

export const MINDFULNESS_QUESTIONS: QuizQuestion[] = [
  {
    id: 'mindful_1',
    question: 'I feel present and aware in my daily life',
    category: 'mindfulness',
    section: 'Presence & Awareness'
  },
  {
    id: 'mindful_2',
    question: 'I have trouble feeling present and am always in my head',
    category: 'mindfulness',
    section: 'Presence & Awareness'
  },
  {
    id: 'mindful_3',
    question: 'I think myself into such severe abstraction that I feel insane',
    category: 'mindfulness',
    section: 'Presence & Awareness'
  },
  {
    id: 'mindful_4',
    question: 'My abstract thinking makes me feel out of touch with reality',
    category: 'mindfulness',
    section: 'Presence & Awareness'
  },
  {
    id: 'mindful_5',
    question: 'I only experience the present moment - future plans aren\'t relevant to me',
    category: 'mindfulness',
    section: 'Presence & Awareness'
  },
  {
    id: 'mindful_6',
    question: 'I\'m so paralyzed by possible futures that I can\'t do anything at all',
    category: 'mindfulness',
    section: 'Presence & Awareness'
  },
  {
    id: 'mindful_7',
    question: 'I neglect personal hygiene when overwhelmed or emotionally tired',
    category: 'mindfulness',
    section: 'Presence & Awareness'
  }
];

// =============================================================================
// COGNITIVE PATTERNS & RUMINATION
// =============================================================================

export const COGNITIVE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'cognitive_1',
    question: 'I constantly fear I\'m a bad person and go over what I do multiple times',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_2',
    question: 'I can\'t stop thinking about things I\'m afraid of - my brain goes in argumentative loops',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_3',
    question: 'I\'m so distracted by anxious or unwanted thoughts I can\'t concentrate',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_4',
    question: 'I\'m highly aware of how I think but feel helpless to change it',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_5',
    question: 'I have too many thoughts and ideas to organize them',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_6',
    question: 'I believe everyone equally and can never know what\'s true',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_7',
    question: 'It bothers me immensely if I hold conflicting beliefs',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_8',
    question: 'When thinking about certain topics, I become very anxious and can\'t stop',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_9',
    question: 'I have difficulty living with uncertainty and deceive myself into false certainty',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_10',
    question: 'I worry about things that don\'t matter but can\'t stop thinking about them',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_11',
    question: 'I generate arguments and counter-arguments in my head for fun or out of boredom',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_12',
    question: 'I question everything before accepting it as true',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_13',
    question: 'I need to see counter-arguments to understand concepts',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  },
  {
    id: 'cognitive_14',
    question: 'I experiment on myself cognitively or physically, treating body and brain as separate',
    category: 'cognitive_patterns',
    section: 'Thought Patterns'
  }
];

// =============================================================================
// TRAUMA & PAST EXPERIENCES
// =============================================================================

export const TRAUMA_QUESTIONS: QuizQuestion[] = [
  {
    id: 'trauma_1',
    question: 'Something traumatic happened and I feel like a different person who can never go back',
    category: 'trauma',
    section: 'Trauma & Past'
  },
  {
    id: 'trauma_2',
    question: 'I\'ve been in an abusive or manipulative relationship that significantly affected me',
    category: 'trauma',
    section: 'Trauma & Past'
  },
  {
    id: 'trauma_3',
    question: 'Things from my past make me fear doing things normal people can do easily',
    category: 'trauma',
    section: 'Trauma & Past'
  },
  {
    id: 'trauma_4',
    question: 'I have trouble getting close to people and feel anxious/trapped when they get too close',
    category: 'trauma',
    section: 'Trauma & Past'
  },
  {
    id: 'trauma_5',
    question: 'I\'m overwhelmed easily by demands from friends and family to reply or see them',
    category: 'trauma',
    section: 'Trauma & Past'
  },
  {
    id: 'trauma_6',
    question: 'I\'m afraid to seek professional help because it traumatized me in the past',
    category: 'trauma',
    section: 'Trauma & Past'
  },
  {
    id: 'trauma_7',
    question: 'I\'ve been taken advantage of and manipulated by more people than is normal',
    category: 'trauma',
    section: 'Trauma & Past'
  },
  {
    id: 'trauma_8',
    question: 'I attract manipulative people who only want me for what I can provide',
    category: 'trauma',
    section: 'Trauma & Past'
  }
];

// =============================================================================
// GIFTED/INTELLIGENCE BURDEN
// =============================================================================

export const GIFTEDNESS_QUESTIONS: QuizQuestion[] = [
  {
    id: 'gifted_1',
    question: 'People compliment my intelligence but assume my life is easy because I\'m smart',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_2',
    question: 'My intelligence feels like a great burden',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_3',
    question: 'I can\'t express frustration with my intelligence without being labeled arrogant',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_4',
    question: 'I\'ve been told since childhood I\'m exceptional or academically advanced',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_5',
    question: 'I\'ve been expected to achieve more than others since childhood due to intelligence',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_6',
    question: 'Being labeled highly intelligent makes me feel unable to seek help or ashamed of suffering',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_7',
    question: 'People dismiss my suffering by calling my intelligence a "gift"',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_8',
    question: 'I can\'t express how I suffer without sounding melodramatic',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_9',
    question: 'I feel like the only person who fully understands what I experience',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_10',
    question: 'I feel like no one I\'ve ever met is like me or can understand me',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_11',
    question: 'I often feel like an outcast',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_12',
    question: 'I\'m afraid of achieving more academically due to fear of failure or no longer being the best',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_13',
    question: 'When I meet someone intelligent, I can communicate more efficiently and meaningfully',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_14',
    question: 'I can\'t discuss my intelligence without coming off as arrogant',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_15',
    question: 'I seek intelligent friends but succumb to viewing ourselves as an elite group',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_16',
    question: 'My intellectual peers seem to compete rather than genuinely care',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_17',
    question: 'Other people like me have done better or succeeded where I haven\'t',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_18',
    question: 'I\'ve been told I have a "unique" or "special" mind',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_19',
    question: 'I\'ve felt different from others since childhood',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_20',
    question: 'I\'ve been consistently identified as special in groups (intelligence, creativity, or sensitivity)',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  },
  {
    id: 'gifted_21',
    question: 'Friends view me as a source of information, not as someone with emotions',
    category: 'giftedness',
    section: 'Intelligence & Giftedness'
  }
];

// =============================================================================
// SENSORY & STIMULATION
// =============================================================================

export const SENSORY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'sensory_1',
    question: 'Noise, bright lights, or multiple conversations make me anxious or unable to think',
    category: 'sensory',
    section: 'Sensory Experience'
  },
  {
    id: 'sensory_2',
    question: 'I\'m embarrassed by my sensitivities',
    category: 'sensory',
    section: 'Sensory Experience'
  },
  {
    id: 'sensory_3',
    question: 'I\'m ashamed I can\'t function as well as others',
    category: 'sensory',
    section: 'Sensory Experience'
  }
];

// =============================================================================
// MENTAL HEALTH SYSTEM EXPERIENCES
// =============================================================================

export const SYSTEM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'system_1',
    question: 'Therapy has been unhelpful to me',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_2',
    question: 'I\'ve been told I don\'t want to get better or I\'m not trying hard enough',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_3',
    question: 'I\'ve tried everything to feel better and nothing has worked',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_4',
    question: 'There\'s something irrevocably wrong with my brain and how I think',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_5',
    question: 'I\'ve been told I\'m very self-aware in therapy, which makes me wonder why I don\'t feel good',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_6',
    question: 'Therapy discusses superfluous topics; when I discuss what truly bothers me I\'m treated as crazy',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_7',
    question: 'I\'ve been told I\'m difficult to treat, treatment resistant, or a "complicated case"',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_8',
    question: 'I\'ve been demeaned and talked down to in therapeutic settings',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_9',
    question: 'How I speak makes people think I mean something other than what I\'m saying',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_10',
    question: 'I was put on psychiatric meds before age 18 that didn\'t work or caused damage',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_11',
    question: 'I don\'t trust psychiatrists or therapists to have my best interests in mind',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_12',
    question: 'In psychiatric settings, I\'ve been treated like a case study rather than a human',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_13',
    question: 'Clinicians seem excited about my "unique brain" rather than empathetic',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_14',
    question: 'I\'m complimented on intelligence rather than validated for emotions',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_15',
    question: 'Because I sound unemotional when I speak, I\'m not taken seriously',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_16',
    question: 'I\'ve been diagnosed with 3+ DSM disorders',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_17',
    question: 'I\'ve been diagnosed with too many disorders to make sense',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_18',
    question: 'I have difficulty being heard when clinicians know my diagnosis or psychiatric history',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_19',
    question: 'Doctors treat me differently when I disclose my mental health history',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_20',
    question: 'I\'m afraid people would be afraid of me if they knew about my mental health',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_21',
    question: 'The mental health system just encouraged me to conform to their idea of normal',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  },
  {
    id: 'system_22',
    question: 'In therapy I was told there was something wrong with me',
    category: 'mental_health_system',
    section: 'Treatment Experiences'
  }
];

// =============================================================================
// SHAME & SELF-PERCEPTION
// =============================================================================

export const SHAME_QUESTIONS: QuizQuestion[] = [
  {
    id: 'shame_1',
    question: 'I don\'t want anyone to know I\'m mentally unwell for fear of being patronized or seen as incapable',
    category: 'shame',
    section: 'Shame & Self-Worth'
  },
  {
    id: 'shame_2',
    question: 'I\'m afraid of being treated as overreacting or overly sensitive',
    category: 'shame',
    section: 'Shame & Self-Worth'
  },
  {
    id: 'shame_3',
    question: 'I don\'t believe it\'s reasonable for me to have reacted as strongly as I have',
    category: 'shame',
    section: 'Shame & Self-Worth'
  },
  {
    id: 'shame_4',
    question: 'When someone criticizes me, I believe they\'re certainly correct and feel immense shame',
    category: 'shame',
    section: 'Shame & Self-Worth'
  },
  {
    id: 'shame_5',
    question: 'I feel uncomfortable when someone puts my needs before theirs or sacrifices to help me',
    category: 'shame',
    section: 'Shame & Self-Worth'
  },
  {
    id: 'shame_6',
    question: 'I\'m not doing enough to help others and live selfishly',
    category: 'shame',
    section: 'Shame & Self-Worth'
  },
  {
    id: 'shame_7',
    question: 'I have difficulty asking for help and find it shameful to admit I can\'t do everything alone',
    category: 'shame',
    section: 'Shame & Self-Worth'
  },
  {
    id: 'shame_8',
    question: 'I feel like a burden on others',
    category: 'shame',
    section: 'Shame & Self-Worth'
  },
  {
    id: 'shame_9',
    question: 'I feel addicted to harming myself',
    category: 'shame',
    section: 'Shame & Self-Worth'
  }
];

// =============================================================================
// PERFECTIONISM & ACHIEVEMENT
// =============================================================================

export const PERFECTIONISM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'perfect_1',
    question: 'I have the potential to do well but can\'t because of my mental anguish',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_2',
    question: 'I feel constant pressure to be as good as people say I am',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_3',
    question: 'I self-sabotage to avoid challenges out of fear of failure',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_4',
    question: 'I can\'t put all my energy into one thing in case there are better options',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_5',
    question: 'I don\'t trust myself to make the right decision',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_6',
    question: 'I\'m waiting for a sign to know for sure what the right thing to do is',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_7',
    question: 'I believe every choice I make has very significant consequences',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_8',
    question: 'I avoid making decisions until the last possible moment',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_9',
    question: 'I often don\'t finish things after noticing an error or imperfection',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_10',
    question: 'I\'m constantly "starting over" and never finishing anything',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_11',
    question: 'I expect more of myself than of other people',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_12',
    question: 'If I don\'t do something perfectly, I feel shame and want to avoid it',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_13',
    question: 'I feel frustrated with others for working too slowly or lacking efficiency',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_14',
    question: 'I like things systematic and efficient - I dislike when things are impractical',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  },
  {
    id: 'perfect_15',
    question: 'People don\'t understand why certain things upset me',
    category: 'perfectionism',
    section: 'Perfectionism & Standards'
  }
];

// =============================================================================
// ENERGY & MOTIVATION
// =============================================================================

export const ENERGY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'energy_1',
    question: 'I have less energy and motivation than most people',
    category: 'energy',
    section: 'Energy & Motivation'
  },
  {
    id: 'energy_2',
    question: 'I have difficulty doing things I don\'t find meaningful or important',
    category: 'energy',
    section: 'Energy & Motivation'
  },
  {
    id: 'energy_3',
    question: 'I have interests and projects I take very seriously, neglecting all other priorities',
    category: 'energy',
    section: 'Energy & Motivation'
  }
];

// =============================================================================
// INTERPERSONAL PATTERNS
// =============================================================================

export const INTERPERSONAL_QUESTIONS: QuizQuestion[] = [
  {
    id: 'interpersonal_1',
    question: 'I get angry when people try to give me advice',
    category: 'interpersonal',
    section: 'Social Dynamics'
  },
  {
    id: 'interpersonal_2',
    question: 'I come off as abrasive, argumentative, or angry when I don\'t mean to',
    category: 'interpersonal',
    section: 'Social Dynamics'
  },
  {
    id: 'interpersonal_3',
    question: 'People are surprised by how sensitive I am when they get to know me',
    category: 'interpersonal',
    section: 'Social Dynamics'
  },
  {
    id: 'interpersonal_4',
    question: 'People are surprised to hear I suffer from psychological issues or pain',
    category: 'interpersonal',
    section: 'Social Dynamics'
  },
  {
    id: 'interpersonal_5',
    question: 'I enjoy arguing with people and see it as a sign of respect and equality',
    category: 'interpersonal',
    section: 'Social Dynamics'
  },
  {
    id: 'interpersonal_6',
    question: 'I respect people who can win a debate against me',
    category: 'interpersonal',
    section: 'Social Dynamics'
  },
  {
    id: 'interpersonal_7',
    question: 'I argue with people I respect as a sign of respect',
    category: 'interpersonal',
    section: 'Social Dynamics'
  },
  {
    id: 'interpersonal_8',
    question: 'I don\'t respect people who don\'t think for themselves',
    category: 'interpersonal',
    section: 'Social Dynamics'
  },
  {
    id: 'interpersonal_9',
    question: 'I fantasize about being cared for in ways I don\'t allow others to do',
    category: 'interpersonal',
    section: 'Social Dynamics'
  },
  {
    id: 'interpersonal_10',
    question: 'I keep people at a distance out of fear they\'ll smother me or expect too much',
    category: 'interpersonal',
    section: 'Social Dynamics'
  }
];

// =============================================================================
// CONFORMITY & REBELLION
// =============================================================================

export const CONFORMITY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'conform_1',
    question: 'I often make tasks more difficult by insisting on my own unique method',
    category: 'conformity',
    section: 'Conformity & Independence'
  },
  {
    id: 'conform_2',
    question: 'I don\'t like to do things other people have already done',
    category: 'conformity',
    section: 'Conformity & Independence'
  },
  {
    id: 'conform_3',
    question: 'I like to be known as someone who doesn\'t follow the rules',
    category: 'conformity',
    section: 'Conformity & Independence'
  },
  {
    id: 'conform_4',
    question: 'I resent people who conform to social expectations unreasonably',
    category: 'conformity',
    section: 'Conformity & Independence'
  },
  {
    id: 'conform_5',
    question: 'I think conformity is something you do in certain situations to get what you want',
    category: 'conformity',
    section: 'Conformity & Independence'
  },
  {
    id: 'conform_6',
    question: 'I resent people who have no original ideas and default to the most basic thing',
    category: 'conformity',
    section: 'Conformity & Independence'
  },
  {
    id: 'conform_7',
    question: 'I resent people who follow every rule for no reason',
    category: 'conformity',
    section: 'Conformity & Independence'
  }
];

// =============================================================================
// AVOIDANCE & COPING
// =============================================================================

export const AVOIDANCE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'avoid_1',
    question: 'I avoid things that upset me',
    category: 'avoidance',
    section: 'Avoidance & Coping'
  },
  {
    id: 'avoid_2',
    question: 'I use substances to dull my experience of the world',
    category: 'avoidance',
    section: 'Avoidance & Coping'
  },
  {
    id: 'avoid_3',
    question: 'I can\'t decide what is best for me',
    category: 'avoidance',
    section: 'Avoidance & Coping'
  },
  {
    id: 'avoid_4',
    question: 'Since my suffering is caused by unchangeable circumstances, I can\'t feel better',
    category: 'avoidance',
    section: 'Avoidance & Coping'
  },
  {
    id: 'avoid_5',
    question: 'I feel trapped, constrained, or limited by the world, other people, and/or my mental health',
    category: 'avoidance',
    section: 'Avoidance & Coping'
  }
];

// =============================================================================
// HOPELESSNESS & RECOVERY BELIEFS
// =============================================================================

export const HOPELESSNESS_QUESTIONS: QuizQuestion[] = [
  {
    id: 'hopeless_1',
    question: 'I will never truly be happy, get better, or think normally',
    category: 'hopelessness',
    section: 'Hope & Recovery'
  },
  {
    id: 'hopeless_2',
    question: 'I have difficulty speaking confidently because I assume I\'ll be questioned or told I\'m wrong',
    category: 'hopelessness',
    section: 'Hope & Recovery'
  }
];

// Combined array for easy import
export const ALL_QUIZ_QUESTIONS: QuizQuestion[] = [
  ...CRISIS_QUESTIONS,
  ...MEANING_QUESTIONS,
  ...EMOTIONAL_REGULATION_QUESTIONS,
  ...AUTONOMY_QUESTIONS,
  ...AUTHENTICITY_QUESTIONS,
  ...CONNECTION_QUESTIONS,
  ...MINDFULNESS_QUESTIONS,
  ...COGNITIVE_QUESTIONS,
  ...TRAUMA_QUESTIONS,
  ...GIFTEDNESS_QUESTIONS,
  ...SENSORY_QUESTIONS,
  ...SYSTEM_QUESTIONS,
  ...SHAME_QUESTIONS,
  ...PERFECTIONISM_QUESTIONS,
  ...ENERGY_QUESTIONS,
  ...INTERPERSONAL_QUESTIONS,
  ...CONFORMITY_QUESTIONS,
  ...AVOIDANCE_QUESTIONS,
  ...HOPELESSNESS_QUESTIONS
];

// Category metadata for display and ranking
export const CATEGORY_INFO: Record<string, { label: string; description: string; color: string }> = {
  crisis: {
    label: 'Crisis & Safety',
    description: 'Immediate safety concerns requiring intervention',
    color: 'var(--component-4)'
  },
  meaning: {
    label: 'Purpose & Meaning',
    description: 'Understanding your purpose and life direction',
    color: 'var(--component-6)'
  },
  emotional_regulation: {
    label: 'Emotional Balance',
    description: 'Managing and understanding your emotions',
    color: 'var(--component-2)'
  },
  autonomy: {
    label: 'Personal Autonomy',
    description: 'Having control over your life and setting boundaries',
    color: 'var(--component-5)'
  },
  authenticity: {
    label: 'Authentic Self-Expression',
    description: 'Being true to yourself and expressing your real thoughts',
    color: 'var(--component-3)'
  },
  connection: {
    label: 'Connection & Understanding',
    description: 'Feeling understood and connected to others',
    color: 'var(--component-1)'
  },
  mindfulness: {
    label: 'Present Awareness',
    description: 'Being present and aware in daily life',
    color: 'var(--component-7)'
  },
  cognitive_patterns: {
    label: 'Thought Patterns',
    description: 'Patterns of thinking and mental processes',
    color: 'var(--component-8)'
  },
  trauma: {
    label: 'Trauma & Past',
    description: 'Impact of past traumatic experiences',
    color: 'var(--component-4)'
  },
  giftedness: {
    label: 'Intelligence & Giftedness',
    description: 'Experiences related to high intelligence or giftedness',
    color: 'var(--component-6)'
  },
  sensory: {
    label: 'Sensory Experience',
    description: 'Sensitivity to environmental stimuli',
    color: 'var(--component-2)'
  },
  mental_health_system: {
    label: 'Treatment Experiences',
    description: 'Experiences with mental health care system',
    color: 'var(--component-5)'
  },
  shame: {
    label: 'Shame & Self-Worth',
    description: 'Feelings of shame and self-perception',
    color: 'var(--component-3)'
  },
  perfectionism: {
    label: 'Perfectionism & Standards',
    description: 'High standards and achievement pressure',
    color: 'var(--component-1)'
  },
  energy: {
    label: 'Energy & Motivation',
    description: 'Energy levels and motivation patterns',
    color: 'var(--component-7)'
  },
  interpersonal: {
    label: 'Social Dynamics',
    description: 'Patterns in how you relate to others',
    color: 'var(--component-8)'
  },
  conformity: {
    label: 'Conformity & Independence',
    description: 'Relationship with rules and social expectations',
    color: 'var(--component-4)'
  },
  avoidance: {
    label: 'Avoidance & Coping',
    description: 'Ways of coping with difficulty',
    color: 'var(--component-6)'
  },
  hopelessness: {
    label: 'Hope & Recovery',
    description: 'Beliefs about possibility of improvement',
    color: 'var(--component-2)'
  }
};

