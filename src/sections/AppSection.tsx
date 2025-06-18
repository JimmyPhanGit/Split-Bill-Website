import React, { useState, useEffect } from 'react';
import styles from './AppSection.module.css';
import TextField from '../components/TextField';
import Button from '../components/Button';


const AppSection = () => {
  const [receiptName, setReceiptName] = useState('');
  const [tip, setTip] = useState('');
  const [tax, setTax] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [typedReceiptName, setTypedReceiptName] = useState('');
  const [isCaretBlinking, setIsCaretBlinking] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ receiptName, tip, tax, numPeople });
  };

  useEffect(() => {
    setTypedReceiptName('');
    if (!receiptName) return;

    let i = 0;
    const interval = setInterval(() => {
      setTypedReceiptName(receiptName.slice(0, i + 1));
      i++;
      if (i === receiptName.length) clearInterval(interval);
    }, 120); // slower typing speed

    return () => clearInterval(interval);
  }, [receiptName]);

  useEffect(() => {
  setIsCaretBlinking(true);

  const timeout = setTimeout(() => {
    setIsCaretBlinking(false);
  }, 10000);

  return () => clearTimeout(timeout);
}, [receiptName]);

  return (
    <section id="app-section" className={styles.appSection}>
      <div className={styles.formAndReceipt}>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <TextField
            label="Receipt Name"
            placeholder="Enter receipt name"
            value={receiptName}
            onChange={e => setReceiptName(e.target.value)}
            required
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
          <div className={styles.buttonWrapper}>
            <Button type="submit" variant="primary">
              Start
            </Button>
          </div>
        </form>
        <div className={styles.receiptPreview}>
          <div className={styles.receiptPaper}>
            <div className={styles.receiptName}>
              <span className={`${styles.typing} ${!isCaretBlinking ? styles.noCaret : ''}`}>
                {typedReceiptName || "Receipt Name"}
              </span>
            </div>
            <div className={styles.receiptPeople}>
              {numPeople ? `People: ${numPeople}` : "People: --"}
            </div>
            <div className={styles.receiptFooter}>
              <div>Tip: {tip ? `${tip}%` : "--"}</div>
              <div>Tax: {tax ? `${tax}%` : "--"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;