import VisualStage from '../components/VisualStage'

export default function Page() {
  return (
    <>
      <header>
        <nav>
          <h1>Parasite and Class Identity</h1>
          <p style={{ textAlign: 'center', fontSize: '1rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto', padding: '0 2rem 0.75rem', opacity: 0.75 }}>Parasite is a 2019 film and four-time Oscar winning film directed by Bong Joon-ho. It masterfully explores the division of economic classes in South Korea and their respective conflicting identities. The story follows the poor Kim family as they sneakily con their way into high-paying jobs working for the rich Park family. Then a bunch of stuff happens.</p>
          <p style={{ textAlign: 'center', fontSize: '1rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto', padding: '0 2rem 2rem', opacity: 0.75 }}>Click the left and right sides to see information regarding the film&rsquo;s development of lower class and upper class identities, respectively. The choices made in Parasite culminate in a successful argument explaining how class divisions lead to differing identities and conflicts.</p>
        </nav>
      </header>

      <VisualStage />

      <footer></footer>
    </>
  )
}
