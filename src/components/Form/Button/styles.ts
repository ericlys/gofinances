import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.secondary};
`;

export const Content = styled(RectButton)`
  padding: 18px;
  border-radius: 5px;
  align-items: center;
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.middium};
  font-size: ${RFValue(14)}px;

  color: ${({theme}) => theme.colors.shape};
`;