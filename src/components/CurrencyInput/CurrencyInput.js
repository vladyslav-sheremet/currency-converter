import PropTypes from 'prop-types'
import './currency-input.css'
import Select from '../Select/Select'

function CurrencyInput(props) {
    console.log(props.currency)
    return (
        <div className='group'>
            <input type="text" value={props.amount} onChange={e => props.onAmountChange(e.target.value)} />
            <Select
                label={props.currency}
                value={props.currency}
                onChange={e => props.onCurrencyChange(e.target.innerHTML)}
                options={props.currencies}
            />
        </div>
    )
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
}

export default CurrencyInput