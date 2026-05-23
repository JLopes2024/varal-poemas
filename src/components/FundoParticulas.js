import Particles from "react-tsparticles";

export default function FundoParticulas() {
  return (
    <Particles
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },

        background: {
          color: "transparent"
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 35
          },

          color: {
            value: [
              "#ffffff",
              "#ffe8a3",
              "#ffd6d6"
            ]
          },

          opacity: {
            value: 0.25,
            random: true
          },

          size: {
            value: {
              min: 1,
              max: 4
            }
          },

          move: {
            enable: true,
            speed: 0.4,
            direction: "none",
            random: true,
            outModes: {
              default: "out"
            }
          },

          links: {
            enable: false
          }
        },

        detectRetina: true
      }}
    />
  );
}