import React from 'react'

type Props = {
  data: { name?: string; email?: string; age?: number; country?: string; comments?: string; agree?: boolean }
  onPrev: () => void
  onChange: (p: Partial<any>) => void
  onNext: () => void
}

export default function Step3({data,onPrev,onChange,onNext}: Props){
  return (
    <div>
      <h2>Paso 3 — Comentarios y aceptación</h2>

      <label>
        Comentarios
        <textarea value={data.comments ?? ''} onChange={e=>onChange({comments: e.target.value})} rows={4} />
      </label>

      <label style={{display:'flex',alignItems:'center',gap:8,marginTop:8}}>
        <input type="checkbox" checked={!!data.agree} onChange={e=>onChange({agree: e.target.checked})} />
        Acepto los términos
      </label>

      {/* Resumen movido al paso final (Step4) */}

      <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
        <button className="btn secondary" onClick={onPrev}>Anterior</button>
        <button className="btn" onClick={onNext} disabled={!data.agree}>Siguiente</button>
      </div>
    </div>
  )
}
