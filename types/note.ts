export interface Note { 
  updatedAt: string; // Дата ласт обновы
  id: number;
  createdAt: string; // Дата создания
  content: string; // Текст заметок
  title: string; // Заголовок заметки
 
  tag: NoteTag;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";