import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import SideBar from "./Components/Layouts/SideBar/SideBar";
import Movie from "./Components/Layouts/Movie/Movie";
import PostMovie from "./Components/Layouts/PostMovie/PostMovie";
import Login from "./Components/Layouts/Login/Login";
import ShowTime from "./Components/Layouts/ShowTime/ShowTime";
import Header from "./Components/Layouts/Header/Header";
import Account from "./Components/Layouts/Account/Account";
import PostShowTime from "./Components/Layouts/PostShowTime/PostShowTime";
import Ticket from "./Components/Layouts/Ticket/Ticket";
import Revenue from "./Components/Layouts/Revenue/Revenue";
import Chart from "./Components/Layouts/Chart/Chart";

function App() {
  const [login, setLogin] = useState(0);
  const [nameUser, setNameUser] = useState({});

  const handleLogin = (data) => {
    setLogin(data);
  };
  const handleLogout = () => {
    setLogin(0);
  };

  const handleChangePass = (val) => {
    setLogin(val);
  };

  console.log(login);

  const handleNameUser = (idAdmin, name, password) => {
    setNameUser({
      idAdmin: idAdmin,
      name: name,
      password: password,
    });
  };
  return (
    <>
      <div>
        {login !== 0 ? (
          <Router>
            <Header name={nameUser} change={handleChangePass} />
            <SideBar />
            <div className="App">
              <Link to="/">
                <button className="logout" onClick={() => handleLogout()}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </Link>
              <div className="pages">
                <Switch>
                  <Route path="/" component={Movie} exact />
                  <Route path="/addmovies" component={PostMovie} />
                  <Route path="/showtime" component={ShowTime} />
                  <Route path="/chart" component={Chart} />
                  <Route path="/addshowtime" component={PostShowTime} />
                  <Route path="/account" component={Account} />
                  <Route
                    path="/ticket"
                    component={() => <Ticket name={nameUser.name} />}
                  />
                  <Route
                    path="/revenue"
                    component={() => <Revenue name={nameUser.name} />}
                  />
                </Switch>
              </div>
            </div>
          </Router>
        ) : (
          <div>
            <Login nameUser={handleNameUser} login={handleLogin} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
