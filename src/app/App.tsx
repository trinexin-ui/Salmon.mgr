import { Route, Routes } from 'react-router-dom'
import { StyleGuide } from '@/style-guide/StyleGuide'
import { FlowProvider } from '@/features/prototype/flow'
import { PhoneShell } from '@/features/prototype/PhoneShell'
import { HomeScreen } from '@/features/prototype/screens/HomeScreen'
import { EmployeeCardScreen } from '@/features/prototype/screens/EmployeeCardScreen'
import { TrainingScreen } from '@/features/prototype/screens/TrainingScreen'
import { SuccessScreen } from '@/features/prototype/screens/SuccessScreen'

export function App() {
  return (
    <FlowProvider>
      <Routes>
        <Route element={<PhoneShell />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/employee" element={<EmployeeCardScreen />} />
          <Route path="/training" element={<TrainingScreen />} />
          <Route path="/success" element={<SuccessScreen />} />
        </Route>
        <Route path="/style-guide" element={<StyleGuide />} />
      </Routes>
    </FlowProvider>
  )
}
