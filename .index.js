//Imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const actionsRouter = require('./routers/actionsRouter.js');
const projectsRouter = require('./routers/projectsRouter.js');

const server = express();
const PORT = process.env.PORT || 4500;

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

//Listening
server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});