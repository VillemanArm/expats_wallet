import React from "react";
import { ImMinus } from "react-icons/im";



class HistoryBlock extends React.Component {

    render() {
        return (
            <div className="history-block">
                <div className="history-block__record">
                    <span className="history-block__date">05.02.2023</span>
                    <div>
                        <span className="history-block__amount">555555555555.99</span>
                        <span className="history-block__currency">AMD</span>
                    </div>
                </div>
                <button
                    className="history-block__del"
                // onClick={(e) => {
                //     this.props.del(this.historyRecord.id)
                // }}
                >
                    <ImMinus />
                </button>


            </div >
        )
    }
}

export default HistoryBlock