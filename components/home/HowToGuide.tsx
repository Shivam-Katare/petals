import { Layout, Palette, Copy, Settings } from "lucide-react";

export function HowToGuide() {
  const steps = [
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Choose a Template",
      description: "Start with a pre-built grid layout or create your own from scratch. Our templates cover common use cases and modern designs."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Customize Layout",
      description: "Adjust columns, rows, gaps, and item placement. Use our visual editor to perfect your grid's appearance and responsiveness."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Style Elements",
      description: "Add colors, borders, and spacing to make your grid visually appealing. Preview changes in real-time."
    },
    {
      icon: <Copy className="h-6 w-6" />,
      title: "Export Code",
      description: "Copy the generated CSS code with one click. Paste it into your project and make any final adjustments as needed."
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How to Use Petals</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 