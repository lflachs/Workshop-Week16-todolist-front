import styled from 'styled-components';
import { defaultTheme } from '../utils/theme';

const Badge = styled.div`
	position: fixed;

	right: 0;
	margin: 0 20px;
	text-align: center;
	color: white;
	border-radius: 50%;
	background-color: ${defaultTheme.primaryColor};
	width: 72px;
	height: 72px;
	font-size: ${defaultTheme.fontScale.h2};
	font-weight: 100;
	&:focus {
		outline: none;
	}
`;

export default Badge;
