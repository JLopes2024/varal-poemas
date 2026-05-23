import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const paletaCores = [
  "#FDD166", "#FFD6A5", "#FFB4A2", "#F7A8B8",
  "#A3D8F4", "#BDE0FE", "#CDEAC0", "#B8F2E6",
  "#C3F584", "#D6B3FF", "#E7C6FF", "#FFC6FF"
];

export default function UploadForm() {
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    texto: "",
    categoria: "",
    cor: "#FDD166"
  });

  const [loading, setLoading] = useState(false);

  const previewStyle = useMemo(
    () => ({
      background: `linear-gradient(135deg, ${form.cor}, ${form.cor}99, #ffffff30)`
    }),
    [form.cor]
  );

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function enviarPoema(e) {
    e.preventDefault();

    if (!form.titulo || !form.autor || !form.texto) {
      alert("Preencha tudo 😄");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "posts"), {
        ...form,
        likes: 0,
        createdAt: serverTimestamp()
      });

      setForm({
        titulo: "",
        autor: "",
        texto: "",
        categoria: "",
        cor: "#FDD166"
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar 😢");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-wrapper">
      <form onSubmit={enviarPoema} className="form">
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} />
        <input name="autor" placeholder="Autor" value={form.autor} onChange={handleChange} />
        <textarea name="texto" placeholder="Poema..." value={form.texto} onChange={handleChange} />

        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="">Emoção do poema</option>
          <option value="🌤 Esperança">🌤 Esperança</option>
          <option value="🌙 Saudade">🌙 Saudade</option>
          <option value="🔥 Intensidade">🔥 Intensidade</option>
          <option value="🌧 Vulnerabilidade">🌧 Vulnerabilidade</option>
          <option value="🌱 Recomeço">🌱 Recomeço</option>
          <option value="☁️ Reflexão">☁️ Reflexão</option>
        </select>

        <div className="paleta">
          {paletaCores.map((c) => (
            <div
              key={c}
              className="cor-bolinha"
              onClick={() => setForm((p) => ({ ...p, cor: c }))}
              style={{
                backgroundColor: c,
                border: form.cor === c ? "2px solid #000" : "none"
              }}
            />
          ))}
        </div>

        <button disabled={loading}>
          {loading ? "Pendurando..." : "Pendurar poema"}
        </button>
      </form>

      <motion.div className="preview-live" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="item">
          <div className="pregador" />

          <motion.div
            className="card"
            style={previewStyle}
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <div className="conteudo">
              <h3>{form.titulo || "Seu título"}</h3>
              <p>{form.texto || "Seu poema aparecerá aqui..."}</p>
              <span>— {form.autor || "Autor"}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}