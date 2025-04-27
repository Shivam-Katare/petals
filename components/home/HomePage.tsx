"use client";

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CustomGridPage } from './CustomGridPage'
import { TemplatesPage } from './TemplatesPage';

export function HomePage() {
  const [screen, setScreen] = useState<'home' | 'custom' | 'templates'>('home')
  
  if (screen === 'custom') {
    return <CustomGridPage onBack={() => setScreen('home')} />
  }
  
  if (screen === 'templates') {
    return <TemplatesPage onBack={() => setScreen('home')} />
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-2">Petals</h1>
        <p className="text-xl text-muted-foreground mb-12">Grow your perfect grid layout with Petals.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Button 
            size="lg" 
            className="w-full text-lg py-8"
            onClick={() => setScreen('custom')}
          >
            Create Custom Grid
          </Button>
          
          <Button 
            size="lg"
            variant="outline" 
            className="w-full text-lg py-8"
            onClick={() => setScreen('templates')}
          >
            Choose from Templates
          </Button>
        </div>
      </motion.div>
    </div>
  )
} 