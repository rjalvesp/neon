export interface IdeaBody {
  postedBy: string;
  summary: string;
  workflow: string;
  assignees: string[];
}

export interface Idea extends IdeaBody {
  id: string;
  ratings: number[];
  createdAt: string;
}
