import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import ProdutoListItem from "../components/ProdutoListItem/ProdutoListItem";
import styles from "./Produtos.module.css";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        const snapshot = await getDocs(collection(db, "produtos"));
        setProdutos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const removerProduto = async (id) => {
        await deleteDoc(doc(db, "produtos", id));
        carregarProdutos();
    };

    return (
        <div className={styles.container}>
            <h3>Produtos Cadastrados</h3>
            <ul className={styles.lista}>
                {produtos.map(p => (
                    <ProdutoListItem
                        key={p.id}
                        produto={p}
                        onRemove={removerProduto}
                        onUpdate={carregarProdutos}
                    />
                ))}
            </ul>
        </div>
    );
}
