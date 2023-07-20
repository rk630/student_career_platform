const mongoose = require('mongoose');

// defining the EXPERIENCE SCHEMA
const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 0
  }
});

// EDUCATION SCHEMA 
const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    default: ''
  },
  degree: {
    type: String,
    default: ''
  },
  year: {
    type: Number,
    default: 0
  }
});

// SKILL SCHEMA
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  proficiency: {
    type: String,
    
    default: 'basic'
  }
});

// PROJECT SCHEMA
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  technologies: {
    type: [String],
    default: []
  },
  link: {
    type: String,
    default: ''
  }
});





// Define the schema
const resumeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch',
    required: true
  },
  about: {
    type: String
  },

  contactInformation: {
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    github: {
      type: String
    },
    twitter: {
      type: String
    },
    lindkedIn: {
      type: String
    },
    facebook: {
      type: String
    }
  },
  education: [educationSchema],
  experience: [experienceSchema],
  skills: [skillSchema],
  projects: [projectSchema],
  image: {
    type: String,
    default: ''
  },
  resumePdf: {
    type: String,
    default: ''
  }
});

// Create the model
const Resume = mongoose.model('Resume', resumeSchema);


module.exports = {
  Resume,

};
