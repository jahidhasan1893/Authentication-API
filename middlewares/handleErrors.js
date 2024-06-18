// handle errors
handleErrors = (err) =>{
    let errors = { email: '', password: '' };

    // duplicate error code

    if(err.code === 11000){
        errors.email= 'that email is already registered';
    }

    // validation error
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }

    // incorrect email

    if(err.message.includes('incorrect email')){
        errors.email = 'email is not registered';
    }

    // incorrect password

    if(err.message.includes('incorrect password')){
        errors.password = 'password is incorrect';
    }

    return { errors: errors };
}

module.exports = handleErrors;