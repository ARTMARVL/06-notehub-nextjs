import axios from "axios";
import type { Note } from "../types/note";

const Token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`

export interface NotesResponse {
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
  const response = await axios.get<NotesResponse>("/notes", {
    params: {
      ...(search ? { search } : {}),
      page,
      perPage,
    },
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await axios.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  return response.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const response = await axios.delete(`${"/notes"}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  return response.data;
};