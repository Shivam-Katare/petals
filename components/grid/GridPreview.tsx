import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useGridStore } from '@/lib/store'

export function GridPreview() {
  const {
    columns,
    rows,
    columnGap,
    rowGap,
    columnFractions,
    rowFractions,
    selectedTemplate
  } = useGridStore()

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

  // Generate the preview cells based on template type
  const generatePreviewCells = () => {
    if (!selectedTemplate) {
      // For custom grid, just return basic cells
      return Array.from({ length: columns * rows }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.02 }}
          className="bg-neutral-200 dark:bg-neutral-800 rounded-sm"
        />
      ));
    }

    // Template-specific cell generation
    switch (selectedTemplate.id) {
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
        ));

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
        ));

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
        ));

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
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-purple-200 dark:bg-purple-800 rounded-sm" />
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
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded-sm" />
              ))}
            </motion.div>
          </>
        );

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
        ));

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
        ));

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
        ));

      case 'daisy-slant': // Improved preview for Daisy Slant
        return Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="item bg-neutral-200 dark:bg-neutral-800 rounded-sm"
            style={{
              gridColumn: i % 4 === 0 ? 'span 3' : i % 4 === 1 ? 'span 4' : 'span 2',
              gridRow: 'span 2',
              transform: `rotate(${i % 2 === 0 ? 5 : -5}deg)`,
              transformOrigin: 'center center'
            }}
          />
        ));

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
        ));

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
        ));

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
        ));

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
        ));
    }
  };

  return (
    <div className="w-full h-full p-6 bg-neutral-100 dark:bg-neutral-900 rounded-md overflow-auto">
      <motion.div
        layout
        className={`w-full min-h-[250px] ${selectedTemplate?.id}`}
        style={gridStyle}
      >
        {generatePreviewCells()}
      </motion.div>
    </div>
  )
} 