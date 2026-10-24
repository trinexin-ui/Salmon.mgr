import { Route, Routes } from 'react-router-dom'
import { StyleGuide } from '@/style-guide/StyleGuide'
import { FlowProvider } from '@/features/prototype/flow'
import { PhoneShell } from '@/features/prototype/PhoneShell'
import { HomeScreen } from '@/features/prototype/screens/HomeScreen'
import { EmployeeCardScreen } from '@/features/prototype/screens/EmployeeCardScreen'
import { TrainingScreen } from '@/features/prototype/screens/TrainingScreen'
import { SuccessScreen } from '@/features/prototype/screens/SuccessScreen'
import { PeriodPlanScreen } from '@/features/prototype/screens/PeriodPlanScreen'
import { GoalStep1Screen } from '@/features/prototype/screens/GoalStep1Screen'
import { GoalStep2Screen } from '@/features/prototype/screens/GoalStep2Screen'
import { GoalStep3Screen } from '@/features/prototype/screens/GoalStep3Screen'
import { GoalStep4Screen } from '@/features/prototype/screens/GoalStep4Screen'
import { GoalSuccessScreen } from '@/features/prototype/screens/GoalSuccessScreen'
import { ManagerProfileScreen } from '@/features/prototype/screens/ManagerProfileScreen'
import { PossibilitiesScreen } from '@/features/prototype/screens/PossibilitiesScreen'
import { ShoutoutsScreen } from '@/features/prototype/screens/ShoutoutsScreen'
import { MomentsScreen } from '@/features/prototype/screens/MomentsScreen'

export function App() {
  return (
    <FlowProvider>
      <Routes>
        <Route element={<PhoneShell />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/employee" element={<EmployeeCardScreen />} />
          <Route path="/training" element={<TrainingScreen />} />
          <Route path="/success" element={<SuccessScreen />} />
          <Route path="/period-plan" element={<PeriodPlanScreen />} />
          <Route path="/goal/1" element={<GoalStep1Screen />} />
          <Route path="/goal/2" element={<GoalStep2Screen />} />
          <Route path="/goal/3" element={<GoalStep3Screen />} />
          <Route path="/goal/4" element={<GoalStep4Screen />} />
          <Route path="/goal/success" element={<GoalSuccessScreen />} />
          <Route path="/profile" element={<ManagerProfileScreen />} />
          <Route path="/profile/possibilities" element={<PossibilitiesScreen />} />
          <Route path="/shoutouts" element={<ShoutoutsScreen />} />
          <Route path="/shoutouts/moments" element={<MomentsScreen />} />
        </Route>
        <Route path="/style-guide" element={<StyleGuide />} />
      </Routes>
    </FlowProvider>
  )
}
