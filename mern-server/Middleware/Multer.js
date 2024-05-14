const multer = require("multer");
require('dotenv').config();
// process.env.UPLOADS_PATH)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, process.env.UPLOADS_PATH);
    },
    filename: function (req, file, cb) {
      const ext = file.originalname.split(".").pop();
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
      
    },
  });
  
  const upload = multer({ storage: storage });


module.exports = upload;



