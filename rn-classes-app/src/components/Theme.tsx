import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeName = 'dark' | 'light';

export const palettes = {
  dark: {
    bg: '#070b10',
    card: '#0f1520',
    border: '#1a2533',
    text: '#e8f0fb',
    subtext: '#8aa0b6',
    primary: '#5ac8fa',
    accent: '#9b59ff',
    danger: '#ff6b6b',
  },
  light: {
    bg: '#f3f6fa',
    card: '#ffffff',
    border: '#cdd9e5',
    text: '#0b1722',
    subtext: '#2d4a60',
    primary: '#0ea5e9',
    accent: '#7c3aed',
    danger: '#dc2626',
  },
};

const STORAGE_KEY = 'theme:v1';

const ThemeContext = createContext<{ name: ThemeName; colors: typeof palettes.dark; setTheme: (t: ThemeName) => void }>({
  name: 'dark',
  colors: palettes.dark,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<ThemeName>('dark');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') setName(saved);
    })();
  }, []);

  const setTheme = async (t: ThemeName) => {
    setName(t);
    await AsyncStorage.setItem(STORAGE_KEY, t);
  };

  const value = useMemo(() => ({ name, colors: palettes[name], setTheme }), [name]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Backwards export for any code importing colors directly
export const colors = palettes.dark;


