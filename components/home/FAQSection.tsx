import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 w-full mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-medium">What is Petals?</AccordionTrigger>
          <AccordionContent>
            Petals is a simple tool to create beautiful CSS Grid layouts, either by choosing a ready template or designing your own — no complex setup needed!
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-medium">What is a "Grid" in web design?</AccordionTrigger>
          <AccordionContent>
            A Grid is a structure made of intersecting rows and columns, used to layout elements clearly on a page. It's a core part of responsive, modern websites.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-medium">Can I customize grids with Petals?</AccordionTrigger>
          <AccordionContent>
            Yes! You can fully adjust rows, columns, spans, gaps, and more in the Custom Grid mode.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-medium">Where can I learn more about CSS Grids?</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://css-tricks.com/snippets/css/complete-guide-grid/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">CSS Tricks Complete Guide to Grid</a></li>
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">MDN Web Docs - CSS Grid Layout</a></li>
              <li>Petals will soon link quick grid tutorials too!</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border rounded-lg p-2">
          <AccordionTrigger className="text-lg font-medium">Why does my copied grid sometimes look different?</AccordionTrigger>
          <AccordionContent>
            Grids rely on things like padding, margin, and borders to look spaced correctly. Without extra styling, the grid may appear "tight" — just add simple CSS to fix that!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
} 