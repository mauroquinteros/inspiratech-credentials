import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BadgeGenerator } from './components/BadgeGenerator'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <BadgeGenerator />
      <Footer />
    </div>
  )
}

export default App
