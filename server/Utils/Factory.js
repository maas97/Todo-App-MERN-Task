const asyncHandler = require("express-async-handler");
const ApiError = require("./ApiError");
const ApiFeatures = require("./ApiFeatures");

module.exports.getAll = (Model) =>
  asyncHandler(async ({ body, query, lang }, res, next) => {
    let filter = {};
    if (body.filterObject) filter = body.filterObject;

    const apiFeatures = new ApiFeatures(query, Model.find(filter));

    apiFeatures.filter().sort().limitFields().search();

    const [documentsCount, documents] = await Promise.all([
      Model.countDocuments(apiFeatures.mongooseQuery.getQuery()),
      apiFeatures.paginate(0).mongooseQuery,
    ]);

    const { paginationResult: pagination } = new ApiFeatures(
      query,
      Model.find(filter)
    ).paginate(documentsCount);

    res.status(200).json({
      result: documents.length,
    //   pagination,
      data: documents,
    });
  });

module.exports.getOne = (Model) =>
  asyncHandler(async ({ params, opts }, res, next) => {
    const { id } = params;
    const query = Model.findOne({ _id: id, ...opts });
    const document = await query;
    if (!document)
      return next(new ApiError(`no ${Model.modelName} for this id ${id}`, 404));

    res.status(200).json({ status: "success", data: document });
  });
module.exports.getOneBySlug = (Model) =>
  asyncHandler(async ({ params, lang }, res, next) => {
    const { slug } = params;
    const query = Model.findOne({ slug: slug });
    const document = await query;
    if (!document)
      return next(
        new ApiError(`no ${Model.modelName} for this slug ${slug}`, 404)
      );
   
    res.status(200).json({ status: "success", data: document });
  });

module.exports.createOne = (Model) =>
  asyncHandler(async ({ body }, res, next) => {
    const document = await Model.create(body);
    if (!document) return next(new ApiError(` bad request`, 400));
    res.status(201).json({
      status: "success",
      data: document.toJSON(),
    });
  });

module.exports.updateOne = (Model) =>
  asyncHandler(async ({ body, params }, res, next) => {
    const { id } = params;
    const document = await Model.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      skipInvalidation: true,
    });
    if (!document)
      return next(new ApiError(`no ${Model.modelName} for this id ${id}`, 404));
    document.save({ validateBeforeSave: false });

    res.status(200).json({ status: "success", data: document });
  });

module.exports.deleteOne = (Model) =>
  asyncHandler(async ({ params }, res, next) => {
    const { id } = params;

    const document = await Model.findByIdAndDelete(id);

    if (!document)
      return next(new ApiError(`no ${Model.modelName} for this id ${id}`, 404));

    res.status(204).json({ status: "success", data: null });
  });