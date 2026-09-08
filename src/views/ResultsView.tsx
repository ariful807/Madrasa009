/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, type FormEvent } from 'react';
import { 
  Award, 
  Search, 
  Printer, 
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Building2,
  FileCheck2,
  GraduationCap,
  Download,
  FileDown,
  Loader2,
  Check
} from 'lucide-react';
import { StudentResult, SiteSettings, JamaatItem } from '../types';
import { storageService } from '../services/storageService';
import { formatDriveImageUrl } from '../utils/imageUtils';
import { downloadMarksheetAsPdf, downloadMarksheetAsImage, downloadDomAsPdf, downloadDomAsImage } from '../utils/downloadUtils';

interface ResultsViewProps {
  results: StudentResult[];
  settings: SiteSettings;
  jamaats?: JamaatItem[];
}

export function ResultsView({ results, settings, jamaats: propJamaats }: ResultsViewProps) {
  const [selectedYear, setSelectedYear] = useState('২০২৬');
  const [selectedDept, setSelectedDept] = useState('সকল বিভাগ');
  const [selectedJamaat, setSelectedJamaat] = useState('সকল জামাত');
  const [rollInput, setRollInput] = useState('');
  const [searchedResult, setSearchedResult] = useState<StudentResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);
  const marksheetRef = useRef<HTMLDivElement>(null);

  // Dynamic Jamaat list from storage or props
  const allJamaats: JamaatItem[] = propJamaats || storageService.getJamaats();

  const departments = ['সকল বিভাগ', 'কিতাব বিভাগ', 'হিফজুল কুরআন', 'নাযেরা বিভাগ', 'নূরানী ও মক্তব'];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const match = results.find(r => {
      const matchRoll = rollInput.trim() === '' || 
        r.rollNumber.trim().toLowerCase() === rollInput.trim().toLowerCase() ||
        r.registrationNumber.trim().toLowerCase() === rollInput.trim().toLowerCase();

      const matchYear = selectedYear === 'সব' || r.academicYear === selectedYear;
      const matchDept = selectedDept === 'সকল বিভাগ' || r.department === selectedDept;
      const matchJamaat = selectedJamaat === 'সকল জামাত' || 
        r.jamaat.toLowerCase().includes(selectedJamaat.toLowerCase()) || 
        selectedJamaat.toLowerCase().includes(r.jamaat.toLowerCase());

      return matchRoll && matchYear && matchDept && matchJamaat;
    });

    setSearchedResult(match || null);
  };

  const handleReset = () => {
    setRollInput('');
    setSelectedYear('২০২৬');
    setSelectedDept('সকল বিভাগ');
    setSelectedJamaat('সকল জামাত');
    setSearchedResult(null);
    setHasSearched(false);
  };

  const logoUrl = formatDriveImageUrl(settings.logoUrl);

  const handleDownloadPdf = async () => {
    if (!searchedResult || isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    setDownloadSuccessMsg(null);
    try {
      const cleanName = `Marksheet_Roll_${searchedResult.rollNumber}_${searchedResult.academicYear}`.replace(/\s+/g, '_');
      const success = await downloadMarksheetAsPdf(searchedResult, settings, cleanName);
      if (success) {
        setDownloadSuccessMsg('নম্বরপত্র PDF সফলভাবে ডাউনলোড হয়েছে!');
        setTimeout(() => setDownloadSuccessMsg(null), 4000);
      }
    } catch (e) {
      console.error('Download PDF error:', e);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!searchedResult || isDownloadingImage) return;
    setIsDownloadingImage(true);
    setDownloadSuccessMsg(null);
    try {
      const cleanName = `Marksheet_Roll_${searchedResult.rollNumber}_${searchedResult.academicYear}`.replace(/\s+/g, '_');
      const success = await downloadMarksheetAsImage(searchedResult, settings, cleanName);
      if (success) {
        setDownloadSuccessMsg('নম্বরপত্র ইমেজ (PNG) সফলভাবে ডাউনলোড হয়েছে!');
        setTimeout(() => setDownloadSuccessMsg(null), 4000);
      }
    } catch (e) {
      console.error('Download Image error:', e);
    } finally {
      setIsDownloadingImage(false);
    }
  };

  /**
   * Universal A4 Print Function:
   * Uses native window.print() combined with CSS @media print isolation in index.css.
   * Works smoothly on desktop and mobile without iframe sandbox or popup blocker issues.
   */
  const handlePrintMarksheet = () => {
    if (!searchedResult) return;
    try {
      window.print();
    } catch (e) {
      console.error('Print error:', e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white font-serif">
      
      {/* 1. Clean White Header Title Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>পরীক্ষার ফলাফল ও সার্টিফিকেট পোর্টাল</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            অনলাইন ফলাফল ও একাডেমিক মার্কশিট
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            শিক্ষাবর্ষ, বিভাগ ও জামাত নির্বাচন করে অথবা রোল / রেজিস্ট্রেশন নম্বর দিয়ে মূল নম্বরপত্র অনুসন্ধান ও প্রিন্ট করুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
            পরীক্ষা বোর্ড: {settings.madrasaNameBn}
          </span>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs no-print" id="result-search-form">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                শিক্ষাবর্ষ
              </label>
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                id="select-result-year"
              >
                <option value="২০২৬">২০২৬ শিক্ষাবর্ষ</option>
                <option value="২০২৫">২০২৫ শিক্ষাবর্ষ</option>
                <option value="২০২৪">২০২৪ শিক্ষাবর্ষ</option>
                <option value="সব">সকল বছর</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                বিভাগ নির্বাচন
              </label>
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                id="select-result-dept"
              >
                {departments.map((dept, i) => (
                  <option key={i} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                জামাত / শ্রেণি (ড্যাশবোর্ড তালিকা)
              </label>
              <select
                value={selectedJamaat}
                onChange={e => setSelectedJamaat(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                id="select-result-jamaat"
              >
                <option value="সকল জামাত">সকল জামাত</option>
                {allJamaats.map(j => (
                  <option key={j.id} value={j.name}>{j.name} ({j.department})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                রোল বা রেজিস্ট্রেশন নম্বর *
              </label>
              <input
                type="text"
                value={rollInput}
                onChange={e => setRollInput(e.target.value)}
                placeholder="যেমন: 101 বা 102"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-sans"
                id="input-result-roll"
              />
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-slate-100 gap-3">
            <span className="text-xs text-slate-500">
              * টেস্ট রোল: <button type="button" onClick={() => setRollInput('101')} className="font-bold underline text-emerald-800 hover:text-emerald-950 font-sans">101</button>, <button type="button" onClick={() => setRollInput('102')} className="font-bold underline text-emerald-800 hover:text-emerald-950 font-sans">102</button>, <button type="button" onClick={() => setRollInput('103')} className="font-bold underline text-emerald-800 hover:text-emerald-950 font-sans">103</button> (ক্লিক করে সরাসরি টেস্ট করুন)
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>রিসেট</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-colors flex items-center gap-2"
                id="search-result-btn"
              >
                <Search className="w-4 h-4" />
                <span>ফলাফল অনুসন্ধান</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 3. Marksheet Area */}
      {hasSearched && (
        <div id="printable-marksheet-wrapper" className="space-y-4">
          
          {/* Quick Print and Download Action Bar Above Marksheet */}
          {searchedResult && (
            <div className="space-y-3 no-print">
              {downloadSuccessMsg && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{downloadSuccessMsg}</span>
                </div>
              )}

              <div className="bg-emerald-50 p-4 sm:p-5 rounded-2xl border border-emerald-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-emerald-950">
                  <FileCheck2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold block text-sm">ফলাফল সফলভাবে পাওয়া গেছে!</span>
                    <span className="text-slate-600">একাডেমিক নম্বরপত্রটি সরাসরি PDF বা ইমেজ আকারে ডাউনলোড করুন অথবা প্রিন্ট করুন।</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  {/* Download PDF Button */}
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isDownloadingPdf || isDownloadingImage}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    id="download-marksheet-pdf-btn"
                  >
                    {isDownloadingPdf ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>PDF তৈরি হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>PDF ডাউনলোড</span>
                      </>
                    )}
                  </button>

                  {/* Download Image (PNG) Button */}
                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    disabled={isDownloadingPdf || isDownloadingImage}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    id="download-marksheet-img-btn"
                  >
                    {isDownloadingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>ইমেজ হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4" />
                        <span>ইমেজ ডাউনলোড</span>
                      </>
                    )}
                  </button>

                  {/* Print Button */}
                  <button
                    type="button"
                    onClick={handlePrintMarksheet}
                    className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    id="print-marksheet-action-btn"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    <span>প্রিন্ট</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {searchedResult ? (
            /* ================= EXACT A4 MARKSHEET DISPLAY & PRINT ================= */
            <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-100/50 rounded-2xl border border-slate-200">
              <div 
                ref={marksheetRef}
                id="printable-marksheet"
                className="bg-white border-2 border-slate-900 shadow-lg p-10 text-slate-900 w-[794px] min-w-[794px] max-w-[794px] min-h-[1123px] flex flex-col justify-between shrink-0 box-border"
                style={{ fontFamily: "'Noto Serif Bengali', 'Noto Serif', serif", margin: 0 }}
              >
                <div>
                  {/* 1. প্রতিষ্ঠনের নাম (বাংলা ও আরবী) */}
                  <div className="text-center space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 tracking-tight">
                      {settings.madrasaNameBn}
                    </h1>
                    <p className="text-lg sm:text-xl font-bold font-serif text-slate-800 dir-rtl">
                      {settings.madrasaArabicMotto || 'مَدْرَسَةُ مَرْكَزِ الْإِحْسَانِ دَكَّا — لِلتَّعْلِيمِ وَالتَّرْبِيَةِ'}
                    </p>
                    {/* 2. নিচে ঠিকানা */}
                    <p className="text-xs sm:text-sm text-slate-600 font-serif pt-0.5">
                      {settings.hasTemporaryCampus !== false && settings.addressTemporary 
                        ? `${settings.addressTemporary} ও ${settings.addressPermanent}` 
                        : settings.addressPermanent}
                    </p>
                  </div>

                  {/* 3. ডিভাইডার লাইন */}
                  <div className="border-b-2 border-slate-900 my-4" />

                  {/* Academic Transcript Title */}
                  <div className="text-center mb-4">
                    <span className="inline-block px-5 py-1.5 border border-slate-800 text-xs sm:text-sm font-bold uppercase tracking-wider bg-slate-50">
                      বার্ষিক পরীক্ষার নম্বরপত্র — {searchedResult.academicYear}
                    </span>
                  </div>

                  {/* 4. শিক্ষার্থীর তথ্য */}
                  <div className="border border-slate-800 mb-6 text-xs sm:text-sm">
                    <div className="grid grid-cols-2 divide-x divide-slate-800">
                      <div className="divide-y divide-slate-300">
                        <div className="p-2.5 flex">
                          <span className="w-28 text-slate-600 shrink-0">শিক্ষার্থীর নাম:</span>
                          <strong className="text-slate-900 font-serif">{searchedResult.studentName}</strong>
                        </div>
                        <div className="p-2.5 flex">
                          <span className="w-28 text-slate-600 shrink-0">পিতার নাম:</span>
                          <span className="text-slate-800">{searchedResult.fatherName || '-'}</span>
                        </div>
                        <div className="p-2.5 flex">
                          <span className="w-28 text-slate-600 shrink-0">জামাত / শ্রেণি:</span>
                          <strong className="text-slate-900 font-serif">{searchedResult.jamaat}</strong>
                        </div>
                      </div>
                      <div className="divide-y divide-slate-300">
                        <div className="p-2.5 flex">
                          <span className="w-28 text-slate-600 shrink-0">রোল নম্বর:</span>
                          <strong className="text-slate-900 font-mono text-sm">{searchedResult.rollNumber}</strong>
                        </div>
                        <div className="p-2.5 flex">
                          <span className="w-28 text-slate-600 shrink-0">রেজিস্ট্রেশন নং:</span>
                          <span className="text-slate-800 font-mono">{searchedResult.registrationNumber || '-'}</span>
                        </div>
                        <div className="p-2.5 flex">
                          <span className="w-28 text-slate-600 shrink-0">শিক্ষাবর্ষ:</span>
                          <span className="text-slate-800">{searchedResult.academicYear}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. মার্ক এর টেবিল (বিষয় এর নাম, পূর্ণ মান, পাশ মার্ক, প্রাপ্ত নম্বর ও গ্রেড) */}
                  <div className="mb-6">
                    <table className="w-full text-left border-collapse border border-slate-800 text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-100 text-slate-900 border-b border-slate-800 font-serif">
                          <th className="p-2 border-r border-slate-800 text-center w-14 font-bold whitespace-nowrap">ক্র. নং</th>
                          <th className="p-2.5 border-r border-slate-800 font-bold">বিষয় এর নাম</th>
                          <th className="p-2 border-r border-slate-800 text-center w-20 font-bold whitespace-nowrap">পূর্ণ মান</th>
                          <th className="p-2 border-r border-slate-800 text-center w-20 font-bold whitespace-nowrap">পাশ মার্ক</th>
                          <th className="p-2 border-r border-slate-800 text-center w-24 font-bold whitespace-nowrap">প্রাপ্ত নম্বর</th>
                          <th className="p-2 text-center w-20 font-bold whitespace-nowrap">গ্রেড</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-300">
                        {searchedResult.subjects.map((sub, idx) => (
                          <tr key={idx} className={`border-b border-slate-300 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                            <td className="p-2 text-center font-mono border-r border-slate-800 text-slate-600">
                              {idx + 1}
                            </td>
                            <td className="p-2.5 border-r border-slate-800 font-serif text-slate-900 font-medium">
                              {sub.subjectName}
                            </td>
                            <td className="p-2 text-center border-r border-slate-800 text-slate-700">
                              {sub.fullMark || 100}
                            </td>
                            <td className="p-2 text-center border-r border-slate-800 text-slate-700">
                              {sub.passMark || 33}
                            </td>
                            <td className="p-2 text-center font-bold border-r border-slate-800 text-slate-950">
                              {sub.obtainedMark}
                            </td>
                            <td className="p-2 text-center font-bold text-slate-900">
                              {sub.grade}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 6. একবারে নিচে সর্বমোট নম্বর, প্রাপ্ত জিপিএ ও মুহতামিম এর সাক্ষর */}
                <div className="pt-4 border-t-2 border-slate-800 space-y-8">
                  <div className="flex flex-row items-center justify-between gap-4 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <div>
                        <span className="text-slate-600">সর্বমোট নম্বর: </span>
                        <strong className="text-slate-900 font-bold text-base">
                          {searchedResult.obtainedTotal} / {searchedResult.totalMarks}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-600">প্রাপ্ত জিপিএ: </span>
                        <strong className="text-slate-900 font-bold text-base">
                          {searchedResult.gpa} ({searchedResult.division})
                        </strong>
                      </div>
                    </div>
                    
                    <div className="text-right whitespace-nowrap">
                      <span className="text-xs text-slate-600">ফলাফল প্রকাশের তারিখ: {searchedResult.publishedDate}</span>
                    </div>
                  </div>

                  {/* মুহতামিম এর সাক্ষর */}
                  <div className="flex justify-end pt-8 pb-4">
                    <div className="text-center w-56">
                      <div className="h-10 flex items-end justify-center mb-1">
                        <span className="font-serif italic text-slate-400 text-xs">স্বাক্ষরিত</span>
                      </div>
                      <div className="border-t-2 border-slate-800 pt-1.5 font-bold font-serif text-slate-900 text-sm">
                        মুহতামিম এর স্বাক্ষর
                      </div>
                      <div className="text-[11px] text-slate-500 font-serif">
                        {settings.madrasaNameBn}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-600 space-y-3 no-print">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">কোনো ফলাফল পাওয়া যায়নি</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                প্রদত্ত রোল নম্বর বা জামাতের সাথে কোনো রেকর্ড মেলেনি। অনুগ্রহ করে রোল নম্বর (যেমন: ১০১ বা ১০২) ও শিক্ষাবর্ষ সঠিকভাবে পরীক্ষা করে পুনরায় অনুসন্ধান করুন।
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
