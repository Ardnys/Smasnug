const Input = ({ type = 'text', value, setter }) => {
    const inputStyle = {
        fontSize: '32px',
        padding: '0px 15px',
    };
    return (
        <input
            style={inputStyle}
            type={type}
            value={value}
            onChange={(event) => setter(event.target.value)}
        />
    );
};

export default Input;
