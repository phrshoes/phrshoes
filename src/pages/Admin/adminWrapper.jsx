
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Login from "../Admin/Login/login";
import Dashboard from "./Dashboard/Dashboard";
import Produtos from "./Produtos/Produtos";

export default function AdminWrapper() {
    const [logado, setLogado] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLogado(!!user);
        });

        return () => unsubscribe();
    }, []);

    if (logado === null) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    logado ? <Dashboard onLogout={setLogado} /> : <Login onLogin={setLogado} />
                }
            />
            <Route
                path="/produtos"
                element={
                    logado ? <Produtos /> : <Login onLogin={setLogado} />
                }
            />
        </Routes>

    );
}
