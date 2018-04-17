import React, { Component } from 'react';

class Row extends Component {
  render() {
    const { day, handle, index } = this.props;
    const { total, gas, lotto, inside, beer, cigarette, remaining, soda, insideWDecimal, lotto50 } = day;
    return (
      <tr>
        <td>{ day.day }</td>
        <td><input onChange={(e) => handle(e, index)} name="total" type="text" value={total} tabIndex="1" /></td>
        <td><input value="0" name="gas" disabled /></td>
        <td><input onChange={(e) => handle(e, index)} name="lotto" type="text" value={lotto} tabIndex="2" /></td>
        <td><input value={ (total > 0 && lotto > 0) ? parseInt(total) - parseInt(lotto) : 0 } disabled /></td>
        <td><input onChange={(e) => handle(e, index)} name="beer" type="text" value={beer} tabIndex="3" /></td>
        <td><input onChange={(e) => handle(e, index)} name="cigarette" type="text" value={cigarette} tabIndex="4" /></td>
        <td><input onChange={(e) => handle(e, index)} name="remaining" type="text" value={remaining} tabIndex="5" /></td>
        <td><input onChange={(e) => handle(e, index)} name="soda" type="text" tabIndex="6" /></td>
        <td><input value={insideWDecimal} disabled /></td>
        <td><input value={lotto50} disabled /></td>
      </tr>
    );
  }
}

export default Row;
