import React, { useEffect } from 'react';
import { Plus, Trash2, Calculator, CheckCircle2, Award, BookOpen } from 'lucide-react';
import { JamaatItem, SubjectMark } from '../../types';

interface DynamicMarksEntryProps {
  jamaats: JamaatItem[];
  resultData: {
    rollNumber: string;
    studentName: string;
    fatherName: string;
    jamaat: string;
    academicYear: string;
    totalMarks: number;
    obtainedTotal: number;
    gpa: string;
    division: string;
    position: string;
    subjects: SubjectMark[];
  };
  onChange: (updated: any) => void;
}

// Calculate grade from obtained mark and full mark
export function calculateSubjectGrade(obtained: number, full: number): { grade: string; point: number } {
  if (full <= 0) return { grade: 'F', point: 0 };
  const percent = (obtained / full) * 100;
  if (percent >= 80) return { grade: 'A+', point: 5.0 };
  if (percent >= 70) return { grade: 'A', point: 4.0 };
  if (percent >= 60) return { grade: 'A-', point: 3.5 };
  if (percent >= 50) return { grade: 'B', point: 3.0 };
  if (percent >= 40) return { grade: 'C', point: 2.0 };
  if (percent >= 33) return { grade: 'D', point: 1.0 };
  return { grade: 'F', point: 0.0 };
}

// Calculate Division from overall percentage and fail status
export function calculateDivision(obtainedTotal: number, totalMarks: number, hasFailedSubject: boolean): string {
  if (hasFailedSubject || totalMarks <= 0) return 'রাসিব (অনুত্তীর্ণ)';
  const percent = (obtainedTotal / totalMarks) * 100;
  if (percent >= 80) return 'মুমতাজ (স্টার)';
  if (percent >= 65) return 'জায়্যিদ জিদ্দান (১ম)';
  if (percent >= 50) return 'জায়্যিদ (২য়)';
  if (percent >= 33) return 'মাকবুল (৩য়)';
  return 'রাসিব (অনুত্তীর্ণ)';
}

