export type ChangeType = "add" | "remove" | "fix" | "change";

export interface ChangelogEntry {
  id: string;
  mode: string;
  version?: string;
  date: string;
  changes: {
    type: ChangeType;
    description: string;
  }[];
  author: string;
} 