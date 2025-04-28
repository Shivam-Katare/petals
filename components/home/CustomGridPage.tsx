import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { GridPreview } from '@/components/grid/GridPreview'
import { GridSettings } from '@/components/grid/GridSettings'
import { CSSDisplay } from '@/components/grid/CSSDisplay'
import { useGridStore } from '@/lib/store'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ImportantNote } from '../ui/ImportantNote'

interface CustomGridPageProps {
  onBack: () => void
}

export function CustomGridPage({ onBack }: CustomGridPageProps) {
  const { setSelectedTemplate } = useGridStore()
  
  // Reset any selected template when entering this page
  useEffect(() => {
    setSelectedTemplate(null)
  }, [setSelectedTemplate])
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Custom Grid</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <GridSettings />
            </div>
            
            <div className="p-4 border rounded-xl">
              <CSSDisplay />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Live Preview</h2>
            <div className="rounded-xl border shadow-sm overflow-hidden h-[400px]">
              <GridPreview />
            </div>
          </div>
        </div>

        <ImportantNote />
      </motion.div>
    </div>
  )
} 