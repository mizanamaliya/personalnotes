import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { getInitialData } from "./utils";

function App() {
  // Ambil data dari localStorage kalau ada, kalau nggak pakai initial data
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : getInitialData();
  });

  const [query, setQuery] = useState("");

  // Simpan setiap kali notes berubah
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (title, body) => {
    const newNote = {
      id: +new Date(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    // Tambah catatan di atas
    setNotes([newNote, ...notes]);
  };

  // filter catatan aktif
  const filteredActiveNotes = notes.filter(
    (n) =>
      !n.archived &&
      n.title.toLowerCase().includes(query.toLowerCase())
  );

  // filter catatan arsip
  const filteredArchivedNotes = notes.filter(
    (n) =>
      n.archived &&
      n.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="main-title">Personal Notes</h1>

      <div className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Cari catatan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <NoteForm addNote={addNote} />

      <h2 className="section-title">Catatan Aktif</h2>
      <NoteList
        notes={filteredActiveNotes}
        onDelete={(id) => setNotes(notes.filter((n) => n.id !== id))}
        onArchive={(id) =>
          setNotes(
            notes.map((n) =>
              n.id === id ? { ...n, archived: !n.archived } : n
            )
          )
        }
      />

      <h2 className="section-title">Arsip</h2>
      <NoteList
        notes={filteredArchivedNotes}
        onDelete={(id) => setNotes(notes.filter((n) => n.id !== id))}
        onArchive={(id) =>
          setNotes(
            notes.map((n) =>
              n.id === id ? { ...n, archived: !n.archived } : n
            )
          )
        }
      />
    </div>
  );
}

export default App;
