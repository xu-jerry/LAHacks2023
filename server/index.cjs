const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const serverRoutes = require('./routes.cjs');

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());
app.use(cors());

app.use('/dopamind', serverRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port:${PORT}`));
