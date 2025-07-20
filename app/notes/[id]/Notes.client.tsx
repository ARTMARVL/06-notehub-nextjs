"use client";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "../NotesPage.module.css";
import NoteModal from "@/components/NoteModal/NoteModal";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes, NotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useDebounce } from "use-debounce";

interface NotesClientProps {
  initialData: NotesResponse;
}

export default function NotesClient({initialData}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [debounceQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery<NotesResponse>({
    queryKey: ["notes", debounceQuery, currentPage],
    queryFn: () => fetchNotes(debounceQuery, currentPage),
    placeholderData: keepPreviousData,
    initialData,
  });

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={searchQuery} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {isOpenModal && <NoteModal onClose={closeModal} />}
      </header>
      {data && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}