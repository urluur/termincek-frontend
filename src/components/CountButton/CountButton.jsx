import React, { useState } from 'react'

const CountButton = (props) => {

    const [count, setCount] = useState(props.zacetna)

    const handleClick = () => {
        setCount(count + props.korak)
    }



    return (
        <div className='p-5 text-center'>
            <button className='border py-2 px-4 rounded-full bg-green-400 font-medium duration-500 hover:bg-green-700 text-white cursor-pointer'
                onClick={handleClick} >+{props.korak}</button>
            <div className='text-center'>{count}</div>
        </div>
    )
}

export default CountButton