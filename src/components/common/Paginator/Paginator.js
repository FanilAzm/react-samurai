import React from 'react';
import s from './Paginator.module.css';

const Paginator = (props) => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	const pages = [];

	for(let i = 1; i <= 10; i++) {
		pages.push(i);
	}

	return(
		<div>
			{
				pages.map(page => {
					return  (
						<span
							className={ props.currentUserPage === page && s.selectedPage }
							onClick={() => { props.onPageChanged(page) }}
						>
							{ page }
						</span>
					)
				})
			}
		</div>
	)
}

export default Paginator;