export interface INotes {
  title: string;
  content: string;
  category: "personal" | "admin" | "Ghost";
  pinned: boolean;
  tags: {
    label: string;
    color: string;
  };
}
