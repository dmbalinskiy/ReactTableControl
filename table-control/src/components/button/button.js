function Button({handler, data, type, text, isEnabled= true}) {
    return (
        <button disabled={!isEnabled} className={type} onClick={() => handler(data)}>{text}</button>
    );
}

export default Button;