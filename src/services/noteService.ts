import axios from "axios";
import type { Note } from "../types/note.ts"

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}


export async function fetchNotes(search: string, page: number): Promise<FetchNotesResponse> {
    const response = await axios.get<FetchNotesResponse>(
        `https://notehub-public.goit.study/api/notes`,
        {
            params: {
        search,
        page,
        perPage: 12,
        sortBy: 'created',
      },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            }
        }
    );

    return response.data;
}

export async function createNote(note: Note) {
  const response = await axios.post('https://notehub-public.goit.study/api/notes', note, {
            
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            }
        });
  return response.data;
};

export async function deleteNote(noteId: number) {
  const response = await axios.delete(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
}