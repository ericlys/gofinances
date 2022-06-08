import React, { useState } from "react";

import { Input } from "../../components/Form/Input";
import { TransactionTypyButton } from "../../components/Form/TransactionTypyButton";
import { Button } from "../../components/Form/Button";

import { 
  Container,
  Header,
  Title,
  Form,
  Filds,
  TransactionTypes
} from "./styles";
import { CategorySelect } from "../../components/Form/CategorySelect";

export function Register(){
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypySelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Filds>
          <Input 
            placeholder="Nome" 
          />
          <Input 
            placeholder="Preço" 
          />

          <TransactionTypes>
            <TransactionTypyButton 
              type="up" 
              title="Income"
              onPress={() => handleTransactionTypySelect('up')}
              isActive={transactionType==='up'}
            />
            <TransactionTypyButton 
              type="down" 
              title="Outcome"
              onPress={() => handleTransactionTypySelect('down')}
              isActive={transactionType==='down'}
            />
          </TransactionTypes>

          <CategorySelect title="Categoria"/>

        </Filds>

        <Button title="Enviar"/>
      </Form>

    </Container>
  );
}