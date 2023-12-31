import React from "react";
import { ImArrowRight } from "react-icons/im"
import Selector from "./Selector"

class CurrencyCalculator extends React.Component {
    render() {
        return (
            <div className="calculator">
                <div className="calculator__options">
                    <span>Convert to</span>
                    <Selector options={Object.keys(this.props.rates)} selected={this.props.targetCurrency} edit={this.props.editTargetCurrency} />
                    {(this.props.targetCurrency !== 'none'
                        && this.props.currencies.every((element) => element.currency !== 'none')
                        && this.props.currencies.every((element) => !element.error)
                    ) &&

                        <button className="calculator__calc-button" onClick={() => this.props.calculate()}> <ImArrowRight /> </button>

                    }
                </div>
                <div className="calculator__result" >
                    <span className="calculator__result-amount">{this.props.resultFormat(this.props.result)}</span>
                    {window.innerWidth > 768 
                        ? (this.props.result && this.props.result < 9999999) && <span className="calculator__result-currency">{this.props.targetCurrency}</span>
                        : this.props.result  && <span className="calculator__result-currency">{this.props.targetCurrency}</span>
                    }
                </div>
            </div>
        )
    }
}

export default CurrencyCalculator