import React from 'react';
import { TextInput as PTextInput, Button as PButton, Headline as PHeadline, Subheading as PSubheading, TouchableRipple, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CenteredRow, FullScreen, GeneralView } from '../views/Views';
import { View } from 'react-native';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';

//constantes
const PRIMARY_COLOR = theme.colors.primary;
const GREY = theme.colors.disabled;
const ICON_GREY = "#ababab";

//view com borda inferior para o RippleButton
const RBView = styled(CenteredRow)`
	border-bottom-color: ${ICON_GREY};
	border-bottom-width: 1px;
	padding-bottom: 5px;
`;

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

//componentes próprios
export const RippleButton = ({ title, text, onPress }) => (
	<TouchableRipple
		onPress={() => onPress()}
		rippleColor={GREY}
		style={{ marginTop: '8%' }}
	>
		<RBView>
			<View>
				<Subheading>{title}</Subheading>
				<Paragraph numberOfLines={2} style={{ width: 312 }}>{text}</Paragraph>
			</View>
			<Icon name="chevron-right" size={30} color={ICON_GREY} />
		</RBView>
	</TouchableRipple>
);

export const StdScreen = ({ title, children }) => (
	<FullScreen>
		<GeneralView>
			<Headline>{title}</Headline>
			<PrimSeparator />
			{children}
		</GeneralView>
	</FullScreen>
);
