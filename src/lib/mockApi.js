export const mockRiskAnalysis = async (content) => {
  // Mock clause analysis
  return [
    { id: 1, name: 'Force Majeure', risk: 'medium', explanation: 'This clause excuses parties from obligations due to unforeseen events like natural disasters.' },
    { id: 2, name: 'Indemnification', risk: 'high', explanation: 'One-sided indemnification; consider mutual terms.' },
    { id: 3, name: 'Termination', risk: 'low', explanation: 'Standard termination clause with 30-day notice.' },
  ];
};

export const mockGenerateSummary = async (content) => {
  // Mock deal summary generation
  return {
    parties: ['Urban Properties Inc.', 'Fashion Boutique LLC'],
    startDate: 'May 1, 2025',
    endDate: 'April 30, 2030',
    paymentTerms: '$8,500/month with 3% annual increase',
    responsibilities: 'Tenant pays operating expenses; Landlord maintains structure.',
  };
};
