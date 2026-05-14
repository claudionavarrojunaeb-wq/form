import React from 'react'

type Props = {
  data: { name?: string; email?: string; rut?: string }
  onChange: (p: Partial<any>) => void
  onNext: () => void
}

function validateEmail(email?: string){
  if(!email) return false
  return /\S+@\S+\.\S+/.test(email)
}

function validateRut(rut?: string){
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

export default function Step1({data,onChange,onNext}: Props){
  const isEmailValid = validateEmail(data.email)
  const isRutValid = validateRut(data.rut)

  return (
    <div>
      <h2>Paso 1 — Datos personales</h2>
      <label>
        Nombre
        <input value={data.name ?? ''} onChange={e=>onChange({name:e.target.value})} />
      </label>
      <label>
        Correo
        <input type="email" value={data.email ?? ''} onChange={e=>onChange({email:e.target.value})} />
        {!isEmailValid && data.email ? <div style={{color:'crimson',fontSize:12}}>Formato de email inválido</div> : null}
      </label>
      <label>
        RUT
        <input value={data.rut ?? ''} onChange={e=>onChange({rut: e.target.value})} />
        {data.rut && !isRutValid ? <div style={{color:'crimson',fontSize:12}}>RUT inválido</div> : null}
      </label>
      <div style={{textAlign:'right',marginTop:12}}>
        <button className="btn" onClick={onNext} disabled={!data.name || !data.email || !isEmailValid || !data.rut || !isRutValid}>Siguiente</button>
      </div>
      <footer style={{marginTop:16,fontSize:12,color:'#666'}}>
        Aproximadamente 50–70 minutos en total. Ruptura aproximada: scaffolding y creación de archivos ~5–8 min; instalación de dependencias ~1–2 min; implementación de pasos, validadores y `mailto:` final ~25–35 min; resolver imports/TypeScript y ajustes (vite-env.d.ts, tsconfig, barrel exports) ~10–15 min; validación final con `tsc --noEmit` ~1–2 min.
      </footer>
    </div>
  )
}
