import { Travel } from '../models/travel'

export function putTravel(req, res) {
  const newTravel = new Travel(req.body)

  Travel.findOne({
    travelId: newTravel.travelId,
    userId: newTravel.userId
  }).exec((err, travel) => {
    if (err) {
      return res.status(500).send(err)
    }

    if (travel) {
      return res.status(500).send({ already: true })
    }

    newTravel.save(err => {
      if (err) {
        return res.status(500).send(err)
      }

      res.status(200).send({ done: true })
    })
  })
}