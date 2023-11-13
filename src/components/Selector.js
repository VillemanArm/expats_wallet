import React from "react";

class Selector extends React.Component {

    render() {
        return (
            <select >
                <option value="none" defaultValue></option>
                {this.props.optionsList.map((option) => {
                    return (
                        <option value={option} key={option}>{option}</option>
                    )
                })}

            </select>
        )
    }
}

export default Selector