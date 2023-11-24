import React from "react";
import { ImMinus } from "react-icons/im";
import Selector from "./Selector";


class CurrencyBlock extends React.Component {
    currency = this.props.currency
    numbers = /^\d{1,9}\.?(\d{1,2})?$/g

    amountValidate() {
        let amount = this.amountInput.value
        const zero = /^\.+(0{1,2})?$/g
        const pointZero = /^\.+(\d{1,2})?$/g

        if (this.numbers.test(amount)) {
            this.props.editAmount(this.amountInput.value, this.currency.id, '')
        } else {
            if (zero.test(amount)) {
                this.amountInput.value = 0
                this.currency.error = ''
            } else if (pointZero.test(amount)) {
                amount = amount.replace(/\.+/, '.')
                this.amountInput.value = '0' + amount
                this.currency.error = ''
            } else if (amount.match(/\./g).length > 1) {
                this.currency.error = 'Remove the extra point!'
            } else (
                this.currency.error = 'Мax amount is 999 999 999.99!'
            )

            this.props.editAmount(this.amountInput.value, this.currency.id, this.currency.error)
        }

    }

    inputValidate = () => {
        const symbols = /[^\d.]/g
        const amount = this.amountInput

        amount.value = amount.value.replace(symbols, '')
        const dotsMatch = amount.value.match(/\./g)
        if (!this.numbers.test(amount) && dotsMatch) {
            if (dotsMatch.length === 1 && amount.value.length - amount.value.indexOf('.') > 3) {
                amount.value = amount.value.slice(0, amount.value.indexOf('.') + 3)
            }
        }
    }

    render() {
        return (
            <div className="currency-block" id={`currency-block-${this.currency.id}`}>
                <div className="currency-block__inputs">
                    <div className="currency-block__inputs-wrapper">
                        <span>Currency</span>
                        <Selector
                            options={this.props.currencies}
                            selected={this.currency.currency}
                            elementId={this.currency.id}
                            edit={this.props.editCurrency} />
                        <span>amount</span>
                        <div>
                            <input
                                type="text"
                                className={this.currency.error ? "currency-block__amount error" : "currency-block__amount"}
                                ref={(element) => this.amountInput = element}
                                defaultValue={this.currency.amount}
                                onBlur={() => this.amountValidate()}
                                onInput={() => this.inputValidate()}
                            />
                        </div>
                    </div>

                    {this.currency.error && <div className="currency-block__error error">{this.currency.error}</div>}

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