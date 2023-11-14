import React from "react";

class Selector extends React.Component {
    selectValue() {
        const options = this.optionBlock.querySelectorAll('option')
        options.forEach((option) => {
            option.value === this.props.currentValue && option.setAttribute('selected', true)

        })
    }

    render() {
        return (
            <select
                ref={(element) => this.optionBlock = element}
                onLoad={this.props.currentValue && setTimeout(() => { this.selectValue() }, 10)}>

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