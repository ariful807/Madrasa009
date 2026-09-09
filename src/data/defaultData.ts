import { NoticeItem, StudentApplication, StudentResult, BlogPost, GalleryItem, SyllabusItem, DonationRecord, ContactMessage, SiteSettings, JamaatItem, TeacherItem, SliderImageItem, MadrasaFeature, AdmissionFormField } from '../types';

export const DEFAULT_FEATURES: MadrasaFeature[] = [
  {
    id: 'feat-1',
    title: 'আন্তর্জাতিক মানসম্মত হিফজুল কুরআন',
    desc: 'তাজবীদ ও তারতীলের সাথে বিশুদ্ধ উচ্চারণ, হুসনে সওত এবং স্বল্প সময়ে ৩০ পারা কুরআন হিফজের সুবিন্যস্ত পরিকল্পনা।',
    icon: 'BookOpen'
  },
  {
    id: 'feat-2',
    title: 'পূর্ণাঙ্গ কিতাব ও দাওরায়ে হাদীস',
    desc: 'মিযান থেকে তাকমীল (মাস্টার্স) পর্যন্ত বেফাক ও হাইয়াতুল উলয়া বোর্ডের অধীনে সর্বোচ্চ মানে পাঠদান।',
    icon: 'GraduationCap'
  },
  {
    id: 'feat-3',
    title: 'আকাবিরে দেওবন্দের রূহানিয়াত ও তরবিয়ত',
    desc: 'নিয়মিত তাহাজ্জুদ, জিকির-আযকার, সুন্নতি আমল এবং নিষ্কলুষ আখলাক গঠনে উস্তাদবৃন্দের সার্বক্ষণিক সাহচর্য।',
    icon: 'HeartHandshake'
  },
  {
    id: 'feat-4',
    title: 'উচ্চশিক্ষিত ও অভিজ্ঞ শিক্ষক পরিষদ',
    desc: 'দারুল উলুম দেওবন্দ ও দেশের খ্যাতনামা জামিয়া সমূহের ফারেগ ও মুত্তাকী মুহাক্কিক উস্তাদমণ্ডলী।',
    icon: 'Award'
  },
  {
    id: 'feat-5',
    title: '২৪ ঘণ্টা সিসিটিভি ও নিশ্ছিদ্র নিরাপত্তা',
    desc: 'শিক্ষার্থীদের সার্বক্ষণিক সুরক্ষা নিশ্চিতে সিসিটিভি মনিটরিং ও কঠোর শৃঙ্খলা ব্যবস্থা।',
    icon: 'ShieldCheck'
  },
  {
    id: 'feat-6',
    title: 'স্বাস্থ্যকর আবাসিক পরিবেশ ও পুষ্টিকর খাবার',
    desc: 'আলো-বাতাসপূর্ণ পরিচ্ছন্ন হোস্টেল, নিয়মিত স্বাস্থ্য পরীক্ষা ও পুষ্টিকর সুষম খাদ্যের নিশ্চয়তা।',
    icon: 'Building2'
  },
  {
    id: 'feat-7',
    title: 'আরবি ও উর্দু ভাষায় কথোপকথন চর্চা',
    desc: 'প্রতিদিনের ক্লাসে ও আবাসিক ছাত্রদের মাঝে আধুনিক আরবি ও ইলমি উর্দু ভাষা অনুশীলনের বিশেষ সুযোগ।',
    icon: 'Sparkles'
  },
  {
    id: 'feat-8',
    title: 'মেধাবী ও অসচ্ছল শিক্ষার্থীদের জন্য বিশেষ বৃত্তি',
    desc: 'অসচ্ছল ও প্রতিভাবান শিক্ষার্থীদের জন্য ফ্রি বাসস্থান ও বিশেষ শিক্ষা বৃত্তির সুব্যবস্থা।',
    icon: 'Heart'
  }
];

export const DEFAULT_JAMAATS: JamaatItem[] = [
  { 
    id: 'jam-1', 
    name: 'তাকমীল (দাওরায়ে হাদীস)', 
    department: 'কিতাব বিভাগ', 
    code: 'TAK', 
    capacity: 40, 
    admissionFee: 7500,
    monthlyFee: 3500, 
    foodFee: 3000,
    description: 'সিহাহ সিত্তাহ সহ হাদিসের সর্বোচ্চ জামাত (মাস্টার্স সমমান)',
    isActive: true,
    books: [
      { id: 'b-1', name: 'সহীহুল বুখারী (১ম ও ২য় খণ্ড)', fullMark: 100, passMark: 40 },
      { id: 'b-2', name: 'সহীহ মুসলিম (১ম ও ২য় খণ্ড)', fullMark: 100, passMark: 40 },
      { id: 'b-3', name: 'জামে তিরমিযী (১ম ও ২য় খণ্ড)', fullMark: 100, passMark: 40 },
      { id: 'b-4', name: 'সুনানে আবু দাউদ', fullMark: 100, passMark: 40 },
      { id: 'b-5', name: 'সুনানে নাসায়ী ও ইবনে মাজাহ', fullMark: 100, passMark: 40 },
      { id: 'b-6', name: 'শরহু মাআনিল আসার (তাহাবী)', fullMark: 100, passMark: 40 },
      { id: 'b-7', name: 'মুয়াত্তা ইমাম মালেক ও মুহাম্মদ', fullMark: 100, passMark: 40 }
    ]
  },
  { 
    id: 'jam-2', 
    name: 'ফজিলত (মেশকাত জামাত)', 
    department: 'কিতাব বিভাগ', 
    code: 'MES', 
    capacity: 40, 
    admissionFee: 7000,
    monthlyFee: 3200, 
    foodFee: 3000,
    description: 'মেশকাত শরীফ ও উসুলে হাদিস',
    isActive: true,
    books: [
      { id: 'b-8', name: 'মেশকাতুল মাসাবীহ (১ম খণ্ড)', fullMark: 100, passMark: 40 },
      { id: 'b-9', name: 'মেশকাতুল মাসাবীহ (২য় খণ্ড)', fullMark: 100, passMark: 40 },
      { id: 'b-10', name: 'আল-হেদায়া (৩য় খণ্ড)', fullMark: 100, passMark: 40 },
      { id: 'b-11', name: 'আল-হেদায়া (৪র্থ খণ্ড)', fullMark: 100, passMark: 40 },
      { id: 'b-12', name: 'নুখবাতুল ফিকার (উসূলে হাদীস)', fullMark: 100, passMark: 40 }
    ]
  },
  { 
    id: 'jam-3', 
    name: 'সানাবিয়া উলইয়া (জালালাইন)', 
    department: 'কিতাব বিভাগ', 
    code: 'JAL', 
    capacity: 45, 
    admissionFee: 6500,
    monthlyFee: 3000, 
    foodFee: 2800,
    description: 'তাফসিরে জালালাইন ও ফিকহ শাস্ত্র',
    isActive: true,
    books: [
      { id: 'b-13', name: 'তাফসিরে জালালাইন (১ম খণ্ড)', fullMark: 100, passMark: 40 },
      { id: 'b-14', name: 'তাফসিরে জালালাইন (২য় খণ্ড)', fullMark: 100, passMark: 40 },
      { id: 'b-15', name: 'শরহে বেকায়া (১ম ও ২য় খণ্ড)', fullMark: 100, passMark: 40 },
      { id: 'b-16', name: 'আল-মাকামাতুল হারীরিয়্যাহ', fullMark: 100, passMark: 40 },
      { id: 'b-17', name: 'উসূলুশ শাশী ও আল-আকীদাতুত তহাবিয়্যাহ', fullMark: 100, passMark: 40 }
    ]
  },
  { 
    id: 'jam-4', 
    name: 'সানাবিয়া (কাফিয়া ও শরহে জামী)', 
    department: 'কিতাব বিভাগ', 
    code: 'KAF', 
    capacity: 45, 
    admissionFee: 6000,
    monthlyFee: 2800, 
    foodFee: 2800,
    description: 'উচ্চতর আরবি ব্যাকরণ ও সাহিত্য',
    isActive: true,
    books: [
      { id: 'b-18', name: 'আল-কাফিয়াহ (নাহু)', fullMark: 100, passMark: 33 },
      { id: 'b-19', name: 'শরহে তাহযীব (মানতিক)', fullMark: 100, passMark: 33 },
      { id: 'b-20', name: 'মুখতাসারুল কুদূরী (ফিকহ)', fullMark: 100, passMark: 33 },
      { id: 'b-21', name: 'উসূলে বাযদাবী', fullMark: 100, passMark: 33 }
    ]
  },
  { 
    id: 'jam-5', 
    name: 'মুতাওয়াসসিতা (নাহবেমীর)', 
    department: 'কিতাব বিভাগ', 
    code: 'NAH', 
    capacity: 50, 
    admissionFee: 5500,
    monthlyFee: 2600, 
    foodFee: 2600,
    description: 'নাহু শাস্ত্র ও আরবি ভাষা',
    isActive: true,
    books: [
      { id: 'b-22', name: 'নাহবেমীর ও শরহে মিয়াত আমিল', fullMark: 100, passMark: 33 },
      { id: 'b-23', name: 'হেদায়াতুন্নাহু', fullMark: 100, passMark: 33 },
      { id: 'b-24', name: 'ইলমুস সিগাহ (সরফ)', fullMark: 100, passMark: 33 },
      { id: 'b-25', name: 'নূরুল ঈযাহ (ফিকহ)', fullMark: 100, passMark: 33 },
      { id: 'b-26', name: 'তাইসীরুল মানতিক', fullMark: 100, passMark: 33 }
    ]
  },
  { 
    id: 'jam-6', 
    name: 'ইবতিদায়িয়া (মীযান ও মুনশাইব)', 
    department: 'কিতাব বিভাগ', 
    code: 'MIZ', 
    capacity: 50, 
    admissionFee: 5500,
    monthlyFee: 2600, 
    foodFee: 2600,
    description: 'সারফ শাস্ত্র ও বুনিয়াদি কিতাবাত',
    isActive: true,
    books: [
      { id: 'b-27', name: 'মীযানুস সরফ ও মুনশাইব', fullMark: 100, passMark: 33 },
      { id: 'b-28', name: 'ফারসি পাঞ্জেগাঞ্জ', fullMark: 100, passMark: 33 },
      { id: 'b-29', name: 'তাযকিরাতুল আওলিয়া', fullMark: 100, passMark: 33 },
      { id: 'b-30', name: 'বাংলা সাহিত্য ও গণিত', fullMark: 100, passMark: 33 }
    ]
  },
  { 
    id: 'jam-7', 
    name: 'প্রাথমিক কিতাব (তাইসীর)', 
    department: 'কিতাব বিভাগ', 
    code: 'TAY', 
    capacity: 50, 
    admissionFee: 5000,
    monthlyFee: 2500, 
    foodFee: 2500,
    description: 'ফারসি ও আরবি বুনিয়াদি শিক্ষা',
    isActive: true,
    books: [
      { id: 'b-31', name: 'তাইসীরুল মুবতাদী (ফারসি)', fullMark: 100, passMark: 33 },
      { id: 'b-32', name: 'কারিমাহ ও নামেকাহ', fullMark: 100, passMark: 33 },
      { id: 'b-33', name: 'সহজ কায়দায়ে কুরআন', fullMark: 100, passMark: 33 },
      { id: 'b-34', name: 'প্রাথমিক গণিত ও ইংরেজি', fullMark: 100, passMark: 33 }
    ]
  },
  { 
    id: 'jam-8', 
    name: 'হিফজুল কুরআন (আন্তর্জাতিক বিভাগ)', 
    department: 'হিফজুল কুরআন', 
    code: 'HIF', 
    capacity: 60, 
    admissionFee: 6000,
    monthlyFee: 3500, 
    foodFee: 3000,
    description: 'শীতাতপ নিয়ন্ত্রিত পূর্ণ ৩০ পারা হিফজ ও হুসনে সওত',
    isActive: true,
    books: [
      { id: 'b-35', name: 'হিফজুল কুরআনুল কারীম (৩০ পারা)', fullMark: 100, passMark: 40 },
      { id: 'b-36', name: 'হুসনে সওত ও ক্বেরাত তাজবীদ', fullMark: 100, passMark: 40 },
      { id: 'b-37', name: 'মাসনুন দুআ ও জরুরি মাসায়েল', fullMark: 100, passMark: 40 }
    ]
  },
  { 
    id: 'jam-9', 
    name: 'হিফজ সমাপনী ও রিভিশন (দাওর)', 
    department: 'হিফজুল কুরআন', 
    code: 'DWR', 
    capacity: 35, 
    admissionFee: 6000,
    monthlyFee: 3500, 
    foodFee: 3000,
    description: 'পাগড়ী প্রত্যাশী ও সনদ প্রস্তুতি ব্যাচ',
    isActive: true,
    books: [
      { id: 'b-38', name: 'পূর্ণ কুরআন ইয়াদ (দাওর)', fullMark: 100, passMark: 50 },
      { id: 'b-39', name: 'তাজবীদে হাফস ও কিরাত', fullMark: 100, passMark: 40 }
    ]
  },
  { 
    id: 'jam-10', 
    name: 'নাযেরা কুরআন ও হুসনে সওত', 
    department: 'নাযেরা বিভাগ', 
    code: 'NAZ', 
    capacity: 50, 
    admissionFee: 5000,
    monthlyFee: 2500, 
    foodFee: 2500,
    description: 'সহীহ মাখরাজ ও দ্রুত কুরআন দেখে পড়ার প্রশিক্ষণ',
    isActive: true,
    books: [
      { id: 'b-40', name: 'সহীহ নাযেরা তিলাওয়াত', fullMark: 100, passMark: 33 },
      { id: 'b-41', name: 'মাখরাজ ও সিফাত তাজবীদ', fullMark: 100, passMark: 33 },
      { id: 'b-42', name: 'জরুরি নামায ও দুআ শিক্ষা', fullMark: 100, passMark: 33 }
    ]
  },
  { 
    id: 'jam-11', 
    name: 'নূরানী ও নাদিয়াতুল কুরআন', 
    department: 'নূরানী ও মক্তব', 
    code: 'NUR', 
    capacity: 60, 
    admissionFee: 4500,
    monthlyFee: 2200, 
    foodFee: 2200,
    description: 'ছোট শিশুদের বর্ণমালা, কায়দা ও কালিমা শিক্ষা',
    isActive: true,
    books: [
      { id: 'b-43', name: 'নূরানী কায়দা ও আমপারা', fullMark: 100, passMark: 33 },
      { id: 'b-44', name: 'কালিমা ও মাসনুন দুআ', fullMark: 100, passMark: 33 },
      { id: 'b-45', name: 'বাংলা ও ইংরেজি বর্ণমালা', fullMark: 100, passMark: 33 }
    ]
  },
  { 
    id: 'jam-12', 
    name: 'শিশু শ্রেণি ও প্লে-নার্সারি', 
    department: 'নূরানী ও মক্তব', 
    code: 'PLY', 
    capacity: 40, 
    admissionFee: 4500,
    monthlyFee: 2200, 
    foodFee: 2200,
    description: '৪-৬ বছর বয়সী শিশুদের আদব ও ধর্মীয় পাঠ',
    isActive: true,
    books: [
      { id: 'b-46', name: 'আরবি হরফ ও উচ্চারণ', fullMark: 100, passMark: 33 },
      { id: 'b-47', name: 'ইসলামিক আদব ও সুন্নাত', fullMark: 100, passMark: 33 },
      { id: 'b-48', name: 'সুন্দর হাতের লেখা ও অংক', fullMark: 100, passMark: 33 }
    ]
  }
];

