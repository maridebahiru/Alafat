
import jsPDF from 'jspdf';
import { Product } from './types';

interface CartItem extends Product {
  quantity: number;
}

interface ReceiptData {
  cartItems: CartItem[];
  totalAmount: number;
  customerName?: string;
  date: Date;
  receiptNumber: string;
}

export const generateReceiptPDF = (data: ReceiptData) => {
  const pdf = new jsPDF();
  
  // Header
  pdf.setFontSize(20);
  pdf.setTextColor(60, 16, 18); // Primary color
  pdf.text('Alafat Shop Receipt', 20, 30);
  
  // Receipt details
  pdf.setFontSize(10);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Receipt #: ${data.receiptNumber}`, 20, 45);
  pdf.text(`Date: ${data.date.toLocaleDateString()}`, 20, 55);
  pdf.text(`Time: ${data.date.toLocaleTimeString()}`, 20, 65);
  
  if (data.customerName) {
    pdf.text(`Customer: ${data.customerName}`, 20, 75);
  }
  
  // Line separator
  pdf.line(20, 85, 190, 85);
  
  // Items header
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text('Item', 20, 100);
  pdf.text('Qty', 120, 100);
  pdf.text('Price', 140, 100);
  pdf.text('Total', 170, 100);
  
  // Items
  pdf.setFont(undefined, 'normal');
  pdf.setFontSize(10);
  let yPos = 115;
  
  data.cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    
    // Truncate long names
    const itemName = item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name;
    
    pdf.text(itemName, 20, yPos);
    pdf.text(item.quantity.toString(), 120, yPos);
    pdf.text(`${item.price} ETB`, 140, yPos);
    pdf.text(`${itemTotal} ETB`, 170, yPos);
    
    yPos += 15;
  });
  
  // Line separator
  pdf.line(20, yPos + 5, 190, yPos + 5);
  
  // Total
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text(`Grand Total: ${data.totalAmount} ETB`, 20, yPos + 20);
  
  // Footer
  pdf.setFontSize(8);
  pdf.setFont(undefined, 'normal');
  pdf.text('Thank you for shopping with Alafat!', 20, yPos + 40);
  pdf.text('Visit us at: https://yealafatzemare.netlify.app', 20, yPos + 50);
  
  return pdf;
};

export const downloadReceipt = (data: ReceiptData) => {
  const pdf = generateReceiptPDF(data);
  pdf.save(`Alafat-Receipt-${data.receiptNumber}.pdf`);
};

export const generateReceiptNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ALF-${timestamp}-${random}`;
};
