const multer               = require('multer'                       ) ;
const uuidv4               = require('uuid/v4'                      ) ;
const path                 = require('path'                         ) ;
var   profileRootDirectory =         "public/images/ProfileImages/"   ;
let   fs                   = require('fs'                           ) ;

const profileStorage = multer.diskStorage({
    destination:  './public/images',
    filename: (req, file, cb) => {
        console.log("multer: "+file);
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    },
});

const imageUpload = multer({ storage:profileStorage });

module.exports.uploadImage = imageUpload;


var profileImageStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, createDirectory(profileRootDirectory));
    },
    filename: function (req, file, callback) {
        filename = req.session.user + path.extname(file.originalname);
        callback(null, filename);
    }
});


function createDirectory(profileRootDirectory) {
    
    if (!fs.existsSync(profileRootDirectory)){
        fs.mkdirSync(profileRootDirectory);
    }
    let directory = profileRootDirectory;
    return directory;
}

const uploadProfileImage = multer({ storage : profileImageStorage });

module.exports.uploadProfileImage = uploadProfileImage;

// const      multer           = require('multer');
// const        fs             = require('fs');
// const       path            = require('path');
// const   imageDirectory    = "public/images/";
// const uuidv4 = require('uuid/v4');
//
//
// function createDirectory(mainDirectory) {
//
//     if (!fs.existsSync(mainDirectory)){
//         fs.mkdirSync(mainDirectory);
//     }
//     // let directory = mainDirectory + username;
//     // if (!fs.existsSync(directory)){
//     //     fs.mkdirSync(directory);
//     // }
//
//     return mainDirectory;
// }
//
// var imageStorage = multer.diskStorage({
//
//     destination: function (req, file, cb) {
//         cb(null, createDirectory(imageDirectory));
//     },
//     filename: function (req, file, cb) {
//         // filename = req.session.user + path.extname(file.originalname);
//         const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
//         console.log('multer saving:'+newFilename);
//         cb(null, newFilename);
//     }
// });
//
// exports.uploadImage = multer({
//     storage:imageStorage
// });