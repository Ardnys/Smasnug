import { useState } from 'react';
import Input from './Input';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    let navigate = useNavigate();

    const add = () => {
        let path = '/dashboard';
        navigate(path);
    };
    return (
        <>
            <div className="addContactPage">
                <Input value={name} setter={setName} />
                <Input value={phone} setter={setPhone} />
                <button type="button" className="loginButton" onClick={add}>
                    Add
                </button>
            </div>
        </>
    );
};

export default AddContact;
