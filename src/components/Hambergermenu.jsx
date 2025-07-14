import React from 'react'
import './Hambergermenu.css'

const Hambergermenu = () => {
    return (
        <div>
            <label className="bar" for="check">
                <input type="checkbox" id="check"/>

                    <span className="top"></span>
                    <span className="middle"></span>
                    <span className="bottom"></span>
            </label>
        </div>
    )
}

export default Hambergermenu
