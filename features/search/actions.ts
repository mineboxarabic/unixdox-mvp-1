"use server";

import { requireAuth } from "@/shared/auth/server";
import { searchService } from "./services/search.service";
import type { SearchData } from "./types";

export async function getSearchData(): Promise<SearchData> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { documents: [], demarches: [] };
  }

  const [documents, demarches] = await Promise.all([
    searchService.getRecentDocuments(userId, 5),
    searchService.getRecentDemarches(userId, 5),
  ]);

  return {
    documents,
    demarches,
  };
}
