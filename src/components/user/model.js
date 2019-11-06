// IMPORT OF MODULES
const { Schema, model }  = require('mongoose');
const bcrypt = require('bcrypt');


// SCHEMA DEFINITION
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required.']
    },
    password: {
        type: String,
        minlength: 4,
        required: [true, 'The password is required.']
    },
    image: {
        type: String
    }
});


// ENCRYPTION METHOD SETTINGS
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// DO NOT RETURN PASSWORD
UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

};

// EXPORT MODEL
const User = model('User', UserSchema);

module.exports = User;