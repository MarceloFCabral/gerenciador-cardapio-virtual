import { TextInput as PTextInput, Button as PButton, Headline as PHeadline } from 'react-native-paper';
import styled from 'styled-components/native';

export const Button = styled(PButton)`
  justify-content: center;
	margin-horizontal: 5%;
	margin-vertical: 5%
`;

export const TextInput = styled(PTextInput)`
	width: 80%;
	height: 55px;
	margin-horizontal: 5%;
	margin-vertical: 5%
`;

/*
export const Title = styled(PTitle)`
	font-size: 30px;
	margin-left: 5%;
	margin-top: 3%
`;
*/

export const Headline = styled(PHeadline)`
	font-size: 30px;
	margin-left: 5%;
	margin-top: 3%
`;

export const LoginImage = styled.Image`
  width: 80%;
	height: 150px;
	margin-bottom: 40px
`;

export const Separator = styled.View`
	width: 90%;
	height: 1px;
	margin-top: 1px;
	margin-bottom: 20px;
	background-color: #2f3d74;
`;