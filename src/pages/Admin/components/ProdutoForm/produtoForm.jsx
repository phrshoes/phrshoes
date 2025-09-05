import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import styles from "./produtoForm.module.css";

export default function ProdutoForm({ onAdd }) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [tamanhos, setTamanhos] = useState("");
    const [link, setLink] = useState("");
    const [imagemurl, setimagemurl] = useState(""); // agora é só link
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagemurl) {
            alert("Insira o link de uma imagem!");
            return;
        }

        setCarregando(true);

        try {
            const tamanhosArray = tamanhos.split(",").map((t) => t.trim());

            // Salva no Firestore
            await addDoc(collection(db, "produtos"), {
                nome,
                preco: parseFloat(preco),
                tamanhos: tamanhosArray,
                imagemurl, // salva direto o link informado
                link,
            });

            // Limpa o formulário
            setNome("");
            setPreco("");
            setTamanhos("");
            setLink("");
            setimagemurl("");

            onAdd();
        } catch (err) {
            console.error("Erro ao adicionar produto:", err);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text"
                placeholder="Nome do produto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
            <input
                className={styles.input}
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
            />
            <input
                className={styles.input}
                type="text"
                placeholder="Tamanhos (ex: 38,39,40)"
                value={tamanhos}
                onChange={(e) => setTamanhos(e.target.value)}
                required
            />
            <input
                className={styles.input}
                type="url"
                placeholder="Link de detalhes (opcional)"
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <input
                className={styles.input}
                type="url"
                placeholder="Link da imagem"
                value={imagemurl}
                onChange={(e) => setimagemurl(e.target.value)}
                required
            />
            <button className={styles.botao} type="submit" disabled={carregando}>
                {carregando ? "Carregando..." : "Adicionar Produto"}
            </button>
        </form>
    );
}
