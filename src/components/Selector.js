import React from "react";

class Selector extends React.Component {
    selectValue() {
        const optionsList = this.selectBlock.querySelectorAll('option')
        optionsList.forEach((option) => {
            option.value === this.props.selected && option.setAttribute('selected', true)

        })
    }

    render() {
        return (
            <select
                ref={(element) => this.selectBlock = element}
                onChange={() => {
                    setTimeout(() => {
                        this.props.edit(this.selectBlock.value, this.props.elementId)
                    }, 10)
                }}>

                {setTimeout(() => { this.selectValue() }, 10)}

                <option value="none" ></option>
                {
                    this.props.options.map((option) => {
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