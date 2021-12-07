import React from 'react';
import CoursePart from '../types'
import Part from './Part'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
// TypeScript automatically infers the return type of this function 
// (i.e., a react component) as `JSX.Element`.
	return (
		<div>
			{
				courseParts.map((coursePart) => (
					<Part key={coursePart.name} coursePart={coursePart} />
				))
			}
		</div>
	)
};

export default Content;