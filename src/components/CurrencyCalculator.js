import React from "react";
import { ImArrowRight } from "react-icons/im"
import CurrencySelector from "./CurrencySelector"

class CurrencyCalculator extends React.Component {


    render() {
        return (
            <div className="calculator">
                <span>Convert to</span>
                <CurrencySelector optionsList={Object.keys(this.props.rates)} className="converter__target-currency" />
                <button className="calculator__calc-button"> <ImArrowRight /> </button>
                <div className="calculator__result">
                    <span className="calculator__result-amount">3000</span>
                    <span className="calculator__result-currency">USD</span>
                </div>
            </div>
        )
    }
}

export default CurrencyCalculator