const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const contacts = require("../data/contacts");

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
// write your app code here
app.get('/contacts', (req, res) => {
    res.json({contacts: contacts})
})
app.get('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find((obj) => obj.id === id)
    res.json({contact})
})
app.post('/contacts', (req, res) => {
   let id = contacts[contacts.length - 1].id + 1
   const contact = {...req.body, id}
   contacts.push(contact)
   res.status(200).json({contact: contact})
})
app.put('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find((obj) => obj.id === id)
    Object.keys(req.body).forEach((prop) => contact[prop] = req.body[prop])

    res.status(200).json({contact: contact})
})
app.delete('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find((obj) => obj.id === id)
    const index = contacts.indexOf((obj) => obj.id === id)
    contacts.splice(index, 1)
    const newMeetings = meetings.filter((item) => item.contactId === Number(req.params.id))
    meetings.splice(0, meetings.length)
    meetings.push(newMeetings)
    res.status(200).json({contact})
})

const meetings = require("../data/meetings")

app.get('/meetings', (req, res) => {
    res.json({meetings})
})

app.get('/meetings/:id', (req, res) => {
    const id = Number(req.params.id)
    const meeting = meetings.find((obj) => obj.id === id)
    res.status(200).json({meeting: meeting})
})

app.put('/meetings/:id', (req, res) => {
    const meeting = meetings.find((item) => item.id === Number(req.params.id))
    meeting.name = req.body.name
    meeting.contactId = meeting.contactId.toString()

    res.json({meeting: meeting})
})

app.delete('/meetings/:id', (req, res) => {
    const meeting = meetings.find((item) => item.id === Number(req.params.id))
    const index = meetings.indexOf(meeting)
    meetings.splice(index, 1)
    res.json({meeting: meeting})
})

app.get('/contacts/:id/meetings', (req, res) => {
    const meeting = meetings.filter((meeting) => meeting.contactId === req.params.id)
    res.json({meetings: meeting})
})

app.post('/contacts/:id/meetings', (req, res) => {
    let id = meetings[meetings.length - 1].id + 1
    const newMeeting = {...req.body, id: id, contactId: req.params.id}
    meetings.push(newMeeting)
    res.json({meeting: newMeeting})
})

module.exports = app
