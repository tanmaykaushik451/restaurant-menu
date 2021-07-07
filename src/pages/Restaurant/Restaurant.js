import React, { useEffect, useState } from 'react'
import {getRestaurants} from "./api"

const Restaurant = () => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        getRestaurants().then((res) => {
            setRestaurants(res?.data?.body?.Recommendations)
        }).catch((e) => {
            console.log(e)
        })
    }, [])


    
    console.log(restaurants, "r")

    const recursion = (item) => {
        console.log(item)
        return (
            <>
                {
                    item?.selected === 1 && <div key={item?.id} style={{ background: "blue" }}>
                        {item?.name}
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
                    <div key={restaurant?.RestaurantID} >
                        {restaurant?.RestaurantName}
                        {restaurant?.menu?.map((menuitem) => {
                            return (
                                <>
                                    {menuitem?.type === "sectionheader" && menuitem?.children?.map((item) => {
                                        return (
                                            <>
                                                {
                                                    item?.type == "item" && item?.selected === 1 &&
                                                    <div key={item?.id} style={{ background: "grey" }}>
                                                        {item?.name}
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
