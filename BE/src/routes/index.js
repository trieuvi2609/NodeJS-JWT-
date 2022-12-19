import userRouter from './user.js'
import studentRouter from './student.js'


const routes = (app) => {

    app.use('/user', userRouter)
    
    app.use('/student', studentRouter)

    app.use('/', (req, res) => {
        res.render('new', 
        {
            isShow: false, 
            helpers: {
                message() { return 'Trieu Vi Nodẹ'; },
                noti() { return 'ERROR'; }
            }
        })
    })

}

export default routes