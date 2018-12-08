const express = require('express');
const actionsDB = require('../data/helpers/actionModel.js');

const router = express.Router();

//CRUD TIME
router.get('/', (req, res) => {
    actionsDB.get()
        .then((actions) => {
            res.json(actions);
        })

        .catch(err => {
            res.status(500)
                .json({ error: "Action information could not be retrieved." });
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionsDB.get(id)
        .then((action) => {
            if(action) {
                res.json(action);
            }
            else {
                res.status(404)
                    .json({ message: "The action with this id does not exist." });
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "Action information could not be retrieved." });
        })
})

router.post('/', (req, res) => {
    const action = req.body;
    if(action) {
        actionsDB.insert(action).then(actionId => {
            actionsDB.get(actionId.id)
                .then(action => {
                    res.status(201).json(action)
                })
        })

        .catch(err => {
            res.status(500)
                .json({ error: "There was an error adding action project to the database." })
        })
    }

    else {
        res.status(400)
            .json({ errorMessage: "Please provide the project_id, description, notes, and completed boolean for the action." });
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    actionsDB.remove(id)
        .then(count => {
            if(count) {
                res.json({ message: "Action removed succesfully." });
            }

            else {
                res.status(404)
                    .json({ message: "The action with the specified ID does not exist." });
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "The action could not be removed." });
        })
})

router.put('/:id', (req, res) => {
    const action = req.body;
    const { id } = req.params;
    if(action.description) {
        actionsDB.update(id, action)
            .then(count => {
                if(count) {
                    actionsDB.get(id)
                        .then(action => {
                            res.json(action);
                        });
                }

                else {
                    res.status(404)
                        .json({ message: "The action with the specified ID does not exist. "});
                }
            })

        .catch(err => {
            res.status(500)
                .json({ error: "The action info could not be modified." });
        })
    }

    else {
        res.status(400)
            .json({ errorMessage: "Please provide the project_id, description, notes, and completed boolean for the action." });
    }
})

module.exports = router;