import propTypes from 'prop-types';
import '../../assets/Css/team.css'

function Team(props) {
    return (<div className="team-member">
        <img src={props.image} />
        <h3>{props.name}</h3>
        <p>{props.title}</p>
        <div className="phone">
            <span></span>
            <p><b>{props.phoneNumber}</b></p>
        </div>
        <p>{props.description}</p>
    </div>)
}

Team.propTypes = {
    image: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    phoneNumber: propTypes.string.isRequired,
    description: propTypes.string.isRequired
}

export default Team;