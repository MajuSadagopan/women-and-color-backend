const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = {
  attributes: {
    email: {
      type: 'string',
      unique: true,
      email: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    isAdmin: {
      type: 'boolean',
      default: false
    },
    profile: {
      collection: 'profile',
      via: 'user'
    }
  },
  beforeCreate: (user, next) => {
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
      if (err) {
        next(err)
      } else {
        user.password = hash;
        next();
      }
    });
  }
};

