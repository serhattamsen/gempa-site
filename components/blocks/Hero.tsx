type HeroBlock = {
  headline?: string
  subheadline?: string
}

export default function Hero({headline, subheadline}: HeroBlock) {
  return (
    <section style={{padding: '80px 24px', maxWidth: 1000, margin: '0 auto'}}>
      <h1 style={{fontSize: 52, lineHeight: 1.05, marginBottom: 16}}>
        {headline}
      </h1>
      {subheadline && (
        <p style={{fontSize: 20, opacity: 0.85, maxWidth: 720}}>
          {subheadline}
        </p>
      )}
    </section>
  )
}