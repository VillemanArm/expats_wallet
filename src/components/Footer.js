import React from "react";
import Logo from "./Logo";

const Header = () => {
    return (
        <footer>
            <div className="container footer">
                <Logo />
                <div className="footer__description">
                    <p>
                        This is an educational project, but if it's convenient
                        for you to use it, I can transfer it to a special
                        domain.
                    </p>
                    <p>
                        You can send suggestions and wishes to my email <a href="mailto:mishchenko.maksim.1988@gmail.com?subject=Expat's wallet wishes">
                            mishchenko.maksim.1988@gmail.com</a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Header;
