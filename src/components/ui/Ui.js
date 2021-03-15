import React from 'react';
import { TextInput as PTextInput, Button as PButton, Headline as PHeadline, Subheading as PSubheading, TouchableRipple, Paragraph } from 'react-native-paper';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Centered, FullScreen, GeneralView, TouchableFullScreen } from '../views/Views';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';

//constantes
const PRIMARY_COLOR = theme.colors.primary;
const GREY = theme.colors.disabled;
const ICON_GREY = "#ababab";

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
	font-size: 25px;
	margin-top: 3%
`;

export const Subheading = styled(PSubheading)`
	font-size: 20px;
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

export const ItemContainer = styled.View`
	align-items: center;
	flex-direction: row;
	border-bottom-color: ${ICON_GREY};
	border-bottom-width: 1px;
	padding-bottom: 5px;
	margin-top: 8%
`;

/* 
------------------------
|	Componentes próprios |
------------------------
*/

//---- Elementos genéricos ----

//view com título, texto e borda inferior (estilo iFood)
export const ItemView = ({ title, text, iconName }) => (
	<ItemContainer>
		<View>
			<Subheading>{title}</Subheading>
			<Paragraph numberOfLines={2} style={{ width: 312 }}>{text}</Paragraph>
		</View>
		{iconName && <MIcon name={iconName} size={30} color={ICON_GREY} />}
	</ItemContainer>
);

//---- Botões e outros elementos "atuadores" ----

//botão com animação de toque e borda inferior (estilo iFood)
export const RippleButton = ({ title, text, onPress }) => (
	<TouchableRipple
		onPress={() => onPress()}
		rippleColor={GREY}
		style={{ marginTop: '8%' }}
	>
		<ItemView title={title} text={text} iconName="chevron-right" />
	</TouchableRipple>
);

//botão "criar"
export const CreateButton = ({ onPress }) => (
	<Centered style={{ flex: 1 }}>
		<TouchableOpacity 
			onPress={() => onPress()}
			activeOpacity={0.5}
		>
			<MIcon name="plus-box-outline" size={40} color={ICON_GREY} />
		</TouchableOpacity>
	</Centered>
);

//botão "editar"
export const EditButton = ({ onPress }) => (
	<Centered style={{ flex: 1 }}>
		<TouchableOpacity 
			onPress={() => onPress()}
			activeOpacity={0.5}
		>
			<MIcon name="square-edit-outline" size={40} color={ICON_GREY} />
		</TouchableOpacity>
	</Centered>
);

//botão "trocar"
export const ChangeButton = ({ onPress }) => (
	<Centered style={{ flex: 1 }}>
		<TouchableOpacity 
			onPress={() => onPress()}
			activeOpacity={0.5}
		>
			<FAIcon name="refresh" size={40} color={ICON_GREY} />
		</TouchableOpacity>
	</Centered>
);

//---- Telas e views genéricas contendo elementos da UI ----

//view geral para as telas do app
export const StdScreen = ({ title, children }) => (
	<FullScreen>
		<GeneralView>
			<Headline>{title}</Headline>
			<PrimSeparator />
			{children}
		</GeneralView>
	</FullScreen>
);

//view geral que dá dismiss no teclado caso seja tocada. Ideal para telas com input multiline
export const TouchableStdScreen = ({ title, children }) => (
	<TouchableFullScreen>
		<GeneralView>
			<Headline>{title}</Headline>
			<PrimSeparator />
			{children}
		</GeneralView>
	</TouchableFullScreen>
);

