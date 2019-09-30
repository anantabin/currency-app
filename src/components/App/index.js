import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "../Navigation";
import Modal from "react-responsive-modal";
import Card from "../Card";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: localStorage.getItem('data')?JSON.parse(localStorage.getItem('data')):[],
      currency: localStorage.getItem('currency')?JSON.parse(localStorage.getItem('currency')):["IDR", "EUR", "GBP", "SGD"],
      base: localStorage.getItem('base')?JSON.parse(localStorage.getItem('base')):"USD",
      isFetching: true,
      base_currency: localStorage.getItem('base_currency')?JSON.parse(localStorage.getItem('base_currency')):10,
      modalOpen: false,
      newCard: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.baseCurrencyChange = this.baseCurrencyChange.bind(this);
  }
  getData(base = this.state.base) {
    let apiUrl = "https://api.exchangeratesapi.io/latest?base=" + base;
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        result => {
          let hasil = [];
          hasil = [
            {
              name: "CAD",
              fullname: "Canadian dollar",
              currency: result.rates.CAD
            },
            {
              name: "HKD",
              fullname: "Hong Kong dollar",
              currency: result.rates.HKD
            },
            {
              name: "ISK",
              fullname: "	Icelandic króna",
              currency: result.rates.ISK
            },
            {
              name: "PHP",
              fullname: "Philippine peso",
              currency: result.rates.PHP
            },
            {
              name: "DKK",
              fullname: "Danish krone",
              currency: result.rates.DKK
            },
            {
              name: "HUF",
              fullname: "Hungarian forint",
              currency: result.rates.HUF
            },
            {
              name: "CZK",
              fullname: "Czech koruna",
              currency: result.rates.CZK
            },
            {
              name: "AUD",
              fullname: "Australian dollar",
              currency: result.rates.AUD
            },
            {
              name: "RON",
              fullname: "Romanian leu",
              currency: result.rates.RON
            },
            {
              name: "SEK",
              fullname: "Swedish krona",
              currency: result.rates.SEK
            },
            {
              name: "IDR",
              fullname: "Indonesian rupiah",
              currency: result.rates.IDR
            },
            {
              name: "INR",
              fullname: "Indian rupee",
              currency: result.rates.INR
            },
            {
              name: "BRL",
              fullname: "	Brazilian real",
              currency: result.rates.BRL
            },
            {
              name: "RUB",
              fullname: "Russian ruble",
              currency: result.rates.RUB
            },
            {
              name: "HRK",
              fullname: "Croatian kuna",
              currency: result.rates.HRK
            },
            {
              name: "JPY",
              fullname: "Japanese yen",
              currency: result.rates.JPY
            },
            {
              name: "THB",
              fullname: "Thai baht",
              currency: result.rates.THB
            },
            {
              name: "CHF",
              fullname: "Swiss franc",
              currency: result.rates.CHF
            },
            {
              name: "SGD",
              fullname: "Singapore dollar",
              currency: result.rates.SGD
            },
            {
              name: "PLN",
              fullname: "Polish zloty",
              currency: result.rates.PLN
            },
            {
              name: "BGN",
              fullname: "Bulgarian lev",
              currency: result.rates.BGN
            },
            {
              name: "TRY",
              fullname: "Turkish lira",
              currency: result.rates.TRY
            },
            {
              name: "CNY",
              fullname: "Chinese yuan",
              currency: result.rates.CNY
            },
            {
              name: "NOK",
              fullname: "Norwegian krone",
              currency: result.rates.NOK
            },
            {
              name: "NZD",
              fullname: "New Zealand dollar",
              currency: result.rates.NZD
            },
            {
              name: "ZAR",
              fullname: "South African rand",
              currency: result.rates.ZAR
            },
            {
              name: "USD",
              fullname: "United States dollar",
              currency: result.rates.USD
            },
            {
              name: "MXN",
              fullname: "Mexican peso",
              currency: result.rates.MXN
            },
            {
              name: "ILS",
              fullname: "Israeli new shekel",
              currency: result.rates.ILS
            },
            {
              name: "GBP",
              fullname: "British pound",
              currency: result.rates.GBP
            },
            {
              name: "KRW",
              fullname: "South Korean won",
              currency: result.rates.KRW
            },
            {
              name: "MYR",
              fullname: "Malaysian ringgit",
              currency: result.rates.MYR
            },
            {
              name: "EUR",
              fullname: "Euro",
              currency: result.rates.EUR
            }
          ];
          let cek = this.renderItem();
          this.setState({
            data: hasil,
            base: base,
            isFetching: false
          });
          localStorage.setItem('base', JSON.stringify(base));
          localStorage.setItem('data', JSON.stringify(hasil));
        },
        error => {
          this.setState({ error });
        }
      );
  }
  componentDidMount() {
    this.getData();
    this.timer = setInterval(() => this.getData(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  handleChange(event) {
    this.setState({
      isFetching: true
    });
    this.getData(event.target.value);
  }
  handleAddCard(event) {
    // console.log(event.target.value);
    
    this.setState({
      newCard: event.target.value
    });
  }

  baseCurrencyChange(data) {
    this.setState({
      isFetching: true,
      base_currency: data.target.value
    });
    localStorage.setItem('base_currency', JSON.stringify(data.target.value));

    this.getData();
  }
  handleDeleteCard = value => {
    let filter = this.state.currency.filter(currency => currency !== value);
    this.setState({
      currency: filter
    });
    localStorage.setItem('currency', JSON.stringify(filter));
  };

  toggleModal = event => {
    event.preventDefault();
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  addCard = event => {
    event.preventDefault();
    let arr = this.state.currency;
    let value = this.state.newCard;
    arr.push(value);
    this.setState({
      isFetching: true,
      currency: arr,
      modalOpen: !this.state.modalOpen
    });
    localStorage.setItem('currency', JSON.stringify(arr));
  };

  renderItem = () => {
    return this.state.currency.map(row => (
      <Card
        base={this.state.base}
        value={this.state.base_currency}
        symbol={row}
        key={row}
        data={this.state.data}
        deleteCard={this.handleDeleteCard}
      />
    ));
  };
  renderModal = () => {
    return (
      <div class="modal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  renderOption = (data, currency = []) => {
    return (
      <option value={data["name"]} key={data["name"]}>
        {data["fullname"]}
      </option>
    )
  };
  render() {
    const { base_currency, data, modalOpen } = this.state;
    return (
      <Router>
        <link
          rel="stylesheet"
          type="text/css"
          href="//fonts.googleapis.com/css?family=Quicksand"
        />
        <div className="container-fluid">
          <Navigation />
          <div className="row justify-content-center">
            <div className="col-md-10 ">
              <label>Base Currency : </label>
              <form className="form-row form-modal">
                <div className="col-xs-12 col-md-4">
                  <select
                    className="form-control"
                    value={this.state.base}
                    onChange={this.handleChange}
                  >
                    {data.map(row => this.renderOption(row))}
                  </select>
                </div>
                <div className="col-xs-12 col-md-4">
                  <input
                    className="form-control"
                    type="number"
                    name="base-currency"
                    defaultValue={base_currency}
                    onChange={this.baseCurrencyChange}
                  ></input>
                </div>
                <div className="col-xs-12 col-md-4 d-none d-md-block d-sm-none ">
                  <button
                    className="btn btn-success form-control"
                    onClick={this.toggleModal}
                  >
                    <i className="fa fa-plus"></i> Add Currency
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-10 col-xs-12">
              <div className="row ">
                {this.state.data && this.state.isFetching == false
                  ? this.renderItem()
                  : null}
              </div>
            </div>

            <div className=" d-block d-sm-block d-md-none currency-btn">
              <button className="btn btn-success " onClick={this.toggleModal}>
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <Modal open={modalOpen} onClose={this.toggleModal}>
          <div className="form-modal">
            <div>
              <label>Choose Currency</label>
              <select className="form-control" onChange={this.handleAddCard}>
                {data.map(row => this.renderOption(row))}
              </select>
            </div>
            <div>
              <button
                className="btn btn-success pull-right"
                onClick={this.addCard}
              >
                <i className="">Save</i>
              </button>
            </div>
          </div>
        </Modal>
      </Router>
    );
  }
}
export default App;
