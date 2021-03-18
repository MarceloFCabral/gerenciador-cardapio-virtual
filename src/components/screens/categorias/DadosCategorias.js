import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { StdScreen } from '../../ui/Ui';
import theme from '../../../../styles/theme';

const TelaDadosCategorias = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <StdScreen title="Categorias">
      <List.Accordion
        title="Bebidas"
        style={{ backgroundColor: '#e8feff' }}
      >
        <View style={{ marginLeft: 15 }}>
          <List.Item title="Água" />
          <List.Item title="Limonada" />
          <List.Accordion
            title="Cervejas"
          >
            <View style={{ marginLeft: 15 }}>
              <List.Item title="Skol 600ml" />
              <List.Item title="Original 600ml" />
            </View>
          </List.Accordion>
        </View>
      </List.Accordion>
      <List.Accordion
        title="Lanches"
      >
        <List.Item title="Coxinha de Frango" />
        <List.Item title="Enrolado de presunto" />
      </List.Accordion>
    </StdScreen>
  );
}


export default TelaDadosCategorias;