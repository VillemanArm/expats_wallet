import React from "react";
import { ImMinus } from "react-icons/im";

class HistoryBlock extends React.Component {
    render() {
        return (
            <div className="history-block">
                <div className="history-block__record">
                    <span className="history-block__date">
                        {this.props.record.date}
                    </span>
                    <div>
                        <span className="history-block__amount">
                            {this.props.record.amount}
                        </span>
                        <span className="history-block__currency">
                            {this.props.record.currency}
                        </span>
                    </div>
                </div>
                <button
                    className="history-block__del"
                    onClick={(e) => {
                        this.props.del(this.props.record.id);
                    }}
                >
                    <ImMinus />
                </button>
            </div>
        );
    }
}

export default HistoryBlock;