export const DEFAULT_GOALS: string[] = [
  'ইলমে ওহীর ধারক-বাহক এমন একদল মুখলিস আলেম ও হাফেজ তৈরি করা, যারা দেশ ও জাতির সঠিক দিকনির্দেশনা দিতে সক্ষম হবেন।',
  'কুরআন ও সুন্নাহর বিশুদ্ধ জ্ঞান চর্চা এবং আকাবিরে আসলাফের রূহানিয়াতের পথ অনুসরণ।',
  'আন্তর্জাতিক মানের হিফজুল কুরআন ও গভীর গবেষণামূলক দাওরায়ে হাদীস শিক্ষাদান।',
  'ছাত্রদের নিষ্কলুষ চরিত্র, আদব-আখলাক ও আদর্শ নাগরিক হিসেবে গড়ে তোলা।'
];

export const DEFAULT_PRINCIPLES: string[] = [
  'আহলুস সুন্নাত ওয়াল জামাআতের বিশুদ্ধ আকিদা পোষণ ও প্রচার।',
  'দারুল উলুম দেওবন্দের মহান আকাবীরগণের পথ, ত্যাগ ও বুজুর্গি অনুসরণ।',
  'রাজনীতিমুক্ত সম্পূর্ণ ইলমি, আমলি ও রূহানি শিক্ষাঙ্গন বজায় রাখা।',
  'সুন্নতে নববীর পূর্ণ অনুকরণ এবং নিয়মিত তাহাজ্জুদ ও জিকির-আযকারের সার্বক্ষণিক আমল।'
];

export const DEFAULT_RULES: string[] = [
  'মাদরাসার সকল ছাত্রকে জামাতের সাথে ৫ ওয়াক্ত নামাজ তাকবীরে উলার সাথে আদায় করতে হবে।',
  'প্রতিটি ছাত্রকে নির্ধারিত সময়ে ক্লাসে উপস্থিত থাকতে হবে; বিনা অনুমতিতে অনুপস্থিতি কঠোরভাবে নিষিদ্ধ।',
  'সুন্নতি লেবাস, টুপি ও মার্জিত চুল-দাড়ি রাখা বাধ্যতামূলক।',
  'স্মার্টফোন বা কোনো প্রকার ইলেকট্রনিক ডিভাইস মাদরাসায় রাখা সম্পূর্ণ নিষিদ্ধ।',
  'পরস্পরের সাথে সম্মান ও ভ্রাতৃত্বপূর্ণ আচরণ করতে হবে; কোনো প্রকার অসদাচরণ বরদাশত করা হবে না।',
  'ছুটি গ্রহণের ক্ষেত্রে অভিভাবকের সরাসরি উপস্থিতি বা লিখিত আবেদন অপরিহার্য।'
];

export const DEFAULT_ADMISSION_FORM_FIELDS: AdmissionFormField[] = [
  { id: 'studentNameBn', label: 'শিক্ষার্থীর নাম (বাংলায়)', type: 'text', required: true, enabled: true, isSystem: true, placeholder: 'যেমন: মুহাম্মদ আব্দুল্লাহ' },
  { id: 'studentNameEn', label: 'শিক্ষার্থীর নাম (ইংরেজিতে)', type: 'text', required: false, enabled: true, isSystem: true, placeholder: 'e.g. Muhammad Abdullah' },
  { id: 'fatherName', label: 'পিতার নাম', type: 'text', required: true, enabled: true, isSystem: true, placeholder: 'পিতার নাম লিখুন' },
  { id: 'motherName', label: 'মাতার নাম', type: 'text', required: false, enabled: true, isSystem: true, placeholder: 'মাতার নাম লিখুন' },
  { id: 'guardianPhone', label: 'অভিভাবকের সচল মোবাইল নম্বর', type: 'tel', required: true, enabled: true, isSystem: true, placeholder: '০১৭১২-XXXXXX' },
  { id: 'whatsappNumber', label: 'হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)', type: 'tel', required: false, enabled: true, isSystem: true, placeholder: '০১৭১২-XXXXXX' },
  { id: 'birthDate', label: 'জন্ম তারিখ', type: 'date', required: false, enabled: true, isSystem: true },
  { id: 'campus', label: 'কাঙ্ক্ষিত ক্যাম্পাস', type: 'select', required: true, enabled: true, isSystem: true, options: ['স্থায়ী ক্যাম্পাস (ডেমরা)', 'অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)'] },
  { id: 'jamaat', label: 'কাঙ্ক্ষিত জামাত / শ্রেণি', type: 'select', required: true, enabled: true, isSystem: true },
  { id: 'studentType', label: 'শিক্ষার্থীর ধরন', type: 'select', required: true, enabled: true, isSystem: true, options: ['নতুন ছাত্র', 'পুরাতন ছাত্র'] },
  { id: 'residenceType', label: 'আবাসিক ধরন', type: 'select', required: true, enabled: true, isSystem: true, options: ['আবাসিক', 'অনাবাসিক', 'ডে-কেয়ার'] },
  { id: 'address', label: 'পূর্ণাঙ্গ ঠিকানা (স্থায়ী ও বর্তমান)', type: 'textarea', required: true, enabled: true, isSystem: true, placeholder: 'গ্রাম/মহল্লা, থানা, জেলা...' },
  { id: 'previousInstitute', label: 'পূর্ববর্তী মাদরাসা বা স্কুলের নাম', type: 'text', required: false, enabled: true, isSystem: false, placeholder: 'পূর্ববর্তী প্রতিষ্ঠানের নাম' },
  { id: 'notes', label: 'বিশেষ কোনো তথ্য বা বক্তব্য (যদি থাকে)', type: 'textarea', required: false, enabled: true, isSystem: false, placeholder: 'অতিরিক্ত তথ্য লিখুন...' }
];

