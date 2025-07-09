// components/NoteList/NoteList.tsx
import { Note } from "../../types/note";
import { Note } from "@/lib/api";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.card}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
          <button
            className={css.delete}
            onClick={() => deleteMutation.mutate(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;