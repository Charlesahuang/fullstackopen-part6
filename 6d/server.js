// Import required modules
import jsonServer from 'json-server'
import cors from 'cors';
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.use(cors());
const validator = (request, response, next) => {
  const { content } = request.body
  if (request.method === 'POST' && (!content || content.length < 5)) {
    return response.status(400).json({
      error: 'too short anecdote, must have length 5 or more'
    })
  } else {
    next()
  }
}

server.use(jsonServer.bodyParser)

// Custom route for searching anecdotes by content
server.get('/anecdotes/search', (req, res) => {
  const { query } = req.query

  if (!query) {
    return res.status(400).json({
      error: 'Query parameter "query" is required.'
    })
  }

  // Filter anecdotes based on content
  const filteredAnecdotes = router.db
    .get('anecdotes')
    .filter(anecdote => anecdote.content.includes(query))
    .value()

  res.json(filteredAnecdotes)
})



server.get('/anecdotes/all', (req, res) => {
  // Filter anecdotes based on content
  const filteredAnecdotes = router.db
    .get('anecdotes')
    .value()

  res.json(filteredAnecdotes)
})

server.put('/anecdotes/update/:id', (req, res) => {

  const { id } = req.params
  const { votes } = req.body
  const anecdote = router.db.get('anecdotes').find({ id }).value()

  if (!anecdote) {
    return res.status(404).json({
      error: 'Anecdote not found'
    })
  }
  anecdote.votes = votes
  router.db.get('anecdotes').find({ id }).assign(anecdote).write()
  res.json(anecdote)
})

server.use(validator)

server.post('/anecdotes/add', (req, res) => {
  const { content } = req.body
  const newData = {
    content: content,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0
  }
  router.db.get('anecdotes').push(newData).write()
  res.status(201).json(newData)
})
server.use(middlewares)

server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})
