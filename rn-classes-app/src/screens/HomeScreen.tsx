import { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, Modal } from 'react-native';
import { ScreenContainer, Section, Title, Chip, Button, Hero, Card } from '@/components/UI';
import { useTheme } from '@/components/Theme';
import ClassCard from '@/components/ClassCard';
import { CLASSES, INSTRUCTORS } from '@/data/classes';
import { ClassItem, Level } from '@/types';
import { useProfile } from '@/state/useProfile';

function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  if (!message) return null as any;
  return (
    <Pressable
      onPress={onDismiss}
      style={{ position: 'absolute', left: 16, right: 16, bottom: 24, backgroundColor: '#1f2a36', borderColor: '#e45757', borderWidth: 1, padding: 12, borderRadius: 12 }}
    >
      <Text style={{ color: '#ffadad', fontWeight: '600', textAlign: 'center' }}>{message}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { profile, adjustCredits } = useProfile();
  const { colors } = useTheme();
  const [levelFilter, setLevelFilter] = useState<Level | 'All'>('All');
  const [instructor, setInstructor] = useState<string | 'All'>('All');
  const [items, setItems] = useState<ClassItem[]>(CLASSES);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [instructorModal, setInstructorModal] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((c) => (levelFilter === 'All' ? true : c.level === levelFilter) && (instructor === 'All' ? true : c.instructor === instructor));
  }, [items, levelFilter, instructor]);

  const clearFilters = () => {
    setLevelFilter('All');
    setInstructor('All');
  };

  const quickBook = async (id: string) => {
    if (profile && profile.credits <= 0) {
      setToast({ type: 'error', message: 'No credits left. Upgrade for more access.' });
      setTimeout(() => setToast(null), 2200);
      return;
    }
    setBookingId(id);
    // Optimistic update
    const prev = items;
    const optimistic = items.map((i) => (i.id === id ? { ...i, isBooked: true } : i));
    setItems(optimistic);

    try {
      // Simulate latency
      await new Promise((r) => setTimeout(r, 600));
      // 15% failure chance
      if (Math.random() < 0.15) {
        throw new Error('Booking failed. Please try again.');
      }
      await adjustCredits(-1);
      setToast({ type: 'success', message: 'Booked! 1 credit deducted.' });
      setTimeout(() => setToast(null), 1800);
    } catch (e: any) {
      // Rollback
      setItems(prev);
      setToast({ type: 'error', message: e.message ?? 'Booking failed.' });
      setTimeout(() => setToast(null), 2200);
    } finally {
      setBookingId(null);
    }
  };

  const levels: (Level | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <ScreenContainer>
      <FlatList
        ListHeaderComponent={
          <>
            <Hero title="Move. Sweat. Repeat." subtitle="Find your next class and book in seconds." />
            {profile ? (
              <Section>
                <Card style={{ paddingVertical: 10 }}>
                  <Text style={{ color: colors.text, marginBottom: 6, fontWeight: '700' }}>Membership Credits</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: colors.text, fontWeight: '800' }}>Credits: {profile.credits}</Text>
                  </View>
                  <View style={{ height: 6, backgroundColor: colors.bg === '#070b10' ? '#0e141b' : '#e8eef6', borderRadius: 999, marginTop: 8, borderWidth: 1, borderColor: colors.border }}>
                    <View style={{ width: `${Math.min(100, (profile.credits / 10) * 100)}%`, height: '100%', backgroundColor: '#5ac8fa', borderRadius: 999 }} />
                  </View>
                </Card>
              </Section>
            ) : null}
            <Section>
              <Title text="Filters" />
            </Section>
            <Section>
              <Text style={{ color: colors.subtext, marginBottom: 8, fontWeight: '600' }}>Level</Text>
              <View style={{ flexDirection: 'row' }}>
                {levels.map((lvl) => (
                  <Chip key={lvl} label={String(lvl)} active={levelFilter === lvl} onPress={() => setLevelFilter(lvl)} />
                ))}
              </View>
            </Section>
            <Section>
              <Text style={{ color: colors.subtext, marginBottom: 8, fontWeight: '600' }}>Instructor</Text>
            </Section>
            <Card style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
              <Pressable onPress={() => setInstructorModal(true)} style={{ paddingVertical: 2 }}>
                <Text style={{ color: colors.text, fontWeight: '700' }}>{instructor === 'All' ? 'All Instructors' : instructor}</Text>
              </Pressable>
            </Card>
            <Section style={{ marginTop: 12 }}>
              <Title text="Available Classes" />
            </Section>
          </>
        }
        contentContainerStyle={{ gap: 12, padding: 16, paddingTop: 6, paddingBottom: 120 }}
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <ClassCard item={item} onQuickBook={quickBook} isBooking={bookingId === item.id} />}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: colors.subtext, marginBottom: 12 }}>No classes match your filters.</Text>
            <Button title="Clear Filters" tone="ghost" onPress={clearFilters} />
          </View>
        }
      />

      <Modal transparent visible={instructorModal} animationType="fade" onRequestClose={() => setInstructorModal(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => setInstructorModal(false)}>
          <View style={{ marginTop: 'auto', backgroundColor: colors.card, borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: 12 }}>Select Instructor</Text>
            <Pressable onPress={() => { setInstructor('All'); setInstructorModal(false); }} style={{ paddingVertical: 10 }}>
              <Text style={{ color: instructor === 'All' ? colors.primary : colors.text }}>All</Text>
            </Pressable>
            {INSTRUCTORS.map((name) => (
              <Pressable key={name} onPress={() => { setInstructor(name); setInstructorModal(false); }} style={{ paddingVertical: 10 }}>
                <Text style={{ color: instructor === name ? colors.primary : colors.text }}>{name}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <ToastV2 toast={toast} onDismiss={() => setToast(null)} />
    </ScreenContainer>
  );
}

function ToastV2({ toast, onDismiss }: { toast: { type: 'error' | 'success'; message: string } | null; onDismiss: () => void }) {
  if (!toast) return null as any;
  const styles = toast.type === 'success'
    ? { bg: '#193a2a', border: '#2e8b57', color: '#93e2b8' }
    : { bg: '#2a1a1a', border: '#e45757', color: '#ffadad' };
  return (
    <Pressable onPress={onDismiss} style={{ position: 'absolute', left: 16, right: 16, bottom: 24, backgroundColor: styles.bg, borderColor: styles.border, borderWidth: 1, padding: 12, borderRadius: 12 }}>
      <Text style={{ color: styles.color, fontWeight: '700', textAlign: 'center' }}>{toast.message}</Text>
    </Pressable>
  );
}


