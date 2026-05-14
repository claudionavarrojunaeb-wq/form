import React from 'react'
import MultiStepForm from './components/MultiStepForm'

export default function App(){
  return (
    <div className="app">
      <header className="header">
        <h1>Formulario Multipasos — React + TypeScript</h1>
      </header>
      <main>
        <MultiStepForm />
      </main>
    </div>
  )
}
