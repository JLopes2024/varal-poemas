import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const paletaCores = [
  // 🌞 tons quentes suaves
  "#FDD166",
  "#FFD6A5",
  "#FFB4A2",
  "#F7A8B8",
  "#FFADAD",

  // 🌊 tons frios suaves
  "#A3D8F4",
  "#BDE0FE",
  "#CDEAC0",
  "#B8F2E6",

  // 🌸 tons pastel
  "#C3F584",
  "#D6B3FF",
  "#E7C6FF",
  "#F1C0E8",
  "#FFC6FF",

  // 🌿 verdes e naturais
  "#C7F9CC",
  "#80ED99",
  "#57CC99",
  "#D9ED92",

  // 🌌 tons mais fortes (destaque)
  "#90DBF4",
  "#48CAE4",
  "#A0C4FF",
  "#BDB2FF",
];
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

      {/* 🎨 PALETA DE CORES RÁPIDA */}
      <div className="paleta">
        {paletaCores.map((c) => (
          <div
            key={c}
            onClick={() => setCor(c)}
            className="cor-bolinha"
            style={{
              backgroundColor: c,
              border: cor === c ? "2px solid #000" : "2px solid transparent",
            }}
          />
        ))}
      </div>

      {/* 🎛 opcional: ainda mantém o seletor manual */}
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