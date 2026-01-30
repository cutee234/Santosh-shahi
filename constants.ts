
import { Mission, BreachStory, Badge } from './types';

export const MISSIONS: Mission[] = [
  {
    id: 'nmap-1',
    title: 'Basic Port Scan',
    command: 'nmap 10.10.10.5',
    description: 'Scan the target IP 10.10.10.5 for open ports.',
    hint: 'Just type nmap followed by the IP address.'
  },
  {
    id: 'nmap-2',
    title: 'Version Detection',
    command: 'nmap -sV 10.10.10.5',
    description: 'Detect the service version on open ports.',
    hint: 'Use the -sV flag to probe open ports to determine service/version info.'
  },
  {
    id: 'ssh-1',
    title: 'SSH Access',
    command: 'ssh root@10.10.10.5',
    description: 'Connect to the target via SSH as the root user.',
    hint: 'Use the syntax ssh user@host.'
  }
];

export const STORIES: BreachStory[] = [
  {
    id: 'wannacry',
    title: 'The WannaCry Outbreak',
    content: "A massive worldwide cyberattack by the WannaCry ransomware cryptoworm, which targeted computers running the Microsoft Windows operating system by encrypting data and demanding ransom payments in Bitcoin. It exploited a vulnerability called EternalBlue.",
    definitions: {
      "Ransomware": "Malicious software that blocks access to a computer system until a sum of money is paid.",
      "EternalBlue": "A cyberattack exploit developed by the NSA to target Windows computers through SMB protocol.",
      "Bitcoin": "A decentralized digital currency without a central bank or single administrator."
    },
    choices: [
      { text: "Patch the Server", icon: "🛡️", xp: 50, feedback: "Excellent! You secured the network against EternalBlue." },
      { text: "Unplug the Network", icon: "🔌", xp: 30, feedback: "Safe choice, but the infection might already be spreading locally." }
    ]
  }
];

export const INITIAL_BADGES: Badge[] = [
  { id: 'nmap-master', name: 'Nmap Specialist', icon: '🔍', unlocked: false },
  { id: 'script-kiddie', name: 'Code Breaker', icon: '⌨️', unlocked: false },
  { id: 'cyber-detective', name: 'Digital Detective', icon: '🕵️', unlocked: false }
];
