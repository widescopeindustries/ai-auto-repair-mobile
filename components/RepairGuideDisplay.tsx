
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
        <div className="w-full max-w-6xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in ring-1 ring-white/5">
            <header className="relative p-8 border-b border-white/10 overflow-hidden group">
                {/* Header Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-1000"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 drop-shadow-sm">
                            {guide.title}
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold border border-blue-500/30 uppercase tracking-wider">
                                {guide.vehicle}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onReset}
                        className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                        New Diagnostic
                    </button>
                </div>
            </header>

            <main className="p-6 md:p-10 space-y-12">

                {/* SAFETY ALERTS - Redesigned */}
                {guide.safetyWarnings && guide.safetyWarnings.length > 0 && (
                    <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-950/40 to-slate-900/40 border border-red-500/30 p-1">
                        <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                            <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-3 uppercase tracking-widest">
                                <AlertIcon className="w-6 h-6" />
                                Critical Safety Protocols
                            </h2>
                            <ul className="grid gap-3 md:grid-cols-2">
                                {guide.safetyWarnings.map((warning, index) => (
                                    <li key={index} className="flex items-start gap-3 text-red-100/90 font-medium">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] flex-shrink-0" />
                                        <span className="leading-relaxed">{warning}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {/* CONSOLIDATED PARTS & TOOLS */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* TOOLS CARD */}
                    <section className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-widest relative z-10">
                            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-lg">
                                <WrenchIcon className="text-blue-400 w-5 h-5" />
                            </div>
                            Required Tools
                        </h2>

                        <ul className="space-y-2 relative z-10">
                            {guide.tools?.map((tool, index) => {
                                const links = generateToolLinks(tool);
                                return (
                                    <li key={index} className="group flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-slate-900/40 to-slate-800/20 border border-white/5 hover:border-blue-500/30 transition-all hover:bg-slate-800/40">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                                                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                                            </div>
                                            <span className="text-gray-100 font-medium text-sm">{tool}</span>
                                        </div>
                                        {links.length > 0 && (
                                            <a
                                                href={links[0].url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-all bg-blue-500/10 hover:bg-blue-500/20 px-2 py-1 rounded border border-blue-500/20"
                                            >
                                                <ShoppingCartIcon className="w-3 h-3" />
                                                Buy
                                            </a>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-6 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg relative z-10">
                            <p className="text-xs text-gray-400 flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium">Already have these tools? You're ready to start!</span>
                            </p>
                        </div>
                    </section>

                    {/* PARTS CARD */}
                    <section className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-widest relative z-10">
                            <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg">
                                <ShoppingCartIcon className="text-orange-400 w-5 h-5" />
                            </div>
                            Required Parts
                        </h2>

                        <ul className="space-y-4 relative z-10">
                            {guide.parts?.map((part, index) => {
                                const links = generatePartLinks(part, guide.vehicle);
                                return (
                                    <li key={index} className="group bg-gradient-to-r from-slate-900/60 to-slate-800/40 rounded-xl p-4 border border-white/5 hover:border-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/10">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div className="flex-1">
                                                <span className="text-white font-bold text-base leading-relaxed">{part}</span>
                                                <p className="text-xs text-gray-400 mt-1">OEM or aftermarket compatible</p>
                                            </div>
                                            <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs font-bold text-green-400">
                                                IN STOCK
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {links.map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 group/btn relative overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                                    <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-4 py-3 rounded-lg font-bold text-sm uppercase transition-all shadow-lg hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]">
                                                        <ShoppingCartIcon className="w-4 h-4" />
                                                        Buy on Amazon
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                                            <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>Prime shipping available • Free returns</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-6 text-center relative z-10">
                            <a
                                href={`https://www.amazon.com/s?k=${encodeURIComponent(guide.vehicle + ' maintenance parts')}&tag=${import.meta.env.VITE_AMAZON_AFFILIATE_TAG || 'aiautorepai04-20'}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-orange-400 text-sm font-bold hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-orange-500/20 hover:border-orange-500/40"
                            >
                                <ShoppingCartIcon className="w-4 h-4" />
                                Browse All {guide.vehicle} Parts
                                <ExternalLinkIcon className="w-3 h-3" />
                            </a>
                        </div>
                    </section>
                </div>

                {/* STEP-BY-STEP INSTRUCTIONS */}
                <section className="relative">
                    <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-gradient-to-r from-transparent via-white/10 to-transparent">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl">
                                <ListIcon className="text-blue-400 w-7 h-7" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                                    Step-by-Step Guide
                                </h2>
                                <p className="text-sm text-gray-400 mt-1">Follow these instructions carefully for best results</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                            <span className="text-sm font-bold text-blue-400">{guide.steps?.length || 0} Steps</span>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {guide.steps?.map((step, idx) => (
                            <div key={step.step} className="group relative">
                                {/* Connecting Line */}
                                {idx !== (guide.steps?.length || 0) - 1 && (
                                    <div className="absolute left-[31px] top-20 bottom-[-48px] w-0.5 bg-gradient-to-b from-blue-500/40 via-purple-500/30 to-transparent z-0 hidden lg:block"></div>
                                )}

                                <div className="grid lg:grid-cols-12 gap-6 items-start relative z-10">
                                    {/* Step Number Column */}
                                    <div className="lg:col-span-1 hidden lg:flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/40 flex items-center justify-center text-2xl font-black text-white group-hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all">
                                                {step.step}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="lg:col-span-6">
                                        <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:border-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/10 transition-all relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                                            <div className="lg:hidden mb-4 flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-2 border-blue-500/40 flex items-center justify-center text-xl font-bold text-white">
                                                    {step.step}
                                                </div>
                                                <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">Step {step.step}</span>
                                            </div>

                                            <div className="relative z-10">
                                                <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Action Required</span>
                                                </div>
                                                <p className="text-white text-base md:text-lg font-medium leading-relaxed">{step.instruction}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visual Column */}
                                    <div className="lg:col-span-5">
                                        <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl group-hover:border-blue-500/30 group-hover:shadow-blue-500/20 transition-all">
                                            {step.imageUrl ? (
                                                <>
                                                    <img src={step.imageUrl} alt={`Visual for step ${step.step}`} className="w-full h-full object-contain" />
                                                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md border border-white/10">
                                                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                                            </svg>
                                                            AI Generated
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <div className="relative">
                                                        <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin mb-4"></div>
                                                        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-purple-500 animate-spin [animation-delay:150ms]"></div>
                                                    </div>
                                                    <span className="text-sm font-mono text-gray-500 uppercase tracking-widest animate-pulse">Creating Visual...</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Completion Banner */}
                    <div className="mt-16 p-6 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 rounded-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center border-2 border-green-500/40">
                                <CheckCircleIcon className="w-7 h-7 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Repair Complete!</h3>
                                <p className="text-sm text-gray-300">You've successfully completed all steps. Test your repair before driving.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SOURCES FOOTER */}
                {guide.sources && guide.sources.length > 0 && (
                    <footer className="mt-16 pt-8 border-t border-white/5">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">References & Data Sources</h3>
                        <div className="flex flex-wrap gap-3">
                            {guide.sources.map((source, index) => (
                                <a key={index} href={source.uri} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-400 hover:text-white transition-all flex items-center gap-2">
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