import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Navbar = props => {

    let navLinks = (
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    // if (props.isAuth) {
    //     navLinks = (
    //         <ul>
    //             <li><Link to="/dashboard"><i className="fas fa-user"></i>{' '}<span className="hide-sm">Dashboard</span></Link></li>
    //             <li><Link to="/logout"><i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></Link></li>
    //         </ul>
    //     )
    // }

    return <Fragment>
        <nav className='navbar'>
            <h1>
                <Link to='/'><i className="fas fa-comments"></i>{' '}<span className="hide-sm">ChatCord</span></Link>
            </h1>
            {navLinks}
        </nav>
    </Fragment>
}

export default Navbar