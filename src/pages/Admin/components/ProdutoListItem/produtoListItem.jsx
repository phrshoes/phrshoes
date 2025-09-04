import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import styles from "./ProdutoListItem.module.css";

export default function ProdutoListItem({ produto, onRemove, onUpdate }) {
    const [editando, setEditando] = useState(false);
    const [nome, setNome] = useState(produto.nome);
    const [preco, setPreco] = useState(produto.preco);
    const [tamanhos, setTamanhos] = useState(produto.tamanhos.join(","));
    const [imagemFile, setImagemFile] = useState(null);
    const [carregando, setCarregando] = useState(false);

    // Função para upload de imagem no Cloudinary
    const uploadImagem = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "mvqrytex");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/mvqrytex/image/upload",
            { method: "POST", body: data }
        );
        const imagemData = await res.json();
        return imagemData.secure_url;
    };

    const handleUpdate = async () => {
        setCarregando(true);
        let url = produto.imagemUrl;

        try {
            if (imagemFile) {
                url = await uploadImagem(imagemFile);
            }

            const tamanhosArray = tamanhos.split(",").map(t => t.trim());

            await updateDoc(doc(db, "produtos", produto.id), {
                nome,
                preco: parseFloat(preco),
                tamanhos: tamanhosArray,
                imagemUrl: url,
            });

            setEditando(false);
            onUpdate();
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
        } finally {
            setCarregando(false);
        }
    };

    const handleDelete = async () => {
        if (confirm("Tem certeza que deseja remover este produto?")) {
            await deleteDoc(doc(db, "produtos", produto.id));
            onRemove(produto.id);
        }
    };

    return (
        <li className={styles.item}>
            {editando ? (
                <div className={styles.editContainer}>
                    <input
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="number"
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        value={tamanhos}
                        onChange={e => setTamanhos(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setImagemFile(e.target.files[0])}
                        className={styles.input}
                    />
                    <button
                        onClick={handleUpdate}
                        disabled={carregando}
                        className={styles.botaoEditar}
                    >
                        {carregando ? "Salvando..." : "Salvar"}
                    </button>
                    <button
                        onClick={() => setEditando(false)}
                        className={styles.botaoRemover}
                    >
                        Cancelar
                    </button>
                </div>
            ) : (
                <div className={styles.viewContainer}>
                    <span>{produto.nome} - R$ {produto.preco.toFixed(2)}</span>
                    <span>Tamanhos: {produto.tamanhos.join(", ")}</span>
                    <div className={styles.buttons}>
                        <button onClick={() => setEditando(true)} className={styles.botaoEditar}>Editar</button>
                        <button onClick={handleDelete} className={styles.botaoRemover}>Remover</button>
                    </div>
                </div>
            )}
        </li>
    );
}
