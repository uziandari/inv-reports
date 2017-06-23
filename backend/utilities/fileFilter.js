const fileFilter = function (req, file, err) {

    if (!file.match(/\.(csv)$/)) {
        return err(new Error('Only csv files are allowed!'), false);
    }

};

module.exports = fileFilter;