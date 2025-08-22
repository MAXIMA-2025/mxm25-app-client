import { createContext } from "react";
import type { Category } from "@/hooks/useChallengeProgress";

export interface GameContextValue {
  categories: Category[];
  currentCategoryId: string | null;
  goToCategory: (id: string) => void;
  goBack: () => void;
  isCategorySolved: (categoryId: string) => boolean;
  submitPassword: (categoryId: string, input: string) => Promise<boolean>;
  resetCategory: (categoryId: string) => void;
  resetAll: () => void;
  invalidKeysFound: boolean;
  acknowledgeCheatModal: () => void;
}

export const GameContext = createContext<GameContextValue | null>(null);
