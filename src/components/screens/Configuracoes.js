import React from 'react';
import { StdScreen } from '../ui/Ui';

/*
ideias:
  - salvar strings contendo código hexadecimal de cores primária/secundária/surface etc em um arquivo binário usando asyncStorage; carregar essas strings quando o app ser iniciado.
    > estudar uso de color picker pra selecionar a cor.
    > caso os dados não sejam encontrados, usar as cores padrão Elo Apps.

  - buscar imagem da tela de login no doc directory do app. Permitir escolha da imagem na tela de configurações (de preferência exibindo uma prévia).
    > caso a imagem não seja encontrada no doc directory, usar a imagem padrão Elo Apps.
*/
const TelaConfiguracoes = () => (
  <StdScreen title="Configurações">
  </StdScreen>
);

export default TelaConfiguracoes;