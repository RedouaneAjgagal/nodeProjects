
// route('jobs')
const getAllJobs = async (req, res) => {
    res.send('Get all jobs')
}
const createJob = async (req, res) => {
    res.status(200).json(req.user);
}


// route('jobs/id')
const getJob = async (req, res) => {
    res.send('Get job details')
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