import React from "react";
import { ImMinus } from "react-icons/im"
import Selector from "./Selector";


class CurrencyBlock extends React.Component {
    render() {
        return (
            <div className="currency-block">
                <div>
                    <span>Currency</span>
                    <Selector optionsList={this.props.currencies} />
                    <span>amount</span>
                    <input type="text" className="currency-block__amount" />
                </div>

                <button className="currency-block__del"> <ImMinus /> </button>

            </div>
        )
    }
}

export default CurrencyBlock