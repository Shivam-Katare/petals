import { useGridStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { GridPreview } from '@/components/grid/GridPreview'
import { CSSDisplay } from '@/components/grid/CSSDisplay'
import { ArrowLeft, Copy, Info } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

// Difficulty mapping and descriptions for complex templates
const templateComplexity = {
  'ivy-cascade': {
    technique: 'Grid with grid-auto-flow: dense and varied grid-row spans',
    explanation: 'This template creates a true Pinterest-style masonry layout using CSS Grid without JavaScript. It uses grid-auto-rows with tiny rows (10px) and items spanning multiple rows. The grid-auto-flow: dense property ensures gaps are filled optimally.'
  },
  'orchid-overlap': {
    technique: 'CSS Grid + negative margins / z-index for overlapping elements',
    explanation: 'This complex layout uses a nested grid within each card and negative margins to create overlapping elements. Z-index controls the stacking order, creating a modern card design where images overlap with text containers.'
  },
  'lavender-waves': {
    technique: 'Different span sizes with grid-column/row: span',
    explanation: 'Creates a wavy showcase layout by assigning different column and row spans to items in a predictable pattern. Uses nth-child selectors to automate layout variations without manual class assignment.'
  },
  'carnation-nest': {
    technique: 'Parent grid + child grids with specific placement',
    explanation: 'Demonstrates nested grids - a complex dashboard with a main outer grid and inner grids for specific areas. Uses grid-column and grid-row with line numbers and span values for precise placement.'
  },
  'rose-mosaic': {
    technique: 'Mixed grid-row-end / grid-column-end spans',
    explanation: 'Creates an art gallery with randomly shaped blocks using specific span patterns. Uses nth-child selectors with a 9-item pattern to create visually interesting asymmetry.'
  },
  'tulip-trail': {
    technique: 'Irregular grid-template-areas and grid-column placement',
    explanation: 'Creates a zig-zag layout perfect for storytelling by positioning elements across a 12-column grid. Items alternate sides using column line numbers and spans.'
  },
  'lily-stack': {
    technique: 'grid-auto-rows + margin offsets',
    explanation: 'Uses standard grid layout with vertical offsets via margins to create a staggered, stacked appearance. Adds hover animations for interactive engagement.'
  },
  'spotlight-grid': {
    technique: 'Varied row spans with full-width feature items',
    explanation: 'This layout creates a spotlight effect by placing standard items in a row at the top, followed by a full-width featured item that spans all columns. It uses grid-column properties to create contrast between regular and featured content.'
  },
  'concentric-circles': {
    technique: 'Grid-template-areas with nested circular shapes',
    explanation: 'Uses grid-template-areas to create concentric circles with different sizes. Combined with border-radius: 50%, the grid creates nested circular elements that can be used for hierarchical information display or focus-based interfaces.'
  },
  'asymmetric-mosaic': {
    technique: 'Mixed column and row spans for varied item sizes',
    explanation: 'Creates a visually balanced but asymmetric layout by precisely positioning items with different dimensions. Uses a combination of grid-column and grid-row with span values to create a mosaic-like pattern with clear visual hierarchy.'
  },
  'staggered-columns': {
    technique: 'Interlocked grid items with varying heights and widths',
    explanation: 'Creates a complex staggered effect by interlocking items of different sizes in a way that maintains visual balance. Uses carefully planned grid-column and grid-row positioning to create a layout where items flow around each other.'
  },
  'central-focus': {
    technique: 'Grid-template-areas with emphasized center element',
    explanation: 'Uses named grid-template-areas to create a layout with a central focal point. The design emphasizes one specific grid area while arranging surrounding content in a balanced, asymmetrical pattern that draws attention to the center.'
  },
  'diamond-pattern': {
    technique: 'CSS Grid with rotate transform and overlapping center',
    explanation: 'Creates a diamond pattern by placing items in a grid and applying a 45-degree rotation to the container. Each item is counter-rotated to maintain readability, while z-index ensures proper layering for the center item.'
  }
}

export function TemplateDetail() {
  const { selectedTemplate, setSelectedTemplate, generateCSS } = useGridStore()
  
  if (!selectedTemplate) return null
  
  const handleBackToGallery = () => {
    setSelectedTemplate(null)
  }
  
  const handleCopyCSS = () => {
    const css = generateCSS()
    navigator.clipboard.writeText(css)
    toast.success('CSS copied to clipboard!')
  }
  
  // Get complexity info for the selected template
  const complexityInfo = templateComplexity[selectedTemplate.id as keyof typeof templateComplexity]
  
  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBackToGallery}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">{selectedTemplate.name}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
          </div>
        </div>
        
        <Button 
          onClick={handleCopyCSS}
          size="sm"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy CSS
        </Button>
      </div>
      
      {complexityInfo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md flex gap-2"
        >
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-sm mb-1">
              CSS Technique: <span className="font-normal">{complexityInfo.technique}</span>
            </div>
            <p className="text-sm text-muted-foreground">{complexityInfo.explanation}</p>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Live Preview</h3>
          <GridPreview />
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Template Properties</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                <span className="font-medium">Columns:</span>
                <span className="font-mono">{selectedTemplate.columns}</span>
              </li>
              <li className="flex justify-between p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                <span className="font-medium">Rows:</span>
                <span className="font-mono">{selectedTemplate.rows}</span>
              </li>
              <li className="flex justify-between p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                <span className="font-medium">Column Gap:</span>
                <span className="font-mono">{selectedTemplate.columnGap}px</span>
              </li>
              <li className="flex justify-between p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                <span className="font-medium">Row Gap:</span>
                <span className="font-mono">{selectedTemplate.rowGap}px</span>
              </li>
            </ul>
          </div>
          
          <CSSDisplay />
        </div>
      </div>
    </motion.div>
  )
} 