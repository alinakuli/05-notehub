import css from './NoteForm.module.css';
import { ErrorMessage, useFormik } from 'formik';
import type { CreateNoteInput } from '../../types/note.ts';
import * as Yup from "yup";
import { createNote } from '../../services/noteService.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm(props: NoteFormProps) {
  const { onClose } = props;

  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title is too long")
      .required("Title is required"),
    content: Yup.string()
      .max(500, "Content is too long"),
    tag: Yup.string()
    .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Invalid tag"
    )
    .required("Tag is required"),
  });
  
  const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: createNote,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  },
});



  const formik = useFormik<CreateNoteInput>({
    initialValues: {
      title: '',
      content: '',
      tag: "Todo",
    },
    validationSchema: Schema,
  onSubmit: async (values, { resetForm }) => {
  try {
    await mutation.mutateAsync(values);
    resetForm();
    onClose();
  } catch (error) {
    console.error(error);
  }
},
  });

  return (
    <>
    <form className={css.form} onSubmit={formik.handleSubmit}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <input id="title" type="text" name="title" className={css.input} value={formik.values.title} onChange={formik.handleChange} />
    <ErrorMessage
  name="title"
  component="div"
  className={css.error}
/>
  {formik.touched.title && formik.errors.title}
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
      value={formik.values.content}
      onChange={formik.handleChange}
    />
    <ErrorMessage
  name="content"
  component="div"
  className={css.error}
/>
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select id="tag" name="tag" className={css.select} value={formik.values.tag} onChange={formik.handleChange}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
    <ErrorMessage
  name="tag"
  component="div"
  className={css.error}
/>
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={onClose}>
      Cancel
    </button>
    <button
            type="submit"
            className={css.submitButton}
            disabled={formik.isSubmitting}
    >
      Create note
    </button>
  </div>
      </form>
      </>
  );
}