export const DEFAULT_SETTINGS: SiteSettings = {
  madrasaNameBn: 'মাদরাসা মারকাযুল ইহসান ঢাকা',
  madrasaNameEn: 'Madrasa Markazul Ihsan Dhaka',
  madrasaArabicMotto: 'مَدْرَسَةُ مَرْكَزِ الْإِحْسَانِ دَكَّا — لِلتَّعْلِيمِ وَالتَّرْبِيَةِ',
  tagline: 'মহান আকাবেরে আসলাফের আদর্শে মুহাক্কিক আলেমে দ্বীন ও আদর্শ হাফেজে কুরআন গড়ার নির্ভরযোগ্য প্রতিষ্ঠান',
  establishedDate: '২০১৮ ইং',
  founderName: 'হযরত মাওলানা শাহ তৈয়্যেব আশরাফ দামাত বারাকাতুহুম',
  founderDesignation: 'প্রতিষ্ঠাতা ও মোতাওয়াল্লী, মারকাযুল ইহসান ঢাকা',
  founderImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  patronName: 'মুহাক্কিক উলামায়ে কেরাম ও আকাবিরে দেওবন্দ',
  patronDesignation: 'পৃষ্ঠপোষক ও উপদেষ্টা পরিষদ',
  patronImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  principalMessage: 'বিসমিল্লাহির রাহমানির রাহীম। সমস্ত প্রশংসা মহান রাব্বুল আলামীনের জন্য। মাদরাসা মারকাযুল ইহসান কেবল একটি গতানুগতিক দ্বীনি প্রতিষ্ঠান নয়; এটি কুরআন ও সুন্নাহর বিশুদ্ধ চর্চা এবং আকাবিরে আসলাফের রূহানিয়াতের এক অনন্য মিলনমেলা। আমাদের মূল লক্ষ্য হলো কুরআনুল কারীমের আন্তর্জাতিক মানের হাফেজ এবং সিহাহ সিত্তাহ ও ফিকহের গভীর জ্ঞানে পারদর্শী মুহাক্কিক আলেমে দ্বীন তৈরি করা, যারা আগামী দিনে উম্মাহর পথপ্রদর্শক হবেন। সুশৃঙ্খল পরিবেশ ও নিবিড় পরিচর্যায় আপনাদের সন্তানদের স্বাগতম।',
  aboutSummary: 'মাদরাসা মারকাযুল ইহসান ঢাকা বাংলাদেশের অন্যতম শীর্ষস্থানীয় ঐতিহ্যবাহী কওমি মাদরাসা। এটি বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ (BEFAQ) এবং আল-হাইয়াতুল উলয়া লিল জামিআতিল কওমিয়া বাংলাদেশ এর পূর্ণাঙ্গ পাঠ্যক্রম অনুসরণ করে পরিচালিত। শিশু শ্রেণি, নূরানী ও আন্তর্জাতিক মানের হিফজুল কুরআন থেকে শুরু করে দাওরায়ে হাদিস (তাকমীল/মাস্টার্স সমমান) এবং ইফতা পর্যন্ত নিরবচ্ছিন্ন পাঠদান পরিচালিত হয়।',
  admissionYear: '২০২৬-২০২৭ শিক্ষাবর্ষ',
  isAdmissionOpen: true,
  admissionNoticeText: '২০২৬-২৭ শিক্ষাবর্ষে শিশু শ্রেণি থেকে তাকমীল (দাওরায়ে হাদীস) এবং আন্তর্জাতিক মানের হিফজ বিভাগে নতুন ছাত্র ভর্তি চলছে!',
  phonePrimary: '০১৭৮৯-৩২২১৯৯',
  phoneSecondary: '০১৮১৮-১২৩৪৫৬',
  whatsappNumber: '+8801789322199',
  emailAddress: 'info@markazulihsan.com',
  email: 'info@markazulihsan.com',
  addressTemporary: '৬ শহীদ ফারুক রোড, পশ্চিম যাত্রাবাড়ী, ঢাকা-১২০৪ (প্রধান ও অস্থায়ী ক্যাম্পাস)',
  addressPermanent: 'পাইতি, ডেমরা, ঢাকা-১৩৬০ (ঢাকা-যাত্রাবাড়ী ডেমরা মহাসড়ক সংলগ্ন স্থায়ী ক্যাম্পাস)',
  urgentTickerText: '🚨 ভর্তি চলছে: ২০২৬-২৭ শিক্ষাবর্ষে শিশু শ্রেণি থেকে তাকমীল (দাওরায়ে হাদিস) ও আন্তর্জাতিক হিফজ বিভাগে সীমিত আসনে নতুন ছাত্র ভর্তি চলছে!',
  urgentNoticeText: '🚨 ভর্তি চলছে: ২০২৬-২৭ শিক্ষাবর্ষে শিশু শ্রেণি থেকে তাকমীল (দাওরায়ে হাদিস) ও আন্তর্জাতিক হিফজ বিভাগে সীমিত আসনে নতুন ছাত্র ভর্তি চলছে!',
  showUrgentNotice: true,
  bkashNumber: '01789322199 (মারকাযুল ইহসান অফিসিয়াল)',
  nagadNumber: '01789322199 (মারকাযুল ইহসান অফিসিয়াল)',
  rocketNumber: '01789322199-5 (মারকাযুল ইহসান)',
  bankAccountDetails: 'হিসাবের নাম: Madrasa Markazul Ihsan Dhaka | ব্যাংক: আল-আরাফাহ ইসলামী ব্যাংক লি., যাত্রাবাড়ী শাখা, ঢাকা | হিসাব নং: 0123456789012 | রাউটিং নং: 015273185',
  googleSheetWebAppUrl: 'https://script.google.com/macros/s/AKfycbyde6RbBWzj3nFFxDLI0PAIYYrT3PAN4KaG9Ty9CSdVbSiDNYBycRIbqcotzgQDSjvIXw/exec',
  googleAppsScriptUrl: 'https://script.google.com/macros/s/AKfycbyde6RbBWzj3nFFxDLI0PAIYYrT3PAN4KaG9Ty9CSdVbSiDNYBycRIbqcotzgQDSjvIXw/exec',
  googleSheetsUrl: 'https://docs.google.com/spreadsheets/d/1bci7R_vI8BIRz9Dv4u3ct2sEhxUPDndD2b-OonPcrHE/edit?usp=drivesdk',
  adminPasswordHash: 'ihsan2026',
  adminPassword: 'ihsan2026',
  facebookPageUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  twitterUrl: 'https://twitter.com',
  telegramUrl: 'https://t.me',
  googleMapsUrl: 'https://maps.google.com/?q=Jatrabari+Dhaka',
  temporaryCampusMapsUrl: 'https://maps.google.com/?q=6+Shaheed+Faruk+Road+Jatrabari+Dhaka',
  permanentCampusMapsUrl: 'https://maps.google.com/?q=Paiti+Demra+Dhaka',
  features: DEFAULT_FEATURES,
  goals: DEFAULT_GOALS,
  principles: DEFAULT_PRINCIPLES,
  rules: DEFAULT_RULES,
  admissionFormFields: DEFAULT_ADMISSION_FORM_FIELDS,
  themeColor: 'emerald',
  logoUrl: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=200&q=80',
  heroImageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  campusTemporaryImageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
  campusPermanentImageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  lastSyncedAt: new Date().toISOString()
};

export const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: 'not-01',
    title: '২০২৬-২০২৭ শিক্ষাবর্ষে সকল বিভাগে নতুন ও পুরাতন ছাত্র ভর্তি বিজ্ঞপ্তি',
    date: '২০২৬-০৩-১০',
    category: 'ভর্তি',
    isUrgent: true,
    content: 'মারকাযুল ইহসানের উভয় ক্যাম্পাসে ২০২৬-২৭ শিক্ষাবর্ষের ভর্তি কার্যক্রম আনুষ্ঠানিকভাবে শুরু হয়েছে। শিশু শ্রেণি, নূরানী, নাযেরা, আন্তর্জাতিক মানের হিফজুল কুরআন এবং কিতাব বিভাগ (তাকমীল/দাওরায়ে হাদীস পর্যন্ত) সীমিত আসনে ভর্তি নেওয়া হচ্ছে। যোগ্য ছাত্রদের মেধা অনুযায়ী বিশেষ বৃত্তির ব্যবস্থা রয়েছে।',
    pdfUrl: '#',
    publishedBy: 'শিক্ষা বিভাগ, মারকাযুল ইহসান'
  },
  {
    id: 'not-02',
    title: 'আসন্ন প্রথম সাময়িক পরীক্ষার সময়সূচী ও ফি পরিশোধের শেষ সময়',
    date: '২০২৬-০৩-০৫',
    category: 'পরীক্ষা',
    isUrgent: true,
    content: 'সকল জামাতের সম্মানিত অভিভাবক ও ছাত্রদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী ২০ মার্চ থেকে প্রথম সাময়িক পরীক্ষা অনুষ্ঠিত হবে। পরীক্ষার পূর্বে সকল বকেয়া মাসিক ফি পরিশোধ করে প্রবেশপত্র সংগ্রহ করার নির্দেশ দেওয়া হলো।',
    pdfUrl: '#',
    publishedBy: 'পরীক্ষা নিয়ন্ত্রণ পরিষদ'
  },
  {
    id: 'not-03',
    title: 'পবিত্র রমজানুল মোবারক উপলক্ষে হিফজ ও দাওরা বিভাগের বিশেষ ক্লাসের রুটিন',
    date: '২০২৬-০২-২৮',
    category: 'অন্যান্য',
    isUrgent: false,
    content: 'মাহে রমজানে খতমে তারাবীর প্রস্তুতি ও হিফজের বিশেষ রিভিশন ক্লাস পরিচালনার রুটিন প্রস্তুত করা হয়েছে। জামাতভিত্তিক রুটিন নোটিশ বোর্ডে টাঙানো হয়েছে।',
    pdfUrl: '#',
    publishedBy: 'মুহতামিম দফতর'
  },
  {
    id: 'not-04',
    title: 'বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ পরীক্ষার ফলাফল প্রকাশ ও কৃতি সংবর্ধনা',
    date: '২০২৬-০২-২০',
    category: 'ফলাফল',
    isUrgent: false,
    content: 'আলহামদুলিল্লাহ! বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ কেন্দ্রীয় পরীক্ষায় মারকাযুল ইহসানের ছাত্ররা শতভাগ পাসের গৌরব অর্জন করেছে এবং ৫ জন ছাত্র মেধা তালিকায় স্থান পেয়েছে।',
    pdfUrl: '#',
    publishedBy: 'অধ্যক্ষ মহোদয়'
  },
  {
    id: 'not-05',
    title: 'স্থায়ী ক্যাম্পাস (পাইটি, ডেমরা) বহুতল ভবন নির্মাণ সংক্রান্ত জরুরি সভা ও দোয়া মাহফিল',
    date: '২০২৬-০২-১৫',
    category: 'জরুরি',
    isUrgent: true,
    content: 'মারকাযুল ইহসানের স্থায়ী ক্যাম্পাসে ৬ তলা বিশিষ্ট আধুনিক একাডেমিক ভবন ও মসজিদ কমপ্লেক্সের ভিত্তিপ্রস্তর উদ্বোধন উপলক্ষে বিশেষ দোয়া মাহফিলের আয়োজন করা হয়েছে। সকল শুভাকাঙ্ক্ষী ও দানশীল ভাইদের আমন্ত্রণ জানানো হচ্ছে।',
    pdfUrl: '#',
    publishedBy: 'মাদরাসা পরিচালনা কমিটি'
  }
];

