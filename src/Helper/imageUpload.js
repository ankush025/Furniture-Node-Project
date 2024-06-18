const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/image')
    },
    filename : function (req, file, cb ){
        cb(null ,`Img-${(Date.now())}-${file.originalname}`);
    }
})

const upoad = multer ({ storage: storage});


module.exports = upoad;