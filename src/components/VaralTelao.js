import { useEffect, useRef } from "react";
import Varal from "./Varal";

export default function VaralTelao() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame;
    const velocidade = 0.35; // Altere aqui para deixar mais rápido ou devagar

    function autoScroll() {
      container.scrollTop += velocidade;

      // O segredo do scroll infinito perfeito:
      // Quando passar exatamente da metade do conteúdo (fim do primeiro Varal),
      // nós voltamos para o topo sem que ninguém perceba, mantendo a ilusão.
      const metadeAltura = container.scrollHeight / 2;
      
      if (container.scrollTop >= metadeAltura) {
        container.scrollTop = 0;
      }

      animationFrame = requestAnimationFrame(autoScroll);
    }

    // Monitora quando os posts carregam do Firebase e mudam o tamanho da tela
    const resizeObserver = new ResizeObserver(() => {
      // Se o conteúdo for maior que a tela, inicia ou reinicia a animação
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(autoScroll);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="telao">
      <div className="telao-overlay"></div>

      {/* HERO */}
      <div className="telao-hero">
        <div className="telao-brand">
          <h1>Entre Pessoas</h1>
          <p>memórias e silêncios compartilhados</p>
        </div>
      </div>

      {/* SCROLL INFINITO */}
      <div
        className="varal-scroll-container"
        ref={scrollRef}
        style={{ overflowY: "auto", height: "100%" }} // Garante que o container permita scroll no CSS
      >
        <div className="scroll">
          <Varal />

          {/* DUPLICAÇÃO */}
          {/* Cria a ilusão de continuidade perfeita */}
          <Varal />
        </div>
      </div>

      <div className="instalacao-info">
        instalação digital interativa
      </div>
    </div>
  );
}
