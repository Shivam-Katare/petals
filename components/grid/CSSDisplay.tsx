import { useGridStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function CSSDisplay({ html = false }: { html?: boolean }) {
  const { generateCSS, selectedTemplate } = useGridStore()
  const [css, setCss] = useState<string>('')
  const [htmlCode, setHtmlCode] = useState<string>('')
  const [highlightedCSS, setHighlightedCSS] = useState<string>('')
  const [highlightedHTML, setHighlightedHTML] = useState<string>('')
  const [codeType, setCodeType] = useState<'css' | 'html'>('css')
  
  useEffect(() => {
    // Update CSS and HTML on initial load and template changes
    const newCss = generateCSS()
    setCss(newCss)
    highlightCode(newCss, 'css')
    
    if (selectedTemplate?.html) {
      setHtmlCode(selectedTemplate.html)
      highlightCode(selectedTemplate.html, 'html')
    }
  }, [generateCSS, selectedTemplate])
  
  // Function to highlight code using shiki
  const highlightCode = async (code: string, language: 'css' | 'html') => {
    try {
      const highlighted = await codeToHtml(code, {
        lang: language,
        theme: 'github-dark'
      })
      
      if (language === 'css') {
        setHighlightedCSS(highlighted)
      } else {
        setHighlightedHTML(highlighted)
      }
    } catch (error) {
      console.error(`Error highlighting ${language} code:`, error)
    }
  }
  
  const handleCopyCode = () => {
    const codeToCopy = codeType === 'css' ? css : htmlCode
    navigator.clipboard.writeText(codeToCopy)
    toast.success(`${codeType.toUpperCase()} copied to clipboard!`)
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 border rounded-md bg-black text-white"
    >
      <Tabs 
        defaultValue="css" 
        value={codeType} 
        onValueChange={(value) => setCodeType(value as 'css' | 'html')}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-2">
          <TabsList className="bg-black/20 border border-white/10">
            <TabsTrigger value="css" className="text-xs">CSS</TabsTrigger>
            <TabsTrigger 
              value="html" 
              className="text-xs"
              disabled={!selectedTemplate?.html}
            >
              HTML
            </TabsTrigger>
          </TabsList>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCopyCode}
            className="text-xs h-7 px-2 bg-transparent border-white/20 hover:bg-white/10 text-white"
          >
            <Copy className="mr-1 h-3 w-3" />
            Copy {codeType.toUpperCase()}
          </Button>
        </div>
        
        <TabsContent value="css" className="m-0 mt-2">
          {highlightedCSS ? (
            <div 
              className="text-xs font-mono overflow-x-auto rounded-sm"
              dangerouslySetInnerHTML={{ __html: highlightedCSS }}
            />
          ) : (
            <pre className="text-xs font-mono overflow-x-auto p-2 bg-black/50 rounded-sm">
              {css}
            </pre>
          )}
        </TabsContent>
        
        <TabsContent value="html" className="m-0 mt-2">
          {highlightedHTML ? (
            <div 
              className="text-xs font-mono overflow-x-auto rounded-sm"
              dangerouslySetInnerHTML={{ __html: highlightedHTML }}
            />
          ) : (
            <pre className="text-xs font-mono overflow-x-auto p-2 bg-black/50 rounded-sm">
              {htmlCode}
            </pre>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  )
} 