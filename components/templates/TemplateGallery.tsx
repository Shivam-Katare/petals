import { useGridStore, GridTemplate } from '@/lib/store'
import { TemplateCard } from './TemplateCard'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Define difficulty mapping for each template
const templateDifficulty: Record<string, { level: number }> = {
  'wildflower-mosaic': { level: 2 },
  'magnolia-gazette': { level: 2},
  'garden-board': { level: 1 },
  'twin-petals': { level: 1 },
  'sunflower-center': { level: 1 },
  'morning-glory': { level: 1 },
  'ivy-cascade': { level: 4 },
  'orchid-overlap': { level: 5 },
  'lavender-waves': { level: 4 },
  'carnation-nest': { level: 5 },
  'rose-mosaic': { level: 4 },
  'tulip-trail': { level: 3 },
  'lily-stack': { level: 2 },
  "lily-diagonal": { level: 2 },
  "violet-spiral": { level: 3 },
  "magnolia-horizontal": { level: 2 },
  "diamond-pattern": {level: 2},
  "spotlight-grid": { level: 3 },
  "staggered-columns": { level: 4 },
  "central-focus": { level: 4 }
};

export function TemplateGallery() {
  const { templates } = useGridStore()

  // Group templates by difficulty
  const basicTemplates = templates.filter(t =>
    templateDifficulty[t.id]?.level <= 2
  );

  const intermediateTemplates = templates.filter(t =>
    templateDifficulty[t.id]?.level === 3
  );

  const advancedTemplates = templates.filter(t =>
    templateDifficulty[t.id]?.level >= 4
  );

  // Template list with difficulty badges
  const renderTemplateList = (templateList: GridTemplate[]) => (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.05, duration: 0.3 }}
    >
      {templateList.map((template) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <TemplateCard template={template} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Templates Gallery</h2>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Advanced Templates</h3>
            {renderTemplateList(advancedTemplates)}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Intermediate Templates</h3>
            {renderTemplateList(intermediateTemplates)}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Basic Templates</h3>
            {renderTemplateList(basicTemplates)}
          </div>
        </TabsContent>

        <TabsContent value="basic">
          {renderTemplateList(basicTemplates)}
        </TabsContent>

        <TabsContent value="intermediate">
          {renderTemplateList(intermediateTemplates)}
        </TabsContent>

        <TabsContent value="advanced">
          {renderTemplateList(advancedTemplates)}
        </TabsContent>
      </Tabs>
    </div>
  )
} 