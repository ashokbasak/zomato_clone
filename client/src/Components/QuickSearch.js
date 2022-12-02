import React from "react";
import '../Styles/Home.css';
import QuickSearchItem from "./QuickSearchItems";

class QuickSearch extends React.Component{
    render(){
        const {mealtypesData} = this.props;
        return(
            <div>
                <h2 className="searchTitle">Quick Searches</h2>
                <h3 className="searchPara">Discover restaurants by type of meal</h3>
                
                <div className="item">
                    {mealtypesData?.map((items) => {
                        return(
                            <QuickSearchItem data = {items} />
                        )
                    })}
                         
                </div>
                
            </div>
        )
    }
}
export default QuickSearch;