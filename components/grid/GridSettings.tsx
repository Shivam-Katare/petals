import { useGridStore } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Copy, RotateCcw, RefreshCw, ArrowRight, Undo } from 'lucide-react'

export function GridSettings() {
  const { 
    columns, 
    rows, 
    columnGap, 
    rowGap, 
    columnFractions,
    rowFractions,
    setColumns, 
    setRows, 
    setColumnGap, 
    setRowGap,
    setColumnFraction,
    setRowFraction,
    resetFractions,
    resetToDefaults,
    generateCSS,
    resetAllItemSpans
  } = useGridStore()

  const [activeTab, setActiveTab] = useState<'columns' | 'rows'>('columns')
  const [advancedMode, setAdvancedMode] = useState(false)

  const handleCopyCSS = () => {
    const css = generateCSS()
    navigator.clipboard.writeText(css)
    toast.success('CSS copied to clipboard!')
  }

  const handleResetAll = () => {
    resetToDefaults()
    toast.success('Reset to default values')
  }

  const handleToggleAdvanced = () => {
    setAdvancedMode(!advancedMode)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Grid Settings</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetAll}
          className="flex items-center gap-1"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset All
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of columns</label>
            <Input 
              type="number" 
              min={1} 
              max={12}
              value={columns} 
              onChange={(e) => setColumns(parseInt(e.target.value) || 1)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of rows</label>
            <Input 
              type="number" 
              min={1} 
              max={12}
              value={rows} 
              onChange={(e) => setRows(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Column gap (px)</label>
            <Input 
              type="number" 
              min={0} 
              max={100}
              value={columnGap} 
              onChange={(e) => setColumnGap(parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Row gap (px)</label>
            <Input 
              type="number" 
              min={0} 
              max={100}
              value={rowGap} 
              onChange={(e) => setRowGap(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex space-x-2 mb-4">
          <Button
            variant={activeTab === 'columns' ? 'default' : 'outline'}
            onClick={() => setActiveTab('columns')}
          >
            Per column fr
          </Button>
          <Button
            variant={activeTab === 'rows' ? 'default' : 'outline'}
            onClick={() => setActiveTab('rows')}
          >
            Per row fr
          </Button>
        </div>
        
        <div className="space-y-4">
          {activeTab === 'columns' ? (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {columnFractions.map((fr, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <label>Column {index + 1}</label>
                    <span>{fr}fr</span>
                  </div>
                  <Slider
                    min={1}
                    max={12}
                    step={1}
                    value={[fr]}
                    onValueChange={(value) => setColumnFraction(index, value[0])}
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {rowFractions.map((fr, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <label>Row {index + 1}</label>
                    <span>{fr}fr</span>
                  </div>
                  <Slider
                    min={1}
                    max={12}
                    step={1}
                    value={[fr]}
                    onValueChange={(value) => setRowFraction(index, value[0])}
                  />
                </div>
              ))}
            </motion.div>
          )}
          
          <Button 
            variant="outline" 
            onClick={resetFractions}
            className="w-full mt-2"
          >
            Reset All to 1fr
          </Button>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleCopyCSS}
          className="w-full"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy CSS
        </Button>
      </div>

      <div className="pt-3">
        <Button
          variant="outline"
          size="sm"
          onClick={resetAllItemSpans}
          className="w-full flex items-center justify-center gap-2 text-sm"
        >
          <Undo className="h-4 w-4" />
          Reset All Item Spans
        </Button>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          This will reset all grid items to their default 1x1 span
        </p>
      </div>
    </div>
  )
} 