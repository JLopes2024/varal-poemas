import { useEffect, useState } from "react";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {
  auth
} from "./services/firebase";

import VaralTelao from "./components/VaralTelao";
import UploadForm from "./components/UploadForm";
import Login from "./components/Login";

import "./styles/global.css";

export default function App() {

  const [telao, setTelao] =
    useState(false);

  const [usuario, setUsuario] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          setUsuario(user);

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, []);

  function entrarFullscreen() {

    if (
      document.documentElement
        .requestFullscreen
    ) {

      document.documentElement
        .requestFullscreen()
        .catch(console.error);
    }
  }

  function entrarModoMuseu() {

    setTelao(true);

    setTimeout(() => {

      entrarFullscreen();

    }, 100);
  }

  function sairModoMuseu() {

    setTelao(false);

    if (document.fullscreenElement) {

      document.exitFullscreen();
    }
  }

  async function logout() {

    await signOut(auth);
  }

  if (loading) {

    return (
      <div className="loading">
        carregando...
      </div>
    );
  }

  /* 🔒 SEM LOGIN */

  if (!usuario) {

    return <Login />;
  }

  /* 🎥 TELÃO */

  if (telao) {

    return (
      <VaralTelao
        fecharTelao={sairModoMuseu}
      />
    );
  }

  return (

    <div className="page">

      <header className="hero">

        <div className="hero-content">

          <h1>
            Entre Pessoas
          </h1>

          <p className="subtitulo">
            memórias e silêncios compartilhados
          </p>

        </div>

      </header>

      <button
        className="btn-museu"
        onClick={entrarModoMuseu}
      >
        ✨ Entrar no modo museum
      </button>

      <button
        className="btn-museu"
        onClick={logout}
      >
        sair
      </button>

      <UploadForm />
    </div>
  );
}