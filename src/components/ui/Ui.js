import { TextInput as PTextInput, Button as PButton } from 'react-native-paper';
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

export const LoginImage = styled.Image`
  width: 80%;
	height: 150px;
	margin-bottom: 40px
`;