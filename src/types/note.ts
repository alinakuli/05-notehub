export interface Note {
    id: string,
    title: string,
    content: string,
    createdAt: Date;
    updatedAt: Date;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'
}

export type CreateNoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;