import React, { Component } from 'react';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
import Row from './Row.jsx';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

class Export extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      days: 0,
      month: '',
      dayArr: [],
      showDownload: false,
    };
  }

  componentDidMount() {
    const days = new Date(year, month - 2, 0).getDate();
    const dayArr = [];
    for (let i = 1; i <= days; i++) {
      const obj = {
        day: i,
        total: '',
        gas: '',
        lotto: '',
        inside: '',
        beer: '',
        cigarette: '',
        remaining: '',
        soda: '',
        insideWDecimal: '',
        lotto50: '',
      };
      dayArr.push(obj);
    }
    this.setState({
      days,
      month: months[month - 1],
      dayArr,
    });
  }


  handleSelect(e) {
    const { value } = e.target;
    const newMonth = months.indexOf(value);
    const days = new Date(year, newMonth + 1, 0).getDate();
    const dayArr = [];
    for (let i = 1; i <= days; i++) {
      const obj = {
        day: i,
        total: '',
        gas: 0,
        lotto: '',
        inside: '',
        beer: '',
        cigarette: '',
        remaining: '',
        soda: '',
        insideWDecimal: '',
        lotto50: '',
      };
      dayArr.push(obj);
    }
    this.setState({
      days,
      month: months[newMonth],
      dayArr,
    });
  }


  handleInput(e, index) {
    const { dayArr } = this.state;
    dayArr[index][e.target.name] = parseInt(e.target.value);
    const inside = parseInt(dayArr[index].beer) + parseInt(dayArr[index].cigarette);
    const decimals = (Math.random() * 99).toFixed(2).toString().split('.')[1];
    const lotto50 = Math.random() >= 0.7;
    dayArr[index].inside = inside;
    dayArr[index].insideWDecimal = (dayArr[index].cigarette > 0 && dayArr[index].beer > 0) ? (inside).toString().concat('.', decimals) : 0;
    dayArr[index].lotto50 = (lotto50 && dayArr[index].lotto > 0) ? (dayArr[index].lotto).toString().concat('.50') : (dayArr[index].lotto).toString().concat('.00');
    this.setState({
      dayArr,
    });
  }

  renderContent() {
    const { showDownload, dayArr } = this.state;

    if (showDownload) {
      return (
        <ExcelFile>
          <ExcelSheet data={dayArr} name={months[month - 1]}>
            <ExcelColumn label="Total" value="total" />
            <ExcelColumn label="Gas" value="gas" />
            <ExcelColumn label="Lotto" value="lotto" />
            <ExcelColumn label="Inside" value="inside" />
            <ExcelColumn label="Beer" value="beer" />
            <ExcelColumn label="Cigarette" value="cigarette" />
            <ExcelColumn label="Remaining" value="remaining" />
            <ExcelColumn label="Soda" value="soda" />
            <ExcelColumn label="Inside W Decimal" value="insideWDecimal" />
            <ExcelColumn label="Lotto 50" value="lotto50" />
          </ExcelSheet>
        </ExcelFile>
      );
    }

    return (
      <div>
        <select onChange={this.handleSelect} value={month}>
          {
            months.map((month, i) =>
              <option value={month} key={i}>{month}</option>
            )
          }
        </select>
        <table id="pmi-tax-form">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total</th>
              <th>Gas</th>
              <th>Lotto</th>
              <th>Inside</th>
              <th>Beer</th>
              <th>Cigarette</th>
              <th>Remaining</th>
              <th>Soda</th>
              <th>Taxable</th>
              <th>Lotto w 50</th>
            </tr>
          </thead>
          <tbody>
            {
              dayArr.map((day, i) => (
                <Row day={day} handle={this.handleInput} index={i} key={i} />
              ))
            }
          </tbody>
        </table>
        <button onClick={() => this.setState({ showDownload: true })}>Done</button>
      </div>
    )
  }

  render() {
    const { month, days, dayArr } = this.state;

    return (
      <section id="export-excel">
        <h1>PMI Tax Helper</h1>
        { this.renderContent() }
      </section>
    );
  }
}

export default Export;
