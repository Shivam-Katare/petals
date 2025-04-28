import { useGridStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'react-hot-toast'

export function CSSDisplay() {
  const { generateCSS, selectedTemplate, gridItems } = useGridStore()
  const [css, setCss] = useState('')
  const [htmlCode, setHtmlCode] = useState('')
  const [highlightedCSS, setHighlightedCSS] = useState<string>('')
  const [highlightedHTML, setHighlightedHTML] = useState<string>('')
  const [codeType, setCodeType] = useState<'css' | 'html'>('css')
  
  // Update CSS whenever the grid settings change
  useEffect(() => {
    const newCss = generateCSS();
    setCss(generateCSS())
    highlightCode(newCss, 'css')
    if (selectedTemplate?.html) {
      setHtmlCode(selectedTemplate.html)
      highlightCode(selectedTemplate.html, 'html')

    } else {
      // Default HTML for custom grid
      setHtmlCode(`<div class="grid-container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
  <div class="item">Item 5</div>
  <div class="item">Item 6</div>
  <div class="item">Item 7</div>
  <div class="item">Item 8</div>
  <div class="item">Item 9</div>
</div>`)
    }
  }, [generateCSS, selectedTemplate, gridItems])

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
      className="p-4 border rounded-md bg-black text-white h-full"
    >
      <Tabs 
        defaultValue="css" 
        value={codeType} 
        onValueChange={(value) => setCodeType(value as 'css' | 'html')}
        className="w-full h-full flex flex-col"
      >
        <div className="flex justify-between items-center mb-2">
          <TabsList className="bg-black/20 border border-white/10">
            <TabsTrigger value="css" className="text-xs">CSS</TabsTrigger>
            <TabsTrigger 
              value="html" 
              className="text-xs"
              disabled={!selectedTemplate?.html && !htmlCode}
            >
              HTML
            </TabsTrigger>
          </TabsList>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCopyCode}
            className="text-xs h-7 px-2 bg-transparent border-white/20 hover:bg-white/10 text-white hover:text-white"
          >
            <Copy className="mr-1 h-3 w-3" />
            Copy {codeType.toUpperCase()}
          </Button>
        </div>
        
        <TabsContent value="css" className="m-0 mt-2 flex-grow overflow-auto">
          {
            highlightedCSS ? (
              <div 
              className="text-xs font-mono overflow-x-auto rounded-sm"
              dangerouslySetInnerHTML={{ __html: highlightedCSS }}
            />
            ) : (
              <pre className="text-xs font-mono p-2 bg-black/50 rounded-sm whitespace-pre-wrap">
            {css}
             </pre>
            )
          }
          
        </TabsContent>
        
        <TabsContent value="html" className="m-0 mt-2 flex-grow overflow-auto">
          {highlightedHTML ? (
            <div 
            className="text-xs font-mono overflow-x-auto rounded-sm"
            dangerouslySetInnerHTML={{ __html: highlightedHTML }}
          />
          ) : (
              <pre className="text-xs font-mono p-2 bg-black/50 rounded-sm whitespace-pre-wrap">
            {htmlCode}
              </pre>
          )
        }
        
        </TabsContent>
      </Tabs>
    </motion.div>
  )
} 