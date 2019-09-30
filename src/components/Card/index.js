import React from "react";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currency : 0,
        symbol: this.props.symbol,
        data: this.props.data,
        base_currency: this.props.value,
        base: this.props.base,
        total: 0,
        delete:false,
        fullname:'',

    };
  }
  componentDidMount() {
      let data = this.props.data;
      data.forEach(item => {
          if(item['name'] === this.props.symbol){
            
            let total = parseFloat(item.currency?item.currency:1) * this.state.base_currency;
              this.setState({
                  currency: item.currency?item.currency:1,
                  nama:item.name,
                  fullname:item.fullname,
                  total: total.toLocaleString(undefined, {maximumFractionDigits:2}),
              })
          }
      });
  }
  deleteCard = () => {
    this.props.deleteCard(this.state.symbol);
}
  render() {
    const { currency, nama, total, fullname, base } = this.state;
    return (
      <div className="col-lg-4 col-md-6 col-sm-4 col-xs-12">
        <div className="cst-card bg-secondary">
          <button className="close-btn" onClick={this.deleteCard}>X</button>
          <div className="row">
            <div className="col">
              <div>
                <span>{nama}</span>
              </div>
              <p className="txt-success">{fullname}</p>
              <p>1 {base} = {nama} {currency}</p>
              {/* <p>
                <i className="fa fa-caret-up"></i>0.14%
              </p> */}
            </div>
            <div className="col">
              <span className="result-value">{total}</span>
            </div>
          </div>
          <img src="/img/acc1.png" className="add-on-img" />
        </div>
      </div>
    );
  }
}

export default Card;
