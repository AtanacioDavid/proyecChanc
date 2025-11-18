
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    objectives: { type: String, required: true },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Esto crea una referencia al modelo User
    },
    isRecruiting: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
