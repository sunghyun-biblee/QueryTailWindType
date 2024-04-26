import React from "react";

import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { Nav } from "./component/Nav";

import { List } from "./component/List";
import { Edit } from "./component/Edit";
import { MainPage } from "./component/MainPage";

function App() {
  const LayOut = () => {
    return (
      <div>
        <Nav />
        <Outlet />
      </div>
    );
  };
  return (
    <Routes>
      <Route path="/" element={<LayOut></LayOut>}>
        <Route index element={<MainPage />} />
        <Route path="list" element={<List />} />
        <Route path="edit" element={<Edit />} />
      </Route>
    </Routes>
  );
}

export default App;
