import React, { Component } from 'react';
import Request from 'superagent';

const apiBaseUrl = "http://localhost:3000/reports/";

export default class LessNineReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skus: []
    }
  }

  componentDidMount() {
    Request
      .get(apiBaseUrl + 'lessnine')
      .end( (err, res) => {
        if (err) {
          console.log(err)
        }
        console.log(res)
        this.setState({skus: res.body})
      });
  }

  render() {
    return (
      <div className="search-sku">
        <ul>
        {
          this.state.skus.map((sku) =>
            <li key={sku._id}>
              {sku._id}
              <hr />
            </li>
          )
        }
        </ul>
      </div>
    );
  }
}

