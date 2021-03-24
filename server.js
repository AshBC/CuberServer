const express = require ('express');
const morgan = require ('morgan');
const app = express ();
const cors = require ('cors');
const siteRoutes= require ('./routes/siteRoutes');
// const PORT = 3001;
var PORT = process.env.PORT || 8080;

app.use(cors());
app.use(morgan());
app.use(express.static('public'));
app.use(express.json());
app.use('/videos', siteRoutes);

app.get('/', (req,res) => {
    res.json({
        greeting: 'welcome to Cube api',
    });
});
app.listen(PORT, console.log(`listening at: http://localhost:${PORT}`));