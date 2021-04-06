import React from 'react';
import { 
	TextInput as PTextInput, 
	Button as PButton,
	Headline as PHeadline,
	Subheading as PSubheading,
	TouchableRipple, Paragraph,
	List, ActivityIndicator 
} from 'react-native-paper';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Centered, FullScreen, GeneralView, TouchableFullScreen, CenteredRow } from '../views/Views';
import { View, TouchableOpacity, TextInput as NativeTextInput } from 'react-native';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';

//constantes
const PRIMARY_COLOR = theme.colors.primary;
const SECONDARY_COLOR = theme.colors.accent;
const GREY = theme.colors.disabled;
const ICON_GREY = "#ababab";
const SURFACE_COLOR = theme.colors.surface;

//---- Estilos de componentes básicos do React Native e de componentes do React Native Paper ----
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

//indicador de atividade / loading
export const Loading = () => <ActivityIndicator animating={true} size="large" color={SECONDARY_COLOR} />

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

//---- Input de texto multilinha com estilização do Paper ----
export const MultilineTextInput = ({ mode, label, value, size, onChangeText }) => (
	<TextInput
		mode={mode}
		label={label}
		value={value}
		render={() =>
			<NativeTextInput
				value={value}
				multiline={true}
				textAlignVertical="top"
				style={{ height: size, paddingHorizontal: 13, fontSize: 15, marginTop: 7 }}
				onChangeText={text => onChangeText(text)}
			/>
		}
	/>
);

//---- Lista usando List.Item da RNPaper ----
export const ItemList = ({ data, onPress }) => (
	<>
		{data.map(item =>
			<View key={item.id} style={{ borderColor: ICON_GREY, borderWidth: 1, borderRadius: 5, marginBottom: '4%' }}>
				<List.Item
					title={item.nome}
					description={item.descricao}
					onPress={() => onPress(item)}
				/>
			</View>
		)}
	</>
);


//---- Botões e outros elementos "atuadores" ----

//botão com animação de toque e borda inferior (estilo iFood)
export const RippleButton = ({ title, text, onPress }) => (
	<TouchableRipple
		onPress={() => onPress()}
		rippleColor={GREY}
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
/*
//Componente de categoria
export const CategoriaAcc = ({ title, desc, children }) => (
	<List.Accordion
		title={title}
		description={desc}
		style={{ backgroundColor: SURFACE_COLOR }}
	>
		<View style={{ marginLeft: 15 }}>
			{children}
		</View>
	</List.Accordion>
);

//Componente de produto
export const ProdutoAcc = ({ title, desc, val }) => (
	<View style={{ flexDirection: 'row' }}>
		<List.Item 
			title={title}
			description={desc}
			style={{ flex: 4 }}
		/>
		<Centered style={{ flex: 1 }}>
			<Paragraph>{val}</Paragraph>
		</Centered>
	</View>
);
*/
//tentativa implementação accordion
export const Categoria = ({ title, desc, children, exp, onPressEdit, onPressAdd, onPressDelete }) => {
	const [expanded, setExpanded] = React.useState(exp);

	return (
		<>
			<TouchableRipple
				onPress={() => setExpanded(!expanded)}
				rippleColor={ICON_GREY}
				style={{ backgroundColor: SURFACE_COLOR, borderColor: ICON_GREY, borderWidth: 1 }}
			>
				<CenteredRow style={{ padding: 10 }}>
					<View style={{ flex: 9 }}>
						<Paragraph style={{ fontSize: 17, color: expanded ? PRIMARY_COLOR : "#000000" }}>{title}</Paragraph>
						<Paragraph numberOfLines={2} style={{ fontSize: 14, color: ICON_GREY }}>{desc}</Paragraph>
					</View>
					<TouchableOpacity
						onPress={() => onPressAdd()}
						activeOpacity={0.5}
						style={{ flex: 2, alignItems: 'center' }}
					>	
						<MIcon name="plus" size={24} color={ICON_GREY} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onPressEdit()}
						activeOpacity={0.5}
						style={{ flex: 2, alignItems: 'center' }}
					>
						<MIcon name="pencil" size={24} color={ICON_GREY} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onPressDelete()}
						activeOpacity={0.5}
						style={{ flex: 2, alignItems: 'center' }}
					>
						<MatIcon name="close" size={24} color={ICON_GREY} />
						{/*<FAIcon name="close" size={24} color={ICON_GREY} />*/}
					</TouchableOpacity>
					{expanded ? 
					<MIcon name="chevron-down" size={24} color={ICON_GREY} style={{ flex: 1 }}/> : 
					<MIcon name="chevron-up" size={24} color={ICON_GREY} style={{ flex: 1 }} />}
				</CenteredRow>
			</TouchableRipple>
			{expanded &&
			<View style={{ marginLeft: 15 }}>
				{children}
			</View>}
		</>
	);
}

export const Produto = ({ title, desc, val, onPressEdit, onPressDelete }) => (
	<CenteredRow style={{ padding: 10 }}>
		<View style={{ flex: 3 }}>
			<Paragraph style={{ fontSize: 16 }}>{title}</Paragraph>
			<Paragraph numberOfLines={2} style={{ fontSize: 13, color: ICON_GREY }}>{desc}</Paragraph>
		</View>
		<Centered style={{ flex: 1 }}>
			<Paragraph style={{ fontWeight: 'bold' }}>{val}</Paragraph>
		</Centered>
		<TouchableOpacity
			onPress={() => onPressEdit()}
			activeOpacity={0.5}
			style={{ flex: 1, alignItems: 'center' }}
		>
			<MIcon name="pencil" size={24} color={ICON_GREY} />
		</TouchableOpacity>
		<TouchableOpacity
			onPress={() => onPressDelete()}
			activeOpacity={0.5}
			style={{ flex: 1, alignItems: 'center' }}
		>
			<MatIcon name="close" size={24} color={ICON_GREY} />
			{/*<FAIcon name="close" size={24} color={ICON_GREY} />*/}
		</TouchableOpacity>
	</CenteredRow>
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

