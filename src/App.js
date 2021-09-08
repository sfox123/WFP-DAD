import React, { useReducer, useEffect, useState, useContext } from "react";
import { Route, Switch, Router } from "react-router-dom";
import "./styles/Main.sass";
import Nav from "./views/Nav";
import Admin from "./views/pages/Admin";
import ASC from "./views/pages/ASC";
import Editor from "./views/pages/Editor";
import Map from "./views/pages/Map";
import { Protected } from "./routes/protected";
import { Secured } from "./routes/secured";
import { EditSecured } from "./routes/editSecured";
import { ApiContext } from "./context/ApiContext";
import { CookiesProvider, useCookies } from "react-cookie";
import Axios from "./api/api";

function App() {
  const [user, setUser] = useState([[1, 2]]);
  const [apiData, setApiData] = useState("");
  const [admin, setAdmin] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "isLoggedinASC",
    "AscID",
  ]);
  useEffect(async () => {
    await Axios.get("/apiCall")
      .then((res) => setApiData(res.data))
      .catch((err) => console.error(err));
    if (cookies.isLoggedinASC) {
      const id = cookies.AscID;
      await Axios.get(`/getEditor/${id}`)
        .then((res) => setAdmin(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <ApiContext.Provider value={{ user, setUser, apiData, admin }}>
      <CookiesProvider>
        <Switch>
          <Protected exact path="/admin" component={Admin} />
          <Secured exact path="/asc" component={ASC} />
          <EditSecured exact path="/editor" component={Editor} />
          <Route exact path="/" component={Nav} />
          <Route exact path="/map" component={Map} />
        </Switch>
      </CookiesProvider>
    </ApiContext.Provider>
  );
}

export default App;
