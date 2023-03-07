import React, {Suspense} from 'react';
import Preloader from '../components/common/Preloader/Preloader';

export function withSuspense<WCP extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {
	return (props: WCP) => {

    return(
			<Suspense fallback={<Preloader />}>
				<WrappedComponent {...props} />
			</Suspense>
		)
	};
}
