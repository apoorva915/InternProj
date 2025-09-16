export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export type ClassItem = {
  id: string;
  name: string;
  level: Level;
  instructor: string;
  center: string;
  isBooked?: boolean;
};

export type UserProfile = {
  id: string;
  name: string;
  phone: string;
  credits: number;
  city: string;
  joinedDate: string;
};



