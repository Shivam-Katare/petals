"use client";

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CustomGridPage } from './CustomGridPage'
import { TemplatesPage } from './TemplatesPage';
import { Github, Copy, RefreshCw, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { HTML_CODE, SAMPLE_GRID_LAYOUTS, SAMPLE_TEMPLATES } from '@/lib/constant';
import { codeToHtml } from 'shiki'
import toast from 'react-hot-toast';
import { FAQSection } from './FAQSection';
import { ContributionNote } from './ContributionNote';
import Link from 'next/link';
import Image from 'next/image';

export function HomePage() {
  const [screen, setScreen] = useState<'home' | 'custom' | 'templates'>('home')
  const [cssCode, setCssCode] = useState(SAMPLE_GRID_LAYOUTS[0]);

  // Add state for highlighted code
  const [highlightedCSS, setHighlightedCSS] = useState<string>('');
  const [highlightedHTML, setHighlightedHTML] = useState<string>('');

  // Use two separate useEffect hooks - one for CSS, one for HTML
  useEffect(() => {
    const highlightCSS = async () => {
      try {
        const highlighted = await codeToHtml(cssCode, {
          lang: 'css',
          theme: 'github-dark'
        });
        setHighlightedCSS(highlighted);
      } catch (error) {
        console.error('Error highlighting CSS code:', error);
      }
    };

    highlightCSS();
  }, [cssCode]);

  // Separate useEffect for HTML highlighting
  useEffect(() => {
    const highlightHTML = async () => {
      try {
        const highlighted = await codeToHtml(HTML_CODE, {
          lang: 'html',
          theme: 'github-dark'
        });
        setHighlightedHTML(highlighted);
      } catch (error) {
        console.error('Error highlighting HTML code:', error);
      }
    };

    highlightHTML();
  }, []); // Empty dependency array since HTML_CODE doesn't change

  if (screen === 'custom') {
    return <CustomGridPage onBack={() => setScreen('home')} />
  }

  if (screen === 'templates') {
    return <TemplatesPage onBack={() => setScreen('home')} />
  }

  const generateRandomGrid = () => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_GRID_LAYOUTS.length);
    setCssCode(SAMPLE_GRID_LAYOUTS[randomIndex]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard")
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        className="border-b px-4 md:px-8 py-4 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex items-center gap-[5px]'>
        <Image src="/logo.png" width={24} height={24} alt='Petals' />

          <div className="text-2xl font-['Space_Grotesk']">
            Petals
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="https://github.com/Shivam-Katare/petals" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="flex flex-col lg:flex-row py-12 md:py-20 px-4 md:px-8 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Left Side - CTAs */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Pluck Your <br /> Perfect Grid.
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Create stunning ready-to-use grids or design your own. Simple, Fast, and Beautiful.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="text-base py-6"
              onClick={() => setScreen('custom')}
            >
              Create Custom Grid
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-base py-6"
              onClick={() => setScreen('templates')}
            >
              Choose from Templates
            </Button>
          </motion.div>
        </div>

        {/* Right Side - Code Preview */}
        <motion.div
          className="flex-1 min-w-0 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="w-full max-w-lg code-block bg-card border rounded-xl overflow-hidden shadow-md">
            <div className="flex items-center justify-between bg-black p-3 border-b">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  className="h-8 w-8 bg-white dark:bg-black hover:text-white"
                  onClick={generateRandomGrid}
                  title="Generate random grid"
                  variant="default"
                >
                  <RefreshCw className="h-4 w-4 text-foreground hover:text-white" />
                </Button>
                <Button
                  size="icon"
                  className="h-8 w-8 bg-white dark:bg-black hover:text-white"
                  onClick={() => copyToClipboard(cssCode + '\n\n' + HTML_CODE)}
                  title="Copy code"
                  variant="default"
                >
                  <Copy className="h-4 w-4 text-foreground hover:text-white" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="css" className="w-full">
              <TabsList className="w-full justify-start px-3 pt-2 bg-transparent">
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
              </TabsList>
              <TabsContent value="css" className="p-0 m-0">
                {highlightedCSS ? (
                  <div
                    className="text-sm p-4 overflow-auto font-mono h-60"
                    dangerouslySetInnerHTML={{ __html: highlightedCSS }}
                  />
                ) : (
                  <pre className="bg-card text-sm p-4 overflow-auto font-mono h-60">
                    <code>{cssCode}</code>
                  </pre>
                )}
              </TabsContent>

              <TabsContent value="html" className="p-0 m-0">
                {highlightedHTML ? (
                  <div
                    className="text-sm p-4 overflow-auto font-mono h-60"
                    dangerouslySetInnerHTML={{ __html: highlightedHTML }}
                  />
                ) : (
                  <pre className="bg-card text-sm p-4 overflow-auto font-mono h-60">
                    <code>{HTML_CODE}</code>
                  </pre>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </motion.section>

      {/* Marquee Section */}
      <motion.section
        className="py-16 overflow-hidden bg-secondary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Popular Grid Templates</h2>

        <div className="relative">
          <motion.div
            className="flex gap-6 py-4 pr-6"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...SAMPLE_TEMPLATES, ...SAMPLE_TEMPLATES].map((template, index) => (
              <div
                key={`${template.id}-${index}`}
                className="bg-card border rounded-lg shadow-sm min-w-64 overflow-hidden flex-shrink-0"
              >
                <div className="aspect-video bg-secondary/30 flex items-center justify-center">
                  <div className="w-full h-full p-4">
                    {/* Dynamic preview based on template type */}
                    {template.name === 'Spotlight Grid' ? (
                      <div className="w-full h-full flex flex-col gap-1">
                        <div className="grid grid-cols-3 gap-1 flex-1">
                          <div className="bg-primary/70 rounded"></div>
                          <div className="bg-primary/70 rounded"></div>
                          <div className="bg-primary/70 rounded"></div>
                        </div>
                        <div className="bg-blue-500/70 dark:bg-blue-700/70 rounded h-8"></div>
                        <div className="bg-primary/70 rounded h-8"></div>
                      </div>
                    ) : template.name === 'Asymmetric Mosaic' ? (
                      <div className="grid grid-cols-4 grid-rows-3 gap-1 h-full w-full">
                        <div className="bg-cyan-200/70 dark:bg-cyan-800/70 rounded col-span-2 row-span-2"></div>
                        <div className="bg-cyan-200/70 dark:bg-cyan-800/70 rounded col-span-2"></div>
                        <div className="bg-cyan-200/70 dark:bg-cyan-800/70 rounded row-span-2"></div>
                        <div className="bg-cyan-200/70 dark:bg-cyan-800/70 rounded row-span-2"></div>
                        <div className="bg-cyan-200/70 dark:bg-cyan-800/70 rounded col-span-2"></div>
                      </div>
                    ) : template.name === 'Staggered Columns' ? (
                      <div className="grid grid-cols-3 gap-1 h-full w-full bg-indigo-950/30 p-1 rounded">
                        <div className="bg-indigo-300/70 dark:bg-indigo-700/70 row-span-2 rounded"></div>
                        <div className="bg-indigo-300/70 dark:bg-indigo-700/70 col-span-2 rounded"></div>
                        <div className="bg-indigo-300/70 dark:bg-indigo-700/70 row-span-2 rounded"></div>
                        <div className="bg-indigo-300/70 dark:bg-indigo-700/70 rounded"></div>
                        <div className="bg-indigo-300/70 dark:bg-indigo-700/70 col-span-2 rounded"></div>
                      </div>
                    ) : template.name === 'Central Focus' ? (
                      <div className="grid h-full w-full gap-1" style={{
                        gridTemplateAreas: '"a a b" "c d b" "e e e"'
                      }}>
                        <div className="bg-primary/70 rounded" style={{ gridArea: 'a' }}></div>
                        <div className="bg-primary/70 rounded" style={{ gridArea: 'b' }}></div>
                        <div className="bg-primary/70 rounded" style={{ gridArea: 'c' }}></div>
                        <div className="bg-purple-500/70 dark:bg-purple-700/70 rounded" style={{ gridArea: 'd' }}></div>
                        <div className="bg-primary/70 rounded" style={{ gridArea: 'e' }}></div>
                      </div>
                    ) : template.name === 'Diamond Pattern' ? (
                      <div className="relative h-full w-full" style={{ transform: 'rotate(45deg)' }}>
                        <div className="absolute bg-purple-400/70 dark:bg-purple-600/70 rounded z-10" style={{ width: '30%', height: '30%', top: '35%', left: '35%' }}></div>
                        <div className="absolute bg-primary/70 rounded" style={{ width: '30%', height: '30%', top: '5%', left: '35%' }}></div>
                        <div className="absolute bg-primary/70 rounded" style={{ width: '30%', height: '30%', top: '35%', left: '5%' }}></div>
                        <div className="absolute bg-primary/70 rounded" style={{ width: '30%', height: '30%', top: '35%', left: '65%' }}></div>
                        <div className="absolute bg-primary/70 rounded" style={{ width: '30%', height: '30%', top: '65%', left: '35%' }}></div>
                      </div>
                    ) : template.name === 'magnolia-horizontal' ? (
                      <div className="grid grid-cols-6 gap-1 h-full w-full">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="bg-background/70 rounded"
                            style={{
                              gridColumn: i % 3 === 0 ? 'span 4' : 'span 2',
                              transform: i % 3 === 0 ? 'rotate(-5deg)' : ''
                            }}
                          ></div>
                        ))}
                      </div>
                    ) : (
                      // Default grid for any other templates
                      <div className="grid grid-cols-2 gap-2 w-full h-full">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="bg-primary/50 rounded" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{template.name}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            onClick={() => setScreen('templates')}
            className="text-base py-6"
          >
            Explore All Templates
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.section>

      <ContributionNote />

      <FAQSection />

      {/* CTA & Footer */}
      <motion.section
        className="py-20 px-4 text-center flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Create Your Perfect Grid Now
        </motion.h2>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="text-base py-6"
            onClick={() => setScreen('custom')}
          >
            Create Here
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>

        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          Made with ❤️ by the Shivam Katare
        </motion.p>
      </motion.section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">© 2025 Petals. MIT License.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/Shivam-Katare"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://x.com/Shivamkatare_27"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
} 