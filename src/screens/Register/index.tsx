import React, { useState } from "react";
import { 
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  Alert
} from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Button } from "../../components/Form/Button";

import { CategorySelect } from "../CategorySelect";
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

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor númerico')
  .positive('O valor não pode ser negativo')
  .required('Preço é obrigatório'),
})

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const dataKey = '@gofinances:transactions';
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
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

  async function handleRegister(form: FormData){
    Keyboard.dismiss()

    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação')

    if(category.key === 'category')
      return Alert.alert('Selecione a categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date()
    }

    try{
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormated = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigate('Listagem');


    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm 
              name="amount"
              control={control}
              placeholder="Preço" 
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
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
    </TouchableWithoutFeedback>
  );
}