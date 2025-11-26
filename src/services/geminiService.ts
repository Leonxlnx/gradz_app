export interface KindnessTask {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
}

const mockTasks: KindnessTask[] = [
  {
    title: "The Unseen Compliment",
    description: "Identify someone doing thankless work (janitor, bus driver) and give them a genuine, specific compliment about their efficiency.",
    difficulty: "Easy",
    estimatedTime: "2 mins"
  },
  {
    title: "Coffee Chain Reaction",
    description: "Pay for the coffee of the person behind you in line. Leave a note saying 'Keep the kindness going!'",
    difficulty: "Easy",
    estimatedTime: "5 mins"
  },
  {
    title: "Digital Gratitude",
    description: "Send a heartfelt message to someone who helped you this year, explaining exactly how they made a difference.",
    difficulty: "Easy",
    estimatedTime: "10 mins"
  },
  {
    title: "Neighborhood Helper",
    description: "Offer to help an elderly neighbor with a small task like carrying groceries or raking leaves.",
    difficulty: "Medium",
    estimatedTime: "30 mins"
  },
  {
    title: "Anonymous Generosity",
    description: "Leave a generous tip with a kind note for your server, highlighting something specific they did well.",
    difficulty: "Easy",
    estimatedTime: "3 mins"
  },
  {
    title: "Lost & Found Kindness",
    description: "If you find a lost wallet or phone, go out of your way to return it to its owner personally.",
    difficulty: "Hard",
    estimatedTime: "1 hour"
  },
  {
    title: "Flower Power",
    description: "Buy a bouquet and hand out individual flowers to strangers who look like they need cheering up.",
    difficulty: "Medium",
    estimatedTime: "20 mins"
  },
  {
    title: "Review Booster",
    description: "Leave a detailed, positive review for a small business you love. Be specific about what makes them special.",
    difficulty: "Easy",
    estimatedTime: "10 mins"
  },
  {
    title: "Reconnection Call",
    description: "Call a family member or old friend you haven't spoken to in a while, just to catch up and show you care.",
    difficulty: "Medium",
    estimatedTime: "30 mins"
  },
  {
    title: "Litter Warrior",
    description: "Pick up litter in your neighborhood while taking a walk. Make it a visible act of care for your community.",
    difficulty: "Easy",
    estimatedTime: "15 mins"
  },
];

export const generateKindnessTask = async (): Promise<KindnessTask> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return random task from mock data
  const randomIndex = Math.floor(Math.random() * mockTasks.length);
  return mockTasks[randomIndex];
};
