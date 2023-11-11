import React from "react";
import Logo from "./Logo";
import { BsChevronDown } from "react-icons/bs"

//TODO: smooth opening about block

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            aboutActive: false
        }
    }

    render() {
        return (
            <header>
                <div className="container">
                    <div className="header">
                        <Logo />
                        <div className="header__about-button" onClick={() => {
                            this.setState({ aboutActive: !this.state.aboutActive })
                            if (!this.state.aboutActive) {
                                this.aboutChevron.className = 'rotate'
                            } else {
                                this.aboutChevron.className = 'rotate-reverse'
                                // void this.aboutChevron.offsetWidth
                            }
                        }}>
                            <p>About</p>
                            <div ref={(element) => this.aboutChevron = element} >
                                <BsChevronDown />
                            </div>
                        </div>
                    </div>
                    {this.state.aboutActive && <div className="header__about">
                        This service helps you manage your budget when you have savings stored in multiple currencies. It converts multiple currencies into one simultaneously and saves the history of your requests. The history of your requests is stored only in your browser and is not sent anywhere, so to manage your budget using this service, use the same browser. <br /> This service was created for personal use and for learning React.
                    </div>}
                </div>
            </header>
        )
    }
}

export default Header