import React from "react";

import History from "./History";
import Converter from "./Converter";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currencies: localStorage.expatsWallet
                ? JSON.parse(localStorage.expatsWallet).lastData
                : [
                      {
                          id: 1,
                          currency: "none",
                          amount: 0,
                          error: "",
                      },
                  ],
        };

        // this.getRates = this.getRates.bind(this)
    }

    render() {
        return (
            <section className="main-block__wrapper container">
                <Converter />
                <History />
            </section>
        );
    }
}

export default App;
