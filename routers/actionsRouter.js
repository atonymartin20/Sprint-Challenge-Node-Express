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

module.exports = router;