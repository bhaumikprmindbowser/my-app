export enum PriorityType {
  Critical = "critical",
  High = "high",
  Medium = "medium",
  Low = "low"
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  done: boolean;
}