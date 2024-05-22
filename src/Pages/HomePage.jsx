import React from "react";
import "./HomePage.css";
import Input from "../Components/Input";

const HomePage = () => {
    return (
        <div className="main-home-page">
            <div className="header">
                <h1 className="title">Indian Hack-Clubs Finder</h1>
            </div>

            <div className="main">
                <Input placeholder={"Where are you?"}></Input>
                <button className="lg">Search</button>
            </div>
        </div>
    )
}

export default HomePage