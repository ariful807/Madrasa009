/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { toPng, toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { NoticeItem, SyllabusItem, StudentResult, SiteSettings } from '../types';

/**
 * Triggers a download of a file using a Blob or Data URL
 */
export function triggerFileDownload(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  }, 200);
}

/**
 * Helper to capture an element to image data URL safely
 * Handles modern CSS (oklch, color-mix), cross-origin images, and web fonts
 */
async function captureToDataUrl(
  element: HTMLElement, 
  format: 'png' | 'jpeg',
  customOptions?: { width?: number; height?: number }
): Promise<string> {
  const transparentPlaceholder = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';
  
  const options = {
    backgroundColor: '#ffffff',
    pixelRatio: 2,
    quality: 0.95,
    cacheBust: true,
    skipFonts: true,
    fontEmbedCSS: '',
    imagePlaceholder: transparentPlaceholder,
    ...(customOptions?.width ? { width: customOptions.width, canvasWidth: customOptions.width } : {}),
    ...(customOptions?.height ? { height: customOptions.height, canvasHeight: customOptions.height } : {}),
    style: {
      margin: '0',
      marginLeft: '0',
      marginRight: '0',
      marginTop: '0',
      marginBottom: '0',
      transform: 'none',
    },
    filter: (node: HTMLElement) => {
      // Exclude interactive print-hidden elements
      if (node.classList && node.classList.contains('no-print')) {
        return false;
      }
      return true;
    },
  };

  try {
    return format === 'png' ? await toPng(element, options) : await toJpeg(element, options);
  } catch (err) {
    console.warn('Initial capture attempt encountered an issue, retrying with skipFonts: true', err);
    // Retry with skipFonts: true to bypass any cross-origin font embedding restrictions
    const fallbackOptions = { ...options, skipFonts: true };
    return format === 'png' ? await toPng(element, fallbackOptions) : await toJpeg(element, fallbackOptions);
  }
}

/**
 * Downloads a DOM element as a high-resolution PDF (A4 sized)
 */
export async function downloadDomAsPdf(
  element: HTMLElement, 
  fileName: string,
  onProgress?: (status: string) => void
): Promise<boolean> {
  try {
    if (onProgress) onProgress('ডকুমেন্ট প্রসেস হচ্ছে...');

    const imgData = await captureToDataUrl(element, 'jpeg');

    if (onProgress) onProgress('PDF তৈরি হচ্ছে...');

    const img = new Image();
    img.src = imgData;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image could not be rendered for PDF'));
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate aspect ratio
    const imgWidth = pdfWidth;
    const imgHeight = (img.height * pdfWidth) / img.width;

    if (imgHeight <= pdfHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
    }

    const cleanName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(cleanName);
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    // Fallback: If PDF generator fails in sandboxed environment, trigger native print
    try {
      window.print();
    } catch {
      // ignore
    }
    return false;
  }
}

/**
 * Downloads a DOM element as a high-resolution PNG image
 */
export async function downloadDomAsImage(
  element: HTMLElement, 
  fileName: string,
  onProgress?: (status: string) => void
): Promise<boolean> {
  try {
    if (onProgress) onProgress('ইমেজ তৈরি হচ্ছে...');

    const dataUrl = await captureToDataUrl(element, 'png');
    const cleanName = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    triggerFileDownload(dataUrl, cleanName);
    return true;
  } catch (error) {
    console.error('Image capture error:', error);
    return false;
  }
}

/**
 * Downloads an official Notice as a beautifully styled PDF document
 * Strictly matching the academic single-page A4 specification:
 * - Header: Institutions name in Bangla & Arabic (centered)
 * - Subtitle: Madrasa address
 * - Divider line
 * - Just below divider: Left: বিষয়: <title>, Right: তারিখ: <date>
 * - Main notice content
 * - Bottom: মুহতামিম এর স্বাক্ষর
 * - Font: Google Noto Serif
 * - No extra elements or blank pages
 */
