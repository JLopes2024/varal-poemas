import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { db } from "../services/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

export default function PoemaCard({ poema }) {
  const [aberto, setAberto] = useState(false);
  const [likes, setLikes] = useState(poema.likes || 0);
  const [textoVisivel, setTextoVisivel] = useState("");

  const corBase = poema.cor || "#fff9dc";

  const rotacao = useMemo(() => Math.random() * 2 - 1, []);
  const startTimeRef = useRef(null);

  const estiloCard = useMemo(
    () => ({
      background: `linear-gradient(135deg, ${corBase}, #ffffff40)`
    }),
    [corBase]
  );

  const desbloqueado = likes >= 5;

  // ❤️ LIKE
  async function curtir(e) {
    e.stopPropagation();

    try {
      setLikes((prev) => prev + 1);

      await updateDoc(doc(db, "posts", poema.id), {
        likes: increment(1)
      });
    } catch (err) {
      console.error(err);
      setLikes((prev) => Math.max(prev - 1, 0));
    }
  }

  // 👁️ ABRIR POEMA (TRACKING INÍCIO)
  function abrirPoema() {
    setAberto(true);

    startTimeRef.current = Date.now();

    updateDoc(doc(db, "posts", poema.id), {
      opens: increment(1)
    }).catch(console.error);
  }

  // ⏱️ FECHAR POEMA (TRACKING TEMPO)
  async function fecharPoema() {
    setAberto(false);

    if (startTimeRef.current) {
      const duration = Date.now() - startTimeRef.current;

      try {
        await updateDoc(doc(db, "posts", poema.id), {
          totalViewTime: increment(duration),
          lastOpenedAt: Date.now()
        });
      } catch (err) {
        console.error(err);
      }

      startTimeRef.current = null;
    }
  }

  // ✨ máquina de escrever
  useEffect(() => {
    if (!aberto) return;

    let i = 0;
    const texto = poema.texto || "";
    setTextoVisivel("");

    const interval = setInterval(() => {
      setTextoVisivel(texto.slice(0, i));
      i++;

      if (i > texto.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [aberto, poema.texto]);

  // 👁️ presença contínua (opcional - museu vivo)
  useEffect(() => {
    if (!aberto) return;

    const interval = setInterval(() => {
      updateDoc(doc(db, "posts", poema.id), {
        views: increment(1)
      }).catch(() => {});
    }, 5000);

    return () => clearInterval(interval);
  }, [aberto, poema.id]);

  return (
    <>
      <motion.div
        className="item"
        initial={{ opacity: 0, y: 40, rotate: rotacao }}
        animate={{ opacity: 1, y: 0, rotate: rotacao }}
        transition={{ duration: 0.8 }}
      >
        <div className="pregador" />

        <motion.div
          className="card"
          style={estiloCard}
          onClick={abrirPoema}
          animate={{ rotate: [rotacao, rotacao + 0.5, rotacao] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className="conteudo">
            {poema.categoria && (
              <div className="categoria">{poema.categoria}</div>
            )}

            <h3 className="titulo">
              {desbloqueado ? poema.titulo : "Título Secreto"}
            </h3>

            <p className="texto-preview">
              {desbloqueado
                ? poema.texto
                : `${poema.texto?.slice(0, 90)}...`}
            </p>

            <span className="autor">
              {desbloqueado ? `— ${poema.autor}` : "— Poeta Secreto"}
            </span>

            <button className="like" onClick={curtir}>
              ❤️ {likes}
            </button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {aberto && (
          <motion.div
            className="modal"
            onClick={fecharPoema}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              style={{
                background: `linear-gradient(135deg, ${corBase}, #fff)`
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              {poema.categoria && (
                <div className="categoria-modal">
                  {poema.categoria}
                </div>
              )}

              <h2>
                {desbloqueado ? poema.titulo : "Título Secreto"}
              </h2>

              <p className="texto-modal">{textoVisivel}</p>

              <div
                className="assinatura"
                style={{
                  opacity: textoVisivel.length > 10 ? 1 : 0
                }}
              >
                {desbloqueado ? `— ${poema.autor}` : "— Poeta Secreto"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}