exports.checkId = (req, res, next) => {
    if (req.params.id * 1 > tours.lenght) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid id'
        });
    }
    next();
}
exports.checkBody = (req, res, next) => {
    console.log(req.params.id);
    if (!req.body.name || !req.body.price) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid body'
        });
    }
    next();
}
exports.getAllTours = (req, res) => 
{
   
};
exports.getTour = (req, res) => 
{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    });
};
exports.createTour = (req, res) => 
{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    });
};
exports.updateTour = (req, res) => 
{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    });
};
exports.deleteTour = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    });
};
