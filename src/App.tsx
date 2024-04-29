import React from "react";

import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { Nav } from "./component/Nav";

import { List } from "./component/List";
import { Edit } from "./component/Edit";
import { MainPage } from "./component/MainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Mypage } from "./component/Mypage";

function App() {
  const queryClient = new QueryClient();
  const LayOut = () => {
    return (
      <div>
        <Nav />
        <Outlet />
      </div>
    );
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LayOut></LayOut>}>
          <Route index element={<MainPage />} />
          <Route path="list" element={<List />} />
          <Route path="my" element={<Mypage />} />
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
