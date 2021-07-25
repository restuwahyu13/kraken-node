const router = require('express').Router()

router.get('/:id', async (req, res) => {
	try {
		const response = await $axios.get('https://jsonplaceholder.typicode.com/users')
		const data = $_.find(response.data, (val) => val.id === parseInt(req.params.id) && val)
		res.status(200).json({ user: data })
	} catch (error) {
		res.status(400).json({ error })
	}
})

module.exports = router
