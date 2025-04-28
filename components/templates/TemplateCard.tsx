import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GridTemplate, useGridStore } from '@/lib/store'

interface TemplateCardProps {
  template: GridTemplate
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { setSelectedTemplate, selectedTemplate } = useGridStore()
  const isSelected = selectedTemplate?.id === template.id

  const handleSelect = () => {
    setSelectedTemplate(template)
  }

  // Generate a simple mini preview based on the template
  const previewStyle = {
    display: 'grid',
    gridTemplateColumns: template.columns,
    gridTemplateRows: template.rows,
    gridColumnGap: `${template.columnGap / 2}px`,
    gridRowGap: `${template.rowGap / 2}px`,
  }

  // Determine the appropriate number of cells and styling for the preview
  const getPreviewCells = () => {
    switch (template.id) {
      case 'wildflower-mosaic':
        return Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
          />
        ));

      case 'ivy-cascade':
        return Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`bg-neutral-200 dark:bg-neutral-700 rounded-[2px] ${i % 3 === 0 ? 'tall' : i % 4 === 0 ? 'wide' : ''
              }`}
            style={{
              gridRow: i % 3 === 0 ? 'span 4' : i % 5 === 0 ? 'span 3' : 'span 2',
              gridColumn: i % 4 === 0 ? 'span 2' : 'span 1'
            }}
          />
        ));

      case 'orchid-overlap':
        return Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative rounded-[2px] overflow-hidden"
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="bg-blue-300 dark:bg-blue-700 h-3/4 rounded-t-[2px] z-10 relative top-0" />
            <div className="bg-neutral-200 dark:bg-neutral-700 h-1/2 rounded-[2px] mt-[-8px]" />
          </div>
        ));

      case 'lavender-waves':
        return Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
            style={{
              gridColumn: i === 0 ? 'span 3' : i === 1 ? 'span 3' : 'span 2',
              gridRow: i === 0 || i === 3 ? 'span 2' : 'span 1'
            }}
          />
        ));

      case 'carnation-nest':
        return (
          <>
            <div className="bg-blue-200 dark:bg-blue-800 col-span-full rounded-[2px]" />
            <div className="bg-green-200 dark:bg-green-800 row-span-2 rounded-[2px]" />
            <div className="bg-neutral-200 dark:bg-neutral-700 col-span-3 rounded-[2px]" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`nested-${i}`} className="bg-purple-200 dark:bg-purple-800 rounded-[1px]" />
              ))}
            </div>
            <div className="bg-neutral-200 dark:bg-neutral-700 col-span-3 rounded-[2px]" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px' }}>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={`widget-${i}`} className="bg-yellow-200 dark:bg-yellow-800 rounded-[1px]" />
              ))}
            </div>
          </>
        );

      case 'rose-mosaic':
        return Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
            style={{
              gridColumn: i === 0 ? 'span 2' : i === 1 ? 'span 3' : i === 5 ? 'span 3' : 'span 1',
              gridRow: i === 0 || i === 4 ? 'span 2' : 'span 1'
            }}
          />
        ));

      case 'tulip-trail':
        return Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
            style={{
              gridColumn: i === 0 ? '2 / span 4' : i === 1 ? '7 / span 4' : i === 2 ? '4 / span 4' : '9 / span 3'
            }}
          />
        ));

      case 'lily-stack':
        return Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
            style={{
              marginTop: i % 3 === 0 ? '4px' : i % 3 === 2 ? '8px' : '0'
            }}
          />
        ));

      case 'lily-diagonal':
        return Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="lily-diagonal-item bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
            style={{
              transform: i % 2 === 0 ? 'rotate(5deg)' : 'rotate(-5deg)',
              gridColumn: i % 2 === 0 ? 'span 2' : 'span 3',
            }}
          />
        ));

      case 'violet-spiral':
        return Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="violet-spiral-item bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
            style={{
              transform: i % 2 === 0 ? 'rotate(10deg)' : 'rotate(-10deg)',
              gridColumn: i % 2 === 0 ? 'span 2' : 'span 3',
            }}
          />
        ));

      case 'daisy-slant':
        return Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}  // Start off with a slight offset for a smooth "slide up" effect
            animate={{ opacity: 1, y: 0 }}  // Fade in and slide into position
            transition={{ duration: 0.4, delay: i * 0.1 }} // Delay for a staggered effect
            className="daisy-slant-item bg-neutral-200 dark:bg-neutral-700 rounded-[2px] shadow-md"
            style={{
              transform: i % 2 === 0 ? 'skew(-10deg)' : 'skew(10deg)',
              gridColumn: i % 2 === 0 ? 'span 2' : 'span 3',
              gridRow: i % 2 === 0 ? 'span 2' : 'span 1',  // Adding a more varied layout with row spanning
              borderRadius: '8px',  // Slightly more rounded corners for a smoother feel
            }}
          />
        ));
      case 'magnolia-horizontal':
        return Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="magnolia-horizontal-item bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
            style={{
              gridColumn: i % 3 === 0 ? 'span 2' : 'span 1',
            }}
          />
        ));

      case 'diamond-pattern':
        return (
          <div
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
            <div className="col-start-2 col-end-3 row-start-1 row-end-2 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]" style={{ transform: 'rotate(-45deg)' }} />
            <div className="col-start-1 col-end-2 row-start-2 row-end-3 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]" style={{ transform: 'rotate(-45deg)' }} />
            <div className="col-start-3 col-end-4 row-start-2 row-end-3 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]" style={{ transform: 'rotate(-45deg)' }} />
            <div className="col-start-2 col-end-3 row-start-3 row-end-4 bg-neutral-200 dark:bg-neutral-700 rounded-[2px]" style={{ transform: 'rotate(-45deg)' }} />
            <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-purple-400 dark:bg-purple-700 rounded-[2px] z-10" style={{ transform: 'rotate(-45deg)' }} />
          </div>
        );
      case 'central-focus':
        return (
          <div className="grid h-full w-full gap-1" style={{
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gridTemplateAreas: '"a a b" "c d b" "e e e"'
          }}>
            <div className="bg-white dark:bg-neutral-700 rounded-[2px] shadow-sm" style={{ gridArea: 'a' }}></div>
            <div className="bg-white dark:bg-neutral-700 rounded-[2px] shadow-sm" style={{ gridArea: 'b' }}></div>
            <div className="bg-white dark:bg-neutral-700 rounded-[2px] shadow-sm" style={{ gridArea: 'c' }}></div>
            <div className="bg-gradient-to-br from-purple-700 to-blue-500 rounded-[2px] transform scale-105 z-10 shadow-md" style={{ gridArea: 'd' }}></div>
            <div className="bg-white dark:bg-neutral-700 rounded-[2px] shadow-sm" style={{ gridArea: 'e' }}></div>
          </div>
        );
      case 'staggered-columns':
        return (
          <div className="grid grid-cols-3 gap-1 h-full w-full bg-indigo-950 p-1 rounded-[3px]">
            <div className="bg-indigo-900 dark:bg-indigo-800 row-span-2 rounded-[2px] border-l-2 border-blue-900"></div>
            <div className="bg-indigo-900 dark:bg-indigo-800 col-span-2 rounded-[2px] border-l-2 border-red-500"></div>
            <div className="bg-indigo-900 dark:bg-indigo-800 row-span-2 rounded-[2px] border-l-2 border-blue-900"></div>
            <div className="bg-indigo-900 dark:bg-indigo-800 rounded-[2px] border-l-2 border-red-500"></div>
            <div className="bg-indigo-900 dark:bg-indigo-800 col-span-2 rounded-[2px] border-l-2 border-blue-900"></div>
          </div>
        );
      case 'asymmetric-mosaic':
        return (
          <div className="grid grid-cols-4 grid-rows-3 gap-1 h-full w-full">
            <div className="bg-cyan-100 dark:bg-cyan-900 rounded-[2px] col-span-2 row-span-2 border border-cyan-300 dark:border-cyan-700"></div>
            <div className="bg-cyan-100 dark:bg-cyan-900 rounded-[2px] col-span-2 border border-cyan-300 dark:border-cyan-700"></div>
            <div className="bg-cyan-100 dark:bg-cyan-900 rounded-[2px] row-span-2 border border-cyan-300 dark:border-cyan-700"></div>
            <div className="bg-cyan-100 dark:bg-cyan-900 rounded-[2px] row-span-2 border border-cyan-300 dark:border-cyan-700"></div>
            <div className="bg-cyan-100 dark:bg-cyan-900 rounded-[2px] col-span-2 border border-cyan-300 dark:border-cyan-700"></div>
          </div>
        );
      case 'concentric-circles':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full bg-pink-900 dark:bg-pink-900"></div>
            <div className="absolute w-[70%] h-[70%] rounded-full bg-pink-800 dark:bg-pink-800"></div>
            <div className="absolute w-[40%] h-[40%] rounded-full bg-pink-700 dark:bg-pink-600"></div>
          </div>
        );
      case 'spotlight-grid':
        return (
          <div className="w-full h-full flex flex-col gap-1">
            <div className="grid grid-cols-3 gap-1 flex-1">
              <div className="bg-neutral-300 dark:bg-neutral-700 rounded-[2px]"></div>
              <div className="bg-neutral-300 dark:bg-neutral-700 rounded-[2px]"></div>
              <div className="bg-neutral-300 dark:bg-neutral-700 rounded-[2px]"></div>
            </div>
            <div className="bg-blue-500 dark:bg-blue-700 rounded-[2px] h-8"></div>
            <div className="bg-neutral-300 dark:bg-neutral-700 rounded-[2px] h-8"></div>
          </div>
        );

      default:
        // For other templates, show 6 standard cells
        return Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-200 dark:bg-neutral-700 rounded-[2px]"
          />
        ));
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`cursor-pointer overflow-hidden ${isSelected ? 'ring-2 ring-primary' : ''}`}
        onClick={handleSelect}
      >
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-md">{template.name}</CardTitle>
          <CardDescription className="text-xs">{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="w-full h-24 bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden">
            <div className="w-full h-full p-2" style={previewStyle}>
              {getPreviewCells()}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 