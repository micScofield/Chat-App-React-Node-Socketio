import { Fragment, useState } from 'react'

const ChatHome = ({ showRoomHandler }) => {

	const [username, setUsername] = useState('')
	const [roomname, setRoomname] = useState('JavaScript')

	return <Fragment>
		<div className="join-container">
			<header className="join-header">
				<h1><i className="fas fa-smile-wink"></i> Welcome  Sanyam</h1>
			</header>
			<main className="join-main">
				<form onSubmit={() => showRoomHandler(username, roomname)}>
					<div className='form-control'>
						<label htmlFor="username">Enter your username</label>
						<input type='text' autoFocus value={username} onChange={e => setUsername(e.target.value)} />
					</div>
					<div className="form-control">
						<label htmlFor="room">CHOOSE A ROOM</label>
						<select name="room" id="room" value={roomname} onChange={e => setRoomname(e.target.value)}>
							<option value="JavaScript">JavaScript</option>
							<option value="React">React</option>
							<option value="Node">Node</option>
							<option value="CSS">CSS</option>
							<option value="MongoDB">MongoDB</option>
							<option value="Express">Express</option>
							<option value="Redis">Redis</option>
						</select>
					</div>
					<button type="submit" className="btn btn-large btn-primary">Join Chat</button>
				</form>
			</main>
		</div>
	</Fragment>
}

export default ChatHome