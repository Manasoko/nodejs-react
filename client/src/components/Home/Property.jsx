import propTypes from 'prop-types';
import '../../assets/Css/property.css'

function Property(props) {
    return (

        <div className="property-detail">
            <div className="property-img">
                <img src={`src/assets/images/${props.image}`} alt="An house" />
                {props.isSold && <h4 className='sold-banner'>Sold</h4>}
            </div>
            <div className="property-info">
                <p>{props.price}</p>
                <h3>{props.address}</h3>
                <p className='property-description'>{props.description}</p>
            </div>
        </div>
    )
}

Property.propTypes = {
    image: propTypes.string.isRequired,
    address: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    size: propTypes.string.isRequired,
    numberOfBedroom: propTypes.number.isRequired,
    description: propTypes.string.isRequired,
    isSold: propTypes.bool
}

export default Property;