export const DEFAULT_RESULTS: StudentResult[] = [
  {
    id: 'res-101',
    studentName: 'মুহাম্মদ আব্দুল্লাহ বিন সালমান',
    rollNumber: '101',
    registrationNumber: 'MI-2026-101',
    academicYear: '২০২৬',
    department: 'কিতাব বিভাগ',
    jamaat: 'তাকমীল (দাওরায়ে হাদীস)',
    campus: 'স্থায়ী ক্যাম্পাস (ডেমরা)',
    totalMarks: 600,
    obtainedTotal: 576,
    gpa: '5.00',
    division: 'মুমতাজ (স্টার)',
    publishedDate: '২০২৬-০২-২৫',
    remarks: 'মেধা তালিকায় ১ম স্থান অর্জন করেছে। মাশাআল্লাহ।',
    subjects: [
      { subjectName: 'সহীহ বুখারী ১ম খণ্ড', fullMark: 100, obtainedMark: 98, grade: 'A+' },
      { subjectName: 'সহীহ বুখারী ২য় খণ্ড', fullMark: 100, obtainedMark: 96, grade: 'A+' },
      { subjectName: 'সহীহ মুসলিম শরীফ', fullMark: 100, obtainedMark: 97, grade: 'A+' },
      { subjectName: 'জামে আত-তিরমিযী', fullMark: 100, obtainedMark: 95, grade: 'A+' },
      { subjectName: 'সুনানে আবু দাউদ', fullMark: 100, obtainedMark: 94, grade: 'A+' },
      { subjectName: 'শরহু মাআনিল আসার (তাহাবী)', fullMark: 100, obtainedMark: 96, grade: 'A+' },
    ]
  },
  {
    id: 'res-102',
    studentName: 'মুহাম্মদ আব্দুর রহমান জুবায়ের',
    rollNumber: '102',
    registrationNumber: 'MI-2026-102',
    academicYear: '২০২৬',
    department: 'হিফজুল কুরআন',
    jamaat: 'হিফজ (পূর্ণ ৩০ পারা শোনানো)',
    campus: 'অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)',
    totalMarks: 300,
    obtainedTotal: 292,
    gpa: '5.00',
    division: 'মুমতাজ (স্টার)',
    publishedDate: '২০২৬-০২-২৫',
    remarks: 'তাজবীদ ও মাখরাজ সহকারে চমৎকার তিলাওয়াত।',
    subjects: [
      { subjectName: 'তিলাওয়াত ও হিফজ সবক', fullMark: 100, obtainedMark: 98, grade: 'A+' },
      { subjectName: 'তাজবীদ ও কিরাত নিয়ম', fullMark: 100, obtainedMark: 96, grade: 'A+' },
      { subjectName: 'মাসনূন দোআ ও দ্বীনিয়্যাত', fullMark: 100, obtainedMark: 98, grade: 'A+' },
    ]
  },
  {
    id: 'res-103',
    studentName: 'মুহাম্মদ তাওহীদ হোসেন',
    rollNumber: '103',
    registrationNumber: 'MI-2026-103',
    academicYear: '২০২৬',
    department: 'কিতাব বিভাগ',
    jamaat: 'কাফিয়া',
    campus: 'স্থায়ী ক্যাম্পাস (ডেমরা)',
    totalMarks: 500,
    obtainedTotal: 465,
    gpa: '4.85',
    division: 'জায়্যিদ জিদ্দান (১ম)',
    publishedDate: '২০২৬-০২-২৫',
    remarks: 'নাহু ও সারফে অত্যন্ত দক্ষ।',
    subjects: [
      { subjectName: 'আল-কাফিয়া ফীন নাহব', fullMark: 100, obtainedMark: 95, grade: 'A+' },
      { subjectName: 'উসূলুশ শাশী', fullMark: 100, obtainedMark: 92, grade: 'A+' },
      { subjectName: 'কুদূরী (মুআমালাত)', fullMark: 100, obtainedMark: 94, grade: 'A+' },
      { subjectName: 'মাকামাতে হারিরী', fullMark: 100, obtainedMark: 90, grade: 'A+' },
      { subjectName: 'বাংলা ও সাধারণ গণিত', fullMark: 100, obtainedMark: 94, grade: 'A+' },
    ]
  },
  {
    id: 'res-104',
    studentName: 'মুহাম্মদ মাহিন ইকবাল',
    rollNumber: '104',
    registrationNumber: 'MI-2026-104',
    academicYear: '২০২৬',
    department: 'কিতাব বিভাগ',
    jamaat: 'মীযান',
    campus: 'অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)',
    totalMarks: 400,
    obtainedTotal: 362,
    gpa: '4.50',
    division: 'জায়্যিদ জিদ্দান (১ম)',
    publishedDate: '২০২৬-০২-২৫',
    remarks: 'ভালো অগ্রগতি।',
    subjects: [
      { subjectName: 'মীযানুস সারফ ও মুনশাইব', fullMark: 100, obtainedMark: 92, grade: 'A+' },
      { subjectName: 'ফারসি পাঞ্জেগাঞ্জ', fullMark: 100, obtainedMark: 88, grade: 'A' },
      { subjectName: 'তাযকিরাতুল আওলিয়া', fullMark: 100, obtainedMark: 90, grade: 'A+' },
      { subjectName: 'গণিত ও ইংরেজি', fullMark: 100, obtainedMark: 92, grade: 'A+' },
    ]
  }
];

export const DEFAULT_APPLICATIONS: StudentApplication[] = [
  {
    id: 'app-501',
    studentNameBn: 'মুহাম্মদ সালমান ফারসী',
    studentNameEn: 'Muhammad Salman Farsi',
    fatherName: 'মাওলানা আতিকুর রহমান',
    motherName: 'মোসাম্মাৎ ফাতেমা খাতুন',
    guardianPhone: '01712345678',
    whatsappNumber: '01712345678',
    birthDate: '2016-04-12',
    academicYear: '২০২৬-২০২৭',
    campus: 'অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)',
    department: 'হিফজুল কুরআন',
    jamaat: 'হিফজ',
    studentType: 'নতুন ছাত্র',
    residenceType: 'আবাসিক',
    address: 'বাড়ি নং ১২, লেন ৪, কাজলা, যাত্রাবাড়ী, ঢাকা',
    previousInstitute: 'দারুল উলুম মক্তব মাদরাসা',
    status: 'অনুমোদিত',
    appliedDate: '২০২৬-০৩-০১',
    notes: 'মৌখিক পরীক্ষায় ৮৫ নম্বর পেয়েছে। তাজবীদ ভালো।'
  },
  {
    id: 'app-502',
    studentNameBn: 'মুহাম্মদ আবু বকর সিদ্দিক',
    studentNameEn: 'Abu Bakar Siddiq',
    fatherName: 'মুহাম্মদ নুরুল ইসলাম',
    motherName: 'মরিয়ম বেগম',
    guardianPhone: '01898765432',
    whatsappNumber: '01898765432',
    birthDate: '2014-08-19',
    academicYear: '২০২৬-২০২৭',
    campus: 'স্থায়ী ক্যাম্পাস (ডেমরা)',
    department: 'কিতাব বিভাগ',
    jamaat: 'নাহবেমীর',
    studentType: 'নতুন ছাত্র',
    residenceType: 'আবাসিক',
    address: 'সারুলিয়া, ডেমরা, ঢাকা',
    previousInstitute: 'জামেয়া রশিদিয়া',
    status: 'অপেক্ষমান',
    appliedDate: '২০২৬-০৩-০৪',
    notes: 'ভর্তি পরীক্ষার জন্য ডাকা হয়েছে।'
  }
];

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'blog-01',
    title: 'ইলমে দ্বীনের ফজিলত ও বর্তমান যুগে একজন হাক্কানি আলেমের আবশ্যকতা',
    slug: 'importance-of-islamic-knowledge-and-scholars',
    category: 'ইসলামিক শিক্ষা',
    author: 'মুফতী আব্দুল্লাহ আল-মামুন',
    authorDesignation: 'প্রতিষ্ঠাতা ও মুহতামিম, মারকাযুল ইহসান',
    date: '২০২৬-০৩-০১',
    readTime: '৫ মিনিট',
    imageUrl: 'https://images.unsplash.com/photo-1584281722573-f93ca0a520bf?auto=format&fit=crop&w=1000&q=80',
    summary: 'পবিত্র কুরআন ও সুন্নাহর আলোকে ইলম অর্জন করা প্রত্যেক মুসলমানের ওপর ফরজ। আজকের ফেতনাপূর্ণ সময়ে দ্বীনের সহীহ বুঝ ও আমলের প্রসারে হাক্কানি উলামাদের অবদান অপরিসীম।',
    content: `পবিত্র কুরআনে আল্লাহ সুবহানাহু ওয়া তাআলা ইরশাদ করেছেন: "বলুন, যারা জানে আর যারা জানে না তারা কি সমান হতে পারে?" (সূরা যুমার: ৯)।

রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম ইরশাদ করেছেন: "উলামায়ে কেরাম হলেন নবীগণের উত্তরসূরী।" 

মারকাযুল ইহসানের মূল দর্শন হলো শুধুমাত্র কিতাবী বিদ্যার মধ্যেই সীমাবদ্ধ না থেকে ছাত্রদের চরিত্র গঠন, তাকওয়া ও খোদাভীতির রঙে রঙিন করে গড়ে তোলা। একজন ছাত্র যেন সমাজে গিয়ে সত্যের আলো ছড়াতে পারে এবং আধুনিক বিভ্রান্তির মুখে সুন্নাহর ঝাণ্ডা সমুন্নত রাখতে পারে।`,
    tags: ['ইলম', 'তাকওয়া', 'সুন্নাহ', 'আদর্শ সমাজ']
  },
  {
    id: 'blog-02',
    title: 'হিফজুল কুরআনের বৈজ্ঞানিক ও সুন্নাহসম্মত পদ্ধতি: মারকাযুল ইহসানের বিশেষ কার্যক্রম',
    slug: 'scientific-hifz-methodology-at-markazul-ihsan',
    category: 'মাদরাসা কার্যক্রম',
    author: 'ক্বারী মাওলানা ইব্রাহীম খলিল',
    authorDesignation: 'প্রধান ক্বারী ও হিফজ বিভাগীয় প্রধান',
    date: '২০২৬-০২-২৪',
    readTime: '৪ মিনিট',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1000&q=80',
    summary: 'শিশুদের মানসিক চাপমুক্ত রেখে অল্প সময়ে মুখস্থ ও স্থায়ী ইয়াদ নিশ্চিত করার জন্য মারকাযুল ইহসানে অনুসৃত বৈজ্ঞানিক তিন-ধাপ হিফজ পদ্ধতি।',
    content: `হিফজুল কুরআন মহান রাব্বুল আলামিনের এক বিশেষ নিয়ামত। অনেক সময় অতিরিক্ত মানসিক চাপে শিশুরা ক্লান্ত হয়ে পড়ে। কিন্তু মারকাযুল ইহসানে আমরা ৩টি মূলনীতির উপর জোর দিই:
১. সবক (দৈনিক নতুন অংশ তিলাওয়াত ও মুখস্থ)
২. সবকী (চলতি পারার পেছনের অংশ দৈনিক পুনরাবৃত্তি)
৩. আমপারা / দাওর (পুরনো মুখস্থ করা পারার সুবিন্যস্ত রিভিশন)

এর পাশাপাশি শীতাতপ নিয়ন্ত্রিত শ্রেণিকক্ষ ও মনোরম পরিবেশ শিক্ষার্থীদের একাগ্রতা বহুগুণ বাড়িয়ে দেয়।`,
    tags: ['হিফজ', 'কুরআন', 'তাজবীদ']
  },
  {
    id: 'blog-03',
    title: 'সন্তান প্রতিপালনে দ্বীনি শিক্ষার ভূমিকা ও সম্মানিত অভিভাবকদের দায়িত্ব',
    slug: 'parenting-and-islamic-education',
    category: 'শিক্ষামূলক লেখা',
    author: 'মাওলানা আব্দুর রশিদ',
    authorDesignation: 'শিক্ষা সচিব, মারকাযুল ইহসান',
    date: '২০২৬-০২-১০',
    readTime: '৬ মিনিট',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',
    summary: 'পবিত্র সন্তান পিতা-মাতার জন্য সদকায়ে জারিয়া। তাদের সহীহ দ্বীনি তরবিয়তে বড় করে তোলার практиক গাইডলাইন।',
    content: `রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম বলেছেন, মানুষ যখন মারা যায় তখন তার সকল আমল বন্ধ হয়ে যায় তিনটি ছাড়া—সদকায়ে জারিয়া, উপকারী ইলম, এবং নেক সন্তান যে তার জন্য দোয়া করে।

আপনার সন্তানকে কুরআন শিখিয়ে হাফেজ বা আলেম বানালে কেয়ামতের ময়দানে মা-বাবাকে নূরের মুকুট পরানো হবে। আসুন আমাদের সন্তানদের অন্তরে আল্লাহর ভয় ও দ্বীনের ভালোবাসা বপন করি।`,
    tags: ['অভিভাবক', 'তরবিয়ত', 'সদকায়ে জারিয়া']
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'কুরআন তিলাওয়াত ও হিফজ সবক নিচ্ছেন প্রধান ক্বারী সাহেব',
    category: 'ছাত্রবৃন্দ',
    imageUrl: 'https://images.unsplash.com/photo-1584281722573-f93ca0a520bf?auto=format&fit=crop&w=900&q=80',
    caption: 'মনোযোগ দিয়ে হিফজের সবক প্রদানরত শিক্ষার্থীরা'
  },
  {
    id: 'gal-02',
    title: 'স্থায়ী ক্যাম্পাসের একাডেমিক ভবন ও মনোরম সবুজ প্রাঙ্গণ',
    category: 'ক্যাম্পাস',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    caption: 'পাইটি, ডেমরায় অবস্থিত স্থায়ী ক্যাম্পাস প্রাঙ্গণ'
  },
  {
    id: 'gal-03',
    title: 'শীতাতপ নিয়ন্ত্রিত আধুনিক শ্রেণিকক্ষে হাদিসের দরস',
    category: 'ক্লাসরুম',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
    caption: 'উন্নত অডিও-ভিজ্যুয়াল ও শীতাতপ সুবিধাযুক্ত ক্লাসরুম'
  },
  {
    id: 'gal-04',
    title: 'বার্ষিক দস্তারবন্দী ও পুরস্কার বিতরণী মাহফিল',
    category: 'ইভেন্ট ও মাহফিল',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=80',
    caption: 'হাফেজ ও উত্তীর্ণ কৃতি ছাত্রদের পাগড়ি প্রদান অনুষ্ঠান'
  },
  {
    id: 'gal-05',
    title: 'সম্মানিত সিনিয়র উস্তাদমণ্ডলীর পরামর্শ সভা',
    category: 'উস্তাদবৃন্দ',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80',
    caption: 'শিক্ষা মানোন্নয়নে নিয়মিত মজলিসে শুরা'
  },
  {
    id: 'gal-06',
    title: 'ছাত্রদের স্বাস্থ্যকর ও পুষ্টিকর খাবার পরিবেশন',
    category: 'কার্যক্রম',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80',
    caption: 'পরিচ্ছন্ন পরিবেশে নিয়মিত তিন বেলা স্বাস্থ্যসম্মত সুষম খাদ্য'
  }
];

