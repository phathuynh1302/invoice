import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./views/Homepage";
import InvoiceHistory from "./views/InvoiceHistory";
import AdminPage from "./views/AdminPage";
import ManageUser from "./views/ManageUser";
import MyAccount from "./views/MyAccount";
import Auth from "./views/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/invoiceHistory" element={<InvoiceHistory />} />
        <Route exact path="/adminPage" element={<AdminPage />} />
        <Route exact path="/manageUser" element={<ManageUser />} />
        <Route exact path="/myAccount" element={<MyAccount />} />
        <Route exact path="/login" element={<Auth authRoute="login" />} />
        <Route exact path="/register" element={<Auth authRoute="register" />} />
      </Routes>
    </Router>
  );
}

export default App;
