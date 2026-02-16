import Hero from './blocks/Hero'
import CTA from './blocks/CTA'

export default function Blocks({blocks}: {blocks?: any[]}) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((b) => {
        if (!b?._type) return null

        switch (b._type) {
          case 'hero':
            return <Hero key={b._key} headline={b.headline} subheadline={b.subheadline} />
          case 'ctaSection':
            return (
              <CTA
                key={b._key}
                title={b.title}
                text={b.text}
                buttonText={b.buttonText}
                buttonLink={b.buttonLink}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}