import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Перехватчик для добавления токена
axiosInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error('API token is missing');
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

interface FetchParams {
  search?: string;
  page?: number;
  per_page?: number;
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

// Получение списка заметок
export const fetchNotes = async (
  page = 1,
  perPage = 10,
  search = ''
): Promise<NotesResponse> => {
  try {
    const params: FetchParams = {
      ...(search.trim() && { search: search.trim() }),
      page,
      per_page: perPage
    };

    const res = await axiosInstance.get<NotesResponse>('/notes', { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error('Access denied. Check your token permissions.');
      }
      throw new Error(`API error: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('Network error. Please try again later.');
  }
};

// Получение конкретной заметки
export const fetchNoteById = async (id: number): Promise<Note> => {
  try {
    const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch note');
    }
    throw new Error('Network error while fetching note');
  }
};

// Создание новой заметки (эта функция отсутствовала)
export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  try {
    const { data } = await axiosInstance.post<Note>('/notes', note);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create note');
    }
    throw new Error('Network error while creating note');
  }
};

// Удаление заметки
export const deleteNote = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/notes/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete note');
    }
    throw new Error('Network error while deleting note');
  }
};