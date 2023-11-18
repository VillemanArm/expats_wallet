import React from "react";
import axios from "axios";
import { ImPlus, ImCross } from "react-icons/im"
import CurrencyBlock from "./CurrencyBlock";
import CurrencyCalculator from "./CurrencyCalculator";


// const digits = /[^\d\.]/g


class Converter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            rates: '',
            currencies: [
                {
                    id: 1,
                    currency: 'none',
                    amount: 0
                }
            ],
            targetCurrency: 'none',
            result: ''

        }

        this.getRates = this.getRates.bind(this)
        this.addCurrency = this.addCurrency.bind(this)
        this.clearCurrencies = this.clearCurrencies.bind(this)
        this.delCurrency = this.delCurrency.bind(this)
        this.editCurrencyCurrency = this.editCurrencyCurrency.bind(this)
        this.editCurrencyAmount = this.editCurrencyAmount.bind(this)
        this.editTargetCurrency = this.editTargetCurrency.bind(this)
        this.calculate = this.calculate.bind(this)

        this.getRates()
    }


    getRates() {
        const base = 'USD'
        const currencies = 'RUB,EUR,USD,AMD,GEL,CNY'
        const resolution = '1m'
        const url = `https://api.fxratesapi.com/latest?base=${base}&currencies=${currencies}&resolution=${resolution}&amount=1&places=6&format=json`

        axios.get(url)
            .then(res => {
                this.setState({ rates: res.data.rates })
            })
            .catch(err => console.log(err))

    }

    addCurrency() {
        let currencyList = this.state.currencies
        currencyList.push({
            id: currencyList[currencyList.length - 1].id + 1,
            currency: 'none',
            amount: 0
        })
        this.setState({ currencies: [] }, () => {
            this.setState({ currencies: [...currencyList] })
        })
    }

    clearCurrencies() {
        this.setState({ currencies: [] }, () => {
            this.setState({
                currencies: [
                    {
                        id: 1,
                        currency: 'none',
                        amount: 0
                    }
                ]
            })
        })
    }

    delCurrency(id) {
        this.setState({ currencies: this.state.currencies.filter((element) => element.id !== id), result: '' })
    }

    editCurrencyCurrency(currency, elementId) {
        let allCurrencies = this.state.currencies
        const currentIndex = allCurrencies.findIndex(element => element.id === elementId)
        allCurrencies[currentIndex].currency = currency
        this.setState({ currencies: [...allCurrencies], result: '' })
    }

    editCurrencyAmount(amount, elementId) {
        let allCurrencies = this.state.currencies
        const currentIndex = allCurrencies.findIndex(element => element.id === elementId)
        allCurrencies[currentIndex].amount = amount
        this.setState({ currencies: [...allCurrencies] })
    }

    editTargetCurrency(currency) {
        this.setState({ targetCurrency: currency, result: '' })
    }

    calculate() {
        let result = 0
        this.state.currencies.forEach((currency) => {
            result += currency.amount / this.state.rates[currency.currency] * this.state.rates[this.state.targetCurrency]
        })

        result = result.toFixed(2)
        this.setState({ result: result })
    }

    render() {
        return (
            <div className="converter">
                <div>
                    <div className="converter__head">
                        <h1>Converter</h1>
                        <div>
                            {this.state.currencies.length !== 1 &&
                                <button className="converter__clear" onClick={this.clearCurrencies}> <ImCross /> </button>
                            }
                            {this.state.currencies.length < 9 &&
                                <button className="converter__add" onClick={this.addCurrency}> <ImPlus /> </button>
                            }
                        </div>
                    </div>
                    <div className="converter__currencies">
                        {this.state.currencies.map((currency) => {
                            return (
                                <CurrencyBlock
                                    key={currency.id}
                                    currency={currency}
                                    del={this.delCurrency}
                                    currencies={Object.keys(this.state.rates)}
                                    currenciesAmount={this.state.currencies.length}
                                    editCurrency={this.editCurrencyCurrency}
                                    editAmount={this.editCurrencyAmount}
                                />

                            )
                        })}
                    </div>

                </div>
                <CurrencyCalculator
                    rates={this.state.rates}
                    currencies={this.state.currencies}
                    targetCurrency={this.state.targetCurrency}
                    result={this.state.result}
                    editTargetCurrency={this.editTargetCurrency}
                    calculate={this.calculate} />

            </div>
        )
    }
}

export default Converter