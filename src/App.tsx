import './App.css'
import HeroSection from './sections/HeroSection'
import FormAndReceiptSection from './sections/FormAndReceiptSection'
import SplitBillSection from './sections/SplitBillSection'
import { useState } from 'react'

function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(null)

  const handleFormSubmit = (data: any) => {
    setFormData(data)
    setStep(2)
  }

  return (
    <div>
      <HeroSection />
      {step === 1 && (
        <FormAndReceiptSection onSubmit={handleFormSubmit} />
      )}
      {step === 2 && formData && (
        <SplitBillSection formData={formData} />
      )}
    </div>
  )
}

export default App
