import React from 'react';
import styled from 'styled-components/native';
import { Keyboard, TouchableOpacity } from 'react-native';
import theme from '../../../styles/theme';

const BG_COLOR = theme.colors.background;

export const FullScreen = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: ${BG_COLOR};
`;

//TouchableOpacity modificada para servir como "fundo" de tela
export const TouchableFullScreen = ({ children }) => (
  <TouchableOpacity
    style={{ width: "100%", height: "100%", alignItems: "center", backgroundColor: BG_COLOR }}
    activeOpacity={1}
    onPress={() => Keyboard.dismiss()}
  >
    {children}
  </TouchableOpacity>
);

export const CenteredFullScreen = styled(FullScreen)`
  justify-content: center;
`;

export const CenteredColumn = styled.View`
  align-items: center;
`;

export const Centered = styled.View`
  align-items: center;
  justify-content: center;
`;

export const CenteredRow = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const GeneralView = styled.View`
  width: 85%;
  height: 100%;
  background-color: ${BG_COLOR};
`;

export const CenteredGeneralView = styled(GeneralView)`
  align-items: center;
  justify-content: center;
`;