import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import PropertyDetails from "./pages/PropertyDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
