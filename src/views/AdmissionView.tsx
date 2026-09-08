import { useState, useRef, type FormEvent } from 'react';
import { 
  GraduationCap, 
  Building2, 
  Clock, 
  FileText, 
  Send, 
  Check, 
  Printer,
  Download,
  Loader2,
  CreditCard
} from 'lucide-react';
import { SiteSettings, StudentApplication, JamaatItem, AdmissionFormField } from '../types';
import { storageService } from '../services/storageService';
import { downloadDomAsPdf } from '../utils/downloadUtils';

interface AdmissionViewProps {
  settings: SiteSettings;
  jamaats?: JamaatItem[];
}

export function AdmissionView({ settings, jamaats = [] }: AdmissionViewProps) {
  // Form fields configured by admin in settings
  const formFields: AdmissionFormField[] = (settings.admissionFormFields || [])
    .filter(f => f.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Dynamic Form Values State
  const [formValues, setFormValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {
      academicYear: settings.admissionYear || '২০২৬-২০২৭',
      campus: 'অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)',
      jamaat: jamaats.length > 0 ? jamaats[0].name : 'হিফজ',
      studentType: 'নতুন ছাত্র',
      residenceType: 'আবাসিক',
      paymentMethod: 'বিকাশ',
      paymentTxnId: '',
      paymentDate: new Date().toISOString().split('T')[0]
    };
    formFields.forEach(f => {
      if (initial[f.id] === undefined) {
        initial[f.id] = f.type === 'select' && f.options?.length ? f.options[0] : '';
      }
    });
    return initial;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<StudentApplication | null>(null);
  const [isDownloadingReceipt, setIsDownloadingReceipt] = useState(false);
  const slipRef = useRef<HTMLDivElement>(null);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleDownloadReceipt = async () => {
    if (!slipRef.current || !submittedApp || isDownloadingReceipt) return;
    setIsDownloadingReceipt(true);
    try {
      await downloadDomAsPdf(slipRef.current, `Admission_Slip_${submittedApp.id}`);
    } catch (e) {
      console.error('Download slip error:', e);
    } finally {
      setIsDownloadingReceipt(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check required fields
    for (const f of formFields) {
      if (f.required && (!formValues[f.id] || formValues[f.id].toString().trim() === '')) {
        alert(`অনুগ্রহ করে "${f.label}" পূরণ করুন।`);
        return;
      }
    }

    setIsSubmitting(true);

    const studentNameBn = formValues.studentNameBn || formValues.studentName || 'মুহাম্মদ শিক্ষার্থী';
    const guardianPhone = formValues.guardianPhone || formValues.phone || '';

    const newApp: StudentApplication = {
      id: `MI-${Date.now().toString().slice(-5)}`,
      studentNameBn,
      studentNameEn: formValues.studentNameEn || '',
      fatherName: formValues.fatherName || '',
      motherName: formValues.motherName || '',
      guardianPhone,
      whatsappNumber: formValues.whatsappNumber || '',
      birthDate: formValues.birthDate || '',
      academicYear: formValues.academicYear || settings.admissionYear || '২০২৬-২০২৭',
      campus: formValues.campus || 'অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)',
      department: formValues.department || '',
      jamaat: formValues.jamaat || (jamaats[0]?.name ?? 'হিফজ'),
      studentType: formValues.studentType || 'নতুন ছাত্র',
      residenceType: formValues.residenceType || 'আবাসিক',
      address: formValues.address || '',
      previousInstitute: formValues.previousInstitute || '',
      notes: formValues.notes || '',
      status: 'অপেক্ষমান',
      appliedDate: new Date().toLocaleDateString('bn-BD'),
      customFields: formValues
    };

    try {
      storageService.submitApplication(newApp);
      setSubmittedApp(newApp);
    } catch (err) {
      console.error(err);
      alert('আবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Admission Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>{settings.admissionYear} শিক্ষাবর্ষ</span>
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              settings.isAdmissionOpen ? 'bg-emerald-700 text-white' : 'bg-rose-700 text-white'
            }`}>
              {settings.isAdmissionOpen ? 'ভর্তি চলছে' : 'ভর্তি সাময়িক বন্ধ'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            মারকাযুল ইহসান ভর্তি তথ্য ও আবেদন
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {settings.admissionNoticeText}
          </p>
        </div>
      </div>

      {/* 2. গুরুত্বপূর্ণ ভর্তি তথ্য ও নির্দেশিকা */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base font-heading">ক্যাম্পাস নির্বাচন</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {settings.hasTemporaryCampus !== false && (
              <><strong>অস্থায়ী ক্যাম্পাস:</strong> {settings.addressTemporary || 'যাত্রাবাড়ী, ঢাকা'}<br /></>
            )}
            <strong>স্থায়ী ক্যাম্পাস:</strong> {settings.addressPermanent || 'পাইতি, ডেমরা, ঢাকা'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base font-heading">ভর্তি পরীক্ষা ও সাক্ষাৎকার</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            হিফজ ও নাযেরায় সহীহ তিলাওয়াত ও মাখরাজ যাচাই; কিতাব বিভাগে বিগত জামাতের কিতাবের ওপর লিখিত ও মৌখিক সাক্ষাৎকার গ্রহণ করা হয়।
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base font-heading">প্রয়োজনীয় কাগজপত্র</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            ১. জন্ম সনদের ফটোকপি<br />
            ২. পিতা-মাতার জাতীয় পরিচয়পত্রের কপি<br />
            ৩. সদ্য তোলা ২ কপি পাসপোর্ট সাইজ ছবি<br />
            ৪. পূর্ববর্তী মাদরাসার ছাড়পত্র (যদি প্রযোজ্য হয়)
          </p>
        </div>
      </div>

      {/* 3. Class/Jamaat Dynamic Fee Chart */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              ফি তালিকা
            </span>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mt-1">
              জামাতভিত্তিক ভর্তি ও মাসিক ফি চার্ট
            </h2>
          </div>
          <span className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            * বোর্ডিং খাবার ফি মাসিক ৩,০০০/- (আবাসিকদের জন্য প্রযোজ্য)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-emerald-900 text-white font-serif">
                <th className="p-3 font-semibold rounded-tl-lg">ক্রম</th>
                <th className="p-3 font-semibold">জামাত / শ্রেণি</th>
                <th className="p-3 font-semibold">বিভাগ</th>
                <th className="p-3 font-semibold text-center">ভর্তি ফি</th>
                <th className="p-3 font-semibold text-center rounded-tr-lg">মাসিক টিউশন ফি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {jamaats.length > 0 ? (
                jamaats.map((j, idx) => (
                  <tr key={j.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono text-slate-500">{idx + 1}</td>
                    <td className="p-3 font-bold text-slate-900 font-serif">{j.name}</td>
                    <td className="p-3 text-slate-600">{j.department}</td>
                    <td className="p-3 font-semibold text-emerald-800 text-center font-serif">
                      {j.admissionFee || '৫,০০০/-'}
                    </td>
                    <td className="p-3 font-semibold text-slate-900 text-center font-serif">
                      {j.monthlyTuitionFee || '২,৫০০/-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400">
                    জামাতের তথ্য লোড হচ্ছে...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <span>* এতিম ও অসচ্ছল পরিবারের মেধাবী ছাত্রদের জন্য বিশেষ ছাড় ও বৃত্তির ব্যবস্থা রয়েছে।</span>
          <span>* পুরাতন ছাত্রদের পুনঃভর্তিতে বিশেষ সুবিধা প্রযোজ্য।</span>
        </div>
      </div>

      {/* 4. ONLINE ADMISSION APPLICATION FORM (Dynamic based on settings.admissionFormFields) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm" id="online-admission-form-section">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 border-b border-slate-100 pb-4">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
              অনলাইন আবেদন ফরম
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              {settings.admissionYear} শিক্ষাবর্ষে অনলাইনে ভর্তির আবেদন
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              সঠিক তথ্য দিয়ে ফরমটি পূরণ করুন। আবেদন জমা হওয়ার পর আমাদের ভর্তি শাখা থেকে যোগাযোগ করা হবে।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" id="admission-application-form">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {formFields.map((field) => {
                const isFullWidth = field.type === 'textarea' || field.type === 'payment_method' || field.id === 'address';

                if (field.type === 'payment_method') {
                  return (
                    <div key={field.id} className="col-span-1 sm:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                        <CreditCard className="w-5 h-5 text-emerald-800" />
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base font-heading">
                          {field.label} {field.required && <span className="text-rose-600">*</span>}
                        </h4>
                      </div>

                      {/* Payment Method Selector */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['বিকাশ', 'নগদ', 'রকেট', 'ক্যাশ'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => handleFieldChange('paymentMethod', method)}
                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                              formValues.paymentMethod === method
                                ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs font-bold'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-xs sm:text-sm">{method}</span>
                          </button>
                        ))}
                      </div>

                      {/* Account details hint */}
                      <div className="bg-emerald-50 text-emerald-950 p-3 rounded-xl text-xs border border-emerald-200">
                        {formValues.paymentMethod === 'বিকাশ' && (
                          <span>মারকাযুল ইহসান বিকাশ নম্বর: <strong>{settings.bkashNumber || '০১৭৮৯-৩২২১৯৯'}</strong> (পার্সোনাল/মার্চেন্ট)</span>
                        )}
                        {formValues.paymentMethod === 'নগদ' && (
                          <span>মারকাযুল ইহসান নগদ নম্বর: <strong>{settings.nagadNumber || '০১৭৮৯-৩২২১৯৯'}</strong></span>
                        )}
                        {formValues.paymentMethod === 'রকেট' && (
                          <span>মারকাযুল ইহসান রকেট নম্বর: <strong>{settings.rocketNumber || '০১৭৮৯-৩২২১৯৯-৫'}</strong></span>
                        )}
                        {formValues.paymentMethod === 'ক্যাশ' && (
                          <span>সরাসরি মাদরাসা অফিসে এসে ক্যাশ প্রদান করা যাবে।</span>
                        )}
                      </div>

                      {/* Transaction ID and Date */}
                      {formValues.paymentMethod !== 'ক্যাশ' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              ট্রানজেকশন আইডি (TrxID)
                            </label>
                            <input
                              type="text"
                              value={formValues.paymentTxnId || ''}
                              onChange={e => handleFieldChange('paymentTxnId', e.target.value)}
                              placeholder="e.g. 9J182K7L"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-mono uppercase bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              পেমেন্টের তারিখ
                            </label>
                            <input
                              type="date"
                              value={formValues.paymentDate || ''}
                              onChange={e => handleFieldChange('paymentDate', e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-sans bg-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (field.type === 'textarea') {
                  return (
                    <div key={field.id} className="col-span-1 sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {field.label} {field.required && <span className="text-rose-600">*</span>}
                      </label>
                      <textarea
                        rows={2}
                        required={field.required}
                        value={formValues[field.id] || ''}
                        onChange={e => handleFieldChange(field.id, e.target.value)}
                        placeholder={field.placeholder || ''}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-white"
                        id={`input-${field.id}`}
                      />
                    </div>
                  );
                }

                if (field.type === 'select') {
                  // If field is jamaat, use jamaats list if options not set
                  const options = field.id === 'jamaat' && (!field.options || field.options.length === 0)
                    ? jamaats.map(j => j.name)
                    : (field.options || []);

                  return (
                    <div key={field.id} className={isFullWidth ? 'col-span-1 sm:col-span-2' : 'col-span-1'}>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {field.label} {field.required && <span className="text-rose-600">*</span>}
                      </label>
                      <select
                        required={field.required}
                        value={formValues[field.id] || ''}
                        onChange={e => handleFieldChange(field.id, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-white cursor-pointer"
                        id={`input-${field.id}`}
                      >
                        <option value="">-- নির্বাচন করুন --</option>
                        {options.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  );
                }

                return (
                  <div key={field.id} className={isFullWidth ? 'col-span-1 sm:col-span-2' : 'col-span-1'}>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {field.label} {field.required && <span className="text-rose-600">*</span>}
                    </label>
                    <input
                      type={field.type || 'text'}
                      required={field.required}
                      value={formValues[field.id] || ''}
                      onChange={e => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder || ''}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-white"
                      id={`input-${field.id}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                * তথ্যসমূহ সরাসরি মাদরাসার এডমিন ডেটাবেস ও গুগল শিটে স্বয়ংক্রিয়ভাবে সংরক্ষিত হবে।
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                id="submit-admission-form-btn"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>জমা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ভর্তি আবেদন জমা দিন</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Confirmation Modal upon Application Submission */}
      {submittedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div ref={slipRef} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-200 animate-in fade-in zoom-in duration-200">
            <div className="bg-emerald-800 text-white p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-700 border-2 border-emerald-400 mx-auto flex items-center justify-center mb-3 text-amber-300">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-xl font-bold font-heading">ভর্তি আবেদন সফলভাবে জমা হয়েছে!</h3>
              <p className="text-xs text-emerald-200 mt-1">
                আবেদন ট্র্যাকিং আইডি: <strong className="font-mono text-amber-300 text-sm">{submittedApp.id}</strong>
              </p>
            </div>

            <div className="p-6 space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">ছাত্রের নাম:</span>
                <strong>{submittedApp.studentNameBn}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">নির্বাচিত জামাত:</span>
                <strong>{submittedApp.jamaat}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">ক্যাম্পাস:</span>
                <span>{submittedApp.campus}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">অভিভাবক ফোন:</span>
                <span className="font-sans font-semibold">{submittedApp.guardianPhone}</span>
              </div>
              {submittedApp.customFields?.paymentMethod && (
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">পেমেন্ট মেথড:</span>
                  <span className="font-semibold text-emerald-800">
                    {submittedApp.customFields.paymentMethod}
                    {submittedApp.customFields.paymentTxnId ? ` (TrxID: ${submittedApp.customFields.paymentTxnId})` : ''}
                  </span>
                </div>
              )}
              
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-900 text-xs mt-3">
                দয়া করে ট্র্যাকিং আইডি সংরক্ষণ করুন। পরীক্ষার সময়সূচী অভিভাবকের নম্বরে এসএমএস বা ফোন করে জানানো হবে।
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  disabled={isDownloadingReceipt}
                  className="px-3.5 py-1.5 bg-emerald-800 text-white text-xs font-semibold rounded-lg hover:bg-emerald-900 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  id="download-admission-slip-btn"
                >
                  {isDownloadingReceipt ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>ডাউনলোড...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>রসিদ ডাউনলোড</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="hidden sm:flex text-xs font-semibold text-slate-600 hover:text-slate-900 items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSubmittedApp(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
