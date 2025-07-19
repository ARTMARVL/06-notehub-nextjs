'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';
import { NewNoteContent } from '@/types/note';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content must be at most 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

const initialValues: NewNoteContent = { title: '', content: '', tag: 'Todo'}
export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: NewNoteContent ) =>
      createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: NewNoteContent) =>
        mutation.mutate(values)
      }
    >
      <Form className={css.form}>
        <label>
          Title
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" className={css.error} />
        </label>

        <label>
          Content
          <Field as="textarea" name="content" />
          <ErrorMessage name="content" component="div" className={css.error} />
        </label>

        <label>
          Tag
          <Field as="select" name="tag">
            <option value="">Select tag</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={css.error} />
        </label>

        <button type="submit" disabled={mutation.isPending}>
          Create note
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
}