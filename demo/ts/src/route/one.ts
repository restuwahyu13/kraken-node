import { Router, Request, Response } from 'express'

const router = Router() as Router

router.get('/', async (req: Request, res: Response) => {
	try {
		const response = await global.$axios.get('https://jsonplaceholder.typicode.com/users')
		res.status(200).json({ users: response.data })
	} catch (error) {
		res.status(400).json({ error })
	}
})

export default router
