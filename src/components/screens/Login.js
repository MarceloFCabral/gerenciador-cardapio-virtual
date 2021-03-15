import React, { useContext } from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { CenteredFullScreen, CenteredGeneralView } from '../views/Views';
import { LoginImage, Button, TextInput } from '../ui/Ui';
import { login } from '../../network';
import { TokenContext } from '../context/TokenContext';

const TelaLogin = ({ navigation }) => {
	const { setToken } = useContext(TokenContext);
	const [email, setEmail] = React.useState('');
	const [password, setPw] = React.useState('');

	return (
		<SafeAreaView>
			<CenteredFullScreen>
				<CenteredGeneralView>
					<LoginImage
						source={require('../../../assets/images/elo-apps.png')}
					/>
					<TextInput
						label="E-mail"
						value={email}
						onChangeText={text => setEmail(text)}
						mode="outlined"
					/>
					<TextInput
						label="Senha"
						value={password}
						onChangeText={text => setPw(text)}
						mode="outlined"
					/>
					<Button mode="contained" onPress={() => login({email, password}, navigation, setToken)}>
						LOGIN
					</Button>
					<Text style={{ marginTop: 15 }} onPress={() => console.log("esqueceu a senha")}>
						Esqueceu a senha?
					</Text>
				</CenteredGeneralView>
			</CenteredFullScreen>
		</SafeAreaView>
	);
}

export default TelaLogin;