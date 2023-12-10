import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import Input from './Input';
import { useLocation, useNavigate } from 'react-router-dom';
import contactLogo from './assets/contact.jpg';
import defaultLogo from './assets/default.jpg';

const AddContact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { state } = useLocation();
  const [userId, setUserId] = useState(state.state || null);

  let navigate = useNavigate();

  async function postData(contact) {
    try {
      const response = await fetch(`/api/user/${userId}/bebop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });
    } catch (error) {
      console.error('ERROR: could not post item to database: ', error);
    }
  }
  const add = () => {
    const contact = {
      name: name,
      phone: phone,
      id: 0, // not needed
      imgSrc: defaultLogo //also doesn't work but oh well
    };
    postData(contact);
    // if i add the new contact to database,
    // i don't have to pass the new contacts like that
    let path = '/dashboard';
    navigate(path, { state: userId });
  };

  return (
    <>
      <div className="addContactPage">
        <img
          src={contactLogo}
          className="contactLogo"
          alt="a placeholder silouhette of a man"
        />
        <label>Name</label>
        <Input value={name} setter={setName} />
        <label>Phone</label>
        <Input value={phone} setter={setPhone} />
        <button className="addContactButton" type="button" onClick={add}>
          Add
        </button>
      </div>
    </>
  );
};

export default AddContact;
