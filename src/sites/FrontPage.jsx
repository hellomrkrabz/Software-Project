import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import search from '../media/search.png'
import win31 from '../media/win31.png'
import korwin from '../media/korwin.png'
import pattern from '../media/datapattern.png'
import jojo from '../media/jojo.png'
import beer from '../media/beer.png'
import frontimg from '../media/frontpageNotLoggedIn.png'
import Textfield from '@mui/material/TextField'
import Book from '../components/Book'
import BookViewer from '../components/BookViewer'
import { Link } from 'react-router-dom'

function FrontPage(props) {
	var book1 = {
		title: 'Windows 3.1 PL',
		description: "'MS Windows 3.1 PL' to książka przeznaczona dla szerokiego kręgu odbiorców zainteresowanych",
		src: win31,
		link: '/XD',
	}
	var book2 = {
		title: 'Niebezpieczne Ubezpieczenia',
		description: "'W czasach mody, czy wręcz manii ubezpieczeniowej, książka jest niezwykle cenną odtrutką na",
		src: korwin,
	}
	var book3 = {
		title: 'Feature Selection for Data and Pattern Recognition',
		description:
			"This book presents recent developments and research trends in the field' of feature selection for data and pattern recognition, highlighting a number of latest advances",
		src: pattern,
	}
	var book4 = {
		title: 'JOJO’s Bizzare Adventure',
		description: 'A multigenerational tale of the heroic Joestar family and their never-ending battle against evil!',
		src: jojo,
	}

	const [filter, setFilter] = useState('')

	return (
		<>
			<div>
				<Navbar site={'/FrontPage'} isLoggedIn={props.isLoggedIn} username={props.username} />
			</div>

			{props.isLoggedIn ? (
				<>
					<div className='container-fluid flex-grow-1 d-flex flex-column'>
						<div className='row'>
							<img src={beer} className='p-0' style={{ objectFit: 'cover', height: '320px' }} />
						</div>

						<div className='row bg-banana-blue p-2'>
							<div className='col-xl-3 col-md-6 row gx-3'>
								<div className='col d-flex justify-content-start align-items-center'>
									<Link to='/PersonalLibrary' className='col-6'>
										<button className='btn btn-banana-primary-dark col-12'>My Library</button>
									</Link>
								</div>
							</div>

							<div className='col-xl-9 col-md-6 d-flex justify-content-end col-12'>
								<div className='col-3 align-self-center'>
									<input
										type='text'
										className='form-control'
										placeholder='Find Books'
										value={filter}
										onChange={e => {
											setFilter(e.target.value)
										}}></input>
								</div>
								<Link to={'/Offers#' + filter}>
									<button className='btn btn-banana-white-outline'>Search</button>
								</Link>
							</div>
						</div>

						<div className='row gx-5 m-0 mt-4 mb-3 flex-grow-1 d-flex justify-content-center row-cols-lg-5 row-cols-sm-3'>
							<div className='col d-flex flex-grow-1'>
								<Book variant='medium' border {...book1}></Book>
							</div>
							<div className='col d-flex flex-grow-1'>
								<Book variant='medium' border {...book2}></Book>
							</div>
							<div className='col d-flex flex-grow-1'>
								<Book variant='medium' border {...book3}></Book>
							</div>
							<div className='col d-flex flex-grow-1'>
								<Book variant='medium' border {...book4}></Book>
							</div>
							<div className='col d-flex flex-grow-1'>
								<Book variant='medium' border {...book4}></Book>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className='container'>
						<div className='text-banana-blue fs-1 mt-3 mb-0 text-uppercase text-shadow-light'>
							<p class='h1'>banana books</p>
							<p class='h2'>"Rent more, read more, expand your mind with every Book"</p>
						</div>
						<img src={frontimg} alt='fajnie sobie ludek siedzi :D' />
					</div>
				</>
			)}
		</>
	)
}

export default FrontPage
