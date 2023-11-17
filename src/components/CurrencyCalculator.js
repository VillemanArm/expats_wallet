import React from "react";
import { ImArrowRight } from "react-icons/im"
import Selector from "./Selector"

class CurrencyCalculator extends React.Component {

    render() {
        return (
            <div className="calculator">
                <span>Convert to</span>
                <Selector options={Object.keys(this.props.rates)} selected={this.props.targetCurrency} edit={this.props.editTargetCurrency} />
                <button className="calculator__calc-button" onClick={() => this.props.calculate()}> <ImArrowRight /> </button>
                <div className="calculator__result" >
                    <span className="calculator__result-amount">{this.props.result}</span>
                    <span className="calculator__result-currency">{this.props.targetCurrency}</span>
                </div>
            </div>

        )
    }
}

export default CurrencyCalculator