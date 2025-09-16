import { ClassItem } from '@/types';

export const CLASSES: ClassItem[] = [
  { id: '1', name: 'Morning Yoga Flow', level: 'Beginner', instructor: 'Alice Johnson', center: 'Downtown Studio' },
  { id: '2', name: 'HIIT Power 45', level: 'Advanced', instructor: 'Miguel Santos', center: 'Riverside Center' },
  { id: '3', name: 'Strength Foundations', level: 'Intermediate', instructor: 'Priya Singh', center: 'Uptown Gym' },
  { id: '4', name: 'Pilates Core', level: 'Intermediate', instructor: 'Alice Johnson', center: 'Downtown Studio' },
  { id: '5', name: 'Spin Express', level: 'Beginner', instructor: 'Noah Lee', center: 'Riverside Center' },
  { id: '6', name: 'Boxing Basics', level: 'Beginner', instructor: 'Miguel Santos', center: 'Uptown Gym' },
  { id: '7', name: 'Mobility & Stretch', level: 'Advanced', instructor: 'Priya Singh', center: 'Downtown Studio' },
  { id: '8', name: 'Evening Yoga Restore', level: 'Advanced', instructor: 'Alice Johnson', center: 'Riverside Center' },
  { id: '9', name: 'Functional Circuit', level: 'Intermediate', instructor: 'Noah Lee', center: 'City Center Club' },
  { id: '10', name: 'Zen Meditation', level: 'Beginner', instructor: 'Sara Patel', center: 'Wellness Hub' },
  { id: '11', name: 'CrossFit Intro', level: 'Beginner', instructor: 'James Carter', center: 'Warehouse Box' },
  { id: '12', name: 'Powerlifting 101', level: 'Advanced', instructor: 'Priya Singh', center: 'Uptown Gym' },
  { id: '13', name: 'Dance Cardio', level: 'Intermediate', instructor: 'Alice Johnson', center: 'Downtown Studio' },
];

export const INSTRUCTORS = Array.from(new Set(CLASSES.map(c => c.instructor)));


