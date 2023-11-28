import React from "react";
import History from "./History";
import Converter from "./Converter";

// TODO: реализовать добавление строк истории в реальном времени
// TODO: адаптировать верстку для firefox

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastData: localStorage.expatsWallet
                ? JSON.parse(localStorage.expatsWallet).lastData
                : [
                      {
                          id: 1,
                          currency: "none",
                          amount: 0,
                          error: "",
                      },
                  ],
            history: localStorage.expatsWallet
                ? JSON.parse(localStorage.expatsWallet).history
                : [],
        };

        this.sendHistoryRecord = this.sendHistoryRecord.bind(this);
        this.sendLastData = this.sendLastData.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const newData = {
            lastData: this.state.lastData,
            history: this.state.history,
        };

        localStorage.expatsWallet = JSON.stringify(newData);
    }

    sendHistoryRecord(historyRecord) {
        if (!this.state.history.length) {
            this.setState({ history: [historyRecord] });
        } else {
            let oldHistory = this.state.history;
            this.setState({ history: [...oldHistory, historyRecord] });
        }
    }

    sendLastData(data) {
        this.setState({ lastData: data });
    }

    render() {
        return (
            <section className="main-block__wrapper container">
                <Converter
                    lastData={this.state.lastData}
                    sendHistoryRecord={this.sendHistoryRecord}
                    sendLastData={this.sendLastData}
                />
                {/* <History history={this.state.history} /> */}
            </section>
        );
    }
}

export default App;
