import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation";
import Home from "../src/routes/home/Home";
import UserAuthentication from "./routes/user-authentication/UserAuthentication";
import Shop from "./routes/shop/Shop";
import ContactUs from "./routes/contact/ContactUs";
import CheckOutSummary from "./components/check-out/CheckOutSummary";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="sign-in" element={<UserAuthentication />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path='checkout' element={<CheckOutSummary />} />
         </Route>
      </Routes>
    </div>
  );
}

export default App;
