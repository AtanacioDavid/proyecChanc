
import { NAV_ITEMS } from './constants';

export type NavPage = typeof NAV_ITEMS[number]['name'];
export type Page = NavPage | 'Login' | 'Register';

export interface Project {
  id: number;
  name: string;
  description: string;
  location: string;
  objectives: string;
  leader: string;
  isRecruiting?: boolean;
}

export interface Opportunity {
  id: number;
  title: string;
  category: 'Empleo' | 'Pasantías' | 'Concursos' | 'Hackatones';
  date: string;
}

export interface BusinessProject {
  id: number;
  title: string;
  description: string;
  company: string;
}

export interface CompanyChallenge {
  id: number;
  title: string;
  description: string;
  company: string;
  deadline: string;
}

// --- Digital CV Types ---
export interface Education {
    institution: string;
    degree: string;
    year: string;
}
export interface CVProject {
    id: number;
    name: string;
    role: string;
    startDate: string;
    endDate: string;
}
export interface Recommendation {
    id: number;
    peerName: string;
    skill: string;
}
export interface UserProfile {
    name: string;
    email: string;
    photoUrl: string;
    interests: string[];
    education: Education[];
    projects: CVProject[];
    recommendations: Recommendation[];
}


// --- Club Types ---
export interface Mentor {
    id: number;
    name: string;
    specialty: string;
    linkedin: string;
}
export interface InvestmentFund {
    id: number;
    name: string;
    description: string;
    focus: string;
}
export interface GovernanceProposal {
    id: number;
    title: string;
    description: string;
    votesFor: number;
    votesAgainst: number;
}
export interface ClubEvent {
    id: number;
    title: string;
    date: string;
    description: string;
    location: string;
}

// --- Message Types ---
export interface Message {
    id: number;
    sender: 'me' | 'other';
    text: string;
    timestamp: string;
    avatar: string;
}
export interface Conversation {
    id: number;
    title: string;
    participants: string[];
    messages: Message[];
    avatar: string;
}
