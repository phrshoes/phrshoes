import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ProdutoCard from "../ProdutoCard/ProdutoCard";
import styles from "./ListaProdutos.module.css";

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const carregar = async () => {
            const snapshot = await getDocs(collection(db, "produtos"));
            setProdutos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        carregar();
    }, []);

    return (
        <div className={styles.lista}>
            {produtos.map(p => <ProdutoCard key={p.id} produto={p} />)}
        </div>
    );
}
