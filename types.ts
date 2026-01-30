
export enum View {
  DASHBOARD = 'DASHBOARD',
  DOJO = 'DOJO',
  STORY = 'STORY',
  CHAT = 'CHAT'
}

export interface Mission {
  id: string;
  title: string;
  command: string;
  description: string;
  hint: string;
}

export interface BreachStory {
  id: string;
  title: string;
  content: string;
  definitions: Record<string, string>;
  choices: {
    text: string;
    icon: string;
    xp: number;
    feedback: string;
  }[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}
