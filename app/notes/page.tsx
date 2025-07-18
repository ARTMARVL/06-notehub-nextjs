import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
  try {
    const { notes } = await fetchNotes(1, 100, '');
    return <NotesClient notes={notes} />;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return <div>Unable to load notes.</div>;
  }
}