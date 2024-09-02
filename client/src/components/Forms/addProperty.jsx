import { useState } from "react";
import '../../assets/Css/side.css';

function AddProperty() {
    const [inputs, setInputs] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);


        // Optionally, read the file contents using a FileReader
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // Do something with the file contents (e.g., display them)
                console.log(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleData = async event => {
        event.preventDefault();
        console.log(inputs);
    };

    return (
        <div className="main-form-page">
            <form className="add-properties-form" onSubmit={handleData}>
                <label htmlFor="propertyAddress">Property Address</label>
                <input type="text"
                    id="propertyAddress"
                    name="propertyAddress"
                    value={inputs.propertyAddress || ''}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price</label>
                <input type="text" id="price"
                    name="price"
                    value={inputs.price || ''}
                    onChange={handleChange}
                />
                <label htmlFor="imageUrl">Image Url</label>
                <input type="file" id="imageUrl" name="imageUrl" accept="image/png, image/jpeg" value={inputs.imageUrl || ''}
                    onChange={handleFileChange} multiple />
                {selectedFile && <p className="file-text">Selected file: {selectedFile.name}</p>}
                <label htmlFor="propertyType">Type of Property</label>
                <select name="propertyType" id="propertyType" onChange={handleChange} value={inputs.propertyType || ''}>
                    <option>Land</option>
                    <option>Residential Properties</option>
                    <option>Commercial Properties</option>
                    <option>Investment Properties</option>
                </select>
                <label htmlFor="description">Property Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={inputs.description || ''}
                    onChange={handleChange}
                />
                <input type="submit" className="btn" id="submit" value="Login" />
            </form>
        </div>
    );
}

export default AddProperty;