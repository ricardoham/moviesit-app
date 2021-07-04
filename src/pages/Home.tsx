import React from 'react';
import Header from 'components/Header';
import Card from 'components/Card';

const Home = (): JSX.Element => (
  <div>
    <Header />
    <Card header="Test Header" image="https://via.placeholder.com/150" text="12233 aaa bla bla bla" />
  </div>
);

export default Home;
