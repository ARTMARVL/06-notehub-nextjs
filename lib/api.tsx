import axios from "axios";
import type { Note } from "../types/note";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const API_URL = 'https://notehub-public.goit.study/api/notes';


interface NotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content?: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export const fetchNotes = async (
  search?: string,
  page = 1,
  perPage = 12
): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>(API_URL, {
    params: {
      ...(search ? { search } : {}),
      page,
      perPage,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await axios.post<Note>(API_URL, noteData, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const response = await axios.delete(`${API_URL}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data;
};