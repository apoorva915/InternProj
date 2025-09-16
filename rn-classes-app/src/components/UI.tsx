import { ReactNode } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './Theme';

export function ScreenContainer({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  return <View style={{ flex: 1, backgroundColor: colors.bg }}>{children}</View>;
}

export function Section({ children, style }: { children: ReactNode; style?: any }) {
  return <View style={[{ paddingHorizontal: 16, paddingVertical: 12 }, style]}>{children}</View>;
}

export function Title({ text }: { text: string }) {
  const { colors } = useTheme();
  return <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700' }}>{text}</Text>;
}

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: active ? colors.primary : (colors.bg === '#070b10' ? '#16202b' : '#eef5fd'),
        borderWidth: 1,
        borderColor: active ? colors.primary : colors.border,
        marginRight: 8,
      }}
    >
      <Text style={{ color: active ? colors.bg : colors.text, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}

export function Button({ title, onPress, tone = 'primary', disabled }: { title: string; onPress?: () => void; tone?: 'primary' | 'ghost'; disabled?: boolean }) {
  const { colors } = useTheme();
  const styles = tone === 'primary'
    ? { backgroundColor: disabled ? '#2a394a' : colors.primary, color: colors.bg, borderColor: colors.primary }
    : { backgroundColor: 'transparent', color: colors.text, borderColor: '#243242' };
  return (
    <Pressable onPress={onPress} disabled={disabled} style={{ paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: styles.borderColor, backgroundColor: styles.backgroundColor }}>
      <Text style={{ color: styles.color, fontWeight: '700' }}>{title}</Text>
    </Pressable>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: any }) {
  const { colors } = useTheme();
  return <View style={[{ backgroundColor: colors.card, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border }, style]}>{children}</View>;
}

export function Meta({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  return <Text style={{ color: colors.subtext, opacity: 0.9 }}>{children}</Text>;
}

export function Hero({ title, subtitle }: { title: string; subtitle?: string }) {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={[colors.accent, colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
    >
      <View style={{ paddingHorizontal: 16, paddingVertical: 28 }}>
        <Text style={{ color: colors.bg, fontSize: 24, fontWeight: '800' }}>{title}</Text>
        {subtitle ? <Text style={{ color: '#00131f', marginTop: 4, fontWeight: '600' }}>{subtitle}</Text> : null}
      </View>
    </LinearGradient>
  );
}


