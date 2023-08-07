const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit_form', (req, res) => {
  const { name, email, message } = req.body;

  const formData = {
    name: name,
    email: email,
    message: message,
  };

  // Save the form data to a file named "form_data.json"
  fs.appendFile('form_data.json', JSON.stringify(formData) + '\n', 'utf8', (err) => {
    if (err) {
      console.error('Error writing form data:', err);
      res.status(500).json({ error: 'Failed to save form data' });
    } else {
      console.log('Form data saved successfully!');
      res.json({ message: 'Form data submitted successfully!' });
    }
  });
});

app.get('/submit_form', (req, res) => {
    // You can send an HTML page or any other response for the GET request here
    res.send('This is the GET request for the submit_form endpoint.');
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
