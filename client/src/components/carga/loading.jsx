import React from 'react'
import loading from './loading.module.css'


const Loading = () => {
    return (
        <div className={loading.containImg}>
            <h1>Loading</h1>
            <img src="https://i.pinimg.com/originals/36/2b/5d/362b5d9a9da5157d54ad40ed586f16e3.gif" alt="Img not found" />
        </div>
    )
}

export default Loading;