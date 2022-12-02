import React from 'react';
import axios from 'axios';
import '../Styles/Home.css';
import Welcome from './Welcome';
import QuickSearch from './QuickSearch';

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            locations: [],
            mealtype: []
        }
    }

    componentDidMount(){
        sessionStorage.clear();
        axios({
            url: 'http://localhost:5500/location',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({ locations: res.data.location})
        })
        .catch(err => console.log(err))

        axios({
            url: 'http://localhost:5500/mealtype',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({ mealtypes: res.data.mealtype})
        })
        .catch(err => console.log(err))
    }
    render(){
        const { locations, mealtypes } = this.state;
        return(
            <div>
                {/* Header */}
                <Welcome locationData = { locations } />
                
                {/* Quick Search */}
                <QuickSearch mealtypesData = {mealtypes} />
            </div>
        )
    }
}
export default Home;