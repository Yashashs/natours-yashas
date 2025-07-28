/* eslint-disable */
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIfeatures = require('./../utils/apifeatures');

// const { Model } = require("mongoose");

exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        // try {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document Found with that ID', 404));
        }

        res.status(204).json({
            status: "success",
            data: null
        })
        // } catch (err) {
        //     res.status(404).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }
    });

exports.updateOne = Model =>
    catchAsync(async (req, res, next) => {
        // try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return next(new AppError('No document Found with that ID', 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc
            }
        });
        // } catch (err) {
        //     res.status(404).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }

    });

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {

        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
        // try {
        //     // const newTour = new Tour({})
        //     // newTour.save()


        //     // console.log(req.body);
        //     // const newId = tours[tours.length - 1].id + 1;
        //     // const newTour = Object.assign({ id: newId }, req.body);

        //     // tours.push(newTour);

        //     // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        //     //     res.status(201).json({
        //     //         status: 'success',
        //     //         data: {
        //     //             tour: newTour
        //     //         }
        //     //     })
        //     // })
        // } catch (err) {
        //     res.status(400).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }

    });

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    // try {
    //Tour.findOne({_id: req.params.id})

    if (!doc) {
        return next(new AppError('No document Found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
    // } catch (err) {
    //     res.status(404).json({
    //         status: 'fail',
    //         message: err
    //     })
    // }
    // console.log(req.params); //all the variables defined are stored here 
    // const id = req.params.id * 1; //string that looks like number would automatically get converted if we multiply it with a number
    // const tour = tours.find(el => el.id == id);
    // // if(id > tours.length){

});

exports.getAll = Model =>
    catchAsync(async (req, res, next) => {
        // To allow for nested GET review
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId };
        // console.log(req.requestTime);
        // try {
        // console.log(req.query);
        //BUILD QUERY
        //1-A) Filtering
        // const queryObj = { ...req.query };
        // const excludeFields = ['page', 'sort', 'limit', 'fields'];
        // excludeFields.forEach(el => delete queryObj[el]);

        // // console.log(req.query,queryObj);

        // //1-B) Advance filtering
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        // // console.log(JSON.parse(queryStr));

        // // {difficulty: 'easy',duration: {$gte: 5}}
        // // {difficulty: 'easy',duration: {gte: '5'}}
        // // gte,gt,lte,lt

        // let query = Tour.find(JSON.parse(queryStr));

        // 2) Sorting
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     // console.log(sortBy)
        //     query = query.sort(sortBy)
        //     //sort('price ratingAverage')
        // } else{
        //     query = query.sort('-createdAt');
        // }

        // 3) Field Limiting
        // if(req.query.fields){
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // } else{
        //     query = query.select('-__v')
        // }

        //4) Pagination
        // const page = req.query.page * 1 || 1;
        // const limit = req.query.limit *1 || 100;
        // const skip = (page-1) * limit;
        // //page=3&limit=10 , 1-10, page 1,11-20, page 2,21-30
        // query = query.skip(skip).limit(limit);

        // if (req.query.page) {
        //     const numTours = await Tour.countDocuments();
        //     if(skip >= numTours) throw new Error('This page does not exist');
        // }

        // EXECUTE QUERY
        const features = new APIfeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        // const doc = await features.query.explain();
        const doc = await features.query;
        // query.sort().select().skip().limit()

        // const tours = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy');

        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            // requestedAt: req.requestTime,
            results: doc.length,
            data: {
                data: doc
            },
        });
        // } catch (err) {
        //     res.status(404).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }
    });