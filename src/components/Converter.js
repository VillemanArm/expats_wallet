import React from "react";
import { ImPlus, ImArrowRight, ImCross } from "react-icons/im"
import CurrencyBlock from "./CurrencyBlock";

class Converter extends React.Component {
    render() {
        return (
            <div className="converter">
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
                        <option value="RUB" selected>RUB</option>
                        <option value="USD" selected>USD</option>
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