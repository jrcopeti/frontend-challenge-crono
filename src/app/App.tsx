import { DesignSystemPreview } from '@/components/ui/DesignSystemPreview'
import { TooltipProvider } from '@/components/ui/Tooltip'

export default function App() {
  return (
    <TooltipProvider>
      <DesignSystemPreview />
    </TooltipProvider>
  )
}
