import { useState, useMemo } from "react";
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
  "#A3D8F4",
  "#BDE0FE",
  "#CDEAC0",
  "#B8F2E6",
  "#C3F584",
  "#D6B3FF",
  "#E7C6FF",
  "#FFC6FF"
];

export default function UploadForm() {

  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    texto: "",
    categoria: "",
    cor: "#FDD166"
  });

  const [loading, setLoading] =
    useState(false);

  const previewStyle = useMemo(
    () => ({
      background: `
        linear-gradient(
          135deg,
          ${form.cor},
          ${form.cor}99,
          #ffffff30
        )
      `
    }),
    [form.cor]
  );

  function handleChange(e) {

    setForm((p) => ({
      ...p,
      [e.target.name]:
        e.target.value
    }));
  }

  async function enviarPoema(e) {

    e.preventDefault();

    // ✅ VALIDAÇÃO MELHORADA

    if (
      !form.titulo ||
      !form.autor ||
      !form.texto ||
      !form.categoria
    ) {

      alert(
        "Preencha todos os campos e escolha uma emoção ✨"
      );

      return;
    }

    try {

      setLoading(true);

      await addDoc(
        collection(db, "posts"),
        {
          ...form,
          likes: 0,
          createdAt:
            serverTimestamp()
        }
      );

      // reset

      setForm({
        titulo: "",
        autor: "",
        texto: "",
        categoria: "",
        cor: "#FDD166"
      });

    } catch (err) {

      console.error(err);

      alert(
        "Erro ao compartilhar memória 😢"
      );

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
          name="titulo"
          placeholder="Título"

          value={form.titulo}

          onChange={handleChange}
        />

        <input
          name="autor"
          placeholder="Seu nome"

          value={form.autor}

          onChange={handleChange}
        />

        {/* ✅ TROCA DE POEMA */}

        <textarea
          name="texto"

          placeholder="Escreva algo que ficou entre pessoas..."

          value={form.texto}

          onChange={handleChange}
        />

        <select
          name="categoria"

          value={form.categoria}

          onChange={handleChange}
        >

          <option value="">
            Escolha a emoção
          </option>

          <option value="🌤 Esperança">
            🌤 Esperança
          </option>

          <option value="🌙 Saudade">
            🌙 Saudade
          </option>

          <option value="🔥 Intensidade">
            🔥 Intensidade
          </option>

          <option value="🌧 Vulnerabilidade">
            🌧 Vulnerabilidade
          </option>

          <option value="🌱 Recomeço">
            🌱 Recomeço
          </option>

          <option value="☁️ Reflexão">
            ☁️ Reflexão
          </option>

        </select>

        <div className="paleta">

          {paletaCores.map((c) => (

            <div
              key={c}

              className="cor-bolinha"

              onClick={() =>
                setForm((p) => ({
                  ...p,
                  cor: c
                }))
              }

              style={{
                backgroundColor: c,

                border:
                  form.cor === c
                    ? "2px solid #000"
                    : "none"
              }}
            />

          ))}

        </div>

        <button disabled={loading}>

          {loading
            ? "Compartilhando..."
            : "Compartilhar memória"}

        </button>

      </form>

      {/* PREVIEW */}

      <motion.div
        className="preview-live"

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}
      >

        <div className="item">

          <div className="pregador" />

          <motion.div
            className="card"

            style={previewStyle}

            animate={{
              rotate: [-1, 1, -1]
            }}

            transition={{
              duration: 6,
              repeat: Infinity
            }}
          >

            <div className="conteudo">

              {form.categoria && (
                <div className="categoria">
                  {form.categoria}
                </div>
              )}

              <h3>
                {form.titulo ||
                  "Seu título"}
              </h3>

              <p>

                {form.texto ||

                  "Seu fragmento aparecerá aqui..."}

              </p>

              <span>

                — {form.autor || "Visitante"}

              </span>

            </div>

          </motion.div>

        </div>

      </motion.div>

    </div>
  );
}