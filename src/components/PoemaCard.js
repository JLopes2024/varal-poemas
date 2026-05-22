import { useState } from "react";

export default function PoemaCard({ poema }) {
  const [aberto, setAberto] = useState(false);
  const [likes, setLikes] = useState(poema.likes || 0);

  function curtir(e) {
    e.stopPropagation();
    setLikes((prev) => prev + 1);
  }

  return (
    <>
      <div className="item">
        <div className="pregador"></div>

        <div
          className="card"
          style={{ backgroundColor: poema.cor || "#fff" }}
          onClick={() => setAberto(true)}
        >
          <div className="conteudo">
            <h3 className="titulo">{poema.titulo || "Sem título"}</h3>

            <p className="texto-preview">{poema.texto}</p>

            <span className="autor">— {poema.autor || "Anônimo"}</span>

            <button className="like" onClick={curtir}>
              ❤️ {likes}
            </button>
          </div>
        </div>
      </div>

      {aberto && (
        <div className="modal" onClick={() => setAberto(false)}>
          <div
            className="modal-content"
            style={{ backgroundColor: poema.cor || "#fff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{poema.titulo}</h2>
            <p>{poema.texto}</p>
            <strong>— {poema.autor}</strong>
          </div>
        </div>
      )}
    </>
  );
}