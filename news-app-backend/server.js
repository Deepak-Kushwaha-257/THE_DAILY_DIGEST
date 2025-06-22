const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// Remove the deprecated options
// Remove the deprecated options
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/news', require('./routes/news'));

app.get('/', (req, res) => {
  res.json({ message: 'News API is running!' });
});

// Add this BEFORE the app.listen() line in server.js
// app.post('/api/news', async (req, res) => {
//   try {
//     const { author, title, location, imageUrl, tags } = req.body;
    
//     console.log('Received data:', req.body);
    
//     const newsArticle = {
//       author,
//       title,
//       location,
//       imageUrl,
//       tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
//       publishedAt: new Date()
//     };
    
//     res.status(201).json({ 
//       success: true, 
//       message: 'Article published successfully',
//       data: newsArticle 
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error publishing article',
//       error: error.message 
//     });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});