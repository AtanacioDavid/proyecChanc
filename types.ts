
import { NAV_ITEMS } from './constants';

export type NavPage = typeof NAV_ITEMS[number]['name'];
export type Page = NavPage | 'Perfil';

export interface IntegrationProposal {
    _id?: string;
    proposerName: string;
    proposerEmail: string;
    title: string;
    description: string;
    valueAdd: string; // Cómo agrega valor
    status: 'Pendiente' | 'Aceptada' | 'Rechazada';
    createdAt?: string;
}

export interface ProjectUpdate {
    id: number;
    date: string;
    title: string;
    description: string;
    imageUrl?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar?: string;
}

export interface Project {
  _id: string; 
  name: string;
  description: string;
  location: string;
  objectives: string;
  leader: { 
    _id: string;
    name: string;
    email: string;
  };
  teamMembers?: TeamMember[]; // Nuevo campo para el equipo
  isRecruiting?: boolean;
  createdAt?: string;
  // Nuevos campos para incubación y patrocinio
  incubatedBy?: string; // Nombre de la empresa que incuba
  sponsors?: string[]; // Lista de empresas patrocinadoras
  // Nuevos campos de reclutamiento y finanzas
  neededRoles?: string[];
  budget?: string;
  // Campos para Marketing de Proyectos
  videoUrl?: string; // Link al pitch
  isFeatured?: boolean; // Si el proyecto está promocionado/destacado
  // Campo para propuestas de integración
  integrations?: IntegrationProposal[];
  // Validación Social y Ciclo de Vida
  likes?: number;
  status?: 'Idea' | 'Prototipo' | 'Validado' | 'En Escala' | 'Finalizado';
  updates?: ProjectUpdate[]; // Bitácora de avances
}

export interface Opportunity {
  id: number;
  title: string;
  category: 'Empleo' | 'Pasantías' | 'Concursos' | 'Hackatones' | 'Becas';
  date: string;
}

export interface BusinessProject {
  id: number;
  title: string;
  description: string;
  company?: string; // Opcional si es un proyecto de jóvenes
  teamName?: string; // Nombre del equipo de jóvenes
  status?: 'Buscando Incubación' | 'Incubado' | 'Buscando Inversión';
  tags?: string[];
}

export interface CommunityProject {
  id: number;
  title: string;
  description: string;
  impact: string; // Impacto social/comunitario
  needs: string; // Qué necesita (Fondos, Mentoria, Equipamiento)
  location: string;
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

// --- User Authentication ---
export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  // Campos extendidos de perfil
  photoUrl?: string;
  bio?: string;
  location?: string;
  interests?: string[];
  education?: Education[];
  softSkills?: string[]; // Habilidades blandas validadas
}

export interface CVProject {
    id: number;
    name: string;
    role: string;
    startDate: string;
    endDate: string;
    status?: 'Finalizado' | 'En curso' | 'Ganador Hackathon' | 'Incubado'; // Estado del proyecto
}
export interface Recommendation {
    id: number;
    peerName: string;
    skill: string;
}
export interface Badge {
    id: number;
    name: string;
    issuer: string; // Empresa u organización que la otorga
    icon: string;
    date: string;
}

export interface UserProfile {
    name: string;
    email: string;
    photoUrl: string;
    bio: string; 
    location: string; 
    interests: string[];
    education: Education[];
    projects: CVProject[];
    recommendations: Recommendation[];
    badges: Badge[];
    softSkills: string[]; // Agregado para visualización en CV
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
