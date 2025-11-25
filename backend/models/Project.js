
const mongoose = require('mongoose');

// Esquema para las propuestas de integración
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

// Esquema para la bitácora de avances (updates)
const updateSchema = new mongoose.Schema({
    date: { type: String, required: true }, // Podrías usar Date, pero string 'YYYY-MM-DD' es fácil para el MVP
    title: { type: String, required: true },
    description: String,
    imageUrl: String
});

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    objectives: { type: String, required: true },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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
    // Nuevos campos agregados para completar la funcionalidad
    likes: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Idea', 'Prototipo', 'Validado', 'En Escala'],
        default: 'Idea'
    },
    incubatedBy: {
        type: String,
        default: ''
    },
    updates: [updateSchema], // Array de bitácora
    integrations: [integrationSchema] // Array de propuestas
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
