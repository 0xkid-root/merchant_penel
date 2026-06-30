'use client';

import { useState, useRef } from 'react';
import { Upload, Building2, Send } from 'lucide-react';
import { toast } from 'sonner';

interface WithdrawalRequestFormProps {
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

const bankAccounts = [
  {
    id: '1',
    bank: 'HDFC Bank - 1234',
    account: '*****1234',
    ifsc: 'HDFC0001234',
    display: 'HDFC Bank - 1234\nA/C No: *****1234 | IFSC: HDFC0001234',
  },
  {
    id: '2',
    bank: 'ICICI Bank - 5678',
    account: '*****5678',
    ifsc: 'ICIC0005678',
    display: 'ICICI Bank - 5678\nA/C No: *****5678 | IFSC: ICIC0005678',
  },
];

const paymentMethods = ['NEFT', 'RTGS', 'IMPS'];

export function WithdrawalRequestForm({ onSubmit, isSubmitting }: WithdrawalRequestFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    amount: '',
    bankAccount: bankAccounts[0].id,
    paymentMethod: 'NEFT',
    remarks: '',
    document: null as File | null,
  });

  const [documentName, setDocumentName] = useState('');

  const availableBalance = 1482350.00;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    setFormData(prev => ({ ...prev, amount: value }));
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large - Maximum file size is 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, document: file }));
      setDocumentName(file.name);
      toast.success(`${file.name} has been selected`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-accent');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-accent');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-accent');
    handleFileSelect(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount) {
      toast.error('Please enter an amount');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (amount > availableBalance) {
      toast.error(`You cannot withdraw more than ₹${availableBalance.toLocaleString('en-IN')}`);
      return;
    }

    await onSubmit(formData);
    toast.success('Your withdrawal request has been submitted for review');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
      {/* Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 600, color: '#111827', margin: '0 0 24px 0' }}>Withdrawal Details</h2>

        {/* Available Balance */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>Available Balance</label>
            <div className="group relative cursor-help">
              <span style={{ fontSize: '12px', color: '#6b7280' }}>ⓘ</span>
              <div className="absolute bottom-full left-0 mb-2 hidden w-48 rounded bg-gray-800 p-2 text-xs text-white group-hover:block z-10">
                Your current wallet balance
              </div>
            </div>
          </div>
          <div style={{ padding: '12px 16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', fontWeight: 500, color: '#111827' }}>
            ₹{availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Amount to Withdraw */}
          <div>
            <label htmlFor="amount" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>
              Amount to Withdraw <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ padding: '12px 16px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRight: 'none', borderRadius: '8px 0 0 8px', color: '#4b5563', fontWeight: 500 }}>₹</span>
              <input
                id="amount"
                type="text"
                placeholder="1,00,000.00"
                value={formData.amount}
                onChange={handleAmountChange}
                style={{ flex: 1, padding: '12px 16px', border: '1px solid #e5e7eb', borderLeft: 'none', borderRadius: '0 8px 8px 0', backgroundColor: 'white', color: '#111827', fontSize: '14px' }}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>Enter the amount you want to withdraw.</p>
          </div>

          {/* Bank Account */}
          <div>
            <label htmlFor="bank" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>
              Bank Account <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              id="bank"
              value={formData.bankAccount}
              onChange={(e) => setFormData(prev => ({ ...prev, bankAccount: e.target.value }))}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: 'white', color: '#111827', fontSize: '14px' }}
            >
              {bankAccounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.bank}
                </option>
              ))}
            </select>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
              {bankAccounts.find(a => a.id === formData.bankAccount)?.display.replace('\n', ' | ')}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="method" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>
            Payment Method <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            id="method"
            value={formData.paymentMethod}
            onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
            style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: 'white', color: '#111827', fontSize: '14px' }}
          >
            {paymentMethods.map(method => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>Select the payment method for withdrawal.</p>
        </div>

        {/* Remarks */}
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="remarks" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>
            Remarks <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            id="remarks"
            placeholder="Withdrawal for business expenses"
            value={formData.remarks}
            onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
            rows={4}
            style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: 'white', color: '#111827', fontSize: '14px', fontFamily: 'inherit', resize: 'none' }}
          />
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>Provide a brief reason for this withdrawal.</p>
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>
            Upload Document <span style={{ color: '#6b7280' }}>(Optional)</span>
          </label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{ border: '2px dashed #e5e7eb', borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Upload style={{ width: '32px', height: '32px', color: '#6366f1', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '14px', color: '#111827', fontWeight: 500, margin: '0 0 4px 0' }}>
              Drag and drop file here or{' '}
              <span style={{ color: '#6366f1', textDecoration: 'underline' }}>click to upload</span>
            </p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
              Supports JPG, PNG, PDF (Max. 5MB)
            </p>
            {documentName && (
              <p style={{ fontSize: '12px', color: '#16a34a', marginTop: '8px' }}>✓ {documentName}</p>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileSelect(e.target.files)}
            style={{ display: 'none' }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
          <button
            type="button"
            style={{ padding: '12px 24px', border: '1px solid #e5e7eb', borderRadius: '8px', fontWeight: 500, color: '#111827', backgroundColor: 'white', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ flex: 1, padding: '12px 24px', backgroundColor: '#6366f1', color: 'white', borderRadius: '8px', fontWeight: 500, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#4f46e5')}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
          >
            {isSubmitting ? (
              <>
                <div style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send style={{ width: '16px', height: '16px' }} />
                <span>Submit Request</span>
              </>
            )}
          </button>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </form>
  );
}
