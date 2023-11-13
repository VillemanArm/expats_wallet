import React from "react";
import axios from "axios";
import { ImPlus, ImArrowRight, ImCross } from "react-icons/im"
import CurrencyBlock from "./CurrencyBlock";

// const digits = /[^\d\.]/g


class Converter extends React.Component {
    constructor(props) {
        super(props)



        this.state = {
            rates: ''
        }
    }


    getRates() {
        const base = 'USD'
        const currencies = 'RUB,EUR,USD,AMD,GEL'
        const resolution = '1m'
        const url = `https://api.fxratesapi.com/latest?base=${base}&currencies=${currencies}&resolution=${resolution}&amount=1&places=6&format=json`

        axios.get(url)
            .then(res => {
                console.log(res.data.rates)
            })
            .catch(err => console.log(err))

    }

    render() {
        return (
            <div className="converter" onLoad={this.getRates()}>
                <div>
                    <div className="converter__head">
                        <h1>Converter</h1>
                        <button className="converter__add"> <ImPlus /> </button>
                    </div>
                    <div className="converter__currencies">
                        <CurrencyBlock />
                    </div>
                    <button className="converter__clear"> <ImCross /> </button>
                </div>
                <div className="converter__calculator">
                    <span>Convert to</span>
                    <select className="converter__target-currency">

                        <option value="none" selected></option>
                        <option value="RUB">RUB</option>
                        <option value="USD" >USD</option>
                    </select>
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