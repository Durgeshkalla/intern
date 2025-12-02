const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const DATA_FILE = path.join(__dirname, 'developers.json');

app.use(cors());
app.use(bodyParser.json());

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/developers', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/developers', (req, res) => {
  const { name, role, techStack, experience } = req.body;

  if (!name || !role || !techStack) {
    return res.status(400).json({ error: 'Missing required fields: name, role, techStack' });
  }

  const experienceNum = parseFloat(experience) || 0;
  const dev = {
    id: uuidv4(),
    name: name.trim(),
    role,
    techStack: String(techStack).split(',').map(t => t.trim()).filter(Boolean),
    experience: experienceNum
  };

  const data = readData();
  data.unshift(dev);
  writeData(data);

  res.status(201).json(dev);
});

app.get('/', (req,res) => res.send('Developer Directory API'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});