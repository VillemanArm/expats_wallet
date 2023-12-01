import React from "react";
import axios from "axios";
import { ImPlus, ImCross } from "react-icons/im";
import CurrencyBlock from "./CurrencyBlock";
import CurrencyCalculator from "./CurrencyCalculator";

class Converter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rates: "",
            targetCurrency: "none",
            result: "",
            isScrollbar: false,
        };

        this.getRates = this.getRates.bind(this);
        this.addCurrency = this.addCurrency.bind(this);
        this.clearCurrencies = this.clearCurrencies.bind(this);
        this.delCurrency = this.delCurrency.bind(this);
        this.editCurrencyCurrency = this.editCurrencyCurrency.bind(this);
        this.editCurrencyAmount = this.editCurrencyAmount.bind(this);
        this.editTargetCurrency = this.editTargetCurrency.bind(this);
        this.calculate = this.calculate.bind(this);
        this.checkScrollbar = this.checkScrollbar.bind(this);
    }

    componentDidMount() {
        this.getRates();
        this.checkScrollbar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.lastData !== this.props.lastData) {
            this.checkScrollbar();
        }
    }

    getRates() {
        const base = "USD";
        const currencies = "RUB,EUR,USD,AMD,GEL,CNY";
        const resolution = "1h";
        const url = `https://api.fxratesapi.com/latest?base=${base}&currencies=${currencies}&resolution=${resolution}&amount=1&places=6&format=json`;

        axios
            .get(url)
            .then((res) => {
                this.setState({ rates: res.data.rates });
            })
            .catch((err) => console.log(err));
    }

    addCurrency() {
        let currencyList = this.props.lastData;

        currencyList.push({
            id: currencyList[currencyList.length - 1].id + 1,
            currency: "none",
            amount: 0,
            error: "",
        });

        this.props.sendLastData(currencyList);
    }

    async clearCurrencies() {
        const currencyList = [
            {
                id: 1,
                currency: "none",
                amount: 0,
                error: "",
            },
        ];

        await this.props.sendLastData(currencyList);
        await this.setState({ result: "", isScrollbar: false });
    }

    async delCurrency(id) {
        const currencies = this.props.lastData.filter(
            (element) => element.id !== id
        );
        this.setState({ result: "" });
        this.props.sendLastData(currencies);
    }

    editCurrencyCurrency(currency, elementId) {
        let allCurrencies = this.props.lastData;
        const currentIndex = allCurrencies.findIndex(
            (element) => element.id === elementId
        );
        allCurrencies[currentIndex].currency = currency;
        this.setState({ result: "" });
        this.props.sendLastData(allCurrencies);
    }

    editCurrencyAmount(amount, elementId, error) {
        let allCurrencies = this.props.lastData;
        const currentIndex = allCurrencies.findIndex(
            (element) => element.id === elementId
        );
        allCurrencies[currentIndex].amount = amount;
        allCurrencies[currentIndex].error = error;
        this.setState({ result: "" });
        this.props.sendLastData(this.props.lastData);
    }

    editTargetCurrency(currency) {
        this.setState({ targetCurrency: currency, result: "" });
    }

    async calculate() {
        let result = 0;
        this.props.lastData.forEach((currency) => {
            const amount = currency.amount;
            const rate = this.state.rates[currency.currency];
            const targetRate = this.state.rates[this.state.targetCurrency];

            result += (amount / rate) * targetRate;
        });

        result = result.toFixed(2);
        await this.setState({ result: result });
        this.props.sendHistoryRecord(this.generateHistoryRecord());
    }

    generateHistoryRecord() {
        const date = new Date();
        const currentDate = date.toLocaleDateString();

        if (localStorage.expatsWallet) {
            let history = JSON.parse(localStorage.expatsWallet).history;

            return {
                id: history.length ? history[history.length - 1].id + 1 : 1,
                date: currentDate,
                amount: this.state.result,
                currency: this.state.targetCurrency,
            };
        } else {
            return {
                id: 1,
                date: currentDate,
                amount: this.state.result,
                currency: this.state.targetCurrency,
            };
        }
    }

    async checkScrollbar() {
        const converterCurrencies = document.querySelector(
            ".converter__currencies"
        );
        if (
            converterCurrencies.scrollHeight > converterCurrencies.offsetHeight
        ) {
            await this.setState({ isScrollbar: true });
        } else {
            await this.setState({ isScrollbar: false });
        }
    }

    render() {
        return (
            <div className="converter">
                <div>
                    <div className="converter__head">
                        <h1>Converter</h1>
                        <div>
                            {this.props.lastData.length !== 1 && (
                                <button
                                    className="converter__clear"
                                    onClick={this.clearCurrencies}
                                >
                                    <ImCross />
                                </button>
                            )}
                            {this.props.lastData.length < 20 && (
                                <button
                                    className="converter__add"
                                    style={
                                        this.state.isScrollbar
                                            ? { marginRight: "1.8rem" }
                                            : { marginRight: "0" }
                                    }
                                    onClick={async (event) => {
                                        await this.addCurrency();
                                        await this.checkScrollbar();
                                    }}
                                >
                                    <ImPlus />
                                </button>
                            )}
                        </div>
                    </div>
                    <div
                        className={
                            this.state.isScrollbar
                                ? "converter__currencies webkit-padding moz-padding"
                                : "converter__currencies"
                        }
                    >
                        {this.props.lastData.map((currency) => {
                            return (
                                <CurrencyBlock
                                    key={currency.id}
                                    currency={currency}
                                    del={this.delCurrency}
                                    currencies={Object.keys(this.state.rates)}
                                    currenciesAmount={
                                        this.props.lastData.length
                                    }
                                    editCurrency={this.editCurrencyCurrency}
                                    editAmount={this.editCurrencyAmount}
                                    checkScrollbar={this.checkScrollbar}
                                />
                            );
                        })}
                    </div>
                </div>
                <CurrencyCalculator
                    rates={this.state.rates}
                    currencies={this.props.lastData}
                    targetCurrency={this.state.targetCurrency}
                    result={this.state.result}
                    editTargetCurrency={this.editTargetCurrency}
                    calculate={this.calculate}
                />
            </div>
        );
    }
}

export default Converter;
