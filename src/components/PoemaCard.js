import { useState, useEffect } from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import { db } from "../services/firebase";

import {
  doc,
  updateDoc,
  increment
} from "firebase/firestore";

export default function PoemaCard({ poema }) {

  const [aberto, setAberto] =
    useState(false);

  const [likes, setLikes] =
    useState(poema.likes || 0);

  const [textoVisivel, setTextoVisivel] =
    useState("");

  const corBase =
    poema.cor || "#fff9dc";

  const estiloCard = {
    background: `
      linear-gradient(
        135deg,
        ${corBase},
        #ffffff40
      )
    `
  };

  const rotacao =
    Math.random() * 6 - 3;

  async function curtir(e) {

    e.stopPropagation();

    try {

      setLikes((prev) => prev + 1);

      const ref = doc(
        db,
        "posts",
        poema.id
      );

      await updateDoc(ref, {
        likes: increment(1)
      });

    } catch (err) {

      console.error(err);
    }
  }

  // ✨ efeito máquina de escrever
  useEffect(() => {

    if (!aberto) return;

    setTextoVisivel("");

    let i = 0;

    const texto = poema.texto || "";

    const intervalo = setInterval(() => {

      setTextoVisivel(
        texto.slice(0, i)
      );

      i++;

      if (i > texto.length) {
        clearInterval(intervalo);
      }

    }, 18);

    return () =>
      clearInterval(intervalo);

  }, [aberto, poema.texto]);

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

          onClick={() =>
            setAberto(true)
          }

          animate={{
            rotate: [
              rotacao,
              rotacao + 1,
              rotacao
            ]
          }}

          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >

          <div className="conteudo">

            {poema.categoria && (
              <div className="categoria">
                {poema.categoria}
              </div>
            )}

            {/* 🔥 TÍTULO SECRETO */}
            <h3 className="titulo">

              {likes >= 5
                ? (poema.titulo || "Sem título")
                : "Título Secreto"}

            </h3>

            {/* 🔥 TEXTO PARCIAL */}
            <p className="texto-preview">

              {likes >= 5
                ? poema.texto
                : `${poema.texto.slice(0, 90)}...`}

            </p>

            {/* 🔥 AUTOR SECRETO */}
            <span className="autor">

              {likes >= 5
                ? `— ${poema.autor}`
                : "— Poeta Secreto"}

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

            onClick={() =>
              setAberto(false)
            }

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}
          >

            <motion.div
              className="modal-content"

              style={{
                background: `
                  linear-gradient(
                    135deg,
                    ${corBase},
                    #ffffff
                  )
                `
              }}

              onClick={(e) =>
                e.stopPropagation()
              }

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

              {poema.categoria && (
                <div className="categoria-modal">
                  {poema.categoria}
                </div>
              )}

              {/* 🔥 TÍTULO SECRETO NO MODAL */}
              <h2>

                {likes >= 5
                  ? poema.titulo
                  : "Título Secreto"}

              </h2>

              {/* ✨ TEXTO COM MÁQUINA */}
              <p className="texto-modal">
                {textoVisivel}
              </p>

              <motion.div
                initial={{
                  opacity: 0
                }}

                animate={{
                  opacity: 1
                }}

                transition={{
                  delay: 1.2
                }}
              >

                {/* ✨ ASSINATURA */}
                <div className="assinatura">

                  {likes >= 5
                    ? `— ${poema.autor}`
                    : "— Poeta Secreto"}

                </div>

              </motion.div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}