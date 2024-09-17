import { useState } from "react";
import '../../assets/Css/side.css';
import axios from "axios";

function Register() {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState();

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:7070/api/add-user', inputs);
            console.log('User added', response);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.error);
            } else if(error.response.status === 422) {
                setError(error.response.data.error);
            } else {
                console.log(error)
                setError('An unexpected error occurred. Please try again.');
            }
        }
    }

    return (
        <div className="main-form-page">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="username">Username</label>
                <input type="text"
                    id="username"
                    name="username"
                    value={inputs.username || ''}
                    onChange={handleChange}
                />

                <label htmlFor="email">Email Address</label>
                <input type="email"
                    id="email"
                    name="email"
                    value={inputs.email || ''}
                    onChange={handleChange}
                />
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={inputs.phoneNumber || ''}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input type="password"
                    id="password"
                    name="password"
                    value={inputs.password || ''}
                    onChange={handleChange}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={inputs.confirmPassword || ''}
                    onChange={handleChange}
                />
                <button type="submit" className="btn" id="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
export default Register;