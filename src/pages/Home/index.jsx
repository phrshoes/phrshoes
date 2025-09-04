import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalogo from "./catalogo";
import AdminWrapper from "../Admin/adminWrapper";

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalogo />} />

        <Route path="/admin/*" element={<AdminWrapper />} />
      </Routes>
    </Router>
  );
}
