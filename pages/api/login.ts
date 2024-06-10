import axios from 'axios'

export default async (req: { body: { username: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
  const { username, password } = req.body
  try {
    const response = await axios.post('http://localhost:8080/api/users/login', {
      username,
      password
    })
    res.status(200).json(response.data)
  } catch (error) {
    res.status(401).json({ message: 'Invalid username or password' })
  }
}