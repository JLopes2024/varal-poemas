import { useState } from "react";

import Varal from "./components/Varal";
import VaralTelao from "./components/VaralTelao";
import UploadForm from "./components/UploadForm";

import "./styles/global.css";

export default function App() {
  const [telao, setTelao] = useState(false);

  function entrarFullscreen() {
    document.documentElement.requestFullscreen();
  }

  if (telao) {
    return <VaralTelao />;
  }

  return (
    <div className="page">
      {/* HERO */}
      <header className="hero">
        <div className="hero-content">
          <h1>Entre Pessoas</h1>

          <p className="subtitulo">
            memórias e silêncios compartilhados
          </p>
        </div>
      </header>

      {/* BOTÃO MUSEU */}
      <button
        className="btn-museu"
        onClick={() => {
          setTelao(true);
          entrarFullscreen();
        }}
      >
        ✨ Entrar no modo museu
      </button>

      {/* FORM */}
      <UploadForm />

      {/* VARAL */}
      <Varal />
    </div>
  );
}