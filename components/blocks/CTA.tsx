type CtaBlock = {
  title?: string
  text?: string
  buttonText?: string
  buttonLink?: string
}

export default function CTA({title, text, buttonText, buttonLink}: CtaBlock) {
  return (
    <section style={{padding: '56px 24px', maxWidth: 1000, margin: '0 auto'}}>
      <div style={{border: '1px solid #333', borderRadius: 16, padding: 24}}>
        {title && <h2 style={{fontSize: 28, marginBottom: 8}}>{title}</h2>}
        {text && <p style={{opacity: 0.85, marginBottom: 16}}>{text}</p>}
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            style={{
              display: 'inline-block',
              padding: '10px 14px',
              borderRadius: 12,
              border: '1px solid #555',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  )
}