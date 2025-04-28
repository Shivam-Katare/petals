import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { TemplateGallery } from '@/components/templates/TemplateGallery'
import { TemplateDetail } from '@/components/templates/TemplateDetail'
import { useGridStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { ImportantNote } from '../ui/ImportantNote'

interface TemplatesPageProps {
  onBack: () => void
}

export function TemplatesPage({ onBack }: TemplatesPageProps) {
  const { selectedTemplate } = useGridStore()
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='mb-5'
      >
        {!selectedTemplate && (
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Grid Templates</h1>
          </div>
        )}
        
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          {selectedTemplate ? <TemplateDetail /> : <TemplateGallery />}
        </div>
      </motion.div>
      
      <ImportantNote />
    </div>
  )
} 