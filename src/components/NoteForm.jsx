import React, { useState } from "react";

function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const maxChar = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return;
    addNote(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="char-limit">
        <p>Sisa karakter: {maxChar - title.length}</p>
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) =>
          e.target.value.length <= maxChar && setTitle(e.target.value)
        }
        placeholder="Ini adalah judul ..."
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Tuliskan catatanmu di sini ..."
      />
      <button type="submit">Buat</button>
    </form>
  );
}

export default NoteForm;
