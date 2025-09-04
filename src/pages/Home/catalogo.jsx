import ListaProdutos from "../../components/ListaProdutos/ListaProdutos";
import styles from "./catalogo.module.css";
import logo from "../../assets/logocatalogo.png";

export default function Catalogo() {
    return (
        <div>
            <img src={logo} alt="Logo" className={styles.logo} />
            <ListaProdutos />
        </div>
    );
}
