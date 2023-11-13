import React from "react";
import axios from "axios";
import { ImPlus, ImArrowRight, ImCross } from "react-icons/im"
import CurrencyBlock from "./CurrencyBlock";
import Selector from "./Selector";

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
            ]

        }

        this.getRates()

        this.getRates = this.getRates.bind(this)
        this.addCurrency = this.addCurrency.bind(this)
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
        // console.log(this.state.currencies)
        currencyList.push({
            id: currencyList[currencyList.length - 1].id + 1,
            currency: 'none',
            amount: 0
        })
        this.setState({ currencies: [] }, () => {
            this.setState({ currencies: [...currencyList] })
        })
    }



    render() {
        return (
            <div className="converter">
                <div>
                    <div className="converter__head">
                        <h1>Converter</h1>
                        <button className="converter__add" onClick={this.addCurrency}> <ImPlus /> </button>
                    </div>
                    <div className="converter__currencies">
                        {this.state.currencies.map((currency) => {
                            return (
                                <CurrencyBlock key={currency.id} currencies={Object.keys(this.state.rates)} />

                            )
                        })}
                    </div>
                    <button className="converter__clear"> <ImCross /> </button>
                </div>
                <div className="converter__calculator">
                    <span>Convert to</span>
                    <Selector optionsList={Object.keys(this.state.rates)} className="converter__target-currency" />
                    <button className="converter__calculator-button"> <ImArrowRight /> </button>
                    <div className="converter__result">
                        <span className="converter__result-amount">3000</span>
                        <span className="converter__result-currency">USD</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Converter