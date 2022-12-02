import React from "react";
import '../Styles/Home.css';
import axios from 'axios';
import withNavigateHook from './HOC';

class Welcome extends React.Component{
    constructor() {
        super();
        this.state = {
            restaurants: [],
            inputText: undefined,
            suggestions: []
        }
    }

    handleLocationChange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);

        axios({
            url: `http://localhost:5500/restaurant/${locationId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurant })
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (event) => {
        const { restaurant } = this.state;
        const inputText = event.target.value;

        let suggestions = [];

        suggestions = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestions });
    }

    selectingRestaurant = (resObj) => {
        this.props.navigation(`/details?restaurant=${resObj}`);
    }

    showSuggestion = () => {
        const { suggestions, inputText } = this.state;

            if (suggestions.length == 0 && inputText == undefined) {
                return null;
            }
            
            if (suggestions.length > 0 && inputText == '') {
                return null;
            }
            
            if (suggestions.length == 0 && inputText) {
                return 
                    <li>No Search Results Found</li>
            }

        return (
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingRestaurant(item._id)} >
                        <img className="resImg" src={`./images/${item.image}`} />
                        <span className="resName">{`${item.name}`}</span> <br /> 
                        <span className="resLoc">{`${item.locality}, ${item.city}`} </span> <hr className="line" /> </li>))
        );

    }

    render(){
        const { locationData } = this.props
        return(
            <div>
                <div className="">
                    <img className="headerImg" src="./images/back1.avif" alt="backgroundImage" />
                    <h1 className="logo">aliments</h1>

                </div>
                <div className="search-area">

                    <select className="" id="search" onChange={this.handleLocationChange}>
                        <option value="0">Select</option>
                            { locationData.map((item) => {
                                return(
                                    <option value={item.locationId} >
                                        {`${item.location}`}
                                    </option>
                                )
                            })}
                    </select>
                    <div className="input-field">
                        <i className="glyphicon glyphicon-search glimph"></i>
                        <div>
                            <input type="text" className="searchIn" placeholder=" Search for restaurant, foods here" onChange={this.handleInputChange} />
                            <ul className="suggestion" >{this.showSuggestion()}</ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withNavigateHook(Welcome);