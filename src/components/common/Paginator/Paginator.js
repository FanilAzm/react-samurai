import React, { useState } from 'react';
import s from './Paginator.module.css';

const Paginator = ({totalUsersCount, pageSize, currentUserPage, onPageChanged, portionSize = 10}) => {
	let pagesCount = Math.ceil(totalUsersCount / pageSize);
	const pages = [];

	for(let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let portionCount = Math.ceil(pagesCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;

	return(
		<div>
			{ portionNumber > 1 && <button onClick={ () => { setPortionNumber(portionNumber - 1) }}>prev</button> }
				{
					pages
						.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
						.map(page => {
							return  (
								<span
									key={page}
									className={ currentUserPage === page && s.selectedPage }
									onClick={() => { onPageChanged(page) }}
								>
									{ page }
								</span>
							)
						})
				}
			{ portionCount > portionNumber && <button onClick={ () => { setPortionNumber(portionNumber + 1) }}>next</button> }
		</div>
	)
}

export default Paginator;