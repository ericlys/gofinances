import React, { useState } from "react";
import { Modal } from "react-native";

import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Button } from "../../components/Form/Button";

import { CategorySelect } from '../CategorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Filds,
  TransactionTypes
} from "./styles";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function handleTransactionTypySelect(type: 'up' | 'down') {
    setTransactionType(type);
  }
  
  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false)
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
            <TransactionTypeButton 
              type="up" 
              title="Income"
              onPress={() => handleTransactionTypySelect('up')}
              isActive={transactionType==='up'}
            />
            <TransactionTypeButton 
              type="down" 
              title="Outcome"
              onPress={() => handleTransactionTypySelect('down')}
              isActive={transactionType==='down'}
            />
          </TransactionTypes>

          <CategorySelectButton
           title={category.name}
           onPress={handleOpenSelectCategoryModal}
           />

        </Filds>

        <Button title="Enviar"/>
      </Form>

      <Modal 
        visible={categoryModalOpen}
        statusBarTranslucent
      >
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>

    </Container>
  );
}