const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Esimerkki Blogi',
    author: 'Hyvä Kirjoittaja',
    url: 'kivatblogit.fi',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'erkki123',
      name: 'Erkki Kirjuri'
    },
    likes: 43
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Fantasia Blogi',
    author: 'Qurkey',
    likes: 3,
    url: 'lordsblogs.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'erkki123',
      name: 'Erkki Kirjuri'
    }
  }
]

const getAll = () => (
  Promise.resolve(blogs)
)

const setToken = (token) => {}

export default { getAll, setToken }