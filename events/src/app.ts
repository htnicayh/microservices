import express, { Request, Response } from 'express'
import axios from 'axios'
import cors from 'cors'
import * as configProperties from '../config/config.js'

const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

expressApp.use(cors())

const events = []

expressApp.post('/events', (req: Request, res: Response) => {
    const event = req.body
    const url = configProperties?.CorePorts?.link || process.env.CORE_POST
    events.push(event)

    axios.post(`${url}/events`, event)
    // axios.post(`${url}:4001/events`, events)
    // axios.post(`${url}:4002/events`, events)
    // axios.post(`${url}:4003/events`, events)

    res.json({ status: 'oke' })
})

expressApp.get('/events', (req: Request, res: Response) => {
    res.json(events)
})

expressApp.listen(4005, () => {
    console.log('EventBus is listening at port 4005')
})