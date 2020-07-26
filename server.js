const PORT = proces.env.PORT || 8000;
const express = require('express');
const app = express();
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.post('/query', (req, res) => {
  console.log(req.body);
  res.end(JSON.stringify(req.body));
});  