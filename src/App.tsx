import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Scrolltop from "./utils/Scrolltop";
import SecurityShield from "./components/SecurityShield";

export default function App() {
    return (
        <BrowserRouter>
            <SecurityShield />
            <Scrolltop />
            <div className="midnight-grid" aria-hidden="true" />
            <div className="ambient-glow-hero" aria-hidden="true" />
            <div className="ambient-glow-mid" aria-hidden="true" />
            <div className="ambient-glow-bottom" aria-hidden="true" />
            <div className="ambient-noise" aria-hidden="true" />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
