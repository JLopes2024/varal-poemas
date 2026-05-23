import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PoemaCard({ poema }) {
  const [aberto, setAberto] = useState(false);
  const [likes, setLikes] = useState(poema.likes || 0);

  function curtir(e) {
    e.stopPropagation();
    setLikes((prev) => prev + 1);
  }

  const corBase = poema.cor || "#fff9dc";

  const estiloCard = {
    background: `linear-gradient(135deg, ${corBase}, #ffffff40)`
  };

  // rotação aleatória suave
  const rotacao = Math.random() * 6 - 3;

  return (
    <>
      <motion.div
        className="item"
        initial={{
          opacity: 0,
          y: 40,
          rotate: rotacao
        }}
        animate={{
          opacity: 1,
          y: 0,
          rotate: rotacao
        }}
        transition={{
          duration: 0.5
        }}
        whileHover={{
          scale: 1.03,
          rotate: rotacao + 1
        }}
      >
        <div className="pregador"></div>

        <motion.div
          className="card"
          style={estiloCard}
          onClick={() => setAberto(true)}
          animate={{
            rotate: [rotacao, rotacao + 1, rotacao]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="conteudo">
            <h3 className="titulo">
              {poema.titulo || "Sem título"}
            </h3>

            <p className="texto-preview">
              {poema.texto}
            </p>

            <span className="autor">
              — {poema.autor || "Anônimo"}
            </span>

            <button
              className="like"
              onClick={curtir}
            >
              ❤️ {likes}
            </button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {aberto && (
          <motion.div
            className="modal"
            onClick={() => setAberto(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              style={{
                background: `linear-gradient(
                  135deg,
                  ${corBase},
                  #ffffff
                )`
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{
                scale: 0.8,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              exit={{
                scale: 0.8,
                opacity: 0
              }}
              transition={{
                duration: 0.3
              }}
            >
              <h2>{poema.titulo}</h2>

              <p>{poema.texto}</p>

              <strong>
                — {poema.autor}
              </strong>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}