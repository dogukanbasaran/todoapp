import React from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'

const App = () => {
  return (
    <>

    <section className='todoapp'>
      <Header/>
      <Content/>
    </section>
    <Footer/>
    </>
  )
}

export default App
