import "./App.css";
import "./components/layout/style.scss"

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import useUserRoutes from "./components/routes/userRoutes";
import useAdminRoutes from "./components/routes/adminRoutes";
import NotFound from "./components/layout/NotFound";

console.log(process.env.REACT_APP_BACKEND_URL);

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <div className="">
          <Routes>
            {userRoutes}
            {adminRoutes}
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;



// stripe listen --events checkout.session.completed --forward-to localhost:4000/api/v1/payment/webhook
// windows setup for stripe webhook
// cmd te giye cd\ taile root directory te jabe , 
// then, E:  enter kor, taile E drive e switchh hobe, jehetu stripe.exe E drive e ache
// stripe login  jodi lage ar ki
// then,    stripe listen --events checkout.session.completed --forward-to localhost:4000/api/v1/payment/webhook    tarpor enter kor