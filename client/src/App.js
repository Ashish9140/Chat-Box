import { CartContext } from "./CartContext";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Chatbox from "./pages/Chatbox";
import { refreshUser } from "./http";
import ForgetPassword from "./components/ForgetPassword";
import { ResetPassword } from "./components/ResetPassword";
import Notfound from "./components/Notfound";

export const App = () => {

  const [showChat, setShowChat] = useState(false);
  const [room, setRoom] = useState('');
  const BASE_URL = 'https://wlone.onrender.com';
  const [rightTop, setRightTop] = useState({
    _id: "dfd",
    name: 'room Name',
    avatar: '',
    email: 'email'
  });
  const [messageList, setMessageList] = useState([]);
  const [allUser, setAllUser] = useState();
  const [user, setUser] = useState(null);


  // handle refresh
  useEffect(() => {
    (async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const { data } = await refreshUser({ token });
        localStorage.setItem("token", JSON.stringify(data.token));
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);


  return (
    <CartContext.Provider value={{ showChat, setShowChat, messageList, setMessageList, allUser, setAllUser, setRoom, room, user, setUser, rightTop, setRightTop, BASE_URL }}>
      <Router>
        <Switch>

          <Route exact path="/">
            {user ? <Redirect to="/chatbox" /> : <AuthPage />}
          </Route>

          <Route exact path="/chatbox">
            {!user ? <Redirect to="/" /> : <Chatbox />}
          </Route>

          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route exact path="/user/password-reset/:id" component={ResetPassword} />
          <Route path="*" component={Notfound} />

        </Switch>
      </Router>
    </CartContext.Provider>
  )
}
