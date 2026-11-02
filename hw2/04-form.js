const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, comments, newsletter sign up, and submit button.

// http://localhost:5001/submit should return all the data the user entered

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/form', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.write('<style>label { display: inline-block; width: 150px; }</style>');
  res.write('<form action="/submit" method="post">');

  res.write('<label for="username">Username: </label>');
  res.write('<input type="text" name="username" id="username"><br />');

  res.write('<label for="email">Email: </label>');
  res.write('<input type="email" name="email" id="email"><br />');

  res.write('<label for="comments">Comments: </label>');
  res.write('<textarea name="comments" id="comments"></textarea><br />');

  res.write('<label>Newsletter sign up: </label>');
  res.write('<input type="radio" name="newsletter" value="yes"> Yes');
  res.write('<input type="radio" name="newsletter" value="no"> No<br />');

  res.write('<input type="submit">');
  res.write('</form></body></html>');
  res.end();
});

app.post('/submit', (req, res) => {
  res.send(`
    <h1>Submitted Data</h1>
    <p>Username: ${req.body.username}</p>
    <p>Email: ${req.body.email}</p>
    <p>Comments: ${req.body.comments}</p>
    <p>Newsletter: ${req.body.newsletter}</p>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
