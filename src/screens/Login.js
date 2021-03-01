import React from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { CenteredGeneralView } from '../components/views/Views';
import { LoginImage, Button, TextInput } from '../components/ui/Ui';

const TelaLogin = () => {
	const [user, setUser] = React.useState('');
	const [pw, setPw] = React.useState('');

	return (
		<SafeAreaView>
			<CenteredGeneralView>
				<LoginImage
					source={require('../../assets/images/elo-apps.png')}
				/>
				<TextInput
					label="Usuário"
					value={user}
					onChangeText={text => setUser(text)}
					mode="outlined"
				/>
				<TextInput
					label="Senha"
					value={pw}
					onChangeText={text => setPw(text)}
					mode="outlined"
				/>
				<Button mode="contained" onPress={() => console.log('login apertado')}>
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