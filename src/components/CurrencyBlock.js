import React from "react";
import { ImMinus } from "react-icons/im"
import Selector from "./Selector";


class CurrencyBlock extends React.Component {
    currency = this.props.currency

    render() {
        return (
            <div className="currency-block">
                <div>
                    <span>Currency</span>
                    <Selector optionsList={this.props.currencies} currentValue={this.currency.currency} />
                    <span>amount</span>
                    <input
                        type="text"
                        className="currency-block__amount"
                        ref={(element) => this.amountInput = element}
                        defaultValue={this.currency.amount}
                        onBlur={() => {
                            this.currency.amount = this.amountInput.value
                            this.props.onEdit(this.currency)
                        }} />
                </div>

                {this.props.currenciesAmount !== 1 &&
                    <button
                        className="currency-block__del"
                        onClick={(e) => {
                            this.props.del(this.currency.id)
                        }}>
                        <ImMinus />
                    </button>}

            </div >
        )
    }
}

export default CurrencyBlock