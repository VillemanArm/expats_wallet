import React from "react";
import { ImMinus } from "react-icons/im"


class CurrencyBlock extends React.Component {
    render() {
        return (
            <div className="currency-block">
                <div>
                    <span>Currency</span>
                    <select className="converter__target-currency">

                        <option value="none" selected></option>
                        <option value="RUB" selected>RUB</option>
                        <option value="USD" selected>USD</option>
                    </select>
                    <span>amount</span>
                    <input type="text" className="currency-block__amount" />
                </div>

                <button className="currency-block__del"> <ImMinus /> </button>

            </div>
        )
    }
}

export default CurrencyBlock