import React from 'react';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import useCase from './useCase';

import './style.scss';

const Blogs = (props: any) => {
	const {
		item,
	} = useCase();
	return (
		<>
			<NavLink to={''} />
			<div className="container-fluid">

				<header className='menu-header'>
					<ul>
						<li className='navbar1-left'>FoodZero</li>
						<li>M</li>
						<li className='navbar2-right' ><button id='navbar2-right1' >   reservations   </button></li>
						<li className='navbar2-right'>+8913548912</li>

					</ul>
					<h1 className='Tittle-left' id='Tittle' > Who we are </h1>
					<p className='Tittle-left' id='paragraph' >The Most important things for us is to give you the confortable dining experiences</p>
				</header>
				<section className='section2'>

					<div className="row">

						<div className="col-6">

							Première colonne
							<img src="{}" alt='' />
						</div>

						<div className="col-6">

							Deuxième colonne

						</div>


					</div>


				</section>

				<section className='section3 '>
					<p className='section3-tittle1'>Make a reservation</p>
					<h6 className='section3-tittle2'>Get in touch with restaurant</h6>
					<div id='box-section' className="row">

						<div className="col"><TextField id="outlined-basic" label="16/22/2021" variant="outlined" /></div>

						<div className="col"> <TextField
							id="outlined-select-currency"
							label="6:00 pm"
							select
							helperText="Please select your currency"
						></TextField></div>

						<div className="col"><TextField
							id="outlined-select-currency"
							label="6:00 pm"
							select
							helperText="Please select your currency"
						></TextField></div>
					</div>
					<button className="button">Book Now</button>
				</section>
				<footer>
					<div >
						<div className="row align-items-start">
							<div id='left-footer' className="col">food <br />zero.</div>
							<div id='left2-footer' className="col">Contact<br />+36145545555<br />foodzer@mail.fr<br />melville.rue valence<br />BP:1226 np,sharll</div>
							<div id='left4-footer' className="col"><Button variant="outlined">Subcribe</Button></div>
						</div>
						<div className="row align-items-left">
							<div className="col"></div>
							<div id='left3-footer' className="col">Never miss a recipe<br /><TextField id="outlined-basic" label=" E-mail adress " variant="outlined" /></div>
						</div>
						<div className="row align-items-center">
							<div className="col"></div>
							<div className="col"></div>

						</div>
						<div className="row align-items-end">

							<div className="col"></div>

							<div className="col"></div>

						</div>

					</div>--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br />
					<p>Zero Inc,All rigths Reserved</p>
				</footer>
			</div>
		</>
	);
}


export default Blogs;