import { useState } from "react";
import Produtos from "../Produtos/Produtos";
import ProdutoForm from "../components/ProdutoForm/ProdutoForm"; // ajuste o caminho se necessário
import styles from "./Dashboard.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

export default function Dashboard({ onLogout }) {
    const [mostrarForm, setMostrarForm] = useState(false);

    const logout = async () => {
        try {
            await signOut(auth);
            onLogout(false);
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.titulo}>Painel Admin</h2>
                <div className={styles.botoes}>
                    <button
                        className={styles.botaoAdicionar}
                        onClick={() => setMostrarForm(!mostrarForm)}
                    >
                        {mostrarForm ? "Fechar Formulário" : "Adicionar Produto"}
                    </button>
                    <button className={styles.botaoLogout} onClick={logout}>
                        Sair
                    </button>
                </div>
            </div>

            {/* Só mostra o form se clicar no botão */}
            {mostrarForm && <ProdutoForm onAdd={() => window.location.reload()} />}

            <Produtos />
        </div>
    );
}