export const DynamicMarksEntry: React.FC<DynamicMarksEntryProps> = ({ jamaats, resultData, onChange }) => {
  // If jamaat changes and subjects are empty or default, populate subjects from jamaat books
  const handleJamaatChange = (selectedJamaatName: string) => {
    const selectedJamaat = jamaats.find(j => j.name === selectedJamaatName);
    let initialSubjects: SubjectMark[] = [];

    if (selectedJamaat?.books && selectedJamaat.books.length > 0) {
      initialSubjects = selectedJamaat.books.map(b => ({
        subjectName: b.name,
        fullMark: b.fullMark || 100,
        passMark: b.passMark || 33,
        obtainedMark: Math.round((b.fullMark || 100) * 0.85), // realistic default
        grade: 'A+',
        point: 5.0
      }));
    } else {
      // Standard 5 subjects default
      initialSubjects = [
        { subjectName: 'হিফজুল কুরআন / মূল কিতাব', fullMark: 100, passMark: 33, obtainedMark: 90, grade: 'A+', point: 5.0 },
        { subjectName: 'তাজবীদ ও মাখরাজ / আরবী ব্যাকরণ', fullMark: 100, passMark: 33, obtainedMark: 85, grade: 'A+', point: 5.0 },
        { subjectName: 'আকাইদ ও ফিকহ শাস্ত্র', fullMark: 100, passMark: 33, obtainedMark: 88, grade: 'A+', point: 5.0 },
        { subjectName: 'হাদিস ও উসূলে হাদিস', fullMark: 100, passMark: 33, obtainedMark: 82, grade: 'A+', point: 5.0 },
        { subjectName: 'বাংলা, গণিত ও ইংরেজি', fullMark: 100, passMark: 33, obtainedMark: 85, grade: 'A+', point: 5.0 }
      ];
    }

    recomputeAndNotify(selectedJamaatName, initialSubjects);
  };

  // Recompute total, GPA, and division whenever subjects change
  const recomputeAndNotify = (jamaatName: string, subs: SubjectMark[]) => {
    const totalMarks = subs.reduce((sum, s) => sum + (Number(s.fullMark) || 0), 0);
    const obtainedTotal = subs.reduce((sum, s) => sum + (Number(s.obtainedMark) || 0), 0);

    let totalPoints = 0;
    let hasFailed = false;

    const computedSubjects = subs.map(s => {
      const full = Number(s.fullMark) || 100;
      const pass = Number(s.passMark) || 33;
      const obt = Number(s.obtainedMark) || 0;
      const { grade, point } = calculateSubjectGrade(obt, full);
      if (obt < pass) hasFailed = true;
      totalPoints += point;
      return {
        ...s,
        fullMark: full,
        passMark: pass,
        obtainedMark: obt,
        grade,
        point
      };
    });

    const avgGpa = subs.length > 0 && !hasFailed
      ? (totalPoints / subs.length).toFixed(2)
      : '0.00';

    const gpaDisplay = hasFailed ? 'F (0.00)' : `${avgGpa} (${avgGpa >= '5.00' ? 'A+' : avgGpa >= '4.00' ? 'A' : 'A-'})`;
    const division = calculateDivision(obtainedTotal, totalMarks, hasFailed);

    onChange({
      ...resultData,
      jamaat: jamaatName,
      subjects: computedSubjects,
      totalMarks,
      obtainedTotal,
      gpa: gpaDisplay,
      division
    });
  };

  const handleSubjectFieldChange = (index: number, field: keyof SubjectMark, value: any) => {
    const updated = [...(resultData.subjects || [])];
    updated[index] = { ...updated[index], [field]: value };
    recomputeAndNotify(resultData.jamaat, updated);
  };

  const handleAddSubjectRow = () => {
    const newSub: SubjectMark = {
      subjectName: `নতুন বিষয় ${(resultData.subjects?.length || 0) + 1}`,
      fullMark: 100,
      passMark: 33,
      obtainedMark: 80,
      grade: 'A+',
      point: 5.0
    };
    const updated = [...(resultData.subjects || []), newSub];
    recomputeAndNotify(resultData.jamaat, updated);
  };

  const handleRemoveSubjectRow = (index: number) => {
    if ((resultData.subjects?.length || 0) <= 1) {
      alert('কমপক্ষে একটি বিষয় থাকা আবশ্যক!');
      return;
    }
    const updated = (resultData.subjects || []).filter((_, i) => i !== index);
    recomputeAndNotify(resultData.jamaat, updated);
  };

  // Initialize subjects if empty
  useEffect(() => {
    if (!resultData.subjects || resultData.subjects.length === 0) {
      handleJamaatChange(resultData.jamaat || (jamaats[0]?.name || 'হিফজুল কুরআন'));
    }
  }, []);

  const subjects = resultData.subjects || [];
  const percent = resultData.totalMarks > 0 
    ? Math.round((resultData.obtainedTotal / resultData.totalMarks) * 100) 
    : 0;

  return (
    <div className="space-y-4 pt-2">
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-emerald-50/80 rounded-xl border border-emerald-200">
        <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">মোট পূর্ণমান</span>
          <span className="text-base font-bold text-slate-900 font-mono">{resultData.totalMarks}</span>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">মোট প্রাপ্ত নম্বর</span>
          <span className="text-base font-bold text-emerald-800 font-mono">{resultData.obtainedTotal} ({percent}%)</span>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">অটো-ক্যালকুলেটেড GPA</span>
          <span className="text-base font-bold text-slate-900 font-sans">{resultData.gpa}</span>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">বিভাগ / ডিভিশন</span>
          <span className="text-xs font-bold text-emerald-900 truncate block mt-1">{resultData.division}</span>
        </div>
      </div>

      {/* Dynamic Subject Wise Marks Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-heading">
            <BookOpen className="w-4 h-4 text-emerald-800" />
            <span>বিষয়ভিত্তিক নম্বর প্রদান ও মার্কশীট টেবিল ({subjects.length} টি বিষয়)</span>
          </label>
          <button
            type="button"
            onClick={handleAddSubjectRow}
            className="px-3 py-1 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>নতুন বিষয় যোগ</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                <th className="p-2.5 font-semibold">বিষয়ের নাম</th>
                <th className="p-2.5 font-semibold text-center w-24">পূর্ণমান</th>
                <th className="p-2.5 font-semibold text-center w-20">পাস মার্ক</th>
                <th className="p-2.5 font-semibold text-center w-28">প্রাপ্ত নম্বর *</th>
                <th className="p-2.5 font-semibold text-center w-20">গ্রেড</th>
                <th className="p-2.5 font-semibold text-right w-12">মুছুন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map((sub, idx) => {
                const isFail = Number(sub.obtainedMark) < Number(sub.passMark || 33);
                return (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2">
                      <input
                        type="text"
                        value={sub.subjectName}
                        onChange={e => handleSubjectFieldChange(idx, 'subjectName', e.target.value)}
                        placeholder="বিষয়ের নাম..."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-emerald-600 bg-white"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        value={sub.fullMark}
                        onChange={e => handleSubjectFieldChange(idx, 'fullMark', Number(e.target.value))}
                        className="w-20 mx-auto px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-center bg-white"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        value={sub.passMark || 33}
                        onChange={e => handleSubjectFieldChange(idx, 'passMark', Number(e.target.value))}
                        className="w-16 mx-auto px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-center bg-white"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        min={0}
                        max={sub.fullMark}
                        value={sub.obtainedMark}
                        onChange={e => handleSubjectFieldChange(idx, 'obtainedMark', Number(e.target.value))}
                        className={`w-24 mx-auto px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold text-center ${
                          isFail
                            ? 'border-rose-500 bg-rose-50 text-rose-700 focus:ring-rose-500'
                            : 'border-emerald-500 bg-emerald-50/50 text-emerald-900 focus:ring-emerald-600'
                        }`}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                        isFail
                          ? 'bg-rose-100 text-rose-800'
                          : sub.grade === 'A+'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {sub.grade || 'A+'}
                      </span>
                    </td>
                    <td className="p-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveSubjectRow(idx)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md"
                        title="বিষয়টি বাদ দিন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
