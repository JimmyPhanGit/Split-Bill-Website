import React, { useState } from 'react';
import styles from './SplitBillSection.module.css';
import Button from '../components/Button';
import TextField from '../components/TextField';

interface SplitBillSectionProps {
  formData: {
    receiptName: string;
    tip: string;
    tax: string;
    numPeople: string;
  };
  onBack: () => void;
}

interface Item {
  name: string;
  price: string; 
}

interface Person {
  name: string;
  items: Item[];
}

const SplitBillSection: React.FC<SplitBillSectionProps> = ({ formData, onBack }) => {
  const numPeople = parseInt(formData.numPeople, 10) || 1;
  const [people, setPeople] = useState<Person[]>(
    Array.from({ length: numPeople }, () => ({ name: '', items: [{ name: '', price: '' }] }))
  );

  const handlePersonNameChange = (idx: number, value: string) => {
    setPeople(prev =>
      prev.map((person, i) => i === idx ? { ...person, name: value } : person)
    );
  };

  const handleItemNameChange = (personIdx: number, itemIdx: number, value: string) => {
    setPeople(prev =>
      prev.map((person, i) =>
        i === personIdx
          ? {
              ...person,
              items: person.items.map((item, j) =>
                j === itemIdx ? { ...item, name: value } : item
              ),
            }
          : person
      )
    );
  };

  const handleItemPriceChange = (personIdx: number, itemIdx: number, value: string) => {
    setPeople(prev =>
      prev.map((person, i) =>
        i === personIdx
          ? {
              ...person,
              items: person.items.map((item, j) =>
                j === itemIdx ? { ...item, price: value } : item
              ),
            }
          : person
      )
    );
  };

  // Add new item for a person
  const handleAddItem = (personIdx: number) => {
    setPeople(prev =>
      prev.map((person, i) =>
        i === personIdx
          ? { ...person, items: [...person.items, { name: '', price: '' }] }
          : person
      )
    );
  };

  const getPersonSubtotal = (person: Person) =>
    person.items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  const getPersonTip = (person: Person) =>
    getPersonSubtotal(person) * (parseFloat(formData.tip) || 0) / 100;

  const getPersonTax = (person: Person) =>
    getPersonSubtotal(person) * (parseFloat(formData.tax) || 0) / 100;

  const getPersonTotal = (person: Person) =>
    getPersonSubtotal(person) + getPersonTip(person) + getPersonTax(person);

  const grandSubtotal = people.reduce((sum, person) => sum + getPersonSubtotal(person), 0);
  const grandTip = grandSubtotal * (parseFloat(formData.tip) || 0) / 100;
  const grandTax = grandSubtotal * (parseFloat(formData.tax) || 0) / 100;
  const grandTotal = grandSubtotal + grandTip + grandTax;

  return (
    <section id="app-section" className={styles.appSection}>
      <div className={styles.splitBillWrapper}>
        <div className={styles.peopleInputs}>
          {people.map((person, i) => (
            <div key={i} className={styles.personSection}>
              <TextField
                label=""
                placeholder={`Person ${i + 1} Name`}
                value={person.name}
                onChange={e => handlePersonNameChange(i, e.target.value)}
                required
              />
              {person.items.map((item, j) => (
                <div key={j} className={styles.itemRowFlex}>
                  <div className={styles.itemNameWrapper}>
                    <TextField
                      label=""
                      placeholder={`Item ${j + 1} Name`}
                      value={item.name}
                      onChange={e => handleItemNameChange(i, j, e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.itemPriceWrapper}>
                    <TextField
                      label=""
                      placeholder="$"
                      value={item.price}
                      onChange={e => handleItemPriceChange(i, j, e.target.value)}
                      type="number"
                      required
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="primary"
                onClick={() => handleAddItem(i)}
              >
                Add Item
              </Button>
            </div>
          ))}
        </div>
        <div className={styles.receiptPreview}>
          <div className={styles.receiptPaper}>
            <div className={styles.receiptName}>
              {formData.receiptName || "Receipt Name"}
            </div>
            <div className={styles.receiptPeopleList}>
              {people.map((person, i) => {
                const subtotal = getPersonSubtotal(person);
                const tip = getPersonTip(person);
                const tax = getPersonTax(person);
                const total = getPersonTotal(person);
                return (
                  <div key={i} className={styles.receiptPerson}>
                    <strong>{person.name || `Person ${i + 1}`}</strong>
                    <ul>
                      {person.items
                        .filter(item => item.name.trim() !== '' && item.price)
                        .map((item, j) => (
                          <li key={j}>
                            {item.name} - ${parseFloat(item.price || '0').toFixed(2)}
                          </li>
                        ))}
                    </ul>
                    <div className={styles.receiptBreakdown}>
                      <div className={styles.breakdownRow}>
                        <span>Tip</span>
                        <span className={styles.breakdownValue}>${tip.toFixed(2)}</span>
                      </div>
                      <div className={styles.breakdownRow}>
                        <span>Tax</span>
                        <span className={styles.breakdownValue}>${tax.toFixed(2)}</span>
                      </div>
                      <div className={styles.breakdownRow}>
                        <strong>Total</strong>
                        <strong className={styles.breakdownValue}>${total.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.receiptFooter}>
              <div className={styles.breakdownRow}>
                <span>Tip{formData.tip ? ` (${formData.tip}%)` : ''}</span>
                <span className={styles.breakdownValue}>${grandTip.toFixed(2)}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span>Tax{formData.tax ? ` (${formData.tax}%)` : ''}</span>
                <span className={styles.breakdownValue}>${grandTax.toFixed(2)}</span>
              </div>
              <div className={styles.breakdownRow}>
                <strong>Total</strong>
                <strong className={styles.breakdownValue}>${grandTotal.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
          className={styles.backButton}
        >
          Back
        </Button>
      </div>
    </section>
  );
};

export default SplitBillSection;