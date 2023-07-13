const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 60,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 30,
        maxlength: 200,
    },
    mbti: {
        type: String,
        required: true,
        enum: ['ISFJ', 'ISTJ', 'ESFJ', 'ESTJ', 'ISFP', 'ISTP', 'ESFP', 'ESTP', 'INFJ', 'INTJ', 'ENFJ', 'ENTJ', 'INFP', 'INTP', 'ENFP', 'ENTP'],
        votes: [{
            value: {
                enum: ['ISFJ', 'ISTJ', 'ESFJ', 'ESTJ', 'ISFP', 'ISTP', 'ESFP', 'ESTP', 'INFJ', 'INTJ', 'ENFJ', 'ENTJ', 'INFP', 'INTP', 'ENFP', 'ENTP'],
            },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Profile'
            }
        }]
    },
    enneagram: {
        type: String,
        required: true,
        enum: ['1w9', '1w2', '2w1', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6', '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1', '9w3'],
        votes: [{
            value: {
                enum: ['1w9', '1w2', '2w1', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6', '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1', '9w3'],
            },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Profile'
            }
        }]
    },
    zodiac: {
        type: String,
        required: true,
        enum: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"],
        votes: [{
            value: {
                enum: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"],
            },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Profile'
            }
        }]
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }] 
})