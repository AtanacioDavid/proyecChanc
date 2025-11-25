
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/projects
// @desc    Obtener todos los proyectos
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({}).populate('leader', 'name email').sort({ isFeatured: -1, createdAt: -1 }); // Ordenar: Primero destacados, luego por fecha
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// @route   POST /api/projects
// @desc    Crear un nuevo proyecto
// @access  Private (solo usuarios logueados)
router.post('/', protect, async (req, res) => {
    const { name, description, location, objectives, neededRoles, budget, videoUrl, isRecruiting } = req.body;
    try {
        const project = new Project({
            name,
            description,
            location,
            objectives,
            leader: req.user._id,
            neededRoles,
            budget,
            videoUrl,
            isRecruiting
        });
        const createdProject = await project.save();
        const populatedProject = await Project.findById(createdProject._id).populate('leader', 'name email');
        res.status(201).json(populatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// @route   PUT /api/projects/:id/toggle-recruitment
// @desc    Cambiar el estado de reclutamiento de un proyecto
// @access  Private (solo el líder del proyecto)
router.put('/:id/toggle-recruitment', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        // Verificar que el usuario que hace la petición es el líder del proyecto
        if (project.leader.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }

        project.isRecruiting = !project.isRecruiting;
        await project.save();
        
        // Populamos el líder para devolver el proyecto actualizado completo
        const updatedProject = await Project.findById(project._id).populate('leader', 'name email');
        res.json(updatedProject);

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// @route   POST /api/projects/:id/integrate
// @desc    Enviar una propuesta de integración a un proyecto
// @access  Private
router.post('/:id/integrate', protect, async (req, res) => {
    const { title, description, valueAdd } = req.body;
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        const proposal = {
            proposerName: req.user.name,
            proposerEmail: req.user.email,
            title,
            description,
            valueAdd,
            status: 'Pendiente'
        };

        project.integrations.push(proposal);
        await project.save();

        res.json({ message: 'Propuesta de integración enviada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});


module.exports = router;