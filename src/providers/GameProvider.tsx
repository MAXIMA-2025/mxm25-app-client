import React, { useCallback, useEffect, useMemo, useState } from "react";
import { categories as categoriesData } from "@/pages/(authenticated)/challenges/maxlearn/_data";
import type { Category } from "@/hooks/useChallengeProgress";
import { GameContext } from "@/contexts/GameContext";
import {
  readStatus,
  writeStatus,
  ensureInitialized,
  findInvalidKeys,
  STATUS_TRUE,
  STATUS_FALSE,
} from "@/lib/storageUtils";

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [categories] = useState<Category[]>(categoriesData as Category[]);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null
  );
  const [invalidKeysFound, setInvalidKeysFound] = useState(false);

  useEffect(() => {
    ensureInitialized(categories);
    const invalid = findInvalidKeys(categories);
    if (invalid.length > 0) setInvalidKeysFound(true);
  }, [categories]);

  const isCategorySolved = useCallback(
    (categoryId: string) => {
      const cat = categories.find((c) => c.id === categoryId);
      if (!cat) return false;
      return cat.organizations.some((o) => readStatus(o.id) === STATUS_TRUE);
    },
    [categories]
  );

  const goToCategory = useCallback(
    (id: string) => setCurrentCategoryId(id),
    []
  );
  const goBack = useCallback(() => setCurrentCategoryId(null), []);

  const submitPassword = useCallback(
    async (categoryId: string, input: string) => {
      const cat = categories.find((c) => c.id === categoryId);
      if (!cat) return false;

      const found = cat.organizations.find((o) => o.password === input);
      if (!found) return false;

      for (const org of cat.organizations) {
        writeStatus(org.id, STATUS_TRUE);
      }
      return true;
    },
    [categories]
  );

  const resetCategory = useCallback(
    (categoryId: string) => {
      const cat = categories.find((c) => c.id === categoryId);
      if (!cat) return;
      for (const org of cat.organizations) {
        writeStatus(org.id, STATUS_FALSE);
      }
    },
    [categories]
  );

  const resetAll = useCallback(() => {
    for (const cat of categories) {
      for (const org of cat.organizations) {
        writeStatus(org.id, STATUS_FALSE);
      }
    }
  }, [categories]);

  const acknowledgeCheatModal = useCallback(() => {
    const invalid = findInvalidKeys(categories);
    for (const k of invalid) {
      localStorage.setItem(k, STATUS_FALSE);
    }
    setInvalidKeysFound(false);
  }, [categories]);

  const value = useMemo(
    () => ({
      categories,
      currentCategoryId,
      goToCategory,
      goBack,
      isCategorySolved,
      submitPassword,
      resetCategory,
      resetAll,
      invalidKeysFound,
      acknowledgeCheatModal,
    }),
    [
      categories,
      currentCategoryId,
      goToCategory,
      goBack,
      isCategorySolved,
      submitPassword,
      resetCategory,
      resetAll,
      invalidKeysFound,
      acknowledgeCheatModal,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
