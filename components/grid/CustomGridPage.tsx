import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GridSettings } from './GridSettings'
import { GridPreview } from './GridPreview'
import { CSSDisplay } from './CSSDisplay'
import { useGridStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface CustomGridPageProps {
  onBack: () => void
}

export function CustomGridPage({ onBack }: CustomGridPageProps) {
  const { initializeGridItems, selectedItemId } = useGridStore()
  
  // Initialize grid items when the page loads
  useEffect(() => {
    initializeGridItems()
  }, [initializeGridItems])
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-8">
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

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <GridSettings />
          
          <div className="flex flex-col space-y-4">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {selectedItemId === null && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs py-1 px-3 rounded-full whitespace-nowrap animate-pulse">
                  Click on any grid item to adjust its span
                </div>
              )}
              <GridPreview />
            </motion.div>
            
            <CSSDisplay />
          </div>
        </div>
        
        <motion.div 
          className="bg-card border rounded-md p-4 md:p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-medium mb-2">How to use this grid builder</h3>
          <ul className="text-sm text-muted-foreground max-w-2xl mx-auto text-left list-disc pl-5 space-y-2">
            <li>Adjust the number of columns and rows using the sliders</li>
            <li>Set gaps between grid items</li>
            <li><strong>Click on any grid item to adjust its column and row spans</strong></li>
            <li>Use the advanced options to set custom column and row fractions</li>
            <li>Copy the generated CSS to use in your project</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
} 