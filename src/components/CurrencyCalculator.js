import React from "react";
import { ImArrowRight } from "react-icons/im"
import CurrencySelector from "./CurrencySelector"

class CurrencyCalculator extends React.Component {


    render() {
        return (
            <div className="converter__calculator">
                <span>Convert to</span>
                <CurrencySelector optionsList={Object.keys(this.props.rates)} className="converter__target-currency" />
                <button className="converter__calculator-button"> <ImArrowRight /> </button>
                <div className="converter__result">
                    <span className="converter__result-amount">3000</span>
                    <span className="converter__result-currency">USD</span>
                </div>
            </div>
        )
    }
}

export default CurrencyCalculator