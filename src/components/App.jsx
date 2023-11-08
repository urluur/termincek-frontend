import React from 'react'
import CountButton from './CountButton/CountButton'

const App = (props) => {
    return (
        <div>
            <h1>App</h1>
            <CountButton zacetna={0} korak={10} color={"blue"} />
            <CountButton zacetna={0} korak={2} />
        </div>

    )
}

export default App