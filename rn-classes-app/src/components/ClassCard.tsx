import { View, Text } from 'react-native';
import { Button, Card, Meta } from './UI';
import { colors, useTheme } from './Theme';
import { ClassItem } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';

export default function ClassCard({ item, onQuickBook, isBooking }: { item: ClassItem; onQuickBook: (id: string) => void; isBooking?: boolean }) {
  const { colors } = useTheme();
  const [c1, c2] = item.level === 'Beginner' ? ['#1d7c4d', '#7ee2b8'] : item.level === 'Advanced' ? ['#7c1d3a', '#ff9bb3'] : ['#1d3b7c', '#91b8ff'];
  const emoji = getClassEmoji(item.name);
  return (
    <Card>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <LinearGradient colors={[c1, c2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 48, height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: '#223046' }}>
          <Text style={{ fontSize: 22 }}>{emoji}</Text>
        </LinearGradient>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 6 }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            <Badge text={item.level} />
            <Meta>• {item.instructor}</Meta>
            <Meta>• {item.center}</Meta>
          </View>
        </View>
        <Button title={item.isBooked ? 'Booked' : 'Quick Book'} onPress={() => onQuickBook(item.id)} disabled={item.isBooked || isBooking} />
      </View>
    </Card>
  );
}

function Badge({ text }: { text: string }) {
  const bg = text === 'Beginner' ? '#1f3b2d' : text === 'Advanced' ? '#3b1f2a' : '#27384a';
  const fg = text === 'Beginner' ? '#7ee2b8' : text === 'Advanced' ? '#ff9bb3' : '#91b8ff';
  return (
    <View style={{ backgroundColor: bg, borderColor: colors.border, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 }}>
      <Text style={{ color: fg, fontWeight: '700', fontSize: 12 }}>{text}</Text>
    </View>
  );
}

function getClassEmoji(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('yoga')) return '🧘';
  if (n.includes('hiit') || n.includes('power')) return '⚡';
  if (n.includes('spin') || n.includes('cycle')) return '🚴';
  if (n.includes('boxing')) return '🥊';
  if (n.includes('pilates')) return '🧎';
  if (n.includes('strength') || n.includes('powerlifting')) return '🏋️';
  if (n.includes('meditation') || n.includes('zen')) return '🧠';
  if (n.includes('dance')) return '💃';
  if (n.includes('circuit') || n.includes('crossfit')) return '🏃';
  return '🎯';
}

