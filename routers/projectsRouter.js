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
            if (project) {
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
            if (projectActions) {
                res.json(projectActions);
            }
            else {
                res.status(404)
                    .json({ message: "The project with this id does not exist." });
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "Project information could not be retrieved" })
        })
})

router.post('/', (req, res) => {
    const project = req.body;
    if (project) {
        projectsDB.insert(project).then(projectId => {
            projectsDB.get(projectId.id)
                .then(project => {
                    res.status(201).json(project);
                });
        })

            .catch(err => {
                res.status(500)
                    .json({ error: "There was an error adding project to the database." })
            })
    }

    else {
        res.status(400)
            .json({ errorMessage: "Please provide the name, desciption, and completed boolean for the project." });
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    projectsDB.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: "Project removed succesfully." });
            }
            else {
                res.status(404)
                    .json({ message: "The project with the specified ID does not exist. " });
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "The project could not be removed." });
        })
})

router.put('/:id', (req, res) => {
    const project = req.body;
    const { id } = req.params;
    if (project.name) {
        projectsDB.update(id, project)
            .then(count => {
                if (count) {
                    projectsDB.get(id)
                        .then(project => {
                            res.json(project);
                        });
                }

                else {
                    res.status(404)
                        .json({ message: "The project with the specified ID does not exist. " });
                }
            })

            .catch(err => {
                res.status(500)
                    .json({ error: "The project info could not be modified." });
            })
    }

    else {
        res.status(400)
            .json({ errorMessage: "Please provide the name, desciption, and completed boolean for the project." });
    }
})

module.exports = router;