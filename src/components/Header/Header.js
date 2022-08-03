import PropTypes from 'prop-types'
import './header.css'

function Header(props) {
    return (
        <header>
            <div className='currency-wrapper'>
                EUR/UAH {props.amountEUR}
            </div>
            <div className='currency-wrapper'>
                USD/UAH {props.amountUSD}
            </div>
        </header>
    )
}

Header.propTypes = {
    amount: PropTypes.number.isRequired,
}

export default Header