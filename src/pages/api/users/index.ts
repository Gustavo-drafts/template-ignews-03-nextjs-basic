import { NextApiRequest, NextApiResponse } from 'next'


export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Gustavo' },
    { id: 2, name: 'Suzy' },
    { id: 3, name: 'Julia' },
  ]
  return response.json(users)
}