import React from 'react'

type Props = {
  data: { age?: number; country?: string }
  onChange: (p: Partial<any>) => void
  onNext: () => void
  onPrev: () => void
}

export default function Step2({data,onChange,onNext,onPrev}: Props){
  return (
    <div>
      <h2>Paso 2 — Información</h2>
      <label>
        Edad
        <input type="number" value={data.age ?? ''} onChange={e=>onChange({age: e.target.value ? Number(e.target.value) : undefined})} />
      </label>
      <label>
        País
        <input value={data.country ?? ''} onChange={e=>onChange({country: e.target.value})} />
      </label>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
        <button className="btn secondary" onClick={onPrev}>Anterior</button>
        <button className="btn" onClick={onNext}>Siguiente</button>
      </div>
    </div>
  )
}
