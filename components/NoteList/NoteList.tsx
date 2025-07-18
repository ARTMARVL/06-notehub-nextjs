'use client';
import { Note } from '@/types/note';
import css from './NoteList.module.css';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3>
            <Link href={`/notes/${note.id}`}>{note.title}</Link>
          </h3>
          <p>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <button onClick={() => mutation.mutate(String(note.id))}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}