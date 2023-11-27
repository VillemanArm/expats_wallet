import React from "react";
import HistoryBlock from "./HistoryBlock";
import { ImCross } from "react-icons/im";

class History extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isScrollbar: false,
            allData: localStorage.expatsWallet && JSON.parse(localStorage.expatsWallet),
            //оптимизировать для первой загрузки
        };

        this.addScrollbarGap = this.addScrollbarGap.bind(this);
        this.delRecord = this.delRecord.bind(this);
    }

    componentDidMount() {
        this.addScrollbarGap();
    }

    componentDidUpdate(prevProps, prevState) {
        localStorage.expatsWallet = JSON.stringify(this.state.allData)
    }

    //     const targetElement = document.getElementById('yourElementId'); // Замените на ваш реальный идентификатор элемента

    // const resizeObserver = new ResizeObserver(entries => {
    //   for (const entry of entries) {
    //     const hasScrollbar = entry.target.scrollHeight > entry.target.clientHeight ||
    //                          entry.target.scrollWidth > entry.target.clientWidth;

    //     if (hasScrollbar) {
    //       console.log('Скроллбар появился');
    //       // Ваш код обработки события
    //     }
    //   }
    // });

    // resizeObserver.observe(targetElement);

    addScrollbarGap() {
        const historyContainer = document.querySelector(".history__container");
        const historyClear = document.querySelector(".history__clear");
        if (historyContainer.scrollHeight > historyContainer.offsetHeight) {
            historyContainer.style = "padding-right: 1rem";
            historyClear.style = "margin-right: 1.8rem";
        }
    }

    async delRecord(id) {
        let newAllData = this.state.allData;
        newAllData.history = this.state.allData.history.filter(
            (record) => record.id !== id
        );
        await this.setState({ allData: newAllData });

    }

    render() {
        return (
            <div className="history">
                <div className="history__head">
                    <h2>History</h2>
                    <button className="history__clear">
                        {" "}
                        <ImCross />{" "}
                    </button>
                </div>
                <div className="history__container">
                    {localStorage.expatsWallet && this.state.allData.history.map((record) => (
                        <HistoryBlock
                            key={record.id}
                            record={record}
                            del={this.delRecord}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default History;
