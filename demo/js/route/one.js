const router = require('express').Router()

router.get('/', async (req, res) => {
	try {
		const response = await $axios.get('https://jsonplaceholder.typicode.com/users')
		res.status(200).json({ users: response.data })
	} catch (error) {
		res.status(400).json({ error })
	}
})

module.exports = router
