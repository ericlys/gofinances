import React from "react";

import { 
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
 } from "./styled";

 interface PropsHighlightCard {
   type: 'up' | 'down' | 'total';
   title: string;
   amount: string;
   lastTransaction: string;
 }

export function HighlightCard({ 
  type,
  title, 
  amount, 
  lastTransaction 
}: PropsHighlightCard){

  const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
  }

  return(
    <Container type={type}>
      <Header>
        <Title
         type={type}
        >
          {title}
        </Title>
      <Icon 
      name={icons[type]} 
      type={type}
      />
      </Header>

      <Footer>
        <Amount 
        type={type}>
          {amount}
        </Amount>
        <LastTransaction type={type}>
          {lastTransaction}
        </LastTransaction>
      </Footer>
    </Container>
  )
}