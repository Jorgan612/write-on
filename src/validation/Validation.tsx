interface ValidationProp {
    email: string;
}

function Validation({email}: ValidationProp) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailFormatted = emailRegex.test(email);

    const verifyEmailFormatting = () => {

    }
    
}

export default Validation;