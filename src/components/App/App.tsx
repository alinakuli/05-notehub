// import { useState } from 'react'
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import {  useQuery, keepPreviousData } from '@tanstack/react-query'
import SearchBox from '../SearchBox/SearchBox.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import Modal from '../Modal/Modal.tsx';
import { StrictMode, useEffect, useState } from 'react';
import { fetchNotes } from '../../services/noteService.ts';
import NoteList from '../NoteList/NoteList.tsx';
import { useDebouncedCallback } from 'use-debounce';
import NoteForm from '../NoteForm/NoteForm.tsx';

export default function App() {
  const noResults = () => toast('No notes found for your request.');
  
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, isSuccess} = useQuery(
    {
      queryKey: ['notes', search, page],
      queryFn: () => fetchNotes(search, page),
      placeholderData: keepPreviousData,
    }
  );

  const updateSearchQuery = useDebouncedCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  },
  300
);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (isSuccess && notes.length === 0) {
      noResults();
    }
  }, [isSuccess, notes.length]);

  const handleCreateNote = () => {
    setIsModalOpen(true);
  }

  const onClose = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
  if (isLoading) toast('Loading notes...');
  }, [isLoading]);

  useEffect(() => {
  if (isError) toast('Error fetching notes.');
  }, [isError]);


    return (
      <StrictMode>
        <div className={css.app}>
        
          <header className={css.toolbar}>
          
            <SearchBox onChange={updateSearchQuery} />
            {totalPages > 1 && (
              <Pagination
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←" />
            )}

            <button className={css.button} onClick={handleCreateNote}>Create note +</button>
          </header>

          {isModalOpen && (<Modal onClose={onClose}>
              <NoteForm onClose={onClose} />
            </Modal>)}
          {notes.length > 0 ? <NoteList
  notes={notes}
/> : null}
        </div>
        <Toaster />
      
      </StrictMode>
    )
  }

