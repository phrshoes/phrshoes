import ListaProdutos from "../../components/ListaProdutos/ListaProdutos";
import styles from "./catalogo.module.css";

export default function Catalogo() {
    return (
        <div>
            <img src="src\assets\logocatalogo.png" alt="Logo" className={styles.logo} />
            <ListaProdutos />
        </div>
    );
}