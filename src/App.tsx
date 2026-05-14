import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BadgeGenerator } from './components/BadgeGenerator'
import { ValidationScreen } from './components/ValidationScreen'
import { useAccessValidation } from './hooks/useAccessValidation'

function App() {
  const { isValidated, checkCode, confirmValidated } = useAccessValidation()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {isValidated ? (
        <>
          <BadgeGenerator />
          <Footer />
        </>
      ) : (
        <ValidationScreen onValidate={checkCode} onSuccess={confirmValidated} />
      )}
    </div>
  )
}

export default App
