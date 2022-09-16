import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./page";
import ViewAll from "./page/ViewAll";
import MonthlySales from "./page/MonthlySales";
import TransactionDetails from "./page/TransactionDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaction/:id" element={<TransactionDetails />} />
        <Route path="/preview" element={<ViewAll />} />
        <Route path="/monthlysales" element={<MonthlySales />} />
      </Routes>
    </>
  );
}

export default App;
