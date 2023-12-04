import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from './Input';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import spike from './assets/spike.jpg';
import jet from './assets/jet.jpg';
import faye from './assets/faye.jpg';
import ed from './assets/edward.jpg';
import axios from 'axios';

const bebop = [
    {
        name: 'Spike Spiegel',
        phone: '123123123',
        id: uuidv4(),
        imgSrc: spike,
    },
    {
        name: 'Jet Black',
        phone: '123123123',
        id: uuidv4(),
        imgSrc: jet,
    },
    {
        name: 'Faye Valentine',
        phone: '123123123',
        id: uuidv4(),
        imgSrc: faye,
    },
    {
        name: 'Edward',
        phone: '123123123',
        id: uuidv4(),
        imgSrc: ed,
    },
];

const Dashboard = () => {
    const [searchContact, setSearchContact] = useState('');

    const location = useLocation();
    const [contacts, setContacts] = useState(location.state || bebop);
    const [filteredContacts, setFilteredContacts] = useState([]);

    const navigate = useNavigate();

    const buttonStyle = {
        width: 'fit-content',
    };

    // BACKEND EXPERIMENT
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/info');
                setSearchContact(response.data['sember']);
                console.log('oiiii fetch some data');
            } catch (error) {
                console.error('error while fetching data: ', error);
            }
        }

        fetchData();
    }, []);

    const find = () => {
        const results = contacts.filter((contact) => {
            return contact.name
                .toLowerCase()
                .includes(searchContact.toLowerCase());
        });

        setFilteredContacts(results);
    };

    const removeContact = (id) => {
        setContacts((prevContacts) =>
            prevContacts.filter((contact) => contact.id !== id)
        );
    };

    return (
        <>
            <div className="contactPage">
                <div className="leftPanel">
                    <h1>Main Menu</h1>
                    <Input value={searchContact} setter={setSearchContact} />
                    <button
                        type="button"
                        className="loginButton"
                        placeholder="search contacts"
                        style={buttonStyle}
                        onClick={find}
                    >
                        Search
                    </button>
                    <Link to="/add" state={contacts}>
                        {' '}
                        {/* Use Link for navigation */}
                        <button
                            type="button"
                            className="loginButton"
                            style={buttonStyle}
                        >
                            Add New Contact
                        </button>
                    </Link>
                </div>
                <div className="rightPanel">
                    {filteredContacts.length > 0
                        ? filteredContacts.map((contact) => (
                              <Card
                                  key={contact.id}
                                  id={contact.id}
                                  name={contact.name}
                                  phoneNumber={contact.phone}
                                  imgSrc={contact.imgSrc}
                                  yeet={removeContact}
                                  edit={() =>
                                      navigate(`/edit/${contact.id}`, {
                                          state: contacts,
                                      })
                                  }
                              />
                          ))
                        : contacts.map((contact) => (
                              <Card
                                  key={contact.id}
                                  id={contact.id}
                                  name={contact.name}
                                  phoneNumber={contact.phone}
                                  imgSrc={contact.imgSrc}
                                  yeet={removeContact}
                                  edit={() =>
                                      navigate(`/edit/${contact.id}`, {
                                          state: contacts,
                                      })
                                  }
                              />
                          ))}
                </div>
                <Link to="/">Back to login </Link>
            </div>
        </>
    );
};

export default Dashboard;
