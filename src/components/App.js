import React from "react";
import History from "./History";
import Converter from "./Converter";

// TODO: подключить шрифты из файла

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
        this.sendHistory = this.sendHistory.bind(this);
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
        this.setState({ lastData: [] }, () => {
            this.setState({ lastData: [...data] });
        });
    }

    sendHistory(newHistory) {
        this.setState({ history: newHistory });
    }

    resultFormat(result) {
        if (result) {
            if (result < 99999999) {
                return result
            } else {
                return Math.round(result)
            }
        } else {
            return 'result'
        }
    }

    render() {
        return (
            <section className="main-block__wrapper container">
                <Converter
                    lastData={this.state.lastData}
                    sendHistoryRecord={this.sendHistoryRecord}
                    sendLastData={this.sendLastData}
                    resultFormat={this.resultFormat}
                />
                <History
                    history={this.state.history}
                    sendHistory={this.sendHistory}
                    resultFormat={this.resultFormat}
                />
            </section>
        );
    }
}

export default App;
