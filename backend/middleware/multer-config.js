const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  
  'audio/mpeg': 'mp3',
  'audio/mp3': 'mp3',
  'audio/wav': 'wav',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
   
    if (file.mimetype.startsWith('image/')) {
      callback(null, 'media/img');
    } else if (file.mimetype.startsWith('video/')) {
      callback(null, 'media/video');
    } else if (file.mimetype.startsWith('audio/')) {
      callback(null, 'media/audio');
    } else {
      callback(new Error('Unsupported file type'), false);
    }
  },
  filename: (req, file, callback) => {

    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_') );
    
  }
});

module.exports = multer({ storage }).single('file');