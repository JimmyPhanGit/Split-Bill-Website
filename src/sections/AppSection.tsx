import React, { useState } from 'react';
import styles from './AppSection.module.css';
import TextField from '../components/TextField';

const AppSection = () => {
  const [receiptName, setReceiptName] = useState('');
  const [tip, setTip] = useState('');
  const [tax, setTax] = useState('');
  const [numPeople, setNumPeople] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can use the collected data here
    console.log({ receiptName, tip, tax, numPeople });
  };

  return (
    <section id="app-section" className={styles.appSection}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Receipt Name"
          placeholder="Enter receipt name"
          value={receiptName}
          onChange={e => setReceiptName(e.target.value)}
        />
        <TextField
          label="Tip %"
          placeholder="Enter tip percentage"
          value={tip}
          onChange={e => setTip(e.target.value)}
          type="number"
        />
        <TextField
          label="Tax %"
          placeholder="Enter tax percentage"
          value={tax}
          onChange={e => setTax(e.target.value)}
          type="number"
        />
        <TextField
          label="Number of People"
          placeholder="Enter number of people"
          value={numPeople}
          onChange={e => setNumPeople(e.target.value)}
          type="number"
        />
        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1.5rem' }}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default AppSection;