import React from 'react';
import { NavView } from '../types';

interface SidebarProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  onOpenSettings,
  onOpenHelp,
  mobileOpen = false,
  onCloseMobile
}) => {
  const navItems: { id: NavView; label: string; icon: string }[] = [
    { id: 'executive-dashboard', label: 'Executive Dashboard', icon: 'dashboard' },
    { id: 'program-deep-dive', label: 'Program Deep-Dive', icon: 'layers' },
    { id: 'quality-intelligence', label: 'Quality Intelligence', icon: 'verified' },
    { id: 'shopfloor-work-order', label: 'Shopfloor Work Order', icon: 'precision_manufacturing' }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-inverse-surface/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50 flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo Header */}
          <div className="h-16 px-space-base flex items-center gap-space-sm bg-zinc-900 border-b border-zinc-800">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-sm shrink-0">
              N
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-base text-zinc-100 tracking-tight font-bold truncate">
                Nexgile
              </span>
              <span className="font-label-caps text-[10px] uppercase text-zinc-400 font-semibold tracking-wider">
                FactoryIQ MES
              </span>
            </div>
            {mobileOpen && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden ml-auto p-1.5 text-zinc-400 hover:text-zinc-100"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>

          {/* Section Header */}
          <div className="px-space-md pt-space-lg pb-space-xs">
            <span className="font-label-caps text-[11px] uppercase text-zinc-500 tracking-wider px-space-xs font-semibold">
              Operational Views
            </span>
          </div>

          {/* Nav Items */}
          <nav className="px-space-sm flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-2xl transition-all text-left text-[14px] ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20'
                      : 'text-zinc-400 font-medium hover:bg-zinc-800/80 hover:text-zinc-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & System Status */}
        <div className="p-space-base flex flex-col gap-space-md bg-zinc-900/60 border-t border-zinc-800">
          {/* System Status Card */}
          <div className="p-space-sm rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col gap-space-2xs">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-[10px] uppercase text-zinc-500 font-semibold tracking-wider">
                System Status
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <span className="font-metric-table text-emerald-400 flex items-center gap-space-2xs font-semibold text-[13px]">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              99.98% Operational
            </span>
          </div>

          {/* Settings & Help */}
          <div className="flex flex-col gap-1">
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 font-body-sm transition-colors text-left text-[13px]"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              <span>Settings</span>
            </button>
            <button
              onClick={onOpenHelp}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 font-body-sm transition-colors text-left text-[13px]"
            >
              <span className="material-symbols-outlined text-[18px]">help_outline</span>
              <span>Help &amp; Documentation</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
