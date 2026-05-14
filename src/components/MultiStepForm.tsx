import React, { useState } from 'react'
import { Step1, Step2, Step3, Step4 } from './steps'

type FormData = {
  name: string
  email: string
  rut?: string
  age?: number
  country?: string
  comments?: string
  agree?: boolean
}

const initial: FormData = { name: '', email: '', rut: '' }

export default function MultiStepForm(){
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(initial)

  const update = (patch: Partial<FormData>) => setData(prev => ({...prev, ...patch}))

  const next = () => setStep(s => Math.min(4, s+1))
  const prev = () => setStep(s => Math.max(1, s-1))

  const goTo = (n: number) => setStep(() => Math.max(1, Math.min(4, n)))
  
  const isEmailValid = (email?: string) => !!email && /\S+@\S+\.\S+/.test(email)
  const isRutValid = (rut?: string) => {
    if(!rut) return false
    const clean = rut.replace(/\./g,'').replace(/-/g,'').toUpperCase()
    if(clean.length < 2) return false
    const dv = clean.slice(-1)
    const body = clean.slice(0, -1)
    if(!/^[0-9]+$/.test(body)) return false
    let sum = 0
    let multiplier = 2
    for(let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body.charAt(i), 10) * multiplier
      multiplier = multiplier === 7 ? 2 : multiplier + 1
    }
    const res = 11 - (sum % 11)
    const dvExpected = res === 11 ? '0' : res === 10 ? 'K' : String(res)
    return dvExpected === dv
  }

  const validateStep1 = () => {
    if(!data.name) return false
    if(!isEmailValid(data.email)) return false
    if(!isRutValid(data.rut)) return false
    return true
  }

  const validateStep2 = () => {
    // Require country for step 2
    if(!data.country) return false
    return true
  }

  const validateStep3 = () => {
    // Require agreement to move to final
    if(!data.agree) return false
    return true
  }

  const goToValidated = (n: number) => {
    // check validations for all steps before target
    if(n > 1 && !validateStep1()) { setStep(1); return }
    if(n > 2 && !validateStep2()) { setStep(2); return }
    if(n > 3 && !validateStep3()) { setStep(3); return }
    goTo(n)
  }

  return (
    <section className="msf-card">
      <div className="msf-stepper">
        <div
          role="button"
          tabIndex={0}
          aria-label="Ir al paso 1"
          className={"msf-step " + (step===1 ? 'active':'')}
          onClick={()=>goToValidated(1)}
          onKeyDown={e=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); goToValidated(1) } }}
        >1</div>
        <div
          role="button"
          tabIndex={0}
          aria-label="Ir al paso 2"
          className={"msf-step " + (step===2 ? 'active':'')}
          onClick={()=>goToValidated(2)}
          onKeyDown={e=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); goToValidated(2) } }}
        >2</div>
        <div
          role="button"
          tabIndex={0}
          aria-label="Ir al paso 3"
          className={"msf-step " + (step===3 ? 'active':'')}
          onClick={()=>goToValidated(3)}
          onKeyDown={e=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); goToValidated(3) } }}
        >3</div>
        <div
          role="button"
          tabIndex={0}
          aria-label="Ir al paso final"
          className={"msf-step " + (step===4 ? 'active':'')}
          onClick={()=>goToValidated(4)}
          onKeyDown={e=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); goToValidated(4) } }}
        >✔</div>
      </div>

      {step===1 && <Step1 data={data} onChange={update} onNext={next} />}
      {step===2 && <Step2 data={data} onChange={update} onNext={next} onPrev={prev} />}
      {step===3 && <Step3 data={data} onChange={update} onNext={next} onPrev={prev} />}
      {step===4 && <Step4 data={data} onRestart={()=>{ setData(initial); setStep(1); }} />}
    </section>
  )
}
