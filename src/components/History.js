import React from "react";
import HistoryBlock from "./HistoryBlock";
import { ImCross } from "react-icons/im";

// TODO: реализовать добавление строк истории в реальном времени
// TODO: проверить работу отступов при добавлении скроллбара
// TODO: адаптировать верстку для firefox 

class History extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isScrollbar: false,
            allData: localStorage.expatsWallet && JSON.parse(localStorage.expatsWallet),
        };

        // this.addScrollbarGap = this.addScrollbarGap.bind(this)
        this.delRecord = this.delRecord.bind(this)
        this.clearHistory = this.clearHistory.bind(this)
        this.checkScrollbar = this.checkScrollbar.bind(this)

    }

    componentDidMount() {
        this.checkScrollbar()
    }

    componentDidUpdate(prevProps, prevState) {
        if (localStorage.expatsWallet) {
            localStorage.expatsWallet = JSON.stringify(prevState.allData)
        }
        console.log(this.state)
    }

    async delRecord(id) {
        let newAllData = this.state.allData;
        newAllData.history = this.state.allData.history.filter(
            (record) => record.id !== id
        );
        await this.setState({ allData: newAllData });
        await this.checkScrollbar()
    }

    clearHistory() {
        let newAllData = this.state.allData;
        newAllData.history = []
        this.setState({ allData: newAllData });
    }

    async checkScrollbar() {
        const converterCurrencies = document.querySelector('.history__container')
        if (converterCurrencies.scrollHeight > converterCurrencies.offsetHeight) {
            await this.setState({ isScrollbar: true })
        } else {
            await this.setState({ isScrollbar: false })
        }
    }

    render() {
        return (
            <div className="history">
                <div className="history__head">
                    <h2>History</h2>
                    {(this.state.allData && this.state.allData.history.length > 1) &&
                        <button
                            className="history__clear"
                            style={this.state.isScrollbar ? { marginRight: '1.8rem' } : { marginRight: '0' }}
                            onClick={this.clearHistory}
                        >
                            <ImCross />
                        </button>
                    }
                </div>
                <div
                    className="history__container"
                    style={this.state.isScrollbar ? { paddingRight: '1rem' } : { paddingRight: '0' }}
                >
                    {localStorage.expatsWallet && this.state.allData.history.map((record) => (
                        <HistoryBlock
                            key={record.id}
                            record={record}
                            del={this.delRecord}
                        />
                    ))}
                </div>
            </div >
        );
    }
}

export default History;
