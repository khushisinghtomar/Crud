const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://khushitomarcluster:khushiems@khushi-cluster.3cda1un.mongodb.net/crud'; 
mongoose.connect(dbURL , {
  useNewUrlParser : true
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
