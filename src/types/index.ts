import type { Component } from "vue";

export interface SkillItem {
    name: string;
    level: number;
    color: string;
}

export interface SkillCategory {
    title: string;
    icon: Component | any;
    description: string;
    skills: SkillItem[];
}

export interface StatItem {
    number: string;
    label: string;
}

export interface TechDetails {
    backend: string;
    frontend: string;
    database: string;
    architecture: string;
}

export interface Project {
    id: number;
    title: string;
    subtitle?: string;
    description: string;
    image: string;
    featured?: boolean;
    category: string;
    stackCategory?: string;
    techDetails?: TechDetails;
    tags: string[];
    highlights?: string[];
    flagshipMetrics?: string[];
    liveUrl?: string;
    githubUrl?: string;
    status?: string;
}

export interface JourneyStep {
    year: string;
    title: string;
    company: string;
    description: string;
    icon: Component | any;
    color: string;
}

export interface Passion {
    icon: Component | any;
    title: string;
    description: string;
}

export interface SocialLink {
    name: string;
    icon: Component | any;
    url: string;
    color: string;
    bgColor: string;
}

export interface ContactInfo {
    icon: Component | any;
    label: string;
    value: string;
}

export interface TechnologyItem {
    name: string;
    spec: string;
    tier: string;
    icon: Component | any;
    color: string;
    project: string;
}

export interface StackPillar {
    title: string;
    icon: Component | any;
    color: string;
    accent: string;
    technologies: TechnologyItem[];
}

export interface PipelineStep {
    step: string;
    name: string;
    tech: string;
    color: string;
}

export interface TechGlobeItem {
    name: string;
    shortName?: string;
    category: string;
    level: string;
    icon: Component | any;
    color: string;
    description: string;
}

export type Theme = "dark" | "light";
