import Header from "./Components/Layouts/Header";
import Home from "./Pages/Home";
import Footer from "./Components/Layouts/Footer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import SignIn from "./Pages/SignIn";
import { useSelector } from "react-redux";
import { TRootState } from "./Store/BigPie";
import CardDetails from "./Pages/CardDetails";
import Register from "./Pages/Register";
import { About } from "./Pages/About";
import Favorites from "./Pages/Favorites";
import MyCards from "./Pages/MyCards";
import CreateCard from "./Pages/CreateCard";
import Profile from "./Pages/Profile";
import RouteGuard from "./Components/Shared/RouteGuard";
import CRM from "./Pages/CRM";
import EditProfile from "./Pages/EditProfile";



function App() {

  const user = useSelector((state: TRootState) => state.UserSlice.user);

  return (
    <main className="bg-teal-50 dark:bg-gray-400">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/card/:id" element={<CardDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edituser" element={<EditProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />

          <Route
            path="/mycards"
            element={
              <RouteGuard user={user!}>
                <MyCards />
              </RouteGuard>
            }
          />
          <Route
            path="/favorites"
            element={
              <RouteGuard user={user!}>
                <Favorites />
              </RouteGuard>
            }
          />
          <Route
            path="/createcard"
            element={
              <RouteGuard user={user!}>
                <CreateCard />
              </RouteGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <RouteGuard user={user!}>
                <Profile />
              </RouteGuard>
            }
          />
          <Route
            path="/crm"
            element={
              <RouteGuard user={user!}>
                <CRM />
              </RouteGuard>
            }
          />
        </Routes>
      </BrowserRouter>
      <div className="sticky bottom-0 border-r-2">
        <Footer />
      </div>
    </main>
  );
}

export default App;
