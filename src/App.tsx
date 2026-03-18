import './index.css'
import PhoneFrame from './components/PhoneFrame'
import NativeShell from './components/NativeShell'
import DragMergeArea from './components/DragMergeArea'
import { Capacitor } from '@capacitor/core'

const isNative = Capacitor.isNativePlatform()

function App() {
  if (isNative) {
    return (
      <NativeShell>
        {(isDark) => <DragMergeArea isDark={isDark} />}
      </NativeShell>
    )
  }

  return (
    <PhoneFrame>
      {(isDark) => <DragMergeArea isDark={isDark} />}
    </PhoneFrame>
  )
}

export default App
