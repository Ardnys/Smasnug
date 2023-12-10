import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Input from './Input';
import contactLogo from './assets/contact.jpg';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const location = useLocation();
  const user_id = location.state;

  const editContact = async (contact) => {
    try {
      const response = await fetch(`/api/user/${user_id}/bebop`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(contact)
      });
    } catch (error) {
      console.error('ERROR: could not send patch request for editing: ', error);
    }
  };

  const handleSave = () => {
    const contact = { id: id, name: name, phone: phone };
    editContact(contact);
    navigate('/dashboard', { state: user_id });
  };
  return (
    <>
      <div className="editPage">
        <h1>Edit contact</h1>
        <img
          src={contactLogo}
          className="defaultLogo"
          alt="a placeholder silouhette of a man"
        />
        <label>Name</label>
        <Input value={name} setter={setName} />
        <label>Phone</label>
        <Input value={phone} setter={setPhone} />
        <button className="addContactButton" type="button" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default Edit;
