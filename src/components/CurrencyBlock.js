import React from "react";
import { ImMinus } from "react-icons/im";
import Selector from "./Selector";


class CurrencyBlock extends React.Component {
    currency = this.props.currency


    inputValidate = (event) => {
        const symbols = /[^\d.]/g
        const numbers = /^\d{1,9}\.?(\d{1,2})?$/g
        const amount = event.target

        amount.value = amount.value.replace(symbols, '')
        const dotsMatch = amount.value.match(/\./g)
        if (!numbers.test(amount) && dotsMatch) {
            if (dotsMatch.length === 1 && amount.value.length - amount.value.indexOf('.') > 3) {
                amount.value = amount.value.slice(0, amount.value.indexOf('.') + 3)
            }
        }
    }

    render() {
        return (
            <div className="currency-block" id={`currency-block-${this.currency.id}`}>
                <div>
                    <span>Currency</span>
                    <Selector
                        options={this.props.currencies}
                        selected={this.currency.currency}
                        elementId={this.currency.id}
                        edit={this.props.editCurrency} />
                    <span>amount</span>
                    <input
                        type="text"
                        className="currency-block__amount"
                        ref={(element) => this.amountInput = element}
                        defaultValue={this.currency.amount}
                        onBlur={(event) => {
                            const amount = this.amountInput.value
                            const numbers = /^\d{1,9}\.?(\d{1,2})?$/g

                            if (numbers.test(amount)) {
                                this.props.editAmount(this.amountInput.value, this.currency.id)
                            } else {
                                if (amount.match(/\./g).length > 1) {
                                    alert('Remove the extra point!')
                                } else (
                                    alert('Мaximum amount of currency is 999 999 999.99!')
                                )
                            }


                        }
                        }
                        onInput={(event) => {
                            this.inputValidate(event)
                        }}

                    />

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