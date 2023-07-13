const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  mbti: {
    type: String,
    required: true,
    enum: ['ISFJ', 'ISTJ', 'ESFJ', 'ESTJ', 'ISFP', 'ISTP', 'ESFP', 'ESTP', 'INFJ', 'INTJ', 'ENFJ', 'ENTJ', 'INFP', 'INTP', 'ENFP', 'ENTP'],
  },
  enneagram: {
    type: String,
    required: true,
    enum: ['1w9', '1w2', '2w1', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6', '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1', '9w3'],
  },
  variant: {
    type: String,
    required: true,
    enum: ['sp/so', 'so/sp', 'sx/so', 'so/sx', 'sp/sx', 'sx/sp'],
  },
  tritype: {
    type: Number,
    required: true,
    min: 111,
    max: 999,
  },
  socionics: {
    type: String,
    required: true,
  },
  sloan: {
    type: String,
    required: true,
  },
  psyche: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => {
        const urlRegex = /^(https?:\/\/)([\w\-_]+(\.[\w\-_]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
        return urlRegex.test(url);
      },
      message: 'Invalid image URL',
    },
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;