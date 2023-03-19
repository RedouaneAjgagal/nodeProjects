const Job = require('../models/Job');
const { NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

// route('jobs')
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.id }, 'company position status');
    res.status(StatusCodes.OK).json(jobs)
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.id;
    const newPost = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(newPost);
}


// route('jobs/id')
const getJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.id;
    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new NotFoundError(`Found no job with ID ${jobId}`);
    }
    res.status(StatusCodes.OK).json(job);
}
const updateJob = async (req, res) => {
    res.send('Update job')
}
const deleteJob = async (req, res) => {
    res.send('Delete job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}