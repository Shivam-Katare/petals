import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useGridStore } from '@/lib/store'
import { ChevronDown, ChevronRight, ChevronUp, ChevronLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GridPreview() {
  const {
    columns,
    rows,
    columnGap,
    rowGap,
    columnFractions,
    rowFractions,
    selectedTemplate,
    gridItems,
    selectedItemId,
    selectItem,
    setItemColSpan,
    setItemRowSpan,
    resetItemSpans,
    getItemById
  } = useGridStore()

  // Initialize grid dimensions and styles
  const gridStyle = useMemo(() => {
    if (selectedTemplate) {
      return {
        display: 'grid',
        gridTemplateColumns: selectedTemplate.columns,
        gridTemplateRows: selectedTemplate.rows,
        gridColumnGap: `${selectedTemplate.columnGap}px`,
        gridRowGap: `${selectedTemplate.rowGap}px`,
      }
    }

    const columnValues = columnFractions.map(fr => `${fr}fr`).join(' ')
    const rowValues = rowFractions.map(fr => `${fr}fr`).join(' ')

    return {
      display: 'grid',
      gridTemplateColumns: columnValues,
      gridTemplateRows: rowValues,
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
    }
  }, [columns, rows, columnGap, rowGap, columnFractions, rowFractions, selectedTemplate])

  // Get the selected item details if any - update this to include gridItems in the dependency array
  const selectedItem = useMemo(() => {
    if (selectedItemId === null) return null
    return gridItems.find(item => item.id === selectedItemId)
  }, [selectedItemId, gridItems])

  // Function to handle increasing/decreasing spans
  const handleIncreaseColSpan = () => {
    if (selectedItemId && selectedItem) {
      setItemColSpan(selectedItemId, selectedItem.colSpan + 1)
    }
  }

  const handleDecreaseColSpan = () => {
    if (selectedItemId && selectedItem && selectedItem.colSpan > 1) {
      setItemColSpan(selectedItemId, selectedItem.colSpan - 1)
    }
  }

  const handleIncreaseRowSpan = () => {
    if (selectedItemId && selectedItem) {
      setItemRowSpan(selectedItemId, selectedItem.rowSpan + 1)
    }
  }

  const handleDecreaseRowSpan = () => {
    if (selectedItemId && selectedItem && selectedItem.rowSpan > 1) {
      setItemRowSpan(selectedItemId, selectedItem.rowSpan - 1)
    }
  }

  const handleResetSpans = () => {
    if (selectedItemId) {
      resetItemSpans(selectedItemId)
    }
  }

  // Generate the preview cells based on template type or custom grid
  const generatePreviewCells = () => {
    if (selectedTemplate) {
      // For templates, use the existing template-specific preview
      return generateTemplatePreviewCells()
    }

    // For custom grid, generate cells with the ability to select and span
    return Array.from({ length: columns * rows }).map((_, i) => {
      const itemId = i + 1
      const item = gridItems.find(item => item.id === itemId) || { id: itemId, colSpan: 1, rowSpan: 1 }

      return (
        <motion.div
          key={`grid-item-${itemId}-col${item.colSpan}-row${item.rowSpan}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.02 }}
          className={`bg-neutral-200 dark:bg-neutral-800 rounded-sm flex items-center justify-center ${selectedItemId === itemId ? 'ring-2 ring-primary' : ''
            }`}
          style={{
            gridColumn: item.colSpan > 1 ? `span ${item.colSpan}` : undefined,
            gridRow: item.rowSpan > 1 ? `span ${item.rowSpan}` : undefined,
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => selectItem(selectedItemId === itemId ? null : itemId)}
        >
          <span className="text-xs text-center opacity-70">
            {itemId}
            {(item.colSpan > 1 || item.rowSpan > 1) && (
              <div className="text-[10px] opacity-70">
                {item.colSpan > 1 && `col-span-${item.colSpan}`}
                {item.colSpan > 1 && item.rowSpan > 1 && ' / '}
                {item.rowSpan > 1 && `row-span-${item.rowSpan}`}
              </div>
            )}
          </span>
        </motion.div>
      )
    })
  }

  // This keeps the original template preview functionality
  const generateTemplatePreviewCells = () => {
    // Template-specific cell generation logic (keeping the original code)
    switch (selectedTemplate?.id) {
      case 'ivy-cascade':
        return Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="bg-neutral-200 dark:bg-neutral-800 rounded-sm item"
            style={{
              gridRow: i % 3 === 0 ? 'span 40' : i % 5 === 0 ? 'span 30' : 'span 20',
              gridColumn: i % 4 === 0 ? 'span 2' : 'span 1'
            }}
          />
        ))

      // Keep all other cases from the original component 
      case 'orchid-overlap':
        return Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="card rounded-sm overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <div className="card-image bg-blue-300 dark:bg-blue-700 h-32 rounded-t-sm" />
            <div className="card-content bg-neutral-200 dark:bg-neutral-800 h-24 rounded-b-sm pt-6 px-3">
              <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded mb-2 w-3/4"></div>
              <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded mb-2"></div>
              <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded w-1/2"></div>
            </div>
          </motion.div>
        ))

      case 'lavender-waves':
        return Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="item bg-neutral-200 dark:bg-neutral-800 rounded-sm"
            style={{
              gridColumn: i % 5 === 0 ? 'span 3' : i % 5 === 1 ? 'span 3' : i % 5 === 2 ? 'span 2' : i % 5 === 3 ? 'span 2' : 'span 2',
              gridRow: i % 5 === 0 || i % 5 === 3 ? 'span 2' : 'span 1'
            }}
          />
        ))

      case 'carnation-nest':
        return (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-200 dark:bg-blue-800 rounded-sm header"
              style={{ gridColumn: '1 / -1', gridRow: '1' }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-green-200 dark:bg-green-800 rounded-sm sidebar"
              style={{ gridColumn: '1', gridRow: '2 / span 2' }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="main-dashboard rounded-sm"
              style={{
                gridColumn: '2 / -1',
                gridRow: '2',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '12px'
              }}
            >
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-purple-200 dark:bg-purple-800 rounded-sm" />
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="widget-area rounded-sm"
              style={{
                gridColumn: '2 / -1',
                gridRow: '3',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px'
              }}
            >
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="bg-yellow-200 dark:bg-yellow-800 rounded-sm" />
              ))}
            </motion.div>
          </>
        )

      case 'rose-mosaic':
        return Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="item bg-neutral-200 dark:bg-neutral-800 rounded-sm"
            style={{
              gridColumn: i % 9 === 0 ? 'span 2' : i % 9 === 1 ? 'span 3' : i % 9 === 5 ? 'span 3' : i % 9 === 3 ? 'span 2' : 'span 1',
              gridRow: i % 9 === 0 || i % 9 === 4 ? 'span 2' : 'span 1'
            }}
          />
        ))

      case 'tulip-trail':
        return Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="story-block bg-neutral-200 dark:bg-neutral-800 rounded-sm"
            style={{
              gridColumn: i % 4 === 0 ? '2 / span 4' : i % 4 === 1 ? '7 / span 4' : i % 4 === 2 ? '4 / span 4' : '9 / span 3',
              minHeight: '50px'
            }}
          />
        ))

      case 'lily-stack':
        return Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="panel bg-neutral-200 dark:bg-neutral-800 rounded-sm"
            style={{
              marginTop: i % 3 === 0 ? '40px' : i % 3 === 2 ? '80px' : '0'
            }}
          />
        ))

      case 'lily-diagonal': // Preview for Lily Diagonal
        return Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="item bg-neutral-200 dark:bg-neutral-800 rounded-sm"
            style={{
              gridColumn: `span ${i % 3 === 0 ? 2 : 1}`,
              gridRow: `span ${i % 3 === 0 ? 2 : 1}`,
              transform: `rotate(${i % 2 === 0 ? 10 : -10}deg)`,
              transformOrigin: 'center center'
            }}
          />
        ))

      case 'violet-spiral': // Preview for Violet Spiral
        return Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="bg-neutral-200 dark:bg-neutral-800 rounded-sm item"
            style={{
              gridColumn: `span ${i % 3 === 0 ? 2 : 1}`,
              gridRow: `span ${i % 2 === 0 ? 2 : 1}`,
              transform: `rotate(${i * 15}deg)`,
              transformOrigin: 'center center'
            }}
          />
        ))

      case 'magnolia-horizontal': // Preview for Magnolia Horizontal
        return Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="item bg-neutral-200 dark:bg-neutral-800 rounded-sm"
            style={{
              gridColumn: 'span 2',
              gridRow: 'span 1',
              transform: `rotate(${i % 2 === 0 ? 15 : -15}deg)`,
              transformOrigin: 'center center'
            }}
          />
        ))

      case 'diamond-pattern':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.03 }}
            className="w-full h-full"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridTemplateRows: '1fr 1fr 1fr',
              gap: '4px',
              transform: 'rotate(45deg)',
              transformOrigin: 'center'
            }}
          >
            {/* These divs position matches your pattern's grid placement */}
            <div className="col-start-2 col-end-3 row-start-1 row-end-2 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]" style={{ transform: 'rotate(-45deg)' }} />
            <div className="col-start-1 col-end-2 row-start-2 row-end-3 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]" style={{ transform: 'rotate(-45deg)' }} />
            <div className="col-start-3 col-end-4 row-start-2 row-end-3 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]" style={{ transform: 'rotate(-45deg)' }} />
            <div className="col-start-2 col-end-3 row-start-3 row-end-4 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]" style={{ transform: 'rotate(-45deg)' }} />
            <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-purple-400 dark:bg-purple-700 rounded-[2px] z-10" style={{ transform: 'rotate(-45deg)' }} />
          </motion.div>
        );
 
        case 'central-focus':
        return (
          <motion.div className="grid h-full w-full gap-1" style={{
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gridTemplateAreas: '"a a b" "c d b" "e e e"'
          }}>
            <div className="bg-white dark:bg-neutral-700 rounded-[2px] shadow-sm" style={{ gridArea: 'a' }}></div>
            <div className="bg-white dark:bg-neutral-700 rounded-[2px] shadow-sm" style={{ gridArea: 'b' }}></div>
            <div className="bg-white dark:bg-neutral-700 rounded-[2px] shadow-sm" style={{ gridArea: 'c' }}></div>
            <div className="bg-gradient-to-br from-purple-700 to-blue-500 rounded-[2px] transform scale-105 z-10 shadow-md" style={{ gridArea: 'd' }}></div>
            <div className="bg-white dark:bg-neutral-700 rounded-[2px] shadow-sm" style={{ gridArea: 'e' }}></div>
          </motion.div>
        );
      case 'staggered-columns':
        return (
          <motion.div className="grid grid-cols-3 gap-1 h-full w-full bg-indigo-950 p-1 rounded-[3px]">
            <div className="bg-indigo-900 dark:bg-indigo-800 row-span-2 rounded-[2px] border-l-2 border-blue-900"></div>
            <div className="bg-indigo-900 dark:bg-indigo-800 col-span-2 rounded-[2px] border-l-2 border-red-500"></div>
            <div className="bg-indigo-900 dark:bg-indigo-800 row-span-2 rounded-[2px] border-l-2 border-blue-900"></div>
            <div className="bg-indigo-900 dark:bg-indigo-800 rounded-[2px] border-l-2 border-red-500"></div>
            <div className="bg-indigo-900 dark:bg-indigo-800 col-span-2 rounded-[2px] border-l-2 border-blue-900"></div>
          </motion.div>
        );
      case 'spotlight-grid':
        return (
          <motion.div className="w-full h-full flex flex-col gap-1">
            <div className="grid grid-cols-3 gap-1 flex-1">
              <div className="bg-neutral-300 dark:bg-neutral-700 rounded-[2px]"></div>
              <div className="bg-neutral-300 dark:bg-neutral-700 rounded-[2px]"></div>
              <div className="bg-neutral-300 dark:bg-neutral-700 rounded-[2px]"></div>
            </div>
            <div className="bg-blue-500 dark:bg-blue-700 rounded-[2px] h-8"></div>
            <div className="bg-neutral-300 dark:bg-neutral-700 rounded-[2px] h-8"></div>
          </motion.div>
        );


      default:
        // For other templates, just return basic cells
        return Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="bg-neutral-200 dark:bg-neutral-800 rounded-sm"
          />
        ))
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-md overflow-auto flex-grow">
        <motion.div
          layout
          className={`w-full min-h-[250px] ${selectedTemplate?.id}`}
          style={gridStyle}
        >
          {generatePreviewCells()}
        </motion.div>
      </div>

      {/* Span controls - only show when an item is selected and not in template mode */}
      {selectedItemId && !selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-card border rounded-md p-4 flex flex-col"
          key={`span-controls-${selectedItemId}-${selectedItem?.colSpan}-${selectedItem?.rowSpan}`}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Item {selectedItemId} Spans</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => selectItem(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">Column Span: {selectedItem?.colSpan}</span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleDecreaseColSpan}
                    disabled={!selectedItem || selectedItem.colSpan <= 1}
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleIncreaseColSpan}
                    disabled={!selectedItem || selectedItem.colSpan >= columns}
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="h-1 bg-secondary relative rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{ width: `${((selectedItem?.colSpan || 1) / columns) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">Row Span: {selectedItem?.rowSpan}</span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleDecreaseRowSpan}
                    disabled={!selectedItem || selectedItem.rowSpan <= 1}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleIncreaseRowSpan}
                    disabled={!selectedItem || selectedItem.rowSpan >= rows}
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="h-1 bg-secondary relative rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{ width: `${((selectedItem?.rowSpan || 1) / rows) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetSpans}
            className="mt-3 text-xs h-7"
            disabled={!selectedItem || (selectedItem.colSpan === 1 && selectedItem.rowSpan === 1)}
          >
            Reset to 1x1
          </Button>
        </motion.div>
      )}
    </div>
  )
} 