export const DEFAULT_SLIDER_IMAGES: SliderImageItem[] = [
  {
    id: 'slide-1',
    title: 'মারকাযুল ইহসান - আধুনিক দ্বীনি শিক্ষাঙ্গন',
    caption: 'মাদরাসা মারকাযুল ইহসান ঢাকা — ইলম ও আমলের অনন্য মিলনমেলা',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=85',
    order: 1,
    isActive: true
  },
  {
    id: 'slide-2',
    title: 'আন্তর্জাতিক মানের হিফজুল কুরআন বিভাগ',
    caption: 'শীতাতপ নিয়ন্ত্রিত আধুনিক হিফজ ভবন ও তাজবীদ ভিত্তিক পাঠদান',
    imageUrl: 'https://images.unsplash.com/photo-1584281722573-f93ca0a520bf?auto=format&fit=crop&w=1600&q=85',
    order: 2,
    isActive: true
  },
  {
    id: 'slide-3',
    title: 'কিতাব বিভাগ ও তাকমীল (দাওরায়ে হাদীস)',
    caption: 'বেফাক ও হাইয়াতুল উলয়া বোর্ডের অধীনে উচ্চতর পাঠ্যক্রম',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=85',
    order: 3,
    isActive: true
  },
  {
    id: 'slide-4',
    title: 'বার্ষিক দস্তারবন্দী ও কৃতি সংবর্ধনা মাহফিল',
    caption: 'প্রতি বছরের ঐতিহ্যবাহী পাগড়ি প্রদান ও সমাবর্তন মহাসম্মেলন',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1600&q=85',
    order: 4,
    isActive: true
  },
  {
    id: 'slide-5',
    title: 'স্নেহময় আবাসিক ছাত্রাবাস ও নিশ্ছিদ্র নিরাপত্তা',
    caption: 'পরম যত্নে আবাসিক পরিচালনা ও স্বাস্থ্যসম্মত পুষ্টিকর খাবার',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=85',
    order: 5,
    isActive: true
  }
];

export const DEFAULT_TEACHERS: TeacherItem[] = [
  {
    id: 'tch-1',
    name: 'হযরত মাওলানা শাহ তৈয়্যেব আশরাফ দামাত বারাকাতুহুম',
    designation: 'প্রতিষ্ঠাতা ও মোতাওয়াল্লী, মারকাযুল ইহসান ঢাকা',
    department: 'প্রশাসন ও সার্বিক পরিচালনা',
    qualification: 'দাওরায়ে হাদীস, উচ্চতর ইসলামিক গবেষণা ও আধ্যাত্মিক তরবিয়ত',
    experience: '২৫+ বছর মাদরাসা পরিচালনা ও ইলমে ওহীর বহুমুখী খেদমত',
    phone: '০১৭৮৯-৩২২১৯৯',
    email: 'info@markazulihsan.com',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'মারকাযুল ইহসান ঢাকা-এর সম্মানিত প্রতিষ্ঠাতা ও মোতাওয়াল্লী। আকাবিরে আসলাফের নীতি ও আদর্শে একনিষ্ঠভাবে প্রতিষ্ঠানকে এগিয়ে নিয়ে যাচ্ছেন।',
    order: 1,
    isActive: true
  },
  {
    id: 'tch-2',
    name: 'হযরত মাওলানা মুফতী নুরুল ইসলাম কাসেমী',
    designation: 'শায়খুল হাদীস ও সিনিয়র মুহাদ্দিস',
    department: 'কিতাব বিভাগ',
    qualification: 'দাওরায়ে হাদীস ও উচ্চতর হাদীস গবেষণা',
    experience: '২২ বছর সহীহ বুখারী ও মুসলিম শরীফের দরস',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: 'হাদিস শাস্ত্রের প্রথিতযশা বিশেষজ্ঞ। দীর্ঘ দুই দশকের অধিক সময় যাবৎ সিহাহ সিত্তাহর দরস পরিচালনা করছেন।',
    order: 2,
    isActive: true
  },
  {
    id: 'tch-3',
    name: 'মাওলানা হাফেজ মুফতী মাহমুদ হাসান',
    designation: 'নায়েবে মুহতামিম ও শিক্ষা সচিব (নাযেম-ই-তা\'লীমাত)',
    department: 'শিক্ষা ও প্রশাসন',
    qualification: 'দাওরায়ে হাদীস, ইফতা ও উসূলে ফিকহ',
    experience: '১২ বছর শিক্ষাক্রম ও পরীক্ষা নিয়ন্ত্রণ',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'প্রতিদিনের ক্লাস রুটিন, কারিকুলাম বাস্তবায়ন এবং ছাত্রদের নিয়মানুবর্তিতা ও মেধা মূল্যায়নের দায়িত্বপ্রাপ্ত।',
    order: 3,
    isActive: true
  },
  {
    id: 'tch-4',
    name: 'হাফেজ ক্বারী মাওলানা মোস্তফা কামাল',
    designation: 'প্রধান ক্বারী ও আন্তর্জাতিক হিফজ বিভাগীয় প্রধান',
    department: 'হিফজুল কুরআন বিভাগ',
    qualification: 'হাফেজে কুরআন, ইলমে ক্বিরাআত ও তাজবীদ (সাবআ ক্বিরাআত সনদপ্রাপ্ত)',
    experience: '১৪ বছর হিফজ তত্ত্বাবধান',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: 'আন্তর্জাতিক হিফজ প্রতিযোগিতার অভিজ্ঞ বিচারক ও প্রশিক্ষক। শতাধিক ছাত্রকে ৩০ পারা কুরআন হিফজ করানোর সৌভাগ্য অর্জন।',
    order: 4,
    isActive: true
  },
  {
    id: 'tch-5',
    name: 'মাওলানা মুফতী আবু বকর সিদ্দিক',
    designation: 'উস্তাদুল ফিকহ ও প্রধান মুফতী (দারুল ইফতা)',
    department: 'কিতাব বিভাগ',
    qualification: 'দাওরায়ে হাদীস ও উচ্চতর ফেকাহ ও ইফতা',
    experience: '১০ বছর ফতোয়া ও ফেকাহ পাঠদান',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'জালালাইন ও শরহে জামী জামাতের প্রধান উস্তাদ এবং দৈনন্দিন শরীয়তের জটিল মাসায়েল সমাধানকারী।',
    order: 5,
    isActive: true
  },
  {
    id: 'tch-6',
    name: 'হাফেজ মাওলানা তারেক মাহমুদ',
    designation: 'হিফজ সমাপনী (দাওর) ও নাযেরা তত্ত্বাবধায়ক',
    department: 'হিফজুল কুরআন বিভাগ',
    qualification: 'হাফেজে কুরআন, কামিল (হাদীস)',
    experience: '৮ বছর হিফজ প্রশিক্ষণ',
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    bio: 'দ্রুত সহীহ তিলাওয়াত, মাখরাজ সংশোধন ও শেষ বর্ষের রিভিশন দায়িত্ব অত্যন্ত দক্ষতার সাথে পরিচালনা করেন।',
    order: 6,
    isActive: true
  },
  {
    id: 'tch-7',
    name: 'মাওলানা আব্দুর রহমান জিলানী',
    designation: 'বিভাগীয় প্রধান, নূরানী ও নাদিয়াতুল কুরআন',
    department: 'নূরানী ও মক্তব বিভাগ',
    qualification: 'নূরানী কেন্দ্রীয় মুয়াল্লিম প্রশিক্ষণ সনদ ও দাওরায়ে হাদীস',
    experience: '৯ বছর শিশু শিক্ষা',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    bio: 'ছোট সোনামণিদের পরম স্নেহে আরবি বর্ণমালা, কায়দা ও কালিমা শেখানোর নির্ভরযোগ্য প্রশিক্ষক।',
    order: 7,
    isActive: true
  },
  {
    id: 'tch-8',
    name: 'মাওলানা হাসিবুর রহমান',
    designation: 'উস্তাদুল আদব (আরবি ভাষা ও ব্যাকরণ)',
    department: 'কিতাব বিভাগ',
    qualification: 'আদাবুল আরাবিয়া ও দাওরায়ে হাদীস',
    experience: '৭ বছর আরবি ব্যাকরণ পাঠদান',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    bio: 'নাহবেমীর ও মীযান জামাতে বিশুদ্ধ আরবি উচ্চারণ, ব্যাকরণ ও ভাষা অনুশীলনের পাঠদান করেন।',
    order: 8,
    isActive: true
  }
];

