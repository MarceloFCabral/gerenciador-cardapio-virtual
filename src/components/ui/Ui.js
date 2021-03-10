import { TextInput as PTextInput, Button as PButton, Headline as PHeadline, Subheading as PSubheading } from 'react-native-paper';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';

const PRIMARY_COLOR = theme.colors.primary;
const GREY = "#dedede";

export const Button = styled(PButton)`
  justify-content: center;
	margin-vertical: 5%
`;

export const TextInput = styled(PTextInput)`
	width: 100%;
	height: 55px;
	margin-vertical: 5%
`;

export const Headline = styled(PHeadline)`
	font-size: 30px;
	margin-top: 3%
`;

export const Subheading = styled(PSubheading)`
	font-size: 20px;
	margin-top: 3%
`;

export const LoginImage = styled.Image`
	height: 150px;
	margin-bottom: 40px
`;

export const PrimSeparator = styled.View`
	height: 1px;
	margin-top: 1px;
	margin-bottom: 20px;
	background-color: ${PRIMARY_COLOR};
`;

export const SecSeparator = styled(PrimSeparator)`
	margin-top: 5px;
	margin-bottom: 15px;
	background-color: ${GREY}
`;