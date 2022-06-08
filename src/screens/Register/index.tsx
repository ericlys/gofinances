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
  TransactionTypys
} from "./styles";

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

          <TransactionTypys>
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
          </TransactionTypys>

        </Filds>

        <Button title="Enviar"/>
      </Form>

    </Container>
  );
}