export const DEFAULT_SYLLABUS: SyllabusItem[] = [
  {
    id: 'syl-01',
    department: 'দাওরায়ে হাদীস (মাস্টার্স সমমান)',
    jamaat: 'তাকমীল',
    subjectName: 'সহীহুল বুখারী ১ম ও ২য় খণ্ড',
    bookName: 'আল-জামে আস-সহীহ লিল বুখারী',
    authorName: 'ইমাম আবু আব্দুল্লাহ মুহাম্মদ ইবনে ইসমাইল বুখারী (রহ.)',
    totalMarks: 200,
    writtenMark: 160,
    oralMark: 40,
    pdfDownloadUrl: '#'
  },
  {
    id: 'syl-02',
    department: 'দাওরায়ে হাদীস',
    jamaat: 'তাকমীল',
    subjectName: 'সহীহ মুসলিম শরীফ',
    bookName: 'আল-মুসনাদুস সহীহ',
    authorName: 'ইমাম মুসলিম ইবনুল হাজ্জাজ কুশায়রী নিশাপুরী (রহ.)',
    totalMarks: 100,
    writtenMark: 80,
    oralMark: 20,
    pdfDownloadUrl: '#'
  },
  {
    id: 'syl-03',
    department: 'ফজিলত বিভাগ',
    jamaat: 'জালালাইন',
    subjectName: 'তাফসীরে জালালাইন (১ম ও ২য় খণ্ড)',
    bookName: 'তাফসীরুল জালালাইন',
    authorName: 'আল্লামা জালালুদ্দীন মহল্লী ও জালালুদ্দীন সুয়ূতী (রহ.)',
    totalMarks: 100,
    writtenMark: 80,
    oralMark: 20,
    pdfDownloadUrl: '#'
  },
  {
    id: 'syl-04',
    department: 'সানাবিয়া বিভাগ',
    jamaat: 'কাফিয়া',
    subjectName: 'আরবি ব্যাকরণ (নাহব)',
    bookName: 'আল-কাফিয়া ফীন নাহব',
    authorName: 'আল্লামা ইবনুল হাজিব (রহ.)',
    totalMarks: 100,
    writtenMark: 80,
    oralMark: 20,
    pdfDownloadUrl: '#'
  },
  {
    id: 'syl-05',
    department: 'সানাবিয়া বিভাগ',
    jamaat: 'মীযান ও মুনশাইব',
    subjectName: 'আরবি রূপমূলবিদ্যা (সারফ)',
    bookName: 'মীযানুস সারফ ও মুনশাইব',
    authorName: 'সিরাজুদ্দীন জন্দী ও আলী ইবনে উসমান (রহ.)',
    totalMarks: 100,
    writtenMark: 80,
    oralMark: 20,
    pdfDownloadUrl: '#'
  },
  {
    id: 'syl-06',
    department: 'হিফজুল কুরআন',
    jamaat: 'হিফজ বিভাগ',
    subjectName: '৩০ পারা পূর্ণ হিফজ ও তাজবীদ',
    bookName: 'পবিত্র কুরআনুল কারীম ও মুকাদ্দামাতুল জাযারিয়্যাহ',
    authorName: 'ইমামুল জাযারী (রহ.)',
    totalMarks: 100,
    writtenMark: 0,
    oralMark: 100,
    pdfDownloadUrl: '#'
  }
];

export const DEFAULT_DONATIONS: DonationRecord[] = [
  {
    id: 'don-01',
    donorName: 'হাজী মুহাম্মদ রফিকুল ইসলাম',
    donorPhone: '01711223344',
    amount: 25000,
    fundType: 'মাদরাসা নির্মাণ',
    paymentMethod: 'Bank',
    trxId: 'IBBL-98234120',
    date: '২০২৬-০৩-০২',
    isAnonymous: false,
    status: 'যাচাইকৃত'
  },
  {
    id: 'don-02',
    donorName: 'আল্লাহর এক বান্দা',
    donorPhone: '01899887766',
    amount: 10000,
    fundType: 'এতিম ও ছাত্র সহায়তা',
    paymentMethod: 'bKash',
    trxId: 'BK79182931',
    date: '২০২৬-০৩-০৪',
    isAnonymous: true,
    status: 'যাচাইকৃত'
  },
  {
    id: 'don-03',
    donorName: 'মো: জহিরুল হক খন্দকার',
    donorPhone: '01922334455',
    amount: 5000,
    fundType: 'যাকাত ফান্ড',
    paymentMethod: 'Nagad',
    trxId: 'NG82194012',
    date: '২০২৬-০৩-০৫',
    isAnonymous: false,
    status: 'অপেক্ষমান'
  }
];

export const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-01',
    name: 'আব্দুস সামাদ চৌধুরী',
    phone: '01712009988',
    email: 'samad.bd@gmail.com',
    subject: 'হিফজ বিভাগে ভর্তি সংক্রান্ত তথ্য জানতে চাই',
    message: 'আসসালামু আলাইকুম। আমার ছেলের বয়স ৮ বছর। সে নাযেরা শেষ করেছে। আপনাদের যাত্রাবাড়ী শাখায় হিফজে ভর্তির নিয়ম ও মাসিক খরচের বিস্তারিত জানতে চাই।',
    date: '২০২৬-০৩-০৩',
    isRead: false
  },
  {
    id: 'msg-02',
    name: 'মাওলানা কামরুল হাসান',
    phone: '01815667788',
    email: 'kamrul.hasan@yahoo.com',
    subject: 'ডেমরা স্থায়ী ক্যাম্পাসের জমি ওয়াকফ সংক্রান্ত',
    message: 'মুহতামিম সাহেবের সাথে স্থায়ী ক্যাম্পাসের পার্শ্ববর্তী কিছু জমি ক্রয় ও দান বিষয়ে সরাসরি সাক্ষাতের সময় চাচ্ছিলাম। জাযাকুমুল্লাহ।',
    date: '২০২৬-০৩-০২',
    isRead: true
  }
];

