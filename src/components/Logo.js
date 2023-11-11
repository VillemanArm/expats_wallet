import React from "react";
import { CiWallet } from "react-icons/ci";

class Logo extends React.Component {
    render() {
        return (
            <div className="logo">
                <CiWallet />
                <div>
                    <p className="logo__name">Expat's wallet</p>
                    <p className="logo__description">multicurrency converter</p>
                </div>
            </div>

        )
    }
}

export default Logo