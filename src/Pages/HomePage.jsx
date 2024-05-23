import React from "react";
import "./HomePage.css";
import Input from "../Components/Input";
import Slider from "../Components/Slider";


const HomePage = () => {
    return (
        <div className="main-home-page">
            <div className="header">
                <h1 className="title">Indian Hack-Clubs Finder</h1>
            </div>

            <div className="search-bar">
                <Input placeholder={"Where are you?"}></Input>
                <button className="lg">Search</button>
            </div>
            <div className="action-btns">
                <Slider></Slider>
            </div>
        </div>
    )
}

export default HomePage