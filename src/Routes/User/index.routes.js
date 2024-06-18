const userRoutes = express.Router();


const user = require('./user.routes');



userRoutes.use("/", user);



module.exports = userRoutes;