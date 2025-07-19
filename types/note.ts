export interface Note {
  id: number;
  title: string; // Заголовок замет
  content: string; // Текст замет
  createdAt: string; // Дата публикаций
  updatedAt: string; // Дата ласт обновы
  tag: string;
}

export interface NewNoteContent {
  title: string;
  content?: string;
  tag: Tag;
}



export type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';