import React from "react";
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';

const QuickSearchItem = (props) => {
    const { mealtype, content, image, mealtypeId } = props.data;

    const navigate = useNavigate();

    const ShowFilter = (mealtypeId) => {
        const locationId = sessionStorage.getItem('locationId');
        if (locationId){
            navigate(`/filter?mealtype=${mealtypeId}&location=${locationId}`)
        }else{
            navigate(`/filter?mealtype=${mealtypeId}`)
        }
    }
    
        return(
            <div>
                
                <div className="item1" onClick={() => ShowFilter(mealtypeId)} >
                    <div className="item-left">
                        <img className="dish-img" src={`./images/${image}`} alt="" />
                    </div>

                    <div className="item-right">
                        <h4>{mealtype}</h4>
                        <p className="item-right-para">{content}</p>
                    </div>
                </div>

            </div>
        )
    
}
export default QuickSearchItem;