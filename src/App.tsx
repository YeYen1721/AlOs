import './index.css'
import PhoneFrame from './components/PhoneFrame'
import DragMergeArea from './components/DragMergeArea'

function App() {
  return (
    <PhoneFrame>
      {(isDark) => <DragMergeArea isDark={isDark} />}
    </PhoneFrame>
  )
}

export default App
