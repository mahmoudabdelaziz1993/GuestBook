const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { timestamps: true })

/** virtual token field  */
UserSchema.virtual('token').get(function () {
    return jwt.sign({ id: this.id, name: this.name }, process.env.JWT_TOKEN_SEC);
});

/** Hashing password  */
UserSchema.pre('save', async function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

/** Comparing hashed password   */
UserSchema.methods.comparePassword = async function (pass) {
    password = pass.toString();
    return await bcrypt.compare(password, this.password);
};

UserSchema.statics.isValidUser = async function (email, password) {
    let user = await this.findOne({ email });
    let check = await user.comparePassword(password);
    if (check) return user;
    throw new Error('user is not exist :( ');
}

module.exports = mongoose.model("User", UserSchema);