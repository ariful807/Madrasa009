import { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Search, 
  FileText, 
  Layers,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { JamaatItem, SyllabusItem, SiteSettings } from '../types';
import { downloadJamaatSyllabusPdf, downloadSyllabusAsPdf } from '../utils/downloadUtils';

interface SyllabusViewProps {
  jamaats?: JamaatItem[];
  syllabus?: SyllabusItem[];
  settings?: SiteSettings;
}

export function SyllabusView({ jamaats = [], syllabus = [], settings }: SyllabusViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingJamaatId, setDownloadingJamaatId] = useState<string | null>(null);

  const handleDownloadJamaat = async (jamaat: JamaatItem) => {
    if (downloadingJamaatId) return;
    setDownloadingJamaatId(jamaat.id);
    try {
      await downloadJamaatSyllabusPdf(jamaat, settings);
    } catch (e) {
      console.error('Error downloading syllabus:', e);
    } finally {
      setDownloadingJamaatId(null);
    }
  };

  const filteredJamaats = jamaats.filter(item => {
    const query = searchQuery.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(query);
    const deptMatch = item.department.toLowerCase().includes(query);
    const bookMatch = item.books?.some(b => b.name.toLowerCase().includes(query));
    return nameMatch || deptMatch || bookMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>পাঠ্যক্রম ও সিলেবাস</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            মারকাযুল ইহসানের শিক্ষাক্রম ও কিতাব তালিকা
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            জামাত ভিত্তিক অনুমোদিত কিতাব তালিকা ও সিলেবাস। এক ক্লিকে সম্পূর্ণ সিলেবাসের অফিসিয়াল A4 PDF ডাউনলোড করুন।
          </p>
        </div>

        <div className="w-full md:w-72">
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="জামাত বা কিতাব খুঁজুন..."
              className="w-full pl-9 pr-3 py-2.5 bg-white/10 text-white placeholder-emerald-200/60 rounded-xl text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Main Table: জামাত বা শ্রেণির নাম | কিতাব সমূহ | ডাউনলোড */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-800" />
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900">
              জামাতভিত্তিক কিতাব ও সিলেবাস চার্ট
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium bg-white px-3 py-1 rounded-full border border-slate-200">
            মোট জামাত: {filteredJamaats.length} টি
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-emerald-900 text-white font-serif">
                <th className="p-4 font-semibold w-1/4 border-r border-emerald-800">জামাত বা শ্রেণির নাম</th>
                <th className="p-4 font-semibold w-7/12 border-r border-emerald-800">কিতাব সমূহ</th>
                <th className="p-4 font-semibold text-center w-1/6">ডাউনলোড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredJamaats.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-slate-400">
                    কোনো জামাত বা কিতাব তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredJamaats.map((j) => (
                  <tr key={j.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="p-4 align-top border-r border-slate-100">
                      <div className="font-bold text-slate-900 text-sm sm:text-base font-serif">
                        {j.name}
                      </div>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-900">
                        {j.department}
                      </span>
                      {j.books && (
                        <div className="text-[11px] text-slate-500 mt-1.5 font-medium">
                          মোট কিতাব: {j.books.length} টি
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top border-r border-slate-100">
                      {j.books && j.books.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {j.books.map((b, bIdx) => (
                            <div 
                              key={bIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-800 text-xs transition-colors"
                            >
                              <span className="font-bold text-emerald-900">{b.name}</span>
                              <span className="text-[10px] text-slate-500 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                                {b.fullMark}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-xs">কোনো কিতাব তালিকাভুক্ত নেই</span>
                      )}
                    </td>
                    <td className="p-4 align-middle text-center">
                      <button
                        type="button"
                        onClick={() => handleDownloadJamaat(j)}
                        disabled={downloadingJamaatId === j.id}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-95 px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                        title={`${j.name} সিলেবাসের A4 PDF ডাউনলোড করুন`}
                        id={`download-syllabus-jamaat-${j.id}`}
                      >
                        {downloadingJamaatId === j.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>তৈরি হচ্ছে...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>A4 PDF</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
