const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path if needed

// Connect to MongoDB (use the same URI as server.js)
mongoose.connect('mongodb://localhost:27017/yourdbname', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    const userCount = await User.countDocuments();
    console.log('User count:', userCount);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });