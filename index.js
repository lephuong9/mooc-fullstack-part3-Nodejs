const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]



// when a user navigates to a specific path on your website, the server uses the send method to deliver the content that's already defined for that path. This content could be HTML, text, or other types of data, and it is what the user sees in their browser when they visit that particular path
// each path can have only one send, create another path /new/path to make other send request
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})


app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id); // Convert the id parameter to a number
  const note = notes.find(note => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end() // Handle the case where no note matches the id
  }
});





//Deleting resources
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
}) 





// this one find out the maxium id in the notes then add 1 to make the next id for the new note (not recomended method)
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  
  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }//If the important property is missing, we will default the value to false

  notes = notes.concat(note)

  response.json(note)
})





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


