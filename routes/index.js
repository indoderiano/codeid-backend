const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/ControllerUser')
const {Authentication} = require('../middlewares/auth')

router.post('/', Authentication, ControllerUser.create)
router.get('/', ControllerUser.read)
router.put('/:id', Authentication, ControllerUser.update)
router.delete('/:id', Authentication, ControllerUser.delete)

router.get('/accountnumber/:accountNumber', ControllerUser.readByAccountNumber)
router.get('/identitynumber/:identityNumber', ControllerUser.readByIdentityNumber)

router.get('/token', ControllerUser.getToken)

module.exports = router