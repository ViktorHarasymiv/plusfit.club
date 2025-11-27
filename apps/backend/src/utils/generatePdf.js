import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export async function generatePdf(name) {
  const doc = new PDFDocument();
  const filePath = path.join('temp', `${name}-subscription.pdf`);
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);
  doc.fontSize(20).text(`Subscription Confirmation`, { align: 'center' });
  doc.moveDown();
  doc
    .fontSize(14)
    .text(
      `Dear ${name},\n\nYour subscription to IRONMASS Sport Complex was successful.`,
    );
  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => resolve(filePath));
  });
}
