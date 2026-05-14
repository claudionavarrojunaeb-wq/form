import React from 'react'

type Props = {
  data: { name?: string; email?: string; rut?: string; age?: number; country?: string; comments?: string; agree?: boolean }
  onRestart: () => void
}

export default function Step4({data,onRestart}: Props){
  const sendEmail = () => {
    const subject = `Formulario - ${data.name ?? 'Contacto'}`
    const lines = [
      `Nombre: ${data.name ?? ''}`,
      `RUT: ${data.rut ?? ''}`,
      `Correo: ${data.email ?? ''}`,
      `Edad: ${data.age ?? ''}`,
      `País: ${data.country ?? ''}`,
      `Comentarios: ${data.comments ?? ''}`,
      `Aceptó términos: ${data.agree ? 'Sí' : 'No'}`,
    ]
    const body = lines.join('\n')
    const mailto = `mailto:${encodeURIComponent(data.email ?? '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Intentar abrir el cliente de correo del usuario
    try {
      // Preferir window.open para no reemplazar la SPA si el mailto es vacío
      const opened = window.open(mailto)
      if(!opened) {
        // Fallback a cambiar la ubicación
        window.location.href = mailto
      }
    } catch (e) {
      window.location.href = mailto
    }
    // Reiniciar formulario después del intento de envío
    onRestart()
  }

  return (
    <div>
      <h2>Resumen final</h2>
      <div style={{background:'#f5f7fb',padding:12,borderRadius:6}}>
        <p><strong>Nombre:</strong> {data.name}</p>
        <p><strong>RUT:</strong> {data.rut ?? '-'}</p>
        <p><strong>Correo:</strong> {data.email}</p>
        <p><strong>Edad:</strong> {data.age ?? '-'}</p>
        <p><strong>País:</strong> {data.country ?? '-'}</p>
        <p><strong>Comentarios:</strong><br />{data.comments ?? '-'}</p>
        <p><strong>Aceptó términos:</strong> {data.agree ? 'Sí' : 'No'}</p>
      </div>
      <div style={{display:'flex',justifyContent:'flex-end',marginTop:12}}>
        <button className="btn" onClick={sendEmail}>Finalizar</button>
      </div>
    </div>
  )
}
