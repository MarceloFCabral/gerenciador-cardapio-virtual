import React from 'react';
import { Headline, PrimSeparator, SecSeparator, LoginImage, Subheading, RippleButton } from '../ui/Ui';
import { FullScreen, GeneralView } from '../views/Views';
import { get, ROTAS } from '../../network';
  import { View, Text } from 'react-native';
//import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
//import Context from '../Context';
/*
TESTAR:
- criar variável que armazena se dados já foram carregados ou não
- passar índice atual do BottomNavigation para o componente
- criar uma variável booleana que recebe indexComponente === indexNav
- associar um effect à mudança dessa variável, fazendo a requisição condicionalmente
useEffect(() => async () => { if (!dataLoaded) loadData(); }, [currentIndex]);

--------

OUTRAS POSSIBILIDADES:
- tentar usar o objeto navigation das abas para dar "listen" em um evento
- investigar mais o pq do useEffect não estar ocorrendo na mudança de aba (tentar condicioná-lo a uma variável booleana como descrito acima e ver se funciona)
*/
const TelaEstabelecimento = ({ token, setToken }) => {
  //let printToken = () => { console.log("======= TOKEN E SET TOKEN ======="); console.log(token); console.log(setToken) };
  const [nome, setNome] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [end, setEnd] = React.useState('');
  //const [idx] = React.useState(0);

  //const [shouldLoad, setShouldLoad] = React.useState(idx === idxNav);

  //const [dataLoaded, setDL] = React.useState(false);
  
  const [editNome, setEditNome] = React.useState(false);
  const [editDesc, setEditDesc] = React.useState(false);
  const [editEnd, setEditEnd] = React.useState(false);
  
  //fetch
  useFocusEffect(
    React.useCallback(() => {
      //função para fetch de dados. Deve ser escrita dentro da função passada como parâmetro para useCallback (infelizmente).
      const fetchEstabelecimento = async (id) => {
        let r = await get(ROTAS.estabelecimentoId, id, token);
        if (r.ok) {
          r = await r.json();
          r = r.estabelecimento; //sugerir mudança no retorno e não precisar de selecionar objeto estabelecimento da requisição
          
          setToken(r.token);
          console.log("=== token retornado fetchEstabelecimento ===");
          console.log(r.token);
          setNome(r.nome);
          setDesc(r.descricao);
          setEnd(r.endereco);
        }
      }
      fetchEstabelecimento(1); //passando id 1 como teste
    }, [])
  );

  return (
    <FullScreen>
      <GeneralView>
        <Headline>Estabelecimento</Headline>
        <PrimSeparator />
        <LoginImage
          source={require('../../../assets/images/elo-apps.png')}
        />
        <RippleButton title="Nome" text={nome} onPress={() => console.log("nome apertado")} />
        <RippleButton title="Descrição" text={desc} onPress={() => console.log("descrição apertado")} />
        <RippleButton title="Endereço" text={end} onPress={() => console.log("endereço apertado")} />
        {/*
        <Subheading>Nome</Subheading>
        {/*<Paragraph>{nome}</Paragraph>
        <TouchableRipple>
          <Paragraph>{nome}</Paragraph>
        </TouchableRipple>
        <SecSeparator />

        <Subheading>Descrição</Subheading>
        {/*<Paragraph>{desc}</Paragraph>
        <TouchableRipple>
          <Paragraph>{desc}</Paragraph>
        </TouchableRipple>
        <SecSeparator />

        <Subheading>Endereço</Subheading>
        {/*<Paragraph>{end}</Paragraph>
        <TouchableRipple>
          <Paragraph>{end}</Paragraph>
        </TouchableRipple>
        */}
      </GeneralView>
    </FullScreen>
  );
};

export default TelaEstabelecimento;