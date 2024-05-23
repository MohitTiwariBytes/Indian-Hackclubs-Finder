import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
    const [sliderValue, setSliderValue] = useState(20); // Default value set to 50

    useEffect(() => {
        console.log(sliderValue); // Log the value whenever it changes
    }, [sliderValue]);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value); // Update state with the new slider value
    };

    return (
        <div className="slider-main">
            <h3>List of available Hack Clubs between the range of {sliderValue} kilometers</h3>
            <input
                type="range"
                id="slider"
                min={1}
                max={100}
                value={sliderValue}
                className='slider'
                onChange={handleSliderChange} // Attach the event handler
            />
        </div>
    );
};

export default Slider;
