import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function UploadForm() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [cor, setCor] = useState("#FDD166");

  async function enviarPoema(e) {
    e.preventDefault();

    if (!titulo || !autor || !texto) {
      alert("Preencha tudo 😄");
      return;
    }

    await addDoc(collection(db, "posts"), {
      titulo,
      autor,
      texto,
      cor,
      now: serverTimestamp()
    });

    setTitulo("");
    setAutor("");
    setTexto("");
  }

  return (
    <form onSubmit={enviarPoema} className="form">
      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />

      <textarea
        placeholder="Poema..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <input
        type="color"
        value={cor}
        onChange={(e) => setCor(e.target.value)}
      />

      <button>Enviar</button>
    </form>
  );
}