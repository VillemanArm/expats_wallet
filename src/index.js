import React from "react";
import ReactDOM from "react-dom/client";
import "./css/base.sass";
import Header from "./components/Header";
import App from "./components/App";

import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Header />
        <main>
            <App />
        </main>
        <Footer />
    </React.StrictMode>
);
