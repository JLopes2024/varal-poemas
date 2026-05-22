import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function UploadForm() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [cor, setCor] = useState("#FDD166");
  const [loading, setLoading] = useState(false);

  async function enviarPoema(e) {
    e.preventDefault();

    if (!titulo || !autor || !texto) {
      alert("Preencha tudo 😄");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "posts"), {
        titulo,
        autor,
        texto,
        cor,
        createdAt: serverTimestamp(),
      });

      setTitulo("");
      setAutor("");
      setTexto("");
      setCor("#FDD166");

    } catch (error) {
      console.error("Erro ao enviar poema:", error);
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
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

      <button disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}