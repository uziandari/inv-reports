import React, { Component } from 'react';
import Request from 'superagent';

const apiBaseUrl = "http://localhost:3001/reports/";

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
        let sku = res.body;
        this.setState({skus: [...this.state.skus, sku]})
      });
  }
  
  render() {
    return (
      <div className="search-sku">
        {console.log('skus', this.state.skus)}
         { (this.state.skus.length > 0) ? 
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
            : null
         }
      </div>
    );
  }
}

