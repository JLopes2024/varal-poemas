import { useEffect, useRef } from "react";

import Varal from "./Varal";

export default function VaralTelao() {

  const scrollRef = useRef(null);

  useEffect(() => {

    const container = scrollRef.current;

    if (!container) return;

    let animationFrame;

    const velocidade = 0.35;

    function autoScroll() {

      container.scrollTop += velocidade;

      // quando chegar no final
      // volta suavemente pro topo

      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 2
      ) {

        container.scrollTop = 0;
      }

      animationFrame =
        requestAnimationFrame(autoScroll);
    }

    animationFrame =
      requestAnimationFrame(autoScroll);

    return () =>
      cancelAnimationFrame(animationFrame);

  }, []);

  return (

    <div className="telao">

      <div className="telao-overlay"></div>

      {/* HERO */}

      <div className="telao-hero">

        <div className="telao-brand">

          <h1>
            Entre Pessoas
          </h1>

          <p>
            memórias e silêncios compartilhados
          </p>

        </div>

      </div>

      {/* SCROLL INFINITO */}

      <div
        className="varal-scroll-container"
        ref={scrollRef}
      >

        <div className="scroll">

          <Varal />

          {/* DUPLICAÇÃO */}
          {/* cria ilusão de continuidade */}

          <Varal />

        </div>

      </div>

      <div className="instalacao-info">
        instalação digital interativa
      </div>

    </div>
  );
}