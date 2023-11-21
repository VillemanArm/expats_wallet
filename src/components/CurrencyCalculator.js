import React from "react";
import { ImArrowRight } from "react-icons/im"
import Selector from "./Selector"

class CurrencyCalculator extends React.Component {
    resultFormat(result) {
        if (result) {
            if (result < 99999999) {
                return result
            } else {
                return Math.round(result)
            }
        }
    }

    render() {
        return (
            <div className="calculator">
                <div className="calculator__options">
                    <span>Convert to</span>
                    <Selector options={Object.keys(this.props.rates)} selected={this.props.targetCurrency} edit={this.props.editTargetCurrency} />
                    {(this.props.targetCurrency !== 'none' && this.props.currencies.every((element) => element.currency !== 'none')) &&

                        <button className="calculator__calc-button" onClick={() => this.props.calculate()}> <ImArrowRight /> </button>

                    }
                </div>
                <div className="calculator__result" >
                    <span className="calculator__result-amount">{this.resultFormat(this.props.result)}</span>
                    <span className="calculator__result-currency">{!this.props.result ? 'result' : this.props.result < 99999999 && this.props.targetCurrency}</span>
                </div>
            </div>

        )
    }
}

export default CurrencyCalculator