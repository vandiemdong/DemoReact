import React, { Component } from 'react';
import './Products.css';

export class Products extends Component {
    static products = Products.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Products.renderForecastsTable(this.state.forecasts.data);

        return (

            <div>
                <h1 id="tabelLabel" >Product list</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>

        );
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <div className='row'>
                {forecasts.map(forecast =>
                    <div key={forecast.id} className='col-md-3'>
                        <div className='card'>
                            <img alt='' src={forecast.image} style={{ width: '100%', height: '185px' }} />
                            <h4 className='brand-name'>{forecast.brandName}</h4><h5 className="product-name">{forecast.name}</h5>
                            <p className='price'>{forecast.price}</p><p><button>Review</button></p>
                        </div>
                    </div>
                )}

            </div>
        );
    }

    async populateWeatherData() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://xsperatest.azurewebsites.net/api/products/getall';
        const response = await fetch(proxyurl + url);
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
