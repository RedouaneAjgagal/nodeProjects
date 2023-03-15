const { people } = require('../data')

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people })
}
const setupPerson = (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, msg: 'Please provide a name' })
    return res.status(201).json({ success: true, name })
}
const deletePerson = (req, res) => {
    const findId = people.find(person => person.id === Number(req.params.id))
    if (!findId) return res.status(200).json({ success: false, data: [] })
    const newPeople = people.filter(person => person.id !== Number(req.params.id));
    return res.status(200).json({ success: true, data: newPeople })
}

module.exports = { getPeople, setupPerson, deletePerson }