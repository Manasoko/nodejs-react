import {useState} from "react";
import "../../assets/Css/side.css";

function Contact() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    const handleData = event => {
        event.preventDefault();
        console.table(inputs);
    };

    return (
        <main className="main-form-page">
            <form onSubmit={handleData} className="contact-form">
                <div className="user-details">
                    <label htmlFor="username">Name</label>
                    <input type="text"
                           name="username"
                           id="username"
                           value={inputs.username || ''}
                           onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input type="email"
                           name="email"
                           id="email"
                           value={inputs.email || ''}
                           onChange={handleChange}
                    />
                    <label htmlFor="phone">Phone </label>
                    <input type="tel" name="phone" id="phone" value={inputs.phone || ''} onChange={handleChange}/>
                </div>
                <div id="message-box">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" value={inputs.message || ''}
                              onChange={handleChange}></textarea>
                </div>
                <input type="submit" id="submit"/>
            </form>
        </main>
    );
}

export default Contact;