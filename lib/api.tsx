import axios from 'axios';
import { Note, NewNoteContent } from '@/types/note';



axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export const fetchNotes = async (search: string = '', page: number = 1): Promise<FetchNotesResponse> => {
  try {
    const params: FetchNotesParams = {
      page,
      perPage: 12,
      ...(search.trim() && { search: search.trim() })
    };

    const response = await axios.get<FetchNotesResponse>('/notes', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  try {
    const response = await axios.get<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (note: NewNoteContent): Promise<Note> => {
  try {
    const response = await axios.post<Note>('/notes', note);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/notes/${id}`);
  } catch (error) {
    throw error;
  }
};