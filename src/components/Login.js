import {
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  provider
} from "../services/firebase";

export default function Login() {

  async function loginGoogle() {

    try {

      await signInWithPopup(
        auth,
        provider
      );

    } catch (err) {

      console.error(err);

      alert(
        "Erro ao entrar 😢"
      );
    }
  }

  return (

    <div className="login-wrapper">

      <div className="login-box">

        <h2>
          Entre Pessoas
        </h2>

        <p>
          memórias e silêncios compartilhados
        </p>

        <button
          className="google-btn"
          onClick={loginGoogle}
        >
          Entrar com Google
        </button>

      </div>

    </div>
  );
}