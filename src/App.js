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
      <h1>Varal de Poemas</h1>

      <button
        onClick={() => {
          setTelao(true);
          entrarFullscreen();
        }}
      >
        Modo Telão
      </button>

      <div className="form-area">
        <UploadForm />
      </div>

      <Varal />
    </div>
  );
}