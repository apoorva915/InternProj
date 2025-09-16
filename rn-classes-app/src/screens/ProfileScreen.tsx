import { useState } from 'react';
import { View, Text, TextInput, Modal, Pressable } from 'react-native';
import { ScreenContainer, Section, Title, Button, Card, Meta, Hero } from '@/components/UI';
import { useTheme } from '@/components/Theme';
import { useProfile } from '@/state/useProfile';

export default function ProfileScreen() {
  const { profile, loading, updateName, resetProfile } = useProfile();
  const { name: themeName, setTheme, colors } = useTheme();
  const [editOpen, setEditOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState('');

  if (loading || !profile) {
    return (
      <ScreenContainer>
        <Section style={{ alignItems: 'center', paddingTop: 40 }}>
          <Meta>Loading profile…</Meta>
        </Section>
      </ScreenContainer>
    );
  }

  const openEditor = () => {
    setNameDraft(profile.name);
    setEditOpen(true);
  };

  const saveName = async () => {
    await updateName(nameDraft.trim());
    setEditOpen(false);
  };

  return (
    <ScreenContainer>
      <Hero title="Your Profile" subtitle="Manage your details and credits" />
      <Section>
        <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 12 }}>
          <View style={{ width: 96, height: 96, borderRadius: 96, backgroundColor: '#1b2430', borderWidth: 2, borderColor: '#243242', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#8aa0b6', fontSize: 28, fontWeight: '800' }}>{profile.name.substring(0, 1)}</Text>
          </View>
        </View>
        <Card>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '800' }}>{profile.name}</Text>
            <Meta>{profile.phone}</Meta>
            <Meta>Credits: {profile.credits}</Meta>
            <Meta>City: {profile.city}</Meta>
            <Meta>Joined: {profile.joinedDate}</Meta>
            <View style={{ marginTop: 8, flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
              <Button title="Edit name" tone="ghost" onPress={openEditor} />
              <Button title="Reset profile" tone="ghost" onPress={resetProfile} />
              <Button title={`Theme: ${themeName}`} tone="ghost" onPress={() => setTheme(themeName === 'dark' ? 'light' : 'dark')} />
            </View>
          </View>
        </Card>
      </Section>

      <Modal transparent visible={editOpen} animationType="fade" onRequestClose={() => setEditOpen(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <Pressable style={{ flex: 1 }} onPress={() => setEditOpen(false)} />
          <View style={{ marginTop: 'auto', backgroundColor: '#121821', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 }}>
            <Text style={{ color: '#e6eef8', fontSize: 18, fontWeight: '700', marginBottom: 12 }}>Edit Name</Text>
            <TextInput
              value={nameDraft}
              onChangeText={setNameDraft}
              placeholder="Your name"
              placeholderTextColor="#6b7f96"
              autoFocus
              style={{ backgroundColor: '#0e141b', borderColor: '#243242', borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, color: '#e6eef8' }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
              <Button title="Cancel" onPress={() => setEditOpen(false)} />
              <Button title="Save" onPress={saveName} />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}


