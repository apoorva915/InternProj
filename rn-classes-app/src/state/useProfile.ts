import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/types';

const STORAGE_KEY = 'profile:v1';

const defaultProfile: UserProfile = {
  id: 'user-1',
  name: 'Alex Carter',
  phone: '+1 555-0134',
  credits: 5,
  city: 'San Francisco',
  joinedDate: '2024-03-18',
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setProfile(JSON.parse(raw));
        } else {
          setProfile(defaultProfile);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile));
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateName = async (name: string) => {
    if (!profile) return;
    const next = { ...profile, name };
    setProfile(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const adjustCredits = async (delta: number) => {
    if (!profile) return;
    const nextCredits = Math.max(0, profile.credits + delta);
    const next = { ...profile, credits: nextCredits };
    setProfile(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const resetProfile = async () => {
    setProfile(defaultProfile);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile));
  };

  return { profile, loading, updateName, adjustCredits, resetProfile };
}


