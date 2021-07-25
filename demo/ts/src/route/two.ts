import { Router, Request, Response } from 'express'

const router = Router() as Router

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const response = await global.$axios.get('https://jsonplaceholder.typicode.com/users')
		const data = global.$_.find(response.data, (val) => val.id === parseInt(req.params.id) && val)
		res.status(200).json({ user: data })
	} catch (error) {
		res.status(400).json({ error })
	}
})

export default router
