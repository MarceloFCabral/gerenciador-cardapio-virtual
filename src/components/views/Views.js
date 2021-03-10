import styled from 'styled-components/native';

export const FullScreen = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #ffffff;
`;

export const CenteredFullScreen = styled(FullScreen)`
  justify-content: center;
`;

export const CenteredColumn = styled.View`
  align-items: center;
`;

export const CenteredRow = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Centered = styled.View`
  align-items: center;
  justify-content: center;
`;

export const GeneralView = styled.View`
  width: 85%;
  height: 100%;
  background-color: #ffffff;/*fcdb03;*/
`;

export const CenteredGeneralView = styled(GeneralView)`
  align-items: center;
  justify-content: center;
`;