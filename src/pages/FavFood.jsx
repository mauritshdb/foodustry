import React from "react";
import { useEffect, useState } from 'react';
import "../css/FavFood.css"
import { IconContext } from "react-icons";
import * as AiIcons from 'react-icons/ai';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import getFav from "../api_folder/ApiFavFood";
import Axios from 'axios';

function FavFood() {
    const [favFood, setFavFood] = useState([]);
    const isLogin = Boolean(localStorage.getItem("token") || false)

    useEffect(() => {
        if (isLogin) {
            getData();
        } else {
            window.location.assign('/login')
        }
    }, [])

    const getData = () => {
        getFav().then((res) => {
            setFavFood(res.data.data)
        })
    }

    const handleLike = (id, isLike) => {
        if (isLogin) {
            if (isLike) {
                return Axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_BASEURL}/api/v1/unlike`,
                    headers: {
                        apiKey: `${process.env.REACT_APP_APIKEY}`,
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    data: { foodId: id },
                }).then(res => {
                    getData();
                })
            } else {
                return Axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_BASEURL}/api/v1/like`,
                    headers: {
                        apiKey: `${process.env.REACT_APP_APIKEY}`,
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    data: { foodId: id },
                }).then(res => {
                    getData();
                })
            }
        } else {
            alert('login first');
            window.location.assign('/login');
        }
    }

    return (
        <div className="zxc">
            <div className="c1">
                {favFood.map((item, index) => {
                    return (
                        <Card key={index} text='light' bg='dark' border='secondary'>
                            <Card.Header>
                                <div className='ccTitle'>
                                    <Card.Title>{item.name.toUpperCase()}</Card.Title>
                                </div>
                            </Card.Header>
                            <Card.Img variant='mid' src={item.imageUrl} style={{ height: '300px', objectFit: 'cover', position: 'relative' }} />

                            <Badge pill bg="light" text='dark' className='pillRating'>
                                <IconContext.Provider value={{ color: 'orange' }}>
                                    <AiIcons.AiFillStar />
                                    {item.rating}
                                </IconContext.Provider>
                            </Badge>{' '}
                            <Badge pill bg="light" text='dark' className='pillLikes' onClick={() => handleLike(item.id, item.isLike)}>
                                <IconContext.Provider value={{ color: `${item.isLike ? "red" : "grey"}` }}>
                                    <AiIcons.AiFillHeart />
                                    {item.totalLikes}
                                </IconContext.Provider>
                            </Badge>{' '}

                            <Card.Body>
                                <Card.Title>{item.name}{item.isLike}
                                </Card.Title>
                                <Card.Text>
                                    {item.description}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Ingredients
                                </Card.Subtitle>
                                <div className='wholePill'>
                                    {favFood.map((item0, i) => {
                                        return (
                                            <div key={i} className="pillBadge">
                                                <div className='cPill'>
                                                    <Badge pill bg="secondary" text='dark'>
                                                        {item.ingredients[i]}
                                                    </Badge>{' '}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default FavFood;