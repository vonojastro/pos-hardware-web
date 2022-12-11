import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import ViewAll from "./page/DailyReport";
import MonthlySales from "./page/Sales";
import TransactionDetails from "./page/Transaction";
import SearchList from "./page/Query";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import CashierDashboard from "./page/Dashboard/Cashier";
import AdminDashboard from "./page/Dashboard/Admin";

function App() {

  return (
    <>
      <Header />
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/cashier" element={<CashierDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/transaction/:id" element={<TransactionDetails />} />
        <Route path="/preview" element={<ViewAll />} />
        <Route path="/monthlysales" element={<MonthlySales />} />
        <Route path="/searchlist" element={<SearchList />} />
        
        <Route path="/sign-up" element={<SignUp />} />

      </Routes>
    </>
  );
}

export default App;
