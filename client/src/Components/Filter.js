import React from "react";
import "../Styles/Filter.css";
import axios from "axios";
import withNavigateHook from "./HOC";

const queryString = require("query-string");

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: [],
      locations: [],
      mealtype: undefined,
      location: undefined,
      cuisine: undefined,
      lowCost: undefined,
      highCost: undefined,
      sort: 1,
      page: 1,
    };
  }
  componentDidMount() {
    const qs = queryString.parse(window.location.search);
    const { mealtype, location } = qs;

    const filterObj = {
      mealtype: mealtype,
      location: location,
    };

    axios({
      url: "http://localhost:5500/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((res) => {
        this.setState({ restaurant: res.data.restaurant, mealtype, location });
      })
      .catch((err) => console.log(err));

    axios({
      url: "http://localhost:5500/location",
      method: "GET",
      headers: { "Content-Type": "application/JSON" },
    })
      .then((res) => {
        this.setState({ locations: res.data.location });
      })
      .catch((err) => console.log(err));
  }
  handleSortChange = (sort) => {
    const { mealtype, cuisine, location, lowCost, highCost, page } = this.state;

    const filterObj = {
      mealtype: mealtype,
      cuisine: cuisine,
      location: location,
      lowCost,
      highCost,
      page,
      sort,
    };
    axios({
      url: "http://localhost:5500/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((res) => {
        this.setState({ restaurant: res.data.restaurant, sort });
      })
      .catch((err) => console.log(err));
  };

  handleCostChange = (lowCost, highCost) => {
    const { cuisine, mealtype, location, sort, page } = this.state;

    const filterObj = {
      mealtype: mealtype,
      cuisine: cuisine,
      location: location,
      lowCost,
      highCost,
      page,
      sort,
    };
    axios({
      url: "http://localhost:5500/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((res) => {
        this.setState({ restaurant: res.data.restaurant, lowCost, highCost });
      })
      .catch((err) => console.log(err));
  };

  handleLocationChange = (event) => {
    const location = event.target.value;
    const { mealtype, cuisine, sort, lowCost, highCost, page } = this.state;

    const filterObj = {
      mealtype: mealtype,
      cuisine: cuisine,
      location: location,
      lowCost,
      highCost,
      page,
      sort,
    };
    axios({
      url: "http://localhost:5500/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((res) => {
        this.setState({ restaurant: res.data.restaurant, location });
      })
      .catch((err) => console.log(err));
  };
  handleNavigate = (resId) => {
    this.props.navigation(`/details?restaurant=${resId}`);
  };

  render() {
    const { restaurant, locations } = this.state;
    const { navigation } = this.props;
    return (
      <>
      
      <div>
        {/* New start */}
        <div>
          <div id="myId" className="heading_filter">
            Breakfast Places in Mumbai
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3 col-md-3 col-lg-3 filter-options">
                <div className="filter-heading">Filters / Sort</div>
                <span
                  className="glyphicon glyphicon-chevron-down toggle-span"
                  data-toggle="collapse"
                  data-target="#filter"
                ></span>
                <div id="filter" className="collapse show">
                  <div className="Select-Location">Select Location</div>
                  <select
                    className="Rectangle-2236"
                    onChange={this.handleLocationChange}
                  >
                    <option default>Select Location</option>
                    {locations.map((item, index) => {
                      return (
                        <option value={item.locationId} key={index}>
                          {`${item.location}`}
                        </option>
                      );
                    })}
                  </select>
                  <div className="Cuisine">Cuisine</div>
                  <div style={{ display: "block" }}>
                    <input type="checkbox" />
                    <span className="checkbox-items">North Indian</span>
                  </div>
                  <div>
                    <input type="checkbox" />
                    <span className="checkbox-items">South Indian</span>
                  </div>
                  <div>
                    <input type="checkbox" />
                    <span className="checkbox-items">Chineese</span>
                  </div>
                  <div>
                    <input type="checkbox" />
                    <span className="checkbox-items">Fast Food</span>
                  </div>
                  <div>
                    <input type="checkbox" />
                    <span className="checkbox-items">Street Food</span>
                  </div>
                  <div className="Cuisine">Cost For Two</div>
                  <div>
                    <input
                      type="radio"
                      name="cost"
                      onChange={() => this.handleCostChange(1, 500)}
                    />
                    <span className="checkbox-items">
                      Less than &#8377; 500
                    </span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="cost"
                      onChange={() => this.handleCostChange(500, 1000)}
                    />
                    <span className="checkbox-items">
                      &#8377; 500 to &#8377; 1000
                    </span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="cost"
                      onChange={() => this.handleCostChange(1000, 1500)}
                    />
                    <span className="checkbox-items">
                      &#8377; 1000 to &#8377; 1500
                    </span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="cost"
                      onChange={() => this.handleCostChange(1500, 2000)}
                    />
                    <span className="checkbox-items">
                      &#8377; 1500 to &#8377; 2000
                    </span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="cost"
                      onChange={() => this.handleCostChange(2000, 5000)}
                    />
                    <span className="checkbox-items">&#8377; 2000 +</span>
                  </div>
                  <div className="Cuisine">Sort</div>
                  <div>
                    <input
                      type="radio"
                      name="sort"
                      onChange={() => this.handleSortChange(1)}
                    />
                    <span className="checkbox-items">Price low to high</span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="sort"
                      onChange={() => this.handleSortChange(-1)}
                    />
                    <span className="checkbox-items">Price high to low</span>
                  </div>
                </div>
              </div>
              {/* Filter Results */}
              <div className="col-sm-7 col-md-7 col-lg-7">
                {restaurant.length != 0 ? (
                  restaurant.map((item, index) => {
                    return (
                      <div
                        className="Item"
                        onClick={() => this.handleNavigate(item._id)} key={index}
                      >
                        <div>
                          <div className="small-item vertical">
                            <img className="img" src={`./images/${item.image}`} />
                          </div>
                          <div className="big-item">
                            <div className="rest-name">{item.name}</div>
                            <div className="rest-location">{item.city}</div>
                            <div className="rest-address">{item.locality}</div>
                          </div>
                        </div>
                        <hr />
                        <div>
                          <div className="margin-left">
                            <div className="Bakery">
                              CUISINES :{" "}
                              {item.cuisine.map((data) => `${data.name}, `)}
                            </div>
                            <div className="Bakery">
                              COST FOR TWO : ₹{item.min_price}{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-elements"> No Results found .... </div>
                )}

                {restaurant ?.length != 0 ? (
                  <div className="pagination">
                    <a href="#">&laquo;</a>
                    <a href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#">6</a>
                    <a href="#">&raquo;</a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
export default withNavigateHook(Filter);