export const CODE_GS_SCRIPT = `/**
 * =========================================================================
 * মারকাযুল ইহসান ঢাকা (Madrasa Markazul Ihsan Dhaka)
 * গুগল অ্যাপস স্ক্রিপ্ট ব্যাকএন্ড (Code.gs)
 * =========================================================================
 * অফিসিয়াল গুগল শিট লিংক:
 * https://docs.google.com/spreadsheets/d/1bci7R_vI8BIRz9Dv4u3ct2sEhxUPDndD2b-OonPcrHE/edit?usp=drivesdk
 *
 * ডিফল্ট ওয়েব অ্যাপ ইউআরএল (Web App Exec URL):
 * https://script.google.com/macros/s/AKfycbyde6RbBWzj3nFFxDLI0PAIYYrT3PAN4KaG9Ty9CSdVbSiDNYBycRIbqcotzgQDSjvIXw/exec
 *
 * এই স্ক্রিপ্টটিতে অন্তর্ভুক্ত রয়েছে:
 * ১. setupSheets() - সকল প্রয়োজনীয় শিট স্বয়ংক্রিয়ভাবে তৈরি করার ফাংশন
 * ২. setupHeaders() - আকর্ষণীয় কালার, বোল্ড ও ফ্রিজ রো সহ হেডার সেটআপ করার ফাংশন
 * ৩. donateDeposit() / dogateDeposit() - অনুদান ও ডিপোজিট গ্রহণ ও সংরক্ষণের বিশেষ ফাংশন
 * ৪. doGet() ও doPost() - ফুল API সাপোর্ট (ভর্তি, রেজাল্ট, নোটিশ, ডোনেশন, মেসেজ, সেটিংস)
 * ৫. testApi() - এক ক্লিকে স্ক্রিপ্ট টেস্ট করার ফাংশন
 *
 * ব্যবহারের নিয়ম:
 * ১. গুগল শিটটি খুলুন (Extensions > Apps Script-এ যান)।
 * ২. পূর্বের কোড মুছে এই সম্পূর্ণ কোডটি পেস্ট করে Save (Ctrl + S) করুন।
 * ৩. ওপরের ফাংশন মেনু থেকে "setupSheets" বা "setupHeaders" সিলেক্ট করে "Run" বাটনে চাপুন।
 * ৪. Deploy > Manage deployments অথবা New deployment এ যান।
 *    - Type: Web app
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (বাধ্যতামূলক)
 * ৫. প্রাপ্ত Web App URL টি মারকাযুল ইহসানের এডমিন প্যানেলে বসিয়ে সংরক্ষণ করুন।
 */

// শিট আইডি (স্ট্যান্ডঅ্যালোন স্ক্রিপ্ট হিসেবে রান করলেও যাতে একই শিট ব্যবহার হয়)
const SPREADSHEET_ID = '1bci7R_vI8BIRz9Dv4u3ct2sEhxUPDndD2b-OonPcrHE';

// প্রয়োজনীয় ১৪টি শিটের নামসমূহ
const SHEETS = {
  NOTICES: 'Notices',         // নোটিশ ও বিজ্ঞপ্তি
  ADMISSIONS: 'Admissions',   // অনলাইন ভর্তি আবেদন
  RESULTS: 'Results',         // পরীক্ষার ফলাফল ও মার্কশীট
  DONATIONS: 'Donations',     // দান-অনুদানের হিসাব (খিদমত ফান্ড)
  DEPOSITS: 'Deposits',       // অনুদান ও ডিপোজিট জমার হিসাব (Voucher/Deposit)
  SYLLABUS: 'Syllabus',       // সিলেবাস ও কিতাব তালিকা
  TEACHERS: 'Teachers',       // উস্তাদ ও কর্মকর্তা বৃন্দ
  JAMAATS: 'Jamaats',         // বিভাগ ও জামাতসমূহ
  SLIDER: 'Slider',           // ওয়েবসাইট ব্যানার ও স্লাইডার
  GALLERY: 'Gallery',         // ছবি ও ভিডিও গ্যালারি
  BLOGS: 'Blogs',             // ইসলামী নিবন্ধ ও বয়ান
  MESSAGES: 'Messages',       // যোগাযোগ ও অভিযোগ বার্তা
  SETTINGS: 'Settings',       // ওয়েবসাইট সেটিংস ও সার্বিক তথ্য
  FEATURES: 'Features'        // মাদ্রাসার অনন্য বৈশিষ্ট্যসমূহ
};

// সকল শিটের হেডার স্কিমা
const SHEET_HEADERS = {
  [SHEETS.NOTICES]: ['id', 'title', 'date', 'category', 'isUrgent', 'content', 'imageUrl', 'pdfUrl', 'publishedBy'],
  [SHEETS.ADMISSIONS]: ['id', 'studentNameBn', 'studentNameEn', 'fatherName', 'motherName', 'guardianPhone', 'whatsappNumber', 'birthDate', 'academicYear', 'campus', 'department', 'jamaat', 'studentType', 'residenceType', 'address', 'previousInstitute', 'status', 'appliedDate', 'notes'],
  [SHEETS.RESULTS]: ['id', 'studentName', 'fatherName', 'rollNumber', 'registrationNumber', 'academicYear', 'department', 'jamaat', 'campus', 'totalMarks', 'obtainedTotal', 'gpa', 'division', 'subjectsJson', 'publishedDate', 'remarks'],
  [SHEETS.DONATIONS]: ['id', 'donorName', 'donorPhone', 'amount', 'fundType', 'paymentMethod', 'trxId', 'bankInfo', 'date', 'isAnonymous', 'status', 'receiptNumber', 'notes'],
  [SHEETS.DEPOSITS]: ['id', 'voucherNo', 'donorOrDepositor', 'phone', 'amount', 'fundOrCategory', 'paymentMethod', 'accountOrBank', 'trxId', 'date', 'timestamp', 'status', 'remarks'],
  [SHEETS.SYLLABUS]: ['id', 'department', 'jamaat', 'subjectName', 'bookName', 'authorName', 'totalMarks', 'writtenMark', 'oralMark', 'pdfDownloadUrl'],
  [SHEETS.TEACHERS]: ['id', 'name', 'designation', 'department', 'qualification', 'experience', 'phone', 'email', 'imageUrl', 'bio', 'order', 'isActive'],
  [SHEETS.JAMAATS]: ['id', 'name', 'department', 'code', 'capacity', 'monthlyFee', 'description', 'isActive'],
  [SHEETS.SLIDER]: ['id', 'title', 'subtitle', 'imageUrl', 'badge', 'linkTab', 'order', 'isActive'],
  [SHEETS.GALLERY]: ['id', 'title', 'category', 'imageUrl', 'imagesJson', 'caption', 'date'],
  [SHEETS.BLOGS]: ['id', 'title', 'slug', 'category', 'author', 'authorDesignation', 'date', 'readTime', 'imageUrl', 'summary', 'content', 'tags'],
  [SHEETS.MESSAGES]: ['id', 'name', 'phone', 'email', 'subject', 'message', 'date', 'isRead'],
  [SHEETS.SETTINGS]: ['Key', 'Value', 'Description'],
  [SHEETS.FEATURES]: ['id', 'title', 'desc', 'icon']
};

/**
 * গুগল স্প্রেডশিট অবজেক্ট পাওয়ার সহায়ক ফাংশন
 */
function getSpreadsheet() {
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (err) {
    // Standalone fallback
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

/**
 * =========================================================================
 * ১. SETUP SHEETS ফাংশন: সকল শিট নিশ্চিত বা তৈরি করার ফাংশন
 * =========================================================================
 * Apps Script এ সরাসরি রান করা যায়।
 */
function setupSheets() {
  const ss = getSpreadsheet();
  Logger.log('=== মারকাযুল ইহসান শিট সেটআপ শুরু ===');

  for (let key in SHEETS) {
    const sheetName = SHEETS[key];
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      Logger.log('তৈরি করা হলো শিট: ' + sheetName);
    }
  }

  // ডিফল্ট খালি 'Sheet1' থাকলে এবং অন্য শিট থাকলে মুছে ফেলা
  const defaultSheet = ss.getSheetByName('Sheet1') || ss.getSheetByName('শীট১');
  if (defaultSheet && ss.getSheets().length > 1 && defaultSheet.getLastRow() === 0) {
    try {
      ss.deleteSheet(defaultSheet);
      Logger.log('খালি Sheet1 মুছে ফেলা হয়েছে।');
    } catch(e) {
      // ignore
    }
  }

  // হেডার সেটআপ কল করা
  setupHeaders();
  Logger.log('=== সকল শিট এবং হেডার সফলভাবে সেটআপ সম্পন্ন হয়েছে! ===');
  return { status: 'success', message: 'সকল ১৪টি শিট ও হেডার সফলভাবে তৈরি ও কনফিগার হয়েছে!' };
}

/**
 * =========================================================================
 * ২. SETUP HEADERS ফাংশন: প্রতিটি শিটের হেডার ও স্টাইলিং সেটআপ
 * =========================================================================
 * প্রতিটি শিটে হেডার বসায়, গাঢ় সবুজ ব্যাকগ্রাউন্ড ও সাদা টেক্সট দিয়ে স্টাইল করে।
 */
function setupHeaders() {
  const ss = getSpreadsheet();
  Logger.log('=== হেডার সেটআপ শুরু ===');

  for (let key in SHEETS) {
    const sheetName = SHEETS[key];
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    const headers = SHEET_HEADERS[sheetName];
    if (!headers || headers.length === 0) continue;

    // যদি শিট খালি থাকে বা শুধুমাত্র ১ম সারিতে ডেটা না থাকে
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    } else {
      // প্রথম সারিকে হেডারে রূপান্তর
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    // হেডার ডিজাইন ও স্টাইলিং
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange
      .setFontWeight('bold')
      .setBackground('#064e3b')      // মারকাযুল ইহসান ইসলামিক সবুজ
      .setFontColor('#ffffff')      // সাদা টেক্সট
      .setFontFamily('Arial')
      .setHorizontalAlignment('center');

    // ১ম রো ফ্রিজ করা
    sheet.setFrozenRows(1);

    // অটো ফিট কলাম
    for (let c = 1; c <= headers.length; c++) {
      sheet.autoResizeColumn(c);
      if (sheet.getColumnWidth(c) < 120) {
        sheet.setColumnWidth(c, 130);
      }
    }
    Logger.log('হেডার সেট করা হয়েছে: ' + sheetName);
  }

  Logger.log('=== সকল হেডার ডিজাইন সম্পন্ন! ===');
  return { status: 'success', message: 'সকল হেডার সফলভাবে ডিজাইন ও লক করা হয়েছে!' };
}

/**
 * =========================================================================
 * ৩. DONATE DEPOSIT (DOGATE DEPOSIT) ফাংশন: অনুদান ও ডিপোজিট সেভ করার ফাংশন
 * =========================================================================
 * এটি খিদমত ফান্ড ও ডোনেশনের ডিপোজিট ডেটা 'Donations' ও 'Deposits' উভয় শিটে সেভ করে।
 */
function donateDeposit(data) {
  const ss = getSpreadsheet();
  initializeSheetsIfMissing(ss);

  // সরাসরি রান করার জন্য ডামি ডেটা তৈরি (যদি data না পাঠানো হয়)
  if (!data || typeof data !== 'object') {
    data = {
      donorName: 'টেস্ট অনুদানকারী',
      donorPhone: '01789322199',
      amount: '500',
      fundType: 'খিদমত ফান্ড (লিল্লাহ)',
      paymentMethod: 'bKash',
      trxId: 'TEST' + Date.now().toString().slice(-6),
      date: Utilities.formatDate(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd'),
      notes: 'সিস্টেম টেস্ট ডিপোজিট'
    };
  }

  const now = new Date();
  const timestamp = Utilities.formatDate(now, 'Asia/Dhaka', 'yyyy-MM-dd HH:mm:ss');
  const dateStr = data.date || Utilities.formatDate(now, 'Asia/Dhaka', 'yyyy-MM-dd');
  const uniqueId = data.id || ('DON-' + Date.now());
  const voucherNo = data.voucherNo || ('MI-DEP-' + Date.now().toString().slice(-6));

  const donationItem = {
    id: uniqueId,
    donorName: data.donorName || data.name || 'বেনামী দানকারী',
    donorPhone: data.donorPhone || data.phone || '',
    amount: data.amount || '0',
    fundType: data.fundType || data.fundOrCategory || 'সাধারণ অনুদান',
    paymentMethod: data.paymentMethod || 'নগদ / অন্যান্য',
    trxId: data.trxId || voucherNo,
    bankInfo: data.bankInfo || data.accountOrBank || '',
    date: dateStr,
    isAnonymous: data.isAnonymous ? 'হ্যাঁ' : 'না',
    status: data.status || 'সফল / অনুমোদিত',
    receiptNumber: voucherNo,
    notes: data.notes || data.remarks || ''
  };

  const depositItem = {
    id: uniqueId,
    voucherNo: voucherNo,
    donorOrDepositor: donationItem.donorName,
    phone: donationItem.donorPhone,
    amount: donationItem.amount,
    fundOrCategory: donationItem.fundType,
    paymentMethod: donationItem.paymentMethod,
    accountOrBank: donationItem.bankInfo || donationItem.paymentMethod,
    trxId: donationItem.trxId,
    date: dateStr,
    timestamp: timestamp,
    status: donationItem.status,
    remarks: donationItem.notes
  };

  // ১. Donations শিটে সেভ
  const donSheet = ss.getSheetByName(SHEETS.DONATIONS);
  if (donSheet) {
    appendRowData(donSheet, donationItem);
  }

  // ২. Deposits শিটে সেভ
  const depSheet = ss.getSheetByName(SHEETS.DEPOSITS);
  if (depSheet) {
    appendRowData(depSheet, depositItem);
  }

  Logger.log('ডিপোজিট সফল: ' + voucherNo + ' | পরিমাণ: ' + donationItem.amount + ' টাকা');

  return {
    status: 'success',
    message: 'আলহামদুলিল্লাহ! অনুদান ও ডিপোজিট সফলভাবে গুগল শিটে সংরক্ষিত হয়েছে।',
    id: uniqueId,
    voucherNo: voucherNo,
    timestamp: timestamp
  };
}

// বানানের সুবিধার্থে dogateDeposit অ্যালিয়াস
function dogateDeposit(data) {
  return donateDeposit(data);
}

/**
 * =========================================================================
 * ৪. GET রিকোয়েস্ট হ্যান্ডলার: ডাটা রিড করা ও সেটআপ কল করা
 * =========================================================================
 */
function doGet(e) {
  try {
    const ss = getSpreadsheet();
    initializeSheetsIfMissing(ss);

    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'getAll';
    let result = {};

    if (action === 'getAll') {
      result = {
        status: 'success',
        spreadsheetUrl: ss.getUrl(),
        lastUpdated: Utilities.formatDate(new Date(), 'Asia/Dhaka', 'yyyy-MM-dd HH:mm:ss'),
        notices: readSheetData(ss.getSheetByName(SHEETS.NOTICES)),
        admissions: readSheetData(ss.getSheetByName(SHEETS.ADMISSIONS)),
        results: readSheetData(ss.getSheetByName(SHEETS.RESULTS)),
        donations: readSheetData(ss.getSheetByName(SHEETS.DONATIONS)),
        deposits: readSheetData(ss.getSheetByName(SHEETS.DEPOSITS)),
        syllabus: readSheetData(ss.getSheetByName(SHEETS.SYLLABUS)),
        teachers: readSheetData(ss.getSheetByName(SHEETS.TEACHERS)),
        jamaats: readSheetData(ss.getSheetByName(SHEETS.JAMAATS)),
        slider: readSheetData(ss.getSheetByName(SHEETS.SLIDER)),
        gallery: readSheetData(ss.getSheetByName(SHEETS.GALLERY)),
        blogs: readSheetData(ss.getSheetByName(SHEETS.BLOGS)),
        messages: readSheetData(ss.getSheetByName(SHEETS.MESSAGES)),
        features: readSheetData(ss.getSheetByName(SHEETS.FEATURES)),
        settings: readSettingsSheet(ss.getSheetByName(SHEETS.SETTINGS))
      };
    } else if (action === 'setupSheets' || action === 'setupSheet') {
      result = setupSheets();
    } else if (action === 'setupHeaders' || action === 'setupHeader') {
      result = setupHeaders();
    } else if (action === 'donateDeposit' || action === 'dogateDeposit' || action === 'submitDonation') {
      result = donateDeposit(e.parameter);
    } else if (action === 'getNotices') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.NOTICES)) };
    } else if (action === 'getResults') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.RESULTS)) };
    } else if (action === 'getAdmissions') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.ADMISSIONS)) };
    } else if (action === 'getDonations') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.DONATIONS)) };
    } else if (action === 'getDeposits') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.DEPOSITS)) };
    } else if (action === 'getTeachers') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.TEACHERS)) };
    } else if (action === 'getSlider') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.SLIDER)) };
    } else if (action === 'getSyllabus') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.SYLLABUS)) };
    } else if (action === 'getJamaats') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.JAMAATS)) };
    } else if (action === 'getGallery') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.GALLERY)) };
    } else if (action === 'getBlogs') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.BLOGS)) };
    } else if (action === 'getMessages') {
      result = { status: 'success', data: readSheetData(ss.getSheetByName(SHEETS.MESSAGES)) };
    } else if (action === 'getSettings') {
      result = { status: 'success', data: readSettingsSheet(ss.getSheetByName(SHEETS.SETTINGS)) };
    } else {
      result = {
        status: 'success',
        message: 'মারকাযুল ইহসান ঢাকা Google Apps Script API সচল আছে!',
        spreadsheetUrl: ss.getUrl()
      };
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * =========================================================================
 * ৫. POST রিকোয়েস্ট হ্যান্ডলার: ডাটা রাইট, আপডেট, সিঙ্ক ও ডিলিট করা
 * =========================================================================
 */
function doPost(e) {
  try {
    const ss = getSpreadsheet();
    initializeSheetsIfMissing(ss);

    let requestData;
    if (e.postData && e.postData.contents) {
      try {
        requestData = JSON.parse(e.postData.contents);
      } catch (err) {
        requestData = e.parameter || {};
      }
    } else if (e.parameter) {
      requestData = e.parameter;
    } else {
      throw new Error("অনুরোধে কোনো ডেটা পাওয়া যায়নি (No payload)");
    }

    const action = requestData.action;
    const payload = requestData.payload || requestData;

    let response = { status: 'success' };

    switch(action) {
      // অনুদান ও ডিপোজিট সেভ
      case 'donateDeposit':
      case 'dogateDeposit':
      case 'submitDonation':
      case 'deposit':
        response = donateDeposit(payload);
        break;

      // ভর্তি আবেদন
      case 'submitAdmission':
        appendRowData(ss.getSheetByName(SHEETS.ADMISSIONS), payload);
        response.message = 'অনলাইন ভর্তি আবেদন সফলভাবে গুগল শিটে সংরক্ষিত হয়েছে!';
        break;

      // যোগাযোগ বার্তা
      case 'submitContactMessage':
        appendRowData(ss.getSheetByName(SHEETS.MESSAGES), payload);
        response.message = 'বার্তা সফলভাবে পাঠানো হয়েছে!';
        break;

      // এডমিন প্যানেল থেকে সমস্ত ডেটা এক ক্লিকে গুগল শিটে সিঙ্ক
      case 'syncAllFromAdmin':
        if (payload.notices) overwriteSheetData(ss.getSheetByName(SHEETS.NOTICES), payload.notices);
        if (payload.admissions) overwriteSheetData(ss.getSheetByName(SHEETS.ADMISSIONS), payload.admissions);
        if (payload.results) overwriteSheetData(ss.getSheetByName(SHEETS.RESULTS), payload.results);
        if (payload.donations) overwriteSheetData(ss.getSheetByName(SHEETS.DONATIONS), payload.donations);
        if (payload.deposits) overwriteSheetData(ss.getSheetByName(SHEETS.DEPOSITS), payload.deposits);
        if (payload.syllabus) overwriteSheetData(ss.getSheetByName(SHEETS.SYLLABUS), payload.syllabus);
        if (payload.teachers) overwriteSheetData(ss.getSheetByName(SHEETS.TEACHERS), payload.teachers);
        if (payload.jamaats) overwriteSheetData(ss.getSheetByName(SHEETS.JAMAATS), payload.jamaats);
        if (payload.slider) overwriteSheetData(ss.getSheetByName(SHEETS.SLIDER), payload.slider);
        if (payload.gallery) overwriteSheetData(ss.getSheetByName(SHEETS.GALLERY), payload.gallery);
        if (payload.blogs) overwriteSheetData(ss.getSheetByName(SHEETS.BLOGS), payload.blogs);
        if (payload.messages) overwriteSheetData(ss.getSheetByName(SHEETS.MESSAGES), payload.messages);
        if (payload.features) overwriteSheetData(ss.getSheetByName(SHEETS.FEATURES), payload.features);
        if (payload.settings) saveSettingsSheet(ss.getSheetByName(SHEETS.SETTINGS), payload.settings);
        response.message = 'এডমিন প্যানেলের সমস্ত তথ্য গুগল শিটে সফলভাবে পুশ ও সিঙ্ক হয়েছে!';
        break;

      // একক নোটিশ
      case 'saveNotice':
        upsertRecord(ss.getSheetByName(SHEETS.NOTICES), payload);
        response.message = 'নোটিশ সফলভাবে সংরক্ষিত হয়েছে!';
        break;
      case 'deleteNotice':
        deleteRecord(ss.getSheetByName(SHEETS.NOTICES), payload.id);
        response.message = 'নোটিশ মুছে ফেলা হয়েছে!';
        break;

      // একক রেজাল্ট
      case 'saveResult':
        upsertRecord(ss.getSheetByName(SHEETS.RESULTS), payload);
        response.message = 'পরীক্ষার ফলাফল সংরক্ষিত হয়েছে!';
        break;
      case 'deleteResult':
        deleteRecord(ss.getSheetByName(SHEETS.RESULTS), payload.id);
        response.message = 'ফলাফল মুছে ফেলা হয়েছে!';
        break;

      // একক সিলেবাস
      case 'saveSyllabus':
        upsertRecord(ss.getSheetByName(SHEETS.SYLLABUS), payload);
        response.message = 'সিলেবাস সংরক্ষিত হয়েছে!';
        break;
      case 'deleteSyllabus':
        deleteRecord(ss.getSheetByName(SHEETS.SYLLABUS), payload.id);
        response.message = 'সিলেবাস মুছে ফেলা হয়েছে!';
        break;

      // একক শিক্ষক
      case 'saveTeacher':
        upsertRecord(ss.getSheetByName(SHEETS.TEACHERS), payload);
        response.message = 'উস্তাদের প্রোফাইল সংরক্ষিত হয়েছে!';
        break;
      case 'deleteTeacher':
        deleteRecord(ss.getSheetByName(SHEETS.TEACHERS), payload.id);
        response.message = 'উস্তাদের তথ্য মুছে ফেলা হয়েছে!';
        break;

      // একক স্লাইডার
      case 'saveSlider':
        upsertRecord(ss.getSheetByName(SHEETS.SLIDER), payload);
        response.message = 'স্লাইডার ব্যানার সংরক্ষিত হয়েছে!';
        break;
      case 'deleteSlider':
        deleteRecord(ss.getSheetByName(SHEETS.SLIDER), payload.id);
        response.message = 'স্লাইডার মুছে ফেলা হয়েছে!';
        break;

      // একক ব্লগ
      case 'saveBlog':
        upsertRecord(ss.getSheetByName(SHEETS.BLOGS), payload);
        response.message = 'নিবন্ধ/ব্লগ সংরক্ষিত হয়েছে!';
        break;
      case 'deleteBlog':
        deleteRecord(ss.getSheetByName(SHEETS.BLOGS), payload.id);
        response.message = 'ব্লগ মুছে ফেলা হয়েছে!';
        break;

      // একক জামাত
      case 'saveJamaat':
        upsertRecord(ss.getSheetByName(SHEETS.JAMAATS), payload);
        response.message = 'জামাত/বিভাগ সংরক্ষিত হয়েছে!';
        break;
      case 'deleteJamaat':
        deleteRecord(ss.getSheetByName(SHEETS.JAMAATS), payload.id);
        response.message = 'জামাত মুছে ফেলা হয়েছে!';
        break;

      // সেটিংস
      case 'saveSettings':
        saveSettingsSheet(ss.getSheetByName(SHEETS.SETTINGS), payload);
        response.message = 'সাইট সেটিংস সফলভাবে সংরক্ষিত হয়েছে!';
        break;

      // শিট ও হেডার সেটআপ
      case 'setupSheets':
        response = setupSheets();
        break;
      case 'setupHeaders':
        response = setupHeaders();
        break;

      default:
        response.message = 'অনুরোধটি সফলভাবে প্রসেস করা হয়েছে (' + action + ')';
    }

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * =========================================================================
 * সহায়ক ফাংশনসমূহ (Helpers)
 * =========================================================================
 */

function initializeSheetsIfMissing(ss) {
  for (let key in SHEETS) {
    const sheetName = SHEETS[key];
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      const headers = SHEET_HEADERS[sheetName];
      if (headers) {
        sheet.appendRow(headers);
        sheet.getRange(1, 1, 1, headers.length)
          .setFontWeight('bold')
          .setBackground('#064e3b')
          .setFontColor('#ffffff');
        sheet.setFrozenRows(1);
      }
    }
  }
}

function readSheetData(sheet) {
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0];
  const items = [];

  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    let obj = {};
    for (let j = 0; j < headers.length; j++) {
      let val = row[j];
      if (headers[j] === 'subjectsJson' && typeof val === 'string' && val.startsWith('[')) {
        try { obj['subjects'] = JSON.parse(val); } catch(e) { obj['subjects'] = []; }
      } else {
        obj[headers[j]] = val;
      }
    }
    items.push(obj);
  }
  return items;
}

function appendRowData(sheet, item) {
  if (!sheet) return;
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = [];
  headers.forEach(h => {
    if (h === 'subjectsJson' && item.subjects) {
      row.push(JSON.stringify(item.subjects));
    } else {
      row.push(item[h] !== undefined ? item[h] : '');
    }
  });
  sheet.appendRow(row);
}

function overwriteSheetData(sheet, dataList) {
  if (!sheet) return;
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.clearContents();
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#064e3b')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  if (!Array.isArray(dataList) || dataList.length === 0) return;

  const rows = dataList.map(item => {
    return headers.map(h => {
      if (h === 'subjectsJson' && item.subjects) return JSON.stringify(item.subjects);
      return item[h] !== undefined ? item[h] : '';
    });
  });

  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
}

function upsertRecord(sheet, record) {
  if (!sheet || !record.id) return;
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idIndex = headers.indexOf('id');

  let rowIndex = -1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idIndex] == record.id) {
      rowIndex = i + 1;
      break;
    }
  }

  const rowValues = headers.map(h => {
    if (h === 'subjectsJson' && record.subjects) return JSON.stringify(record.subjects);
    return record[h] !== undefined ? record[h] : '';
  });

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, headers.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }
}

function deleteRecord(sheet, id) {
  if (!sheet || !id) return;
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idIndex = headers.indexOf('id');
  if (idIndex === -1) return;

  for (let i = rows.length - 1; i >= 1; i--) {
    if (rows[i][idIndex] == id) {
      sheet.deleteRow(i + 1);
      break;
    }
  }
}

function readSettingsSheet(sheet) {
  if (!sheet) return null;
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return null;
  const settings = {};
  for (let i = 1; i < rows.length; i++) {
    const key = rows[i][0];
    const val = rows[i][1];
    if (key) {
      if (typeof val === 'string' && (val.startsWith('[') || val.startsWith('{'))) {
        try {
          settings[key] = JSON.parse(val);
        } catch(e) {
          settings[key] = val;
        }
      } else {
        settings[key] = val;
      }
    }
  }
  return settings;
}

function saveSettingsSheet(sheet, settingsObj) {
  if (!sheet || !settingsObj) return;
  sheet.clearContents();
  sheet.appendRow(['Key', 'Value', 'Description']);
  sheet.getRange(1, 1, 1, 3)
    .setFontWeight('bold')
    .setBackground('#064e3b')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  const rows = [];
  for (let k in settingsObj) {
    const val = settingsObj[k];
    const strVal = typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val !== undefined ? val : '');
    rows.push([k, strVal, 'Auto saved from web app']);
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, 3).setValues(rows);
  }
}

/**
 * =========================================================================
 * ৬. TEST API ফাংশন: স্ক্রিপ্ট রান বা টেস্ট করা
 * =========================================================================
 */
function testApi() {
  Logger.log('মারকাযুল ইহসান ব্যাকএন্ড টেস্ট শুরু...');
  const setupResult = setupSheets();
  Logger.log('সেটআপ রেজাল্ট: ' + JSON.stringify(setupResult));
  const testDeposit = donateDeposit({
    donorName: 'হাজী মোঃ আব্দুর রহিম',
    donorPhone: '01712345678',
    amount: '5000',
    fundType: 'স্থায়ী ক্যাম্পাস নির্মাণ ফান্ড',
    paymentMethod: 'Bank Deposit',
    trxId: 'DEP-' + Math.floor(Math.random() * 90000 + 10000),
    bankInfo: 'আল-আরাফাহ ইসলামী ব্যাংক লি., যাত্রাবাড়ী শাখা',
    notes: 'মারকাযুল ইহসান ডেমরা ক্যাম্পাসের জন্য'
  });
  Logger.log('টেস্ট ডিপোজিট রেজাল্ট: ' + JSON.stringify(testDeposit));
  Logger.log('আলহামদুলিল্লাহ, সমস্ত টেস্ট সফলভাবে সম্পন্ন হয়েছে!');
}
`;
