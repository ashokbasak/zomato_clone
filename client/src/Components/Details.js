import React from "react";
import "../Styles/Details.css";
import queryString from "query-string";
import axios from "axios";
import Modal from "react-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
      resId: undefined,
      galleryModalIsOpen: false,
      menuItemsModalIsOpen: false,
      menuItems: [],
      subTotal: 0,
      formModalIsOpen: false,
    };
  }

  componentDidMount() {
    const qs = queryString.parse(window.location.search);
    const { restaurant } = qs;

    axios({
      url: `http://localhost:5500/restaurant/${restaurant}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        this.setState({ restaurant: res.data.restaurant, resId: restaurant });
      })
      .catch((err) => console.log(err));
  }

  handleModal = (state, value) => {
    const { resId } = this.state;
    if (state == "menuItemsModalIsOpen" && value == true) {
      axios({
        url: `http://localhost:5500/menuitems/${resId}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          this.setState({ menuItems: res.data.restaurant });
        })
        .catch((err) => console.log(err));
    }
    this.setState({ [state]: value });
  };

  addItems = (index, operationType) => {
    let total = 0;
    const items = [...this.state.menuItems];
    const item = items[index];

    if (operationType == "add") {
      item.qty += 1;
    } else {
      item.qty -= 1;
    }

    items[index] = item;

    items.map((item) => {
      total += item.qty * item.price;
    });
    this.setState({ menuItems: items, subTotal: total });
  };

  initPayment = (data) => {
    const options = {
      key: "rzp_test_mWFDJZGB8koxRG",
      amount: data.amount,
      currency: data.currency,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5500/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  handlePayment = async () => {
    const { subTotal } = this.state;

    try {
      const orderUrl = "http://localhost:5500/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: subTotal });
      console.log(data);
      this.initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      restaurant,
      galleryModalIsOpen,
      menuItemsModalIsOpen,
      menuItems,
      subTotal,
      formModalIsOpen,
    } = this.state;
    return (
      <div>
        <div className="bodyDetail">
          <div>
            <img
              className="detail_img"
              src={`./images/${restaurant.image}`}
              alt="No Image, Sorry for the Inconvinience"
              width="100%"
              height="350"
            />
            <button
              className="button"
              onClick={() => this.handleModal("galleryModalIsOpen", true)}
            >
              Click to see Image Gallery
            </button>
          </div>
          <div className="heading">{restaurant.name}</div>
          <button
            className="btn-order"
            onClick={() => this.handleModal("menuItemsModalIsOpen", true)}
          >
            Place Online Order
          </button>

          <div className="tabs">
            <div className="tab">
              <input type="radio" id="tab-1" name="tab-group-1" checked />
              <label for="tab-1">Overview</label>

              <div className="content">
                <div className="about">About this place</div>
                <div className="head">Cuisine</div>
                <div className="value">
                  {restaurant &&
                    restaurant.cuisine &&
                    restaurant.cuisine.map((cuisine) => `${cuisine.name}, `)}
                </div>
                <div className="head">Average Cost</div>
                <div className="value">
                  &#8377; {restaurant.min_price} for two people(approx)
                </div>
              </div>
            </div>

            <div className="tab">
              <input type="radio" id="tab-2" name="tab-group-1" />
              <label for="tab-2">Contact</label>
              <div className="content">
                <div className="head">Phone Number</div>
                <div className="value">{restaurant.contact_number}</div>
                <div className="head">{restaurant.name}</div>
                <div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={galleryModalIsOpen} style={customStyles}>
          {/* <div
            className="glyphicon glyphicon-remove"
            style={{ float: "right", margin: "0px 0px 10px 0px" }}
            onClick={() => this.handleModal("galleryModalIsOpen", false)}
          ></div> */}

          <Carousel showThumbs={false} showStatus={false}>
            {restaurant?.thumb?.map((item) => {
              return (
                <>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() =>
                      this.handleModal("galleryModalIsOpen", false)
                    }
                  >
                    back
                  </button>
                  <div>
                    <img className="gallary_img" src={`./images/${item}`} />
                  </div>
                </>
              );
            })}
          </Carousel>
        </Modal>
        <Modal isOpen={menuItemsModalIsOpen} style={customStyles}>
          <div>
            <div
              class="glyphicon glyphicon-remove"
              style={{ float: "right", marginBottom: "10px" }}
              onClick={() => this.handleModal("menuItemsModalIsOpen", false)}
            ></div>
            <div className="top">
              <br />
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <h3 className="item-total">SubTotal : {subTotal} </h3>
              <button
                className="btn btn-danger order-button pay"
                onClick={() => {
                  this.handleModal("menuItemsModalIsOpen", false);
                  this.handleModal("formModalIsOpen", true);
                }}
              >
                {" "}
                Pay Now
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => this.handleModal("menuItemsModalIsOpen", false)}
              >
                back
              </button>
              {menuItems.map((item, index) => {
                return (
                  <div
                    style={{
                      width: "44rem",
                      marginTop: "10px",
                      marginBottom: "10px",
                      borderBottom: "2px solid #dbd8d8",
                    }}
                  >
                    <div
                      className="card"
                      style={{ width: "43rem", margin: " auto" }}
                    >
                      <div
                        className="row"
                        style={{ paddingLeft: "10px", paddingBottom: "10px" }}
                      >
                        <div
                          className="col-xs-9 col-sm-9 col-md-9 col-lg-9 "
                          style={{ paddingLeft: "10px", paddingBottom: "10px" }}
                        >
                          <span className="card-body">
                            <h5 className="item-name">{item.name}</h5>
                            <h5 className="item-price">&#8377;{item.price}</h5>
                            <p className="item-descp">{item.description}</p>
                          </span>
                        </div>
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                          <img
                            className="card-img-center title-img"
                            src={`./images/${item.image}`}
                            style={{
                              height: "75px",
                              width: "75px",
                              borderRadius: "20px",
                              marginTop: "12px",
                              marginLeft: "3px",
                            }}
                          />
                          {item.qty == 0 ? (
                            <div>
                              <button
                                className="add-button"
                                onClick={() => this.addItems(index, "add")}
                              >
                                Add
                              </button>
                            </div>
                          ) : (
                            <div className="add-number">
                              <button
                                onClick={() =>
                                  this.addItems(index, "substract")
                                }
                              >
                                -
                              </button>
                              <span class="qty">{item.qty}</span>
                              <button
                                onClick={() => this.addItems(index, "add")}
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                className="card"
                style={{
                  width: "44rem",
                  marginTop: "10px",
                  marginBottom: "10px",
                  margin: "auto",
                }}
              ></div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={formModalIsOpen}
          style={{
            height: "600px",
            width: "600px",
            margin: "auto",
            alignItems: "center",
          }}
        >
          <div className="form">
            <div
              className="glyphicon glyphicon-remove"
              style={{ float: "right", marginBottom: "10px" }}
              onClick={() => this.handleModal("formModalIsOpen", false)}
            ></div>
            <h2>{restaurant.name}</h2>
            <div>
              <label>Name : </label>
              <input
                className="form-control"
                style={{ width: "400px" }}
                type="text"
                placeholder="Enter your Name"
              />
            </div>
            <div>
              <label>Email : </label>
              <input
                className="form-control"
                style={{ width: "400px" }}
                type="text"
                placeholder="Enter your Email"
              />
            </div>
            <div>
              <label>Address: </label>
              <input
                className="form-control"
                style={{ width: "400px" }}
                type="text"
                placeholder="Enter your Address"
              />
            </div>
            <div>
              <label>Contact Number : </label>
              <input
                className="form-control"
                style={{ width: "400px" }}
                type="tel"
                placeholder="Enter your Contact Details"
              />
            </div>
            <button
              className="btn btn-success"
              style={{ marginTop: "20px" }}
              onClick={this.handlePayment}
            >
              Proceed
            </button>
            <button
              className="btn btn-danger"
              style={{ marginTop: "20px" }}
              onClick={() => this.handleModal("formModalIsOpen", false)}
            >
              Back
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Details;
