export type EventType = 'prayer' | 'class';
export type DayCategory = 'evening' | 'day' | 'weekday';

export interface EventItem {
  id: string;
  name: string;
  time: string;
  type: EventType;
  dayCategory: DayCategory;
  note?: string;
}

export interface HebrewDateInfo {
    hebrew: string;
    events?: string[];
}

export interface BoardSettings {
  scale: number;
}
