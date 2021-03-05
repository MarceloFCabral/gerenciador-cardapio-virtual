import React from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { CenteredGeneralView } from '../views/Views';
import { LoginImage, Button, TextInput } from '../ui/Ui';
import { login } from '../../network';

const TelaLogin = ({ navigation }) => {
	const [email, setEmail] = React.useState('');
	const [pw, setPw] = React.useState('');

	return (
		<SafeAreaView>
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
					value={pw}
					onChangeText={text => setPw(text)}
					mode="outlined"
				/>
				<Button mode="contained" onPress={() => login(email, pw, navigation)}>
					LOGIN
				</Button>
				<Text style={{ marginTop: 15 }} onPress={() => console.log("esqueceu a senha")}>
					Esqueceu a senha?
				</Text>
			</CenteredGeneralView>
		</SafeAreaView>
	);
}

export default TelaLogin;