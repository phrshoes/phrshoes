import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import styles from "./produtoListItem.module.css";

export default function ProdutoListItem({ produto, onRemove, onUpdate }) {
    const [editando, setEditando] = useState(false);
    const [nome, setNome] = useState(produto.nome);
    const [preco, setPreco] = useState(produto.preco);
    const [tamanhos, setTamanhos] = useState(produto.tamanhos.join(","));
    const [link, setLink] = useState(produto.link || "");
    const [imagemurl, setimagemurl] = useState(produto.imagemurl || "");
    const [carregando, setCarregando] = useState(false);

    const handleUpdate = async () => {
        setCarregando(true);

        try {
            const tamanhosArray = tamanhos.split(",").map((t) => t.trim());

            await updateDoc(doc(db, "produtos", produto.id), {
                nome,
                preco: parseFloat(preco),
                tamanhos: tamanhosArray,
                link,
                imagemurl,
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
                    <h4 className={styles.textEdit}>Nome</h4>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className={styles.input}
                    />
                    <h4 className={styles.textEdit}>Preço</h4>
                    <input
                        type="number"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        className={styles.input}
                    />
                    <h4 className={styles.textEdit}>Tamanhos</h4>
                    <input
                        type="text"
                        value={tamanhos}
                        onChange={(e) => setTamanhos(e.target.value)}
                        className={styles.input}
                    />
                    <h4 className={styles.textEdit}>Link Detalhes</h4>
                    <input
                        type="url"
                        placeholder="Link dos detalhes"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className={styles.input}
                    />
                    <h4 className={styles.textEdit}>Link Imagem</h4>
                    <input
                        type="url"
                        placeholder="Link da imagem"
                        value={imagemurl}
                        onChange={(e) => setimagemurl(e.target.value)}
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
                    {produto.imagemurl && (
                        <img
                            src={produto.imagemurl}
                            alt={produto.nome}
                            className={styles.imagemPreview}
                        />
                    )}
                    <div className={styles.buttons}>
                        <button
                            onClick={() => setEditando(true)}
                            className={styles.botaoEditar}
                        >
                            Editar
                        </button>
                        <button
                            onClick={handleDelete}
                            className={styles.botaoRemover}
                        >
                            Remover
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
}
