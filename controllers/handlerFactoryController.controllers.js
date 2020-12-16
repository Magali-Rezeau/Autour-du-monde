const AppError = require('../utils/AppError.utils');
const ApiFeatures = require('../utils/ApiFeatures.utils');
const catchAsync = require('../utils/catchAsync.utils');

exports.getAll = (Model) => {
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        datas: docs,
      },
    });
  });
};
exports.getOne = (Model, options) => {
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (options) query = query.populate(options);
    const doc = await query;

    if (!doc) {
      return next(new AppError('Not document found with that Id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};
exports.deleteOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('Not document found with that Id', 404));
    }

    res.status(204).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};
exports.updateOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('Not document found with that Id', 404));
    }

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};
exports.createOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });
};
