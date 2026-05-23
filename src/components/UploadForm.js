import { useState } from "react";
import { motion } from "framer-motion";

import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

const paletaCores = [
  "#FDD166",
  "#FFD6A5",
  "#FFB4A2",
  "#F7A8B8",
  "#FFADAD",

  "#A3D8F4",
  "#BDE0FE",
  "#CDEAC0",
  "#B8F2E6",

  "#C3F584",
  "#D6B3FF",
  "#E7C6FF",
  "#F1C0E8",
  "#FFC6FF",

  "#C7F9CC",
  "#80ED99",
  "#57CC99",
  "#D9ED92",

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
      console.error(error);
      alert("Erro ao enviar 😢");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-wrapper">

      <form
        onSubmit={enviarPoema}
        className="form"
      >
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) =>
            setTitulo(e.target.value)
          }
        />

        <input
          placeholder="Autor"
          value={autor}
          onChange={(e) =>
            setAutor(e.target.value)
          }
        />

        <textarea
          placeholder="Poema..."
          value={texto}
          onChange={(e) =>
            setTexto(e.target.value)
          }
        />

        <div className="paleta">
          {paletaCores.map((c) => (
            <div
              key={c}
              onClick={() => setCor(c)}
              className="cor-bolinha"
              style={{
                backgroundColor: c,
                border:
                  cor === c
                    ? "2px solid #000"
                    : "2px solid transparent",
              }}
            />
          ))}
        </div>

        <button disabled={loading}>
          {loading
            ? "Pendurando..."
            : "Pendurar poema"}
        </button>
      </form>

      <motion.div
        className="preview-live"
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
      >
        <div className="preview-item">
          <div className="pregador"></div>

          <motion.div
            className="card preview-card"
            animate={{
              rotate: [-2, 1, -2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity
            }}
            style={{
              background: `
                linear-gradient(
                  135deg,
                  ${cor},
                  ${cor}99,
                  #ffffff30
                )
              `
            }}
          >
            <div className="conteudo">
              <h3 className="titulo">
                {titulo || "Seu título"}
              </h3>

              <p className="texto-preview">
                {texto ||
                  "Seu poema aparecerá aqui..."}
              </p>

              <span className="autor">
                — {autor || "Autor"}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}