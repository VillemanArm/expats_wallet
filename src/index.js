import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/base.sass';
import Header from './components/Header'
import Converter from './components/Converter'
import History from './components/History'
import Footer from './components/Footer'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <main>
      <section className='main-block__wrapper container'>
        <Converter />
        <History />
      </section>

    </main>
    <Footer />
  </React.StrictMode>
);


