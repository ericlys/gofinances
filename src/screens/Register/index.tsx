import React, { useState } from "react";
import { Modal } from "react-native";
import { useForm } from 'react-hook-form';
// import { Input } from "../../components/Form/Input";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Button } from "../../components/Form/Button";

import { CategorySelect } from '../CategorySelect';
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { 
  Container,
  Header,
  Title,
  Form,
  Filds,
  TransactionTypes
} from "./styles";

interface FormData {
  [name: string]: string;
}

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit
  } = useForm();

  function handleTransactionTypySelect(type: 'up' | 'down') {
    setTransactionType(type);
  }
  
  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false)
  }

  function handleRegister(form: FormData){
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data)
  }


  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Filds>
          <InputForm
            name="name"
            control={control} 
            placeholder="Nome"
          />
          <InputForm 
            name="amount"
            control={control}
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

        <Button
          title="Enviar"
          onPress={handleSubmit(handleRegister)} 
        />

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