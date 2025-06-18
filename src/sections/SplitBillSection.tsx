import React, { useState, useEffect } from 'react';

interface SplitBillSectionProps {
  formData: any;
}

const SplitBillSection: React.FC<SplitBillSectionProps> = ({ formData }) => {
  return (
    <section id="app-section">
      <div>
        <h2>Split Bill Section</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </section>
  );
};
export default SplitBillSection;