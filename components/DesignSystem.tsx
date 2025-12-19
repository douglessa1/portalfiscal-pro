import React from 'react';
import { Palette, Type, Layout, ShieldCheck, BoxSelect, MonitorSmartphone } from 'lucide-react';
import { Logo } from './Logo';

export const DesignSystem: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto pb-20 font-sans">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
        <div className="inline-flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-6 transition-colors">
            <Logo className="h-16" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Brand Guidelines</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            The visual language of <strong>Portal Fiscal Pro</strong> represents the intersection of 
            Technology, Law, and Finance. Our design system prioritizes clarity, trust, and modern efficiency.
        </p>
      </div>

      <div className="space-y-16">
        
        {/* Section 1: The Logo */}
        <section>
            <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
                <ShieldCheck className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Logomark & Construction</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] transition-colors">
                    <div className="transform scale-150">
                        <Logo />
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">The "Fiscal Hexagon"</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Our symbol is designed to work at any scale, from a mobile app icon to a billboard. It combines three core meanings:
                    </p>
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-700 flex items-center justify-center text-white shrink-0">
                                <BoxSelect size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">The Hexagon (Tech)</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Represents structure, efficiency, and the technological foundation of our AI platform.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-400 dark:bg-slate-600 flex items-center justify-center text-white shrink-0">
                                <div className="h-4 w-2 bg-white rounded-sm"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">The Pillar (Law)</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">The base and vertical lines evoke a classical column, symbolizing the stability of tax law.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">The Bar Chart (Finance)</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">The rising bars in the center represent financial growth, analytics, and data-driven insights.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Section 2: Color Palette */}
        <section>
            <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
                <Palette className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Color System</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Primary */}
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Primary: Corporate Navy</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Used for text, navigation, and primary structural elements. Conveying trust.</p>
                    <div className="space-y-2">
                        <ColorSwatch color="bg-slate-900" label="Slate 900" hex="#0F172A" />
                        <ColorSwatch color="bg-slate-700" label="Slate 700" hex="#334155" />
                        <ColorSwatch color="bg-slate-500" label="Slate 500" hex="#64748B" />
                    </div>
                </div>

                {/* Accent */}
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Accent: Fiscal Emerald</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Used for CTAs, success states, and financial indicators. Conveying growth.</p>
                    <div className="space-y-2">
                        <ColorSwatch color="bg-emerald-600" label="Emerald 600" hex="#059669" />
                        <ColorSwatch color="bg-emerald-500" label="Emerald 500" hex="#10B981" />
                        <ColorSwatch color="bg-emerald-100" label="Emerald 100" hex="#D1FAE5" text="text-emerald-900" />
                    </div>
                </div>

                {/* Surface */}
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Surface & Backgrounds</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Clean, low-contrast backgrounds to reduce eye strain during long usage.</p>
                    <div className="space-y-2">
                        <ColorSwatch color="bg-white" label="White" hex="#FFFFFF" border />
                        <ColorSwatch color="bg-slate-50" label="Slate 50" hex="#F8FAFC" border />
                        <ColorSwatch color="bg-slate-100" label="Slate 100" hex="#F1F5F9" border />
                    </div>
                </div>
            </div>
        </section>

        {/* Section 3: Typography */}
        <section>
            <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
                <Type className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Typography</h2>
            </div>

            <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm grid md:grid-cols-2 gap-12 transition-colors">
                <div>
                    <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono text-slate-500 dark:text-slate-300 mb-6">Font Family</span>
                    <h3 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">Plus Jakarta Sans</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">A modern geometric sans-serif that balances readability with a tech-forward personality.</p>
                    
                    <div className="mt-8 flex gap-4">
                        <div className="text-center">
                            <div className="text-4xl font-normal text-slate-900 dark:text-white">Aa</div>
                            <div className="text-xs text-slate-400 mt-2">Regular 400</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-medium text-slate-900 dark:text-white">Aa</div>
                            <div className="text-xs text-slate-400 mt-2">Medium 500</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-slate-900 dark:text-white">Aa</div>
                            <div className="text-xs text-slate-400 mt-2">Bold 700</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-extrabold text-slate-900 dark:text-white">Aa</div>
                            <div className="text-xs text-slate-400 mt-2">ExtraBold 800</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono text-slate-500 dark:text-slate-300">Scale</span>
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Heading 1</h1>
                        <p className="text-xs text-slate-400 font-mono">text-4xl font-extrabold tracking-tight</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Heading 2</h2>
                        <p className="text-xs text-slate-400 font-mono">text-2xl font-bold</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Heading 3</h3>
                        <p className="text-xs text-slate-400 font-mono">text-xl font-semibold</p>
                    </div>
                    <div>
                        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            <strong>Body Text:</strong> The quick brown fox jumps over the lazy dog. Fiscal intelligence requires precision and clarity in every character.
                        </p>
                        <p className="text-xs text-slate-400 font-mono mt-1">text-base text-slate-600</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 4: Imagery & UI */}
        <section>
            <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
                <Layout className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Imagery & UI Style</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Glassmorphism & Depth</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        We use subtle transparency (glassmorphism) on headers and overlays to maintain context. Cards use soft shadows (`shadow-soft`) and generous padding to create a feeling of space and organization.
                    </p>
                    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/30 rounded-full blur-2xl"></div>
                        <div className="relative glass p-6 rounded-xl border border-white/10 text-white">
                            <h4 className="font-bold mb-2">Glass Card</h4>
                            <p className="text-sm opacity-80">Backdrop blur and white borders create a premium, modern feel.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Button Hierarchy</h3>
                    <div className="flex flex-col gap-4 items-start">
                        <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-none hover:shadow-emerald-300 transition-all">
                            Primary Action
                        </button>
                        <button className="px-6 py-3 bg-white dark:bg-slate-700 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-600 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-all">
                            Secondary Action
                        </button>
                        <button className="px-6 py-3 text-slate-500 dark:text-slate-400 font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                            Tertiary Link
                        </button>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};

// Helper Component for Swatches
const ColorSwatch = ({ color, label, hex, text = "text-white", border = false }: { color: string, label: string, hex: string, text?: string, border?: boolean }) => (
    <div className={`h-16 rounded-xl ${color} ${border ? 'border border-slate-200 dark:border-slate-600' : ''} flex items-center justify-between px-4 shadow-sm`}>
        <span className={`font-bold ${text} dark:text-slate-200`}>{label}</span>
        <span className={`font-mono text-xs opacity-80 ${text} dark:text-slate-300`}>{hex}</span>
    </div>
);