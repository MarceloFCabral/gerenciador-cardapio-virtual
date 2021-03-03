import React from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { CenteredGeneralView } from '../components/views/Views';
import { LoginImage, Button, TextInput } from '../components/ui/Ui';
import Context from '../components/Context';
import * as Network from '../network';
//import { getBody } from '../utils';

const TelaLogin = ({ navigation }) => {
	const [email, setEmail] = React.useState('');
	const [pw, setPw] = React.useState('');
	const [token, setToken] = React.useState('');

	return (
		<Context.Provider value={{ token: token }}>
			<SafeAreaView>
				<CenteredGeneralView>
					<LoginImage
						source={require('../../assets/images/elo-apps.png')}
					/>
					<TextInput
						label="Usuário"
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
					<Button mode="contained" onPress={() => Network.login(email, pw, navigation, setToken)}>
						LOGIN
					</Button>
					<Text style={{ marginTop: 15 }} onPress={() => console.log("esqueceu a senha")}>
						Esqueceu a senha?
					</Text>
				</CenteredGeneralView>
			</SafeAreaView>
		</Context.Provider>
	);
}

export default TelaLogin;