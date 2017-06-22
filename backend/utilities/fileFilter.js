const fileFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(csv)$/)) {
        return cb(new Error('Only csv files are allowed!'), false);
    }
    cb(null, true);
};

export { fileFilter };