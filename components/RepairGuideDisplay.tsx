
import React, { useState } from 'react';
import type { RepairGuide } from '../types';
import { AlertIcon, WrenchIcon, ListIcon, CheckCircleIcon, ShoppingCartIcon, ExternalLinkIcon } from './Icons';
import { generatePartLinks, generateToolLinks } from '../services/affiliateService';

interface RepairGuideDisplayProps {
    guide: RepairGuide;
    onReset: () => void;
}

enum Tab {
    Guide,
    ToolsParts,
    Safety,
    Sources
}

const RepairGuideDisplay: React.FC<RepairGuideDisplayProps> = ({ guide, onReset }) => {
    return (
        <div className="w-full max-w-5xl mx-auto bg-black/80 backdrop-blur-md border border-brand-cyan/30 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
            <header className="p-6 border-b border-brand-cyan/30 bg-black">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-md">{guide.title}</h1>
                        <p className="text-xl text-brand-cyan font-bold tracking-wide">{guide.vehicle}</p>
                    </div>
                    <button onClick={onReset} className="text-sm font-bold text-brand-cyan hover:text-white transition-colors uppercase tracking-widest border border-brand-cyan px-4 py-2 rounded hover:bg-brand-cyan/20">
                        New Search
                    </button>
                </div>
            </header>

            <main className="p-6 md:p-8 space-y-12">

                {/* SAFETY FIRST */}
                {guide.safetyWarnings && guide.safetyWarnings.length > 0 && (
                    <section className="bg-red-950/40 border border-red-500/50 rounded-xl p-6">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest">
                            <AlertIcon className="text-red-500 w-8 h-8" />
                            Safety Warnings
                        </h2>
                        <ul className="grid gap-4 md:grid-cols-2">
                            {guide.safetyWarnings.map((warning, index) => (
                                <li key={index} className="flex items-start gap-4 p-4 bg-black/40 rounded-lg border-l-4 border-red-500 shadow-lg">
                                    <span className="text-white font-bold text-lg leading-snug">{warning}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* PARTS AND TOOLS GRID */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* TOOLS */}
                    <section className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest">
                            <WrenchIcon className="text-brand-cyan w-8 h-8" />
                            Tools Needed
                        </h2>
                        <ul className="space-y-3">
                            {guide.tools?.map((tool, index) => {
                                const links = generateToolLinks(tool);
                                return (
                                    <li key={index} className="flex items-center justify-between gap-3 bg-black/40 p-3 rounded-lg border border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                            <span className="text-white font-bold text-lg">{tool}</span>
                                        </div>
                                        {links.map((link, i) => (
                                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:text-white transition-colors">
                                                <ExternalLinkIcon className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    {/* PARTS */}
                    <section className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-6">
                        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest">
                            <ShoppingCartIcon className="text-brand-cyan w-8 h-8" />
                            Parts List
                        </h2>
                        <ul className="space-y-4">
                            {guide.parts?.map((part, index) => {
                                const links = generatePartLinks(part, guide.vehicle);
                                return (
                                    <li key={index} className="flex flex-col gap-3 p-4 bg-black/40 rounded-lg border border-white/10 shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                            <span className="text-white font-bold text-lg">{part}</span>
                                        </div>
                                        {links.map((link, i) => (
                                            <a
                                                key={i}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 bg-brand-cyan text-black px-4 py-3 rounded font-black uppercase hover:bg-white transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transform hover:-translate-y-0.5"
                                            >
                                                <ShoppingCartIcon className="w-5 h-5" />
                                                Buy on Amazon
                                            </a>
                                        ))}
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="mt-6 pt-4 border-t border-white/10 text-center">
                            <a
                                href={`https://www.amazon.com/s?k=${encodeURIComponent(guide.vehicle + ' maintenance parts')}&tag=${import.meta.env.VITE_AMAZON_AFFILIATE_TAG || 'aiautorepai04-20'}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-brand-cyan font-bold hover:underline hover:text-white transition-colors"
                            >
                                Shop all parts for this car &rarr;
                            </a>
                        </div>
                    </section>
                </div>

                {/* INSTRUCTIONS */}
                <section>
                    <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest border-b border-brand-cyan/30 pb-4">
                        <ListIcon className="text-brand-cyan w-10 h-10" />
                        Step-by-Step Guide
                    </h2>
                    <div className="space-y-12">
                        {guide.steps?.map((step) => (
                            <div key={step.step} className="grid lg:grid-cols-2 gap-8 items-start bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-brand-cyan/20 transition-all">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-cyan text-black text-2xl font-black shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                            {step.step}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white tracking-wide">Action Required</h3>
                                    </div>
                                    <p className="text-white text-xl font-medium leading-loose tracking-wide ml-2">{step.instruction}</p>
                                </div>
                                <div className="bg-black/80 rounded-xl p-2 border border-white/10 shadow-2xl min-h-[300px] flex items-center justify-center">
                                    {step.imageUrl ? (
                                        <img src={step.imageUrl} alt={`Step ${step.step}`} className="rounded-lg w-full h-auto object-contain max-h-[400px]" />
                                    ) : (
                                        <div className="text-gray-500 font-mono text-sm">Image Pending...</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SOURCES FOOTER */}
                {guide.sources && guide.sources.length > 0 && (
                    <footer className="mt-12 pt-8 border-t border-white/10 opacity-60 hover:opacity-100 transition-opacity">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Verified Sources</h3>
                        <div className="flex flex-wrap gap-4">
                            {guide.sources.map((source, index) => (
                                <a key={index} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-cyan hover:text-white truncate max-w-[200px] flex items-center gap-1">
                                    <ExternalLinkIcon className="w-3 h-3" /> {source.title}
                                </a>
                            ))}
                        </div>
                    </footer>
                )}

            </main>
        </div>
    );
};

export default RepairGuideDisplay;