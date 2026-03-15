export interface Activity {
  id: string;
  name: string;
  duration: number; // minutes
  notes?: string;
  createdAt: string; // ISO 8601
}
