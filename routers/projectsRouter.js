const express = require('express');
const projectsDB = require('../data/helpers/projectModel.js');

const router = express.Router();

//CRUD TIME
router.get('/', (req, res) => {
    projectsDB.get()
        .then((projects) => {
            res.json(projects);
        })

        .catch(err => {
            res.status(500)
                .json({ error: "Project information could not be retrieved." });
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectsDB.get(id)
        .then((project) => {
            if(project) {
                res.json(project);
            }
            else {
                res.status(404)
                    .json({ message: "The project with this id does not exist. " });
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "Project information could not be retrieved." });
        })
})

router.get('/actions/:projectId', (req, res) => {
    const { projectId } = req.params;
    projectsDB.getProjectActions(projectId)
        .then((projectActions) => {
            if(projectActions) {
                res.json(projectActions);
            }
            else {
                res.status(404)
                    .json({ message: "The project with this id does not exist." });
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "Project information could not be retrieved"})
        })
})
module.exports = router;