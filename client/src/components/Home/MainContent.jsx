import Slides from "./Slides";
import Property from "./Property";
import Team from "./Team";
import propertyData from "./data/property-data";

function MainContent() {
    const property = propertyData.map(prop => {
        return (<Property
            key={prop.id}
            address={prop.address}
            image={prop.image}
            price={prop.price}
            size={prop.size}
            numberOfBedroom={prop.numberOfBedroom}
            description={prop.description}
            isSold={prop.isSold}
        />);
    })

    return (
        <main>
            <Slides />
            <section id="properties">
                <h2>Popular Properties</h2>
                <div className="property">
                    {property}
                </div>
                <button className="custom-btn btn-3"><span>View Properties</span></button>
            </section>
            <section id="team">
                <h3>Our Team</h3>
                <div className="team-members">
                    <Team
                        name="Ethan Jameson"
                        image="src\assets\images\team2.jpg"
                        title="Real Estate Agent"
                        description="Ethan is a seasoned real estate agent with over 10 years of experience in the field"
                        phoneNumber="+234 803 123 4567"
                    />
                    <Team
                        name="Benjamin Carter"
                        image="src\assets\images\team3.jpg"
                        title="Founder"
                        description="He founded this company in 2014 with the aim of helping guests and resident of Nigeria to buy houses and land across the 36 states"
                        phoneNumber="+234 805 987 6543"
                    />
                    <Team
                        name="Olivia Bennett"
                        image="src\assets\images\team1.jpg"
                        title="Sales Associate"
                        description="Olivia Bennett is a dedicated Sales Associate at a real estate firm, known for her expert guidance and commitment to helping clients achieve their property goals."
                        phoneNumber="+234 806 234 7890"
                    />
                </div>
            </section>
        </main>
    )
}

export default MainContent;