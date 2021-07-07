import React, { useEffect, useState } from 'react';
import Loader from '../../layout/Loader';
import {getRestaurants} from "./api";
import Item from './components/Item/Item';
import "./Restaurant.css";


const Restaurant = () => {

    const [restaurants, setRestaurants] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getRestaurants().then((res) => {
            setRestaurants(res?.data?.body?.Recommendations)
            setLoading(false)
        }).catch((e) => {
            console.log(e)
            setLoading(false)
        })
    }, [])

    const recursionMenu = (item) => {
        return (
            <>
                {
                    item?.selected === 1 && <div className="sub-menu-item" key={item?.id}>
                        <Item name={item?.name}/>
                        {item?.children?.map((subitem) => {
                            return (
                                <>
                                    {recursionMenu(subitem)}
                                </>
                            )
                        })}
                    </div>
                }
            </>
        )
    }


    return (
        <>
        {!loading ? <div className="my-3 d-flex flex-column">
            <div>
                <h3 className="font-bold">Restauraunt Menu</h3>
            </div>
            <div>
            {restaurants?.map((restaurant) => {
                return (
                    <div className="my-1" key={restaurant?.RestaurantID} >
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
                                                                    {recursionMenu(d)}
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
        </div> : <Loader/>}
        </>
    )
}

export default Restaurant
