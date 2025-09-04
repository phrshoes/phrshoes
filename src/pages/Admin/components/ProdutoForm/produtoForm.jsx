import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import styles from "./produtoForm.module.css";

export default function ProdutoForm({ onAdd }) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [tamanhos, setTamanhos] = useState("");
    const [linkDetalhes, setLinkDetalhes] = useState(""); // NOVO CAMPO
    const [imagemFile, setImagemFile] = useState(null);
    const [carregando, setCarregando] = useState(false);

    // Função para enviar a imagem para o Cloudinary
    const uploadImagem = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "mvqrytex");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dibgryyer/image/upload",
            {
                method: "POST",
                body: data,
            }
        );

        const imagemData = await res.json();
        return imagemData.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagemFile) {
            alert("Selecione uma imagem!");
            return;
        }

        setCarregando(true);

        try {
            const url = await uploadImagem(imagemFile);

            const tamanhosArray = tamanhos.split(",").map(t => t.trim());

            // Salva no Firestore
            await addDoc(collection(db, "produtos"), {
                nome,
                preco: parseFloat(preco),
                tamanhos: tamanhosArray,
                imagemUrl: url,
                linkDetalhes // salva o link
            });

            // Limpa o formulário
            setNome("");
            setPreco("");
            setTamanhos("");
            setLinkDetalhes(""); // limpa o campo também
            setImagemFile(null);

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
                value={linkDetalhes}
                onChange={(e) => setLinkDetalhes(e.target.value)}
            />
            <input
                className={styles.input}
                type="file"
                accept="image/*"
                onChange={(e) => setImagemFile(e.target.files[0])}
                required
            />
            <button className={styles.botao} type="submit" disabled={carregando}>
                {carregando ? "Carregando..." : "Adicionar Produto"}
            </button>
        </form>
    );
}
