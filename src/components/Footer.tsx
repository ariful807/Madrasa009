/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  HeartHandshake, 
  GraduationCap, 
  BookOpen, 
  Home, 
  Award, 
  FileText, 
  Image, 
  Info, 
  Compass
} from 'lucide-react';
import { NavigationTab, SiteSettings } from '../types';
import { formatDriveImageUrl, THEME_PALETTES } from '../utils/imageUtils';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
  settings: SiteSettings;
}

export function Footer({ onNavigate, settings }: FooterProps) {
  const [logoError, setLogoError] = useState(false);
  const theme = THEME_PALETTES[settings.themeColor || 'emerald'] || THEME_PALETTES.emerald;
  const logoSrc = formatDriveImageUrl(settings.logoUrl);

  const handleNav = (tab: NavigationTab) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated quick shortcuts list for footer (excluding student rules and admin panel)
  const quickShortcuts: { id: NavigationTab; label: string; icon: any; isHighlight?: boolean; badge?: string }[] = [
    { id: 'home', label: 'হোম পেজ', icon: Home },
    { id: 'admission', label: 'ভর্তি আবেদন ফরম', icon: GraduationCap, isHighlight: true, badge: 'চলমান' },
    { id: 'results', label: 'পরীক্ষার রেজাল্ট', icon: Award, isHighlight: true },
    { id: 'notices', label: 'নোটিশ বোর্ড', icon: FileText },
    { id: 'syllabus', label: 'সিলেবাস ও কিতাব', icon: BookOpen },
    { id: 'campus', label: 'ক্যাম্পাস পরিচিতি', icon: Building2 },
    { id: 'about', label: 'আমাদের সম্পর্কে', icon: Info },
    { id: 'khidmat-fund', label: 'খেদমত ফান্ড', icon: HeartHandshake, badge: 'দান' },
    { id: 'gallery', label: 'ফটোগ্যালারি', icon: Image },
    { id: 'blog', label: 'ইসলামিক প্রবন্ধ ও ব্লগ', icon: FileText },
    { id: 'contact', label: 'যোগাযোগ ও ম্যাপ', icon: Phone },
  ];

  // Clean numbers for links
  const rawWhatsapp = settings.whatsappNumber || settings.phonePrimary || '';
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = cleanWhatsapp 
    ? `https://wa.me/${cleanWhatsapp.startsWith('88') ? cleanWhatsapp : '88' + cleanWhatsapp}` 
    : 'https://wa.me/';
  const emailUrl = `mailto:${settings.emailAddress || settings.email || 'info@markazulihsan.edu.bd'}`;
  const phoneUrl = `tel:${settings.phonePrimary || '01712000000'}`;
  const facebookUrl = settings.facebookPageUrl || 'https://facebook.com';
  const youtubeUrl = settings.youtubeUrl || 'https://youtube.com';

  // Authentic, modern updated social media channels with custom SVG logos
  const socialChannels = [
    {
      id: 'facebook',
      name: 'Facebook Page',
      href: facebookUrl,
      hoverClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/30',
      bgClass: 'bg-[#1877F2]/15 text-[#2b87ff] border-[#1877F2]/30',
      iconSvg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      id: 'youtube',
      name: 'YouTube Channel',
      href: youtubeUrl,
      hoverClass: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-lg hover:shadow-[#FF0000]/30',
      bgClass: 'bg-[#FF0000]/15 text-[#ff4b4b] border-[#FF0000]/30',
      iconSvg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      href: whatsappUrl,
      hoverClass: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/30',
      bgClass: 'bg-[#25D366]/15 text-[#34e275] border-[#25D366]/30',
      iconSvg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 0C5.394 0 0 5.393 0 12.031c0 2.118.552 4.187 1.603 6.01L.062 24l6.148-1.613c1.767.964 3.766 1.472 5.82 1.472 6.637 0 12.03-5.393 12.03-12.028C24.06 5.393 18.668 0 12.031 0zm0 22.028c-1.797 0-3.559-.483-5.1-1.398l-.366-.217-3.791.994 1.012-3.696-.238-.378a9.97 9.97 0 0 1-1.536-5.302c0-5.525 4.495-10.02 10.02-10.02 5.524 0 10.019 4.495 10.019 10.02 0 5.524-4.495 10.019-10.02 10.019zm5.495-7.509c-.301-.151-1.782-.879-2.058-.979-.276-.101-.477-.151-.678.151-.201.302-.779.979-.955 1.18-.176.201-.352.226-.653.076-.301-.151-1.272-.469-2.423-1.496-.896-.799-1.501-1.787-1.677-2.088-.176-.302-.019-.465.132-.615.136-.135.301-.352.452-.527.151-.176.201-.301.302-.503.1-.201.05-.377-.025-.528-.076-.151-.678-1.633-.929-2.236-.244-.588-.493-.508-.678-.518l-.578-.01c-.201 0-.527.075-.803.377-.276.301-1.054 1.03-1.054 2.511 0 1.481 1.079 2.912 1.23 3.113.151.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.721.229 1.377.197 1.895.12.577-.086 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.431-.075-.126-.276-.201-.577-.352z"/>
        </svg>
      )
    },
    {
      id: 'email',
      name: 'Email Address',
      href: emailUrl,
      hoverClass: 'hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/30',
      bgClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      iconSvg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    {
      id: 'phone',
      name: 'Helpline Call',
      href: phoneUrl,
      hoverClass: 'hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-600/30',
      bgClass: 'bg-emerald-600/15 text-emerald-400 border-emerald-500/30',
      iconSvg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      )
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-serif">
      
      {/* 1. TOP PRE-FOOTER HIGHLIGHT & CALL TO ACTIONS */}
      <div className={`bg-gradient-to-r ${theme.heroGradient} border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="font-arabic text-xl text-amber-300 block mb-1">
              {settings.madrasaArabicMotto}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              {settings.madrasaNameBn}
            </h3>
            <p className="text-sm text-slate-200 mt-1 max-w-xl">
              {settings.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleNav('admission')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 hover:scale-105 cursor-pointer"
              id="footer-cta-admission-btn"
            >
              <GraduationCap className="w-4 h-4" />
              <span>ভর্তি আবেদন করুন</span>
            </button>
            <button
              onClick={() => handleNav('khidmat-fund')}
              className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2 hover:scale-105 cursor-pointer"
              id="footer-cta-donation-btn"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>খেদমত ফান্ডে দান করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DEDICATED QUICK SHORTCUTS SECTION */}
      <div className="bg-slate-950/90 border-b border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8" id="footer-shortcuts-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white font-serif tracking-wide">
                  ওয়েবসাইট দ্রুত শর্টকাট
                </h4>
                <p className="text-[11px] text-slate-400">
                  এক ক্লিকে মাদরাসার যেকোনো বিভাগ ও সেবায় প্রবেশ করুন
                </p>
              </div>
            </div>

            <span className="text-[10px] text-amber-300/90 font-medium bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              {quickShortcuts.length}টি গুরুত্বপূর্ণ শর্টকাট
            </span>
          </div>

          {/* Compact Quick Shortcut Buttons Grid */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
            {quickShortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`group relative flex items-center gap-2 px-2.5 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer shadow-2xs hover:scale-[1.02] active:scale-[0.98] ${
                    item.isHighlight
                      ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/35 hover:border-amber-400 text-amber-200'
                      : 'bg-slate-900/85 hover:bg-slate-850 border-slate-800/90 hover:border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  id={`footer-shortcut-${item.id}`}
                  title={item.label}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                    item.isHighlight 
                      ? 'bg-amber-500 text-slate-950' 
                      : 'bg-slate-800 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <span className="text-[11px] font-medium truncate flex-1 block">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 shrink-0 leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 3. MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Madrasa Overview, Founder & Social Media Icons */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3.5">
              {logoSrc && !logoError ? (
                <img
                  src={logoSrc}
                  alt={settings.madrasaNameBn}
                  onError={() => setLogoError(true)}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-500/40 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-arabic text-2xl font-bold border border-emerald-600/40 shadow-sm">
                  م
                </div>
              )}
              <div>
                <h4 className="font-bold text-white text-lg font-serif tracking-tight">{settings.madrasaNameBn}</h4>
                <p className="text-xs text-slate-400 font-sans">{settings.madrasaNameEn}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 max-w-2xl">
              {settings.establishedDate}-এ প্রতিষ্ঠিত ঐতিহ্যবাহী দ্বীনি বিদ্যাপীঠ। আন্তর্জাতিক মানসম্মত হিফজুল কুরআন এবং দাওরায়ে হাদীস (মাস্টার্স) পর্যন্ত কিতাব বিভাগের নির্ভরযোগ্য প্রতিষ্ঠান।
            </p>

            {/* Founder Info */}
            <div className="pt-1">
              <p className="text-xs sm:text-sm text-slate-300">
                <strong className="text-amber-400 font-semibold">প্রতিষ্ঠাতা:</strong> {settings.founderName}
              </p>
            </div>

            {/* প্রতিষ্ঠাতা টেক্সট এর নিচে শুধু সোশ্যাল মিডিয়া ও যোগাযোগ আইকন */}
            <div className="pt-3">
              <div className="flex flex-wrap items-center gap-2.5">
                {socialChannels.map((channel) => (
                  <a
                    key={`footer-founder-social-${channel.id}`}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl border transition-all duration-200 flex items-center justify-center ${channel.bgClass} ${channel.hoverClass} hover:scale-110 active:scale-95 shadow-xs`}
                    title={channel.name}
                    aria-label={channel.name}
                    id={`footer-founder-icon-${channel.id}`}
                  >
                    {channel.iconSvg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Contact & Donation Info */}
          <div className="lg:col-span-5 space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800/80">
            <h4 className="font-bold text-white text-sm sm:text-base font-serif border-b border-slate-700/60 pb-2.5 flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>যোগাযোগ ও অনুদান</span>
            </h4>
            
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.phonePrimary}`} className="hover:text-amber-300 transition-colors">
                  {settings.phonePrimary}
                </a>
                {settings.phoneSecondary && (
                  <>
                    <span className="text-slate-500">/</span>
                    <a href={`tel:${settings.phoneSecondary}`} className="hover:text-amber-300 transition-colors">
                      {settings.phoneSecondary}
                    </a>
                  </>
                )}
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${settings.emailAddress || settings.email}`} className="hover:text-amber-300 transition-colors truncate">
                  {settings.emailAddress || settings.email}
                </a>
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 text-xs text-slate-300">
              <span className="font-semibold block text-amber-400 mb-1">বিকাশ / নগদ অনুদান (মারকাযুল ইহসান):</span>
              <p className="font-mono text-sm text-amber-300 font-bold tracking-wider">{settings.bkashNumber.split(' ')[0]}</p>
              <span className="text-[11px] text-slate-400 block mt-0.5">রেফারেন্স: "Zakat" বা "Khedmat"</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Centered Copyright and Developer Credit */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col items-center justify-center text-center gap-2 text-xs text-slate-400">
          <p className="text-slate-300 font-medium">
            © ২০১৮ - 2026 আস সুন্নাহ মডেল মাদ্রাসা (Ass Sunnah Model Madrasa )। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <span>ডেভলপার:</span>
            <a
              href="https://www.facebook.com/mdarifulislam15"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <span>আরিফুল ইসলাম</span>
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
