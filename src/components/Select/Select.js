import './select.css'
import { useState } from 'react'

const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`
    const [isOpened, setOpened] = useState(false)

    const optionHandler = e => {
        props.onChange(e)
        setOpened(false)
    }

    return (
        <div className="wrapper">
            <div className="toggle" onClick={() => setOpened(!isOpened)}>
                <div className="title">{props.label}</div>
                <img className={isOpened ? 'open' : ''} src="arrow-rounded-down.svg" />
            </div>
            {isOpened && (
                <div className="items-wrapper">
                    {props.options.map((currency, index) => {
                        return (
                            <div className='option' key={currency + index}>
                                <div onClick={optionHandler}>
                                    {currency}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div >
    )
}

export default Select