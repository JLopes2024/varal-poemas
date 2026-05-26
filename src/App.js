import { useState } from "react";
import VaralTelao from "./components/VaralTelao";
import UploadForm from "./components/UploadForm";

import "./styles/global.css";

export default function App() {
  const [telao, setTelao] = useState(false);

  function entrarFullscreen() {
    // Verifica se o navegador suporta e se já não está em fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Erro ao ativar tela cheia:", err);
      });
    }
  }

  function lidarComAcessoAoMuseu() {
    // Define a senha que você deseja usar na aula
    const senhaCorreta = "261549Jeff!"; 
    
    // Abre uma caixinha de texto na tela do usuário
    const senhaDigitada = prompt("Digite a senha de moderador para acessar o Modo Museu:");

    // Se a senha estiver certa, libera o acesso
    if (senhaDigitada === senhaCorreta) {
      setTelao(true);
      // Um pequeno atraso garante que o navegador processe a mudança de tela antes do fullscreen
      setTimeout(entrarFullscreen, 100);
    } else if (senhaDigitada !== null) {
      // Se digitou errado (e não apenas clicou em "Cancelar")
      alert("Senha incorreta! Acesso negado. 🔒");
    }
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
        onClick={lidarComAcessoAoMuseu}
      >
        ✨ Entrar no modo museu
      </button>

      {/* FORM */}
      <UploadForm />
    </div>
  );
}
