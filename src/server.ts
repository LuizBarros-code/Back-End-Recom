import express from 'express';

const app = express();

app.listen(3456, () => {
  console.log('Server is running on port 3456');
});

