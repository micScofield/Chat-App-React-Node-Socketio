import { Link, Redirect } from 'react-router-dom'

const Lander = props => {

    // if (props.isAuth) {return <Redirect to='/dashboard' />}

    return <section className='landing'>
        <div className='landingOverlay'>
            <div className='landingInner'>
                <h1 className='x-large'>ChatCord</h1>
                <p className='large'>Join a room with a list of rooms available and chat with other members for free</p>
                <div className='buttons'>
                    <Link to='/register' className='btn btn-primary'>Signup</Link>
                    <Link to='/login' className='btn btn-light'>Login</Link>
                </div>
            </div>
        </div>
    </section>
}

export default Lander