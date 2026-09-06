import React, { useState, useEffect } from 'react';
import { AlertItem } from '../types';

interface HeaderProps {
  selectedFacility: string;
  onFacilityChange: (facility: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  alerts: AlertItem[];
  onOpenMobileMenu: () => void;
  onProfileClick: () => void;
  onNavigateToView: (view: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedFacility,
  onFacilityChange,
  searchQuery,
  onSearchChange,
  alerts,
  onOpenMobileMenu,
  onProfileClick,
  onNavigateToView
}) => {
  const [timeString, setTimeString] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setTimeString(`Shift 1 - Day | ${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-zinc-900/85 backdrop-blur-xl z-40 px-space-md lg:px-space-xl flex items-center justify-between border-b border-zinc-800">
      {/* Left: Mobile hamburger + Search & Facility */}
      <div className="flex items-center gap-space-sm sm:gap-space-lg flex-1 max-w-2xl">
        {/* Mobile menu button */}
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 lg:hidden"
          aria-label="Open Navigation Menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Global Search */}
        <div className="relative flex items-center w-full max-w-xs sm:max-w-sm">
          <span className="material-symbols-outlined absolute left-space-sm text-zinc-500 text-[18px]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-space-md py-1.5 bg-zinc-950/80 rounded-full text-zinc-100 font-body-sm placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-[13px] border border-zinc-800 focus:border-blue-500 transition-all"
            placeholder="Search orders, telemetry, lots, serials..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-zinc-500 hover:text-zinc-200 text-xs"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Facility Dropdown */}
        <div className="hidden sm:flex items-center gap-space-xs bg-zinc-950/80 px-3.5 py-1.5 rounded-full border border-zinc-800">
          <span className="material-symbols-outlined text-[18px] text-zinc-400">
            factory
          </span>
          <select
            value={selectedFacility}
            onChange={(e) => onFacilityChange(e.target.value)}
            className="bg-transparent font-body-sm text-zinc-300 focus:outline-none cursor-pointer text-[13px] font-medium"
          >
            <option value="All Facilities" className="bg-zinc-900 text-zinc-100">All Facilities</option>
            <option value="Hyderabad Plant 1" className="bg-zinc-900 text-zinc-100">Hyderabad Plant 1</option>
            <option value="Austin Tech Center" className="bg-zinc-900 text-zinc-100">Austin Tech Center</option>
            <option value="Stuttgart Fab" className="bg-zinc-900 text-zinc-100">Stuttgart Fab</option>
            <option value="Penang Cleanroom" className="bg-zinc-900 text-zinc-100">Penang Cleanroom</option>
          </select>
        </div>
      </div>

      {/* Right: Clock + Notifications + Profile */}
      <div className="flex items-center gap-space-sm sm:gap-space-md">
        {/* Real-time Clock */}
        <div className="hidden md:flex items-center gap-2 bg-zinc-950/80 px-3.5 py-1.5 rounded-full border border-zinc-800">
          <span className="material-symbols-outlined text-[16px] text-emerald-400">
            schedule
          </span>
          <span className="font-metric-table text-zinc-300 text-[12px] font-medium tracking-wide">
            {timeString || 'Shift 1 - Day | 09:42:15 UTC'}
          </span>
        </div>

        {/* Notifications Icon & Popover */}
        <div className="relative flex items-center">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors relative"
            type="button"
            title="Operational Alerts"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {alerts.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 font-label-caps text-[10px] text-white font-bold">
                {alerts.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 top-11 mt-2 w-80 sm:w-96 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 p-space-md z-50 flex flex-col gap-space-sm">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-space-xs">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-red-400 text-[18px]">e911_emergency</span>
                  <span className="font-headline-sm text-[14px] font-semibold text-zinc-100">Active Escalations</span>
                </div>
                <span className="text-[11px] font-semibold text-red-400 bg-red-500/15 border border-red-500/20 px-2 py-0.5 rounded-full">
                  {alerts.length} Live
                </span>
              </div>

              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
                {alerts.map((alt) => (
                  <div
                    key={alt.id}
                    className="p-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-800/80 transition-colors flex flex-col gap-1 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span
                        className={`font-semibold uppercase px-2 py-0.5 rounded-full text-[9px] ${
                          alt.level === 'critical'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : alt.level === 'warning'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {alt.level}
                      </span>
                      <span className="font-metric-table text-zinc-500 text-[11px]">{alt.timestamp}</span>
                    </div>
                    <span className="font-headline-sm text-body-sm font-semibold text-zinc-200">
                      {alt.title}
                    </span>
                    <p className="text-[12px] text-zinc-400 line-clamp-2">
                      {alt.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-space-xs border-t border-zinc-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigateToView('executive-dashboard');
                  }}
                  className="text-blue-400 hover:underline font-medium"
                >
                  View in Cockpit
                </button>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-zinc-400 hover:text-zinc-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div
          onClick={onProfileClick}
          className="flex items-center gap-space-sm pl-space-xs cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="hidden sm:flex flex-col text-right">
            <span className="font-headline-sm text-body-sm font-semibold text-zinc-100 leading-tight">
              Sarah Johnson
            </span>
            <span className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider">
              Operations Director
            </span>
          </div>
          <img
            alt="Sarah Johnson Profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-zinc-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQi6n9leigk4VNr6HufgphL_OsIh3EHEmNozV0eNTKT09yHOOxHGkm63w2xGqrJ3tUQA-0UdADWOhjkRgxPOsRwAsaDAiEf2ZsEuv2v4utsLT9_ycE9Wb_L4xNvsaDwA56pBApGZaAExLyg-j5S11QtlyAz-Qqf7HFPLNHueJKytoFeWnbFujXm2pN7aKfK9NA3M8Vy1NtkI7mMiTRkgqYnG9suX0nM_TnuEPiUSQTDpAyQF9dlTtGcA"
          />
        </div>
      </div>
    </header>
  );
};
