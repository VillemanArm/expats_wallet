import React from "react";

class Selector extends React.Component {
    selectValue() {
        const options = this.optionBlock.querySelectorAll('option')
        options.forEach((option) => {
            option.value === this.props.currentCurrency.currency && option.setAttribute('selected', true)

        })
    }

    render() {
        return (
            <select
                ref={(element) => this.optionBlock = element}
                onChange={() => {
                    this.props.currentCurrency && setTimeout(() => {
                        this.props.currentCurrency.currency = this.optionBlock.value
                        this.props.onEdit(this.props.currentCurrency)
                    }, 10)
                }}>

                {this.props.currentCurrency && setTimeout(() => { this.selectValue() }, 10)}

                <option value="none" ></option>
                {
                    this.props.optionsList.map((option) => {
                        return (
                            <option value={option} key={option}>{option}</option>
                        )
                    })
                }

            </select >
        )
    }
}

export default Selector