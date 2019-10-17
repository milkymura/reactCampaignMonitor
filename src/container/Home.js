import React from 'react';
import { Paper } from 'react-md';
function Home(props) {
	return(
		<Paper> 
			<div className="bio">
				<h1 className="bio_header">
					hi my name is 
					<a href="https://github.com/milkymura" className="name">
						Jose Adrian Buctuanon
					</a>
					and this is my answer 😄
				</h1>
			</div>
		</Paper>
	)
}
export default Home
