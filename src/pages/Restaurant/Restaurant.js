import React, { useEffect, useState } from 'react';
import {getRestaurants} from "./api";
import Item from './components/Item';
import "./Restaurant.css";

const Restaurant = () => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        getRestaurants().then((res) => {
            setRestaurants(res?.data?.body?.Recommendations)
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    const recursion = (item) => {
        return (
            <>
                {
                    item?.selected === 1 && <div className="sub-menu-item" key={item?.id}>
                        <Item name={item?.name}/>
                        {item?.children?.map((subitem) => {
                            return (
                                <>
                                    {recursion(subitem)}
                                </>
                            )
                        })}
                    </div>
                }
            </>
        )
    }


    return (
        <div>
            {restaurants?.map((restaurant) => {
                return (
                    <div className="menu-item" key={restaurant?.RestaurantID} >
                        <Item name={restaurant?.RestaurantName}/>
                        {restaurant?.menu?.map((menuitem) => {
                            return (
                                <>
                                    {menuitem?.type === "sectionheader" && menuitem?.children?.map((item) => {
                                        return (
                                            <>
                                                {
                                                    item?.type == "item" && item?.selected === 1 &&
                                                    <div className="sub-menu-item" key={item?.id}>
                                                        <Item name={item?.name}/>
                                                        {item?.children?.map((d) => {
                                                            return (
                                                                <>
                                                                    {recursion(d)}
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                }
                                            </>
                                        )

                                    })}
                                </>

                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Restaurant
