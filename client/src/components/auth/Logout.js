import { useEffect } from 'react'
import {Redirect} from 'react-router-dom'
// import { logout } from '../../store/actions'

const Signout = ({ logout }) => {
    // useEffect(() => {
    //     logout()
    // }, [])

    return <Redirect to='/' />
}

export default Signout

// export default connect(null, {logout})(Signout)