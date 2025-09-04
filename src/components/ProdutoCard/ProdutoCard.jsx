import styles from "./ProdutoCard.module.css";

export default function ProdutoCard({ produto }) {
    // Seu número do WhatsApp com código do país (ex: 55 para Brasil)
    const numeroWhats = "5531972300693";

    // Mensagem padrão para enviar
    const mensagem = encodeURIComponent(`Olá! Tenho interesse no produto: ${produto.nome}`);

    // Link completo para o WhatsApp
    const linkWhats = `https://wa.me/${numeroWhats}?text=${mensagem}`;
    return (
        <div className={styles.card}>
            <img src={produto.imagemurl} alt={produto.nome} className={styles.imagem} />
            <h3 className={styles.nome}>{produto.nome}</h3>
            <p className={styles.preco}>R$ {produto.preco.toFixed(2)}</p>
            <p className={styles.tamanhos}>Tamanhos Disponiveis:<br />{produto.tamanhos.join(" ")}</p>
            <a href={linkWhats} target="_blank" rel="noopener noreferrer">
                <button className={styles.botaoWhats}>Whatsapp</button>
            </a>
            <a href={produto.link} target="_blank" rel="noopener noreferrer">
                <button className={styles.botaoInsta}>Ver Detalhes</button>
            </a>
        </div>
    );
}