export async function downloadNoticeAsPdf(
  notice: NoticeItem,
  settings?: { madrasaNameBn?: string; madrasaArabicMotto?: string; addressPermanent?: string; addressTemporary?: string }
): Promise<boolean> {
  const nameBn = settings?.madrasaNameBn || 'মাদরাসা মারকাযুল ইহসান ঢাকা';
  const arabicMotto = settings?.madrasaArabicMotto || 'مَدْرَسَةُ مَرْكَزِ الْإِحْسَانِ دَكَّا';
  const address = settings?.addressPermanent || 'পাইতি, ডেমরা, ঢাকা | অস্থায়ী ক্যাম্পাস: ৬ শহীদ ফারুক রোড, যাত্রাবাড়ী, ঢাকা';

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '794px'; // Standard A4 width at 96 DPI
  container.style.height = '1123px'; // Standard A4 height at 96 DPI (exact single page)
  container.style.maxHeight = '1123px';
  container.style.overflow = 'hidden';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.padding = '56px 56px 60px 56px';
  container.style.boxSizing = 'border-box';
  container.style.fontFamily = "'Noto Serif Bengali', 'Noto Serif', serif";
  container.style.zIndex = '-9999';
  container.style.pointerEvents = 'none';

  container.innerHTML = `
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
      <div>
        <!-- 1. Header: Institutions name in Bangla and Arabic (Centered) -->
        <div style="text-align: center; margin-bottom: 8px;">
          <h1 style="font-size: 26px; font-weight: 800; color: #064e3b; margin: 0 0 6px 0; line-height: 1.3;">
            ${nameBn}
          </h1>
          <p style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0; font-family: 'Amiri', 'Traditional Arabic', serif;">
            ${arabicMotto}
          </p>
          <!-- 2. Subtitle: Madrasa Address -->
          <p style="font-size: 12px; color: #475569; margin: 0; line-height: 1.4;">
            ${address}
          </p>
        </div>

        <!-- 3. Divider Line -->
        <div style="width: 100%; height: 2px; background-color: #064e3b; margin: 16px 0 18px 0;"></div>

        <!-- 4. Subject and Date just below divider line -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; font-size: 15px; color: #0f172a; border-bottom: 1px dashed #cbd5e1; padding-bottom: 10px;">
          <div style="font-weight: 700; max-width: 70%;">
            <span style="color: #064e3b;">বিষয়:</span> ${notice.title}
          </div>
          <div style="font-weight: 600; white-space: nowrap; color: #334155;">
            <span>তারিখ:</span> ${notice.date}
          </div>
        </div>

        <!-- 5. Main Notice Content -->
        <div style="font-size: 15px; line-height: 2.1; color: #1e293b; text-align: justify; white-space: pre-line; padding: 0 4px;">
          ${notice.content}
        </div>
      </div>

      <!-- 6. Bottom: Muhtamim Signature only -->
      <div style="margin-top: 40px; padding-top: 20px; display: flex; justify-content: flex-end;">
        <div style="text-align: center; width: 180px;">
          <div style="height: 35px;"></div>
          <div style="border-top: 1.5px solid #0f172a; padding-top: 6px; font-weight: 700; font-size: 15px; color: #0f172a;">
            মুহতামিম এর স্বাক্ষর
          </div>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
            ${nameBn}
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const success = await downloadDomAsPdf(container, `Notice_${notice.id}_${notice.title.replace(/[/\\?%*:|"<>]/g, '_').slice(0, 30)}`);
    return success;
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Downloads a complete Jamaat Syllabus as an A4 PDF document
 */
export async function downloadJamaatSyllabusPdf(
  jamaat: { name: string; department: string; books?: Array<{ name: string; fullMark: number; passMark: number }> },
  settings?: { madrasaNameBn?: string; madrasaArabicMotto?: string; addressPermanent?: string }
): Promise<boolean> {
  const nameBn = settings?.madrasaNameBn || 'মাদরাসা মারকাযুল ইহসান ঢাকা';
  const arabicMotto = settings?.madrasaArabicMotto || 'مَدْرَسَةُ مَرْكَزِ الْإِحْسَانِ دَكَّا';
  const address = settings?.addressPermanent || 'পাইতি, ডেমরা, ঢাকা | অস্থায়ী ক্যাম্পাস: ৬ শহীদ ফারুক রোড, যাত্রাবাড়ী, ঢাকা';
  const books = jamaat.books || [];

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '794px';
  container.style.height = '1123px';
  container.style.maxHeight = '1123px';
  container.style.overflow = 'hidden';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.padding = '50px 56px';
  container.style.boxSizing = 'border-box';
  container.style.fontFamily = "'Noto Serif Bengali', 'Noto Serif', serif";
  container.style.zIndex = '-9999';
  container.style.pointerEvents = 'none';

  const bookRows = books.length > 0 ? books.map((b, idx) => `
    <tr style="border-bottom: 1px solid #e2e8f0; background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
      <td style="padding: 10px 12px; text-align: center; font-weight: 600; color: #475569;">${idx + 1}</td>
      <td style="padding: 10px 14px; font-weight: 700; color: #0f172a;">${b.name}</td>
      <td style="padding: 10px 12px; text-align: center; font-weight: 600; color: #064e3b;">${b.fullMark}</td>
      <td style="padding: 10px 12px; text-align: center; font-weight: 600; color: #334155;">${b.passMark}</td>
    </tr>
  `).join('') : `
    <tr>
      <td colspan="4" style="padding: 24px; text-align: center; color: #64748b;">এই জামাতের জন্য কোনো কিতাব এখনো অন্তর্ভুক্ত করা হয়নি।</td>
    </tr>
  `;

  container.innerHTML = `
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
      <div>
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 8px;">
          <h1 style="font-size: 25px; font-weight: 800; color: #064e3b; margin: 0 0 6px 0;">
            ${nameBn}
          </h1>
          <p style="font-size: 17px; font-weight: 700; color: #1e293b; margin: 0 0 6px 0; font-family: 'Amiri', 'Traditional Arabic', serif;">
            ${arabicMotto}
          </p>
          <p style="font-size: 12px; color: #475569; margin: 0;">
            ${address}
          </p>
        </div>

        <div style="width: 100%; height: 2px; background-color: #064e3b; margin: 14px 0 16px 0;"></div>

        <!-- Title / Jamaat Info -->
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 18px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 12px; color: #065f46; font-weight: 600;">শিক্ষাক্রম ও বার্ষিক পাঠ্যতালিকা</span>
            <h2 style="font-size: 20px; font-weight: 800; color: #064e3b; margin: 2px 0 0 0;">
              জামাত: ${jamaat.name}
            </h2>
          </div>
          <div style="text-align: right;">
            <span style="display: inline-block; background-color: #064e3b; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700;">
              ${jamaat.department}
            </span>
          </div>
        </div>

        <!-- Books Table -->
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 14px; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #064e3b; color: #ffffff;">
              <th style="padding: 10px 12px; width: 10%; text-align: center; border-right: 1px solid #047857;">ক্র.</th>
              <th style="padding: 10px 14px; width: 60%; text-align: left; border-right: 1px solid #047857;">কিতাবের নাম</th>
              <th style="padding: 10px 12px; width: 15%; text-align: center; border-right: 1px solid #047857;">পূর্ণমান</th>
              <th style="padding: 10px 12px; width: 15%; text-align: center;">পাশ মার্ক</th>
            </tr>
          </thead>
          <tbody>
            ${bookRows}
          </tbody>
        </table>
      </div>

      <!-- Footer Signatures -->
      <div style="border-top: 1px solid #cbd5e1; padding-top: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div style="text-align: center; width: 160px;">
          <div style="height: 35px;"></div>
          <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; font-weight: 700; font-size: 13px;">
            নাযেম-ই-তা'লীমাত
          </div>
          <div style="font-size: 11px; color: #64748b;">শিক্ষা বিভাগ</div>
        </div>

        <div style="text-align: center; width: 160px;">
          <div style="height: 35px;"></div>
          <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; font-weight: 700; font-size: 13px;">
            মুহতামিম এর স্বাক্ষর
          </div>
          <div style="font-size: 11px; color: #64748b;">${nameBn}</div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);
  try {
    return await downloadDomAsPdf(container, `Syllabus_${jamaat.name.replace(/[/\\?%*:|"<>]/g, '_')}`);
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Downloads a syllabus item as a formatted PDF
 */
export async function downloadSyllabusAsPdf(
  item: SyllabusItem,
  madrasaName: string = 'মারকাযুল ইহসান ঢাকা'
): Promise<boolean> {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '794px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.padding = '40px';
  container.style.boxSizing = 'border-box';
  container.style.fontFamily = "'Noto Serif Bengali', 'Noto Serif', serif";
  container.style.zIndex = '-9999';
  container.style.pointerEvents = 'none';

  container.innerHTML = `
    <div style="border: 2px solid #064e3b; padding: 30px; background: #fff;">
      <div style="text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="font-size: 22px; font-weight: bold; color: #064e3b; margin: 0 0 4px 0;">${madrasaName}</h2>
        <p style="font-size: 14px; color: #334155; margin: 0 0 2px 0;">শিক্ষাক্রম ও কিতাব বিবরণী</p>
        <p style="font-size: 12px; color: #64748b; margin: 0;">বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ কারিকুলাম</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; width: 35%; background-color: #f8fafc;">জামাত / শ্রেণি:</td>
            <td style="padding: 10px; font-weight: 800; color: #064e3b;">${item.jamaat} (${item.department})</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; background-color: #f8fafc;">বিষয়:</td>
            <td style="padding: 10px;">${item.subjectName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; background-color: #f8fafc;">মূল কিতাবের নাম:</td>
            <td style="padding: 10px; font-weight: bold;">${item.bookName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; background-color: #f8fafc;">মুসান্নিফ / রচয়িতা:</td>
            <td style="padding: 10px;">${item.authorName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; background-color: #f8fafc;">মোট পূর্ণমান:</td>
            <td style="padding: 10px;">${item.totalMarks} (লিখিত: ${item.writtenMark}, মৌখিক: ${item.oralMark})</td>
          </tr>
          ${item.examDetails ? `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; background-color: #f8fafc;">পরীক্ষার বিবরণ:</td>
            <td style="padding: 10px;">${item.examDetails}</td>
          </tr>
          ` : ''}
        </tbody>
      </table>

      <div style="border-top: 1px dashed #94a3b8; padding-top: 16px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b;">
        <span>মুদ্রণ তারিখ: ${new Date().toLocaleDateString('bn-BD')}</span>
        <span>মারকাযুল ইহসান কেন্দ্রীয় শিক্ষা বিভাগ</span>
      </div>
    </div>
  `;

  document.body.appendChild(container);
  try {
    return await downloadDomAsPdf(container, `Syllabus_${item.jamaat}_${item.bookName}`);
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Creates an exact A4-dimensioned (794px x 1123px) container for Marksheet printing / capturing.
 * Using inline pixel and percentage styles prevents responsive squishing or margin offset bugs.
 */
export function createMarksheetContainer(result: StudentResult, settings: Partial<SiteSettings>): HTMLElement {
  const nameBn = settings.madrasaNameBn || 'মাদরাসা মারকাযুল ইহসান ঢাকা';
  const arabicMotto = settings.madrasaArabicMotto || 'مَدْرَسَةُ مَرْكَزِ الْإِحْسَانِ دَكَّا — لِلتَّعْلِيمِ وَالتَّرْبِيَةِ';
  const address = settings.hasTemporaryCampus !== false && settings.addressTemporary 
    ? `${settings.addressTemporary} ও ${settings.addressPermanent || 'পাইতি, ডেমরা, ঢাকা'}` 
    : (settings.addressPermanent || 'পাইতি, ডেমরা, ঢাকা');

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '794px'; // Exactly A4 width at 96 DPI
  container.style.minWidth = '794px';
  container.style.maxWidth = '794px';
  container.style.height = '1123px'; // Exactly A4 height at 96 DPI
  container.style.minHeight = '1123px';
  container.style.maxHeight = '1123px';
  container.style.boxSizing = 'border-box';
  container.style.margin = '0';
  container.style.padding = '44px 48px 40px 48px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.border = '2.5px solid #0f172a';
  container.style.fontFamily = "'Noto Serif Bengali', 'Noto Serif', Georgia, serif";
  container.style.zIndex = '-9999';
  container.style.pointerEvents = 'none';
  container.style.overflow = 'hidden';

  const rowsHtml = result.subjects.map((sub, idx) => `
    <tr style="border-bottom: 1px solid #cbd5e1; background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
      <td style="padding: 8px 8px; text-align: center; border-right: 1px solid #0f172a; font-family: monospace; font-size: 13px; color: #475569;">${idx + 1}</td>
      <td style="padding: 8px 12px; border-right: 1px solid #0f172a; font-size: 13px; font-weight: 600; color: #0f172a;">${sub.subjectName}</td>
      <td style="padding: 8px 8px; text-align: center; border-right: 1px solid #0f172a; font-size: 13px; color: #334155;">${sub.fullMark || 100}</td>
      <td style="padding: 8px 8px; text-align: center; border-right: 1px solid #0f172a; font-size: 13px; color: #334155;">${sub.passMark || 33}</td>
      <td style="padding: 8px 8px; text-align: center; border-right: 1px solid #0f172a; font-size: 13px; font-weight: 700; color: #0f172a;">${sub.obtainedMark}</td>
      <td style="padding: 8px 8px; text-align: center; font-size: 13px; font-weight: 700; color: #0f172a;">${sub.grade}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
      <div>
        <!-- 1. প্রতিষ্ঠানের নাম (বাংলা ও আরবী) -->
        <div style="text-align: center; margin-bottom: 6px;">
          <h1 style="font-size: 26px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0; line-height: 1.25;">
            ${nameBn}
          </h1>
          <p style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0 0 6px 0; font-family: 'Amiri', 'Traditional Arabic', serif; direction: rtl;">
            ${arabicMotto}
          </p>
          <!-- 2. নিচে ঠিকানা -->
          <p style="font-size: 12px; color: #475569; margin: 0; line-height: 1.4;">
            ${address}
          </p>
        </div>

        <!-- 3. ডিভাইডার লাইন -->
        <div style="width: 100%; height: 2px; background-color: #0f172a; margin: 12px 0 14px 0;"></div>

        <!-- টাইটেল ব্যাজ -->
        <div style="text-align: center; margin-bottom: 16px;">
          <span style="display: inline-block; padding: 4px 18px; border: 1.5px solid #0f172a; font-size: 13px; font-weight: 700; background-color: #f8fafc; letter-spacing: 0.5px;">
            বার্ষিক পরীক্ষার নম্বরপত্র — ${result.academicYear}
          </span>
        </div>

        <!-- 4. শিক্ষার্থীর তথ্য (ব্যালেন্সড ২ কলাম) -->
        <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0f172a; margin-bottom: 18px; font-size: 13px;">
          <tbody>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="width: 50%; padding: 8px 12px; border-right: 1px solid #0f172a;">
                <span style="color: #64748b; display: inline-block; width: 105px;">শিক্ষার্থীর নাম:</span>
                <strong style="color: #0f172a; font-weight: 700;">${result.studentName}</strong>
              </td>
              <td style="width: 50%; padding: 8px 12px;">
                <span style="color: #64748b; display: inline-block; width: 105px;">রোল নম্বর:</span>
                <strong style="color: #0f172a; font-family: monospace; font-weight: 700; font-size: 14px;">${result.rollNumber}</strong>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="width: 50%; padding: 8px 12px; border-right: 1px solid #0f172a;">
                <span style="color: #64748b; display: inline-block; width: 105px;">পিতার নাম:</span>
                <span style="color: #1e293b;">${result.fatherName || '-'}</span>
              </td>
              <td style="width: 50%; padding: 8px 12px;">
                <span style="color: #64748b; display: inline-block; width: 105px;">রেজিস্ট্রেশন নং:</span>
                <span style="color: #1e293b; font-family: monospace;">${result.registrationNumber || '-'}</span>
              </td>
            </tr>
            <tr>
              <td style="width: 50%; padding: 8px 12px; border-right: 1px solid #0f172a;">
                <span style="color: #64748b; display: inline-block; width: 105px;">জামাত / শ্রেণি:</span>
                <strong style="color: #0f172a; font-weight: 700;">${result.jamaat}</strong>
              </td>
              <td style="width: 50%; padding: 8px 12px;">
                <span style="color: #64748b; display: inline-block; width: 105px;">শিক্ষাবর্ষ:</span>
                <span style="color: #1e293b;">${result.academicYear}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 5. মার্ক এর টেবিল (বিষয় এর নাম, পূর্ণ মান, পাশ মার্ক, প্রাপ্ত নম্বর ও গ্রেড) -->
        <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0f172a; margin-bottom: 20px; font-size: 13px;">
          <thead>
            <tr style="background-color: #f1f5f9; border-bottom: 1.5px solid #0f172a;">
              <th style="padding: 8px 10px; width: 8%; text-align: center; border-right: 1px solid #0f172a; font-weight: 700;">ক্র. নং</th>
              <th style="padding: 8px 12px; width: 44%; text-align: left; border-right: 1px solid #0f172a; font-weight: 700;">বিষয় এর নাম</th>
              <th style="padding: 8px 10px; width: 12%; text-align: center; border-right: 1px solid #0f172a; font-weight: 700;">পূর্ণ মান</th>
              <th style="padding: 8px 10px; width: 12%; text-align: center; border-right: 1px solid #0f172a; font-weight: 700;">পাশ মার্ক</th>
              <th style="padding: 8px 10px; width: 12%; text-align: center; border-right: 1px solid #0f172a; font-weight: 700;">প্রাপ্ত নম্বর</th>
              <th style="padding: 8px 10px; width: 12%; text-align: center; font-weight: 700;">গ্রেড</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <!-- 6. একবারে নিচে সর্বমোট নম্বর, প্রাপ্ত জিপিএ ও মুহতামিম এর স্বাক্ষর -->
      <div style="border-top: 1.5px solid #0f172a; padding-top: 14px; margin-top: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="font-size: 13px; line-height: 1.8;">
            <div>
              <span style="color: #475569;">সর্বমোট নম্বর: </span>
              <strong style="color: #0f172a; font-size: 15px; font-weight: 800;">${result.obtainedTotal} / ${result.totalMarks}</strong>
            </div>
            <div>
              <span style="color: #475569;">প্রাপ্ত জিপিএ: </span>
              <strong style="color: #0f172a; font-size: 15px; font-weight: 800;">${result.gpa} (${result.division})</strong>
            </div>
          </div>
          
          <div style="text-align: right;">
            <span style="color: #64748b; font-size: 12px;">ফলাফল প্রকাশের তারিখ: ${result.publishedDate}</span>
          </div>
        </div>

        <!-- মুহতামিম এর স্বাক্ষর -->
        <div style="display: flex; justify-content: flex-end; margin-top: 36px; padding-bottom: 6px;">
          <div style="text-align: center; width: 210px;">
            <div style="height: 28px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 2px;">
              <span style="font-style: italic; color: #94a3b8; font-size: 12px;">স্বাক্ষরিত</span>
            </div>
            <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; font-weight: 700; font-size: 14px; color: #0f172a;">
              মুহতামিম এর স্বাক্ষর
            </div>
            <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
              ${nameBn}
            </div>
          </div>
        </div>
      </div>

    </div>
  `;

  return container;
}

/**
 * Downloads marksheet as a pristine, non-clipped A4 PDF document
 */
export async function downloadMarksheetAsPdf(
  result: StudentResult,
  settings: Partial<SiteSettings>,
  fileName?: string
): Promise<boolean> {
  const container = createMarksheetContainer(result, settings);
  document.body.appendChild(container);
  try {
    const cleanName = fileName || `Marksheet_Roll_${result.rollNumber}_${result.academicYear}`.replace(/\s+/g, '_');
    return await downloadDomAsPdf(container, cleanName);
  } finally {
    if (container.parentElement) {
      document.body.removeChild(container);
    }
  }
}

/**
 * Downloads marksheet as a pristine, high-resolution PNG image
 */
export async function downloadMarksheetAsImage(
  result: StudentResult,
  settings: Partial<SiteSettings>,
  fileName?: string
): Promise<boolean> {
  const container = createMarksheetContainer(result, settings);
  document.body.appendChild(container);
  try {
    const cleanName = fileName || `Marksheet_Roll_${result.rollNumber}_${result.academicYear}`.replace(/\s+/g, '_');
    return await downloadDomAsImage(container, cleanName);
  } finally {
    if (container.parentElement) {
      document.body.removeChild(container);
    }
  }
}

