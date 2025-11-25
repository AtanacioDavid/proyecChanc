
const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema({
    proposerName: String,
    proposerEmail: String,
    title: String,
    description: String,
    valueAdd: String,
    status: {
        type: String,
        enum: ['Pendiente', 'Aceptada', 'Rechazada'],
        default: 'Pendiente'
    }
}, { timestamps: true });

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
    neededRoles: [{
        type: String
    }],
    budget: {
        type: String,
        default: ''
    },
    videoUrl: {
        type: String,
        default: ''
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    integrations: [integrationSchema] // Array de propuestas de integración
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;