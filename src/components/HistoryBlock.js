import React from "react";
import { ImMinus } from "react-icons/im";

class HistoryBlock extends React.Component {
    cutDate() {
        const date = this.props.record.date
        if (window.innerWidth < 769) {
            return date.slice(0, 6) + date.slice(8, 10)
        } else {
            return date
        }
    }

    render() {
        return (
            <div className="history-block">
                <div className="history-block__record">
                    <span className="history-block__date">
                        {this.cutDate()}
                    </span>
                    <div>
                        <span className="history-block__amount">
                            {this.props.resultFormat(this.props.record.amount)}
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
