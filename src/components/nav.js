import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Switch, Route, Link } from 'react-router-dom';
import SearchBar from './searchBar'
import { auth, googleAuthProvider } from './firebase';
import $ from 'jquery';

export default class Nav extends Component {
	constructor() {
		super();
		this.state = {
			activeItem: 'home',
			currentUser: null
		};
		this.handleItemClick = this.handleItemClick.bind(this);
	}

	componentDidMount() {
		auth.onAuthStateChanged(currentUser => {
			console.log('AUTH_CHANGE', currentUser);
			this.setState({ currentUser });
		});
	}

	handleItemClick(e, { name }) {
		// this.setState({ activeItem: name });
	}

	render() {
		const { activeItem, currentUser } = this.state;

		return (
			<div>
				<div style={{ background: '#F8F8F8' }} className="ui fluid container">
					<div style={{ background: '#26CDA7' }} className="ui menu">
						<div className="item">
							<Link to="/">
								<div
									className="ui huge header"
									style={{ color: '#FFFFFF' }}
									// active={activeItem === 'home'}
									onClick={this.handleItemClick}
								>
									Nibl
								</div>
							</Link>
						</div>

						<div className="item">
							<Link to="/restaurants">
								<div
									className="ui medium header"
									style={{ color: '#FFFFFF' }}
									// active={activeItem === 'kitchen'}
									onClick={this.handleItemClick}
								>
									Restaurants
								</div>
							</Link>
						</div>

						<div className="item">
							<Link to="/dishes">
								<div
									className="ui medium header"
									style={{ color: '#FFFFFF' }}
									// active={activeItem === 'reviews'}
									onClick={this.handleItemClick}
								>
									Reviews
								</div>
							</Link>
						</div>

						<div className="item">
							{/*<div className="ui icon input">
								<input
									ref={q => {
										this._restaurant = q;
									}}
									id="tallbox"
									type="text"
									placeholder="burgers, tacos..."
									required
								/>

								<Link to="/restaurants">
									<Button className="ui icon button">
										<i className="search icon" />
									</Button>
								</Link>
							</div>

							
							<SearchBar />*/}
						</div>

						<div className="item">
							<div className="ui compact menu">
								<div className="ui simple dropdown item">
									Food
									<i className="dropdown icon" />
									<div className="menu">
										<div className="item">Resturaunts</div>
										<div className="item">Food</div>
									</div>
								</div>
							</div>
						</div>

						<div className="right menu">
							{!currentUser && (
								<Menu.Menu position="right">
									<Menu.Item
										style={{ color: '#FFFFFF' }}
										name="login"
										// active={activeItem === 'login'}
										onClick={() => auth.signInWithPopup(googleAuthProvider)}
									/>
								</Menu.Menu>
							)}

							{currentUser && (
								
								<Menu.Menu position="right">
								<div className="item">
								<img className="ui avatar image" src={currentUser.photoURL} />
								</div>
								<div className="item">
								
								<h2 style={{ color: '#FFFFFF' }} >{currentUser.displayName}</h2>
								</div>
									<Menu.Item
										style={{ color: '#FFFFFF' }}
										name="logout"
										// active={activeItem === 'logout'}
										onClick={() => auth.signOut()}
									/>
									
								</Menu.Menu>
								

							)}

							
						</div>
					</div>
				</div>

				{/* <Segment>
          <img src='/assets/images/wireframe/media-paragraph.png' />
        </Segment> */}
			</div>
		);
	}
}