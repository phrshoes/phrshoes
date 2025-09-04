import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import styles from "./Login.module.css";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const login = async () => {
        setErro("");
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            onLogin(true);
        } catch (error) {
            setErro("Email ou senha incorretos");
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Login</h2>
            <input
                className={styles.input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className={styles.input}
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <button className={styles.botao} onClick={login}>
                Entrar
            </button>
            {erro && <p className={styles.erro}>{erro}</p>}
        </div>
    );
}
