interface Session {
  id: number;
  title: string;
  description: string;
  image: string | undefined;
}

export const sessions: Session[] = [
  {
    id: 1,
    title: "Headspace",
    description:
      "A guided meditation and mindfulness app offering daily sessions, sleep aids, and stress-relief exercises designed to help users build a consistent meditation practice.",
    image: require("@/assets/images/sessions/headspace.jpeg"),
  },
  {
    id: 2,
    title: "Calm",
    description:
      "An app focused on sleep, meditation, and relaxation featuring bedtime stories, breathing exercises, and nature sounds to promote mental well-being.",
    image: require("@/assets/images/sessions/calm.jpeg"),
  },
  {
    id: 3,
    title: "Insight Timer",
    description:
      "A free meditation app with thousands of guided sessions, a customizable timer, and a global community of meditators for all experience levels.",
    image: require("@/assets/images/sessions/insight_timer.jpeg"),
  },
  {
    id: 4,
    title: "Ten Percent Happier",
    description:
      "A meditation app based on the bestselling book, offering practical, down-to-earth teachings for skeptics and busy people looking to reduce anxiety.",
    image: require("@/assets/images/sessions/happier.jpeg"),
  },
  {
    id: 5,
    title: "Breethe",
    description:
      "A holistic mindfulness app providing guided meditations, hypnotherapy sessions, and masterclasses for sleep, stress, and personal growth.",
    image: require("@/assets/images/sessions/breethe.jpeg"),
  },
];
