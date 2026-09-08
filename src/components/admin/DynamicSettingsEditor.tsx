import React, { useState } from 'react';
import { 
  Target, 
  ShieldCheck, 
  BookOpen, 
  Sliders, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Edit3, 
  Check, 
  X, 
  RotateCcw,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { SiteSettings, AdmissionFormField, MadrasaFeature } from '../../types';
import { 
  DEFAULT_GOALS, 
  DEFAULT_PRINCIPLES, 
  DEFAULT_RULES, 
  DEFAULT_ADMISSION_FORM_FIELDS 
} from '../../data/defaultData';

interface DynamicSettingsEditorProps {
  settings: SiteSettings;
  onChange: (updated: SiteSettings) => void;
}

export const DynamicSettingsEditor: React.FC<DynamicSettingsEditorProps> = ({ settings, onChange }) => {
  const [activeTab, setActiveTab] = useState<'goals' | 'principles' | 'rules' | 'formFields' | 'features'>('goals');

  // Goals State
  const goals = settings.goals || DEFAULT_GOALS;
  const [newGoalText, setNewGoalText] = useState('');
  const [editingGoalIdx, setEditingGoalIdx] = useState<number | null>(null);
  const [editingGoalVal, setEditingGoalVal] = useState('');

  // Principles State
  const principles = settings.principles || DEFAULT_PRINCIPLES;
  const [newPrincipleText, setNewPrincipleText] = useState('');
  const [editingPrincipleIdx, setEditingPrincipleIdx] = useState<number | null>(null);
  const [editingPrincipleVal, setEditingPrincipleVal] = useState('');

  // Rules State
  const rules = settings.rules || DEFAULT_RULES;
  const [newRuleText, setNewRuleText] = useState('');
  const [editingRuleIdx, setEditingRuleIdx] = useState<number | null>(null);
  const [editingRuleVal, setEditingRuleVal] = useState('');

  // Form Fields State
  const formFields = settings.admissionFormFields || DEFAULT_ADMISSION_FORM_FIELDS;
  const [newField, setNewField] = useState<Partial<AdmissionFormField>>({
    id: '',
    label: '',
    type: 'text',
    required: false,
    enabled: true,
    placeholder: ''
  });
  const [showNewFieldModal, setShowNewFieldModal] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [editingFieldData, setEditingFieldData] = useState<Partial<AdmissionFormField>>({});

  // Features State
  const features: MadrasaFeature[] = settings.features || [
    { id: 'f-1', title: 'আন্তর্জাতিক মানের হিফজুল কুরআন', desc: 'অভিজ্ঞ হাফেজ ও ক্বারী দ্বারা সহীহ মাখরাজ ও তাজবীদের সাথে ৩ ধাপে হিফজ পাঠদান।', icon: 'BookOpen' },
    { id: 'f-2', title: 'উচ্চতর দাওরায়ে হাদীস ও ইফতা', desc: 'বেফাক ও হাইয়াতুল উলয়া বোর্ডের অধীনে দাওরায়ে হাদীস ও উচ্চতর ইসলামিক গবেষণা।', icon: 'Award' },
    { id: 'f-3', title: 'আধুনিক ও মনোরম আবাসিক ক্যাম্পাস', desc: 'পরম যত্নে আবাসিক পরিচালনা, সুষম খাদ্য ও ২৪ ঘণ্টা সুদৃঢ় নিরাপত্তা ও তদারকি।', icon: 'Shield' }
  ];
  const [newFeature, setNewFeature] = useState<Partial<MadrasaFeature>>({
    title: '',
    desc: '',
    icon: 'BookOpen'
  });
  const [showFeatureModal, setShowFeatureModal] = useState(false);

  // Handlers for Goals
  const handleAddGoal = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newGoalText.trim()) return;
    const updated = [...goals, newGoalText.trim()];
    onChange({ ...settings, goals: updated });
    setNewGoalText('');
  };

  const handleSaveGoalEdit = (index: number) => {
    if (!editingGoalVal.trim()) return;
    const updated = [...goals];
    updated[index] = editingGoalVal.trim();
    onChange({ ...settings, goals: updated });
    setEditingGoalIdx(null);
  };

  const handleDeleteGoal = (index: number) => {
    const updated = goals.filter((_, i) => i !== index);
    onChange({ ...settings, goals: updated });
  };

  const handleMoveGoal = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= goals.length) return;
    const updated = [...goals];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange({ ...settings, goals: updated });
  };

  // Handlers for Principles
  const handleAddPrinciple = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newPrincipleText.trim()) return;
    const updated = [...principles, newPrincipleText.trim()];
    onChange({ ...settings, principles: updated });
    setNewPrincipleText('');
  };

  const handleSavePrincipleEdit = (index: number) => {
    if (!editingPrincipleVal.trim()) return;
    const updated = [...principles];
    updated[index] = editingPrincipleVal.trim();
    onChange({ ...settings, principles: updated });
    setEditingPrincipleIdx(null);
  };

  const handleDeletePrinciple = (index: number) => {
    const updated = principles.filter((_, i) => i !== index);
    onChange({ ...settings, principles: updated });
  };

  const handleMovePrinciple = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= principles.length) return;
    const updated = [...principles];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange({ ...settings, principles: updated });
  };

  // Handlers for Rules
  const handleAddRule = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newRuleText.trim()) return;
    const updated = [...rules, newRuleText.trim()];
    onChange({ ...settings, rules: updated });
    setNewRuleText('');
  };

  const handleSaveRuleEdit = (index: number) => {
    if (!editingRuleVal.trim()) return;
    const updated = [...rules];
    updated[index] = editingRuleVal.trim();
    onChange({ ...settings, rules: updated });
    setEditingRuleIdx(null);
  };

  const handleDeleteRule = (index: number) => {
    const updated = rules.filter((_, i) => i !== index);
    onChange({ ...settings, rules: updated });
  };

  const handleMoveRule = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= rules.length) return;
    const updated = [...rules];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange({ ...settings, rules: updated });
  };

  // Handlers for Form Fields
  const handleToggleFieldEnabled = (fieldId: string) => {
    const updated = formFields.map(f => {
      if (f.id === fieldId) {
        return { ...f, enabled: !f.enabled };
      }
      return f;
    });
    onChange({ ...settings, admissionFormFields: updated });
  };

  const handleToggleFieldRequired = (fieldId: string) => {
    const updated = formFields.map(f => {
      if (f.id === fieldId) {
        return { ...f, required: !f.required };
      }
      return f;
    });
    onChange({ ...settings, admissionFormFields: updated });
  };

  const handleAddField = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newField.label || !newField.id) {
      alert('ফিল্ডের নাম ও আইডি উভয়টি প্রদান করুন।');
      return;
    }
    const safeId = newField.id.trim().replace(/\s+/g, '_');
    if (formFields.some(f => f.id === safeId)) {
      alert('এই আইডির ফিল্ড ইতোমধ্যে বিদ্যমান! অন্য আইডি দিন।');
      return;
    }
    const created: AdmissionFormField = {
      id: safeId,
      label: newField.label.trim(),
      type: newField.type || 'text',
      required: Boolean(newField.required),
      enabled: true,
      placeholder: newField.placeholder?.trim() || '',
      isSystem: false
    };
    const updated = [...formFields, created];
    onChange({ ...settings, admissionFormFields: updated });
    setNewField({ id: '', label: '', type: 'text', required: false, enabled: true, placeholder: '' });
    setShowNewFieldModal(false);
  };

  const handleDeleteField = (fieldId: string) => {
    const field = formFields.find(f => f.id === fieldId);
    if (field?.isSystem) {
      alert('সিস্টেমের মৌলিক ফিল্ড মুছে ফেলা যাবে না, তবে চাইলে বন্ধ (Disable) করতে পারেন।');
      return;
    }
    if (window.confirm('আপনি কি এই ভর্তি ফরম ফিল্ডটি মুছে ফেলতে চান?')) {
      const updated = formFields.filter(f => f.id !== fieldId);
      onChange({ ...settings, admissionFormFields: updated });
    }
  };

  const handleSaveFieldEdit = (fieldId: string) => {
    const updated = formFields.map(f => {
      if (f.id === fieldId) {
        return {
          ...f,
          label: editingFieldData.label !== undefined ? editingFieldData.label : f.label,
          placeholder: editingFieldData.placeholder !== undefined ? editingFieldData.placeholder : f.placeholder
        };
      }
      return f;
    });
    onChange({ ...settings, admissionFormFields: updated });
    setEditingFieldId(null);
  };

  const handleResetFieldsToDefault = () => {
    if (window.confirm('ভর্তি ফরম ফিল্ডসমূহ ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?')) {
      onChange({ ...settings, admissionFormFields: DEFAULT_ADMISSION_FORM_FIELDS });
    }
  };

  // Handlers for Features
  const handleAddFeature = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newFeature.title || !newFeature.desc) return;
    const feat: MadrasaFeature = {
      id: `feat-${Date.now()}`,
      title: newFeature.title.trim(),
      desc: newFeature.desc.trim(),
      icon: newFeature.icon || 'BookOpen'
    };
    const updated = [...features, feat];
    onChange({ ...settings, features: updated });
    setNewFeature({ title: '', desc: '', icon: 'BookOpen' });
    setShowFeatureModal(false);
  };

  const handleDeleteFeature = (id: string) => {
    if (window.confirm('এই বৈশিষ্ট্যটি মুছে ফেলতে চান?')) {
      const updated = features.filter(f => f.id !== id);
      onChange({ ...settings, features: updated });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-tab Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'goals', label: `লক্ষ্য ও উদ্দেশ্য (${goals.length})`, icon: Target },
          { id: 'principles', label: `মূলনীতি ও আদর্শ (${principles.length})`, icon: ShieldCheck },
          { id: 'rules', label: `শিক্ষার্থীদের আচরণবিধি (${rules.length})`, icon: BookOpen },
          { id: 'formFields', label: `অনলাইন ভর্তি ফরম ফিল্ডসমূহ (${formFields.length})`, icon: Sliders },
          { id: 'features', label: `মাদরাসার বৈশিষ্ট্যসমূহ (${features.length})`, icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= SECTION 1: GOALS ================= */}
      {activeTab === 'goals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">মাদরাসার লক্ষ্য ও উদ্দেশ্যসমূহ</h4>
              <p className="text-xs text-slate-500">
                এই লক্ষ্যগুলো "আমাদের সম্পর্কে" পেজ এবং প্রধান পরিচিতিতে প্রদর্শিত হবে।
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange({ ...settings, goals: DEFAULT_GOALS })}
              className="text-xs text-slate-500 hover:text-emerald-800 flex items-center gap-1"
              title="ডিফল্ট লক্ষ্যাবলী পুনরুদ্ধার"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ডিফল্টে ফিরুন</span>
            </button>
          </div>

          {/* Add Goal Form */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newGoalText}
              onChange={e => setNewGoalText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddGoal();
                }
              }}
              placeholder="নতুন লক্ষ্য বা উদ্দেশ্য লিখুন..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="button"
              onClick={() => handleAddGoal()}
              className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>লক্ষ্য যুক্ত করুন</span>
            </button>
          </div>

          {/* Goals List */}
          <div className="space-y-2">
            {goals.map((goal, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3 shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>

                  {editingGoalIdx === idx ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editingGoalVal}
                        onChange={e => setEditingGoalVal(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-emerald-500 text-xs font-serif bg-white"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveGoalEdit(idx)}
                        className="p-1.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600"
                        title="সংরক্ষণ"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingGoalIdx(null)}
                        className="p-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                        title="বাতিল"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed flex-1">
                      {goal}
                    </p>
                  )}
                </div>

                {editingGoalIdx !== idx && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveGoal(idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      title="উপরে নিন"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === goals.length - 1}
                      onClick={() => handleMoveGoal(idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      title="নিচে নিন"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingGoalIdx(idx);
                        setEditingGoalVal(goal);
                      }}
                      className="p-1 text-emerald-700 hover:bg-emerald-50 rounded"
                      title="সম্পাদনা"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteGoal(idx)}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                      title="মুছুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 2: PRINCIPLES ================= */}
      {activeTab === 'principles' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">মাদরাসার মূলনীতি ও আদর্শসমূহ</h4>
              <p className="text-xs text-slate-500">
                মাদরাসা পরিচালনার মৌলিক ভিত্তি ও আদর্শিক চেতনা।
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange({ ...settings, principles: DEFAULT_PRINCIPLES })}
              className="text-xs text-slate-500 hover:text-emerald-800 flex items-center gap-1"
              title="ডিফল্ট মূলনীতিসমূহ পুনরুদ্ধার"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ডিফল্টে ফিরুন</span>
            </button>
          </div>

          {/* Add Principle Form */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newPrincipleText}
              onChange={e => setNewPrincipleText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddPrinciple();
                }
              }}
              placeholder="নতুন মূলনীতি বা আদর্শ লিখুন..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="button"
              onClick={() => handleAddPrinciple()}
              className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>মূলনীতি যুক্ত করুন</span>
            </button>
          </div>

          {/* Principles List */}
          <div className="space-y-2">
            {principles.map((prin, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3 shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>

                  {editingPrincipleIdx === idx ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editingPrincipleVal}
                        onChange={e => setEditingPrincipleVal(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-emerald-500 text-xs font-serif bg-white"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSavePrincipleEdit(idx)}
                        className="p-1.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600"
                        title="সংরক্ষণ"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPrincipleIdx(null)}
                        className="p-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                        title="বাতিল"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed flex-1">
                      {prin}
                    </p>
                  )}
                </div>

                {editingPrincipleIdx !== idx && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMovePrinciple(idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      title="উপরে নিন"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === principles.length - 1}
                      onClick={() => handleMovePrinciple(idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      title="নিচে নিন"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPrincipleIdx(idx);
                        setEditingPrincipleVal(prin);
                      }}
                      className="p-1 text-emerald-700 hover:bg-emerald-50 rounded"
                      title="সম্পাদনা"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePrinciple(idx)}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                      title="মুছুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 3: RULES ================= */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">শিক্ষার্থীদের আচরণবিধি ও নিয়মকানুন</h4>
              <p className="text-xs text-slate-500">
                এই নিয়মগুলো "নিয়মাবলী" পেজে ও ভর্তি ফরমের শর্তাবলীতে প্রদর্শিত হবে।
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange({ ...settings, rules: DEFAULT_RULES })}
              className="text-xs text-slate-500 hover:text-emerald-800 flex items-center gap-1"
              title="ডিফল্ট নিয়মাবলী পুনরুদ্ধার"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ডিফল্টে ফিরুন</span>
            </button>
          </div>

          {/* Add Rule Form */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newRuleText}
              onChange={e => setNewRuleText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddRule();
                }
              }}
              placeholder="নতুন নিয়ম বা আচরণবিধি লিখুন..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="button"
              onClick={() => handleAddRule()}
              className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>নিয়ম যুক্ত করুন</span>
            </button>
          </div>

          {/* Rules List */}
          <div className="space-y-2">
            {rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3 shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>

                  {editingRuleIdx === idx ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editingRuleVal}
                        onChange={e => setEditingRuleVal(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-emerald-500 text-xs font-serif bg-white"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveRuleEdit(idx)}
                        className="p-1.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600"
                        title="সংরক্ষণ"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingRuleIdx(null)}
                        className="p-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                        title="বাতিল"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed flex-1">
                      {rule}
                    </p>
                  )}
                </div>

                {editingRuleIdx !== idx && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveRule(idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      title="উপরে নিন"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === rules.length - 1}
                      onClick={() => handleMoveRule(idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      title="নিচে নিন"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingRuleIdx(idx);
                        setEditingRuleVal(rule);
                      }}
                      className="p-1 text-emerald-700 hover:bg-emerald-50 rounded"
                      title="সম্পাদনা"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRule(idx)}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                      title="মুছুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 4: ADMISSION FORM FIELDS ================= */}
      {activeTab === 'formFields' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">
                অনলাইন ভর্তি ফরম ফিল্ড কাস্টমাইজেশন
              </h4>
              <p className="text-xs text-slate-500">
                ভর্তি ফরমে কোন কোন তথ্য চাওয়া হবে তা চালু/বন্ধ, বাধ্যতামূলক কিংবা নতুন ফিল্ড যুক্ত করুন।
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetFieldsToDefault}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                title="ডিফল্ট ফিল্ডসমূহ ফিরিয়ে আনুন"
              >
                <RotateCcw className="w-3 h-3" />
                <span>রিসেট</span>
              </button>
              <button
                type="button"
                onClick={() => setShowNewFieldModal(true)}
                className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>নতুন ফিল্ড যুক্ত করুন</span>
              </button>
            </div>
          </div>

          {/* New Field Modal */}
          {showNewFieldModal && (
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
              <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                নতুন ভর্তি ফরম ফিল্ড তৈরি
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">ফিল্ড আইডি (ইংরেজি) *</label>
                  <input
                    type="text"
                    required
                    value={newField.id}
                    onChange={e => setNewField({ ...newField, id: e.target.value })}
                    placeholder="e.g. bloodGroup, previousExam"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">ফিল্ড লেবেল (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={newField.label}
                    onChange={e => setNewField({ ...newField, label: e.target.value })}
                    placeholder="যেমন: রক্তের গ্রুপ"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">ইনপুট টাইপ</label>
                  <select
                    value={newField.type}
                    onChange={e => setNewField({ ...newField, type: e.target.value as any })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="text">টেক্সট (Text)</option>
                    <option value="tel">মোবাইল নম্বর (Tel)</option>
                    <option value="date">তারিখ (Date)</option>
                    <option value="textarea">বড় টেক্সট (Textarea)</option>
                    <option value="select">ড্রপডাউন (Select)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">প্লেসহোল্ডার টেক্সট (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={newField.placeholder}
                    onChange={e => setNewField({ ...newField, placeholder: e.target.value })}
                    placeholder="যেমন: রক্তের গ্রুপ নির্বাচন বা লিখুন..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(newField.required)}
                      onChange={e => setNewField({ ...newField, required: e.target.checked })}
                      className="rounded text-emerald-700"
                    />
                    <span>বাধ্যতামূলক (Required)</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewFieldModal(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  onClick={() => handleAddField()}
                  className="px-4 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  যোগ করুন
                </button>
              </div>
            </div>
          )}

          {/* Form Fields Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                  <th className="p-3 font-semibold">ফিল্ড লেবেল / নাম</th>
                  <th className="p-3 font-semibold">আইডি</th>
                  <th className="p-3 font-semibold">টাইপ</th>
                  <th className="p-3 font-semibold text-center">ফরমে সক্রিয়</th>
                  <th className="p-3 font-semibold text-center">বাধ্যতামূলক</th>
                  <th className="p-3 font-semibold text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {formFields.map((field) => (
                  <tr key={field.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      {editingFieldId === field.id ? (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={editingFieldData.label !== undefined ? editingFieldData.label : field.label}
                            onChange={e => setEditingFieldData({ ...editingFieldData, label: e.target.value })}
                            className="w-full px-2 py-1 rounded border border-emerald-500 text-xs"
                          />
                          <input
                            type="text"
                            value={editingFieldData.placeholder !== undefined ? editingFieldData.placeholder : (field.placeholder || '')}
                            onChange={e => setEditingFieldData({ ...editingFieldData, placeholder: e.target.value })}
                            placeholder="প্লেসহোল্ডার টেক্সট..."
                            className="w-full px-2 py-1 rounded border border-slate-300 text-[11px] text-slate-500"
                          />
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-slate-900 block">{field.label}</span>
                          {field.placeholder && (
                            <span className="text-[10px] text-slate-400 block">{field.placeholder}</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-600">{field.id}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono uppercase">
                        {field.type}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFieldEnabled(field.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 mx-auto transition-colors ${
                          field.enabled
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {field.enabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{field.enabled ? 'চালু' : 'বন্ধ'}</span>
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFieldRequired(field.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                          field.required
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {field.required ? 'বাধ্যতামূলক' : 'ঐচ্ছিক'}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {editingFieldId === field.id ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleSaveFieldEdit(field.id)}
                              className="p-1 text-emerald-700 hover:bg-emerald-50 rounded"
                              title="সংরক্ষণ"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingFieldId(null)}
                              className="p-1 text-slate-400 hover:bg-slate-100 rounded"
                              title="বাতিল"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingFieldId(field.id);
                                setEditingFieldData({ label: field.label, placeholder: field.placeholder });
                              }}
                              className="p-1 text-slate-600 hover:text-emerald-700 rounded"
                              title="লেবেল পরিবর্তন"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {!field.isSystem && (
                              <button
                                type="button"
                                onClick={() => handleDeleteField(field.id)}
                                className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                                title="মুছুন"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: INSTITUTION FEATURES ================= */}
      {activeTab === 'features' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">
                মাদরাসার অনন্য বৈশিষ্ট্যসমূহ
              </h4>
              <p className="text-xs text-slate-500">
                হোমপেজ এবং পরিচিতি পেজে প্রদর্শিত মূল আকর্ষণ ও বিশেষ সুবিধাসমূহ।
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowFeatureModal(true)}
              className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>নতুন বৈশিষ্ট্য</span>
            </button>
          </div>

          {/* New Feature Modal */}
          {showFeatureModal && (
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
              <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                নতুন বৈশিষ্ট্য অন্তর্ভুক্তি
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">বৈশিষ্ট্যের শিরোনাম *</label>
                  <input
                    type="text"
                    required
                    value={newFeature.title}
                    onChange={e => setNewFeature({ ...newFeature, title: e.target.value })}
                    placeholder="যেমন: শীতাতপ নিয়ন্ত্রিত আধুনিক হিফজ ভবন"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">আইকন ধরন</label>
                  <select
                    value={newFeature.icon}
                    onChange={e => setNewFeature({ ...newFeature, icon: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="BookOpen">কুরআন / কিতাব (BookOpen)</option>
                    <option value="Award">পুরস্কার / কৃতিত্ব (Award)</option>
                    <option value="Shield">নিরাপত্তা / আমানত (Shield)</option>
                    <option value="Sparkles">উজ্জ্বলতা / আধুনিক (Sparkles)</option>
                    <option value="Target">লক্ষ্য ও উদ্দেশ্য (Target)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">বিস্তারিত বিবরণ *</label>
                  <textarea
                    rows={2}
                    required
                    value={newFeature.desc}
                    onChange={e => setNewFeature({ ...newFeature, desc: e.target.value })}
                    placeholder="এই বৈশিষ্ট্য সম্পর্কে বিস্তারিত বর্ণনা..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowFeatureModal(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  onClick={() => handleAddFeature()}
                  className="px-4 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feat) => (
              <div
                key={feat.id}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 font-heading">{feat.title}</h5>
                  </div>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed pl-8">
                    {feat.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteFeature(feat.id)}
                  className="p-1 text-rose-600 hover:bg-rose-50 rounded shrink-0"
                  title="মুছুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
