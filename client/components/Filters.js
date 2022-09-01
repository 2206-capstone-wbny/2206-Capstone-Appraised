import React, { Component } from "react";
import accounting from "accounting";

const priceFormat = (price) => {
  return accounting.formatMoney(price, { symbol: "$", precision: 0 });
};

class Filter extends Component {
  render() {
    const { handleFilterChange, resetFilter, currentMinPrice } = this.props;
    return (
      <form ref={(input) => (this.form = input)} className="filter">
        Filters:
        <div className="filterBar">
          <label htmlFor="filterBedrooms"># Bedrooms: </label>
          <select
            name="filterBedrooms"
            id="filterBedrooms"
            onChange={(event) => {
              handleFilterChange(event);
            }}
          >
            <option value="any">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5+">5+</option>
          </select>
        </div>
        <div className="filterBar">
          <label htmlFor="filterBathrooms"># Bathrooms: </label>
          <select
            name="filterBathrooms"
            id="filterBathrooms"
            onChange={(event) => {
              handleFilterChange(event);
            }}
          >
            <option value="any">Any</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4+</option>
          </select>
        </div>
        <div className="filterBar">
          <label htmlFor="minPrice">Min. Price: </label>
          <select
            name="minPrice"
            id="minPrice"
            onChange={(event) => {
              handleFilterChange(event);
            }}
          >
            <option value="0">Any</option>
            <option value="500000">{priceFormat(500000)}</option>
            <option value="600000">{priceFormat(600000)}</option>
            <option value="700000">{priceFormat(700000)}</option>
            <option value="800000">{priceFormat(800000)}</option>
            <option value="900000">{priceFormat(900000)}</option>
          </select>
        </div>
        <div className="filterBar">
          <label htmlFor="maxPrice">Max Price: </label>
          <select
            name="maxPrice"
            id="maxPrice"
            onChange={(event) => {
              handleFilterChange(event);
            }}
          >
            <option value="999999999">Any</option>
            <option value="600000">{priceFormat(600000)}</option>
            <option value="700000">{priceFormat(700000)}</option>
            <option value="800000">{priceFormat(800000)}</option>
            <option value="900000">{priceFormat(900000)}</option>
            <option value="1000000">{priceFormat(1000000)}+</option>
          </select>
        </div>
        <div className="filterBar">
          <label htmlFor="sortPrice">Order By: </label>
          <select
            name="sortPrice"
            id="sortPrice"
            onChange={(event) => {
              handleFilterChange(event);
            }}
          >
            <option value="any">Default</option>
            <option value="0">Price: Low to High</option>
            <option value="1">Price: High to Low</option>
          </select>
        </div>
        <div id="clearFilterBtn">
          <button onClick={(event) => resetFilter(e, this.form)}>Clear</button>
        </div>
      </form>
    );
  }
}

export default Filter;
