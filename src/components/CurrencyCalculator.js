import React from "react";
import { ImArrowRight } from "react-icons/im"
import Selector from "./Selector"

class CurrencyCalculator extends React.Component {
    // rates = this.props.rates

    calculate() {
        console.log(this.props.rates)
    }


    render() {
        return (
            <div className="calculator">
                <span>Convert to</span>
                <Selector options={Object.keys(this.props.rates)} selected={this.props.currentCurrency} edit={this.props.editTargetCurrency} />
                <button className="calculator__calc-button" onClick={() => this.calculate()}> <ImArrowRight /> </button>
                <div className="calculator__result" >
                    <span className="calculator__result-amount">3000</span>
                    <span className="calculator__result-currency">USD</span>
                </div>
            </div>

        )
    }
}

export default CurrencyCalculator