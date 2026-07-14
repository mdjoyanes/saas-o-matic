import { Routes, Route } from "react-router-dom";

import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import CustomerDetail from "./pages/CustomerDetail";

function App() {
  return (
    <>

      <AppNavbar />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/customer/:id"
          element={<CustomerDetail />}
        />

      </Routes>

      <Footer />

    </>
  );
}

export default App;