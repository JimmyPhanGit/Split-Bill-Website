import styles from './HeroSection.module.css';
import Reciept from '/reciept-picture.png';

const HeroSection = () => {
  return (
    <section id="hero-section" className={styles.hero}>
        <div className={styles.content}>
            <h1>
                Split Bill Calculator
            </h1>
            <p>
                For those who always pick up the bill to split with friends, this app is for you!
            </p>
            <p>
                Just enter the total amount, the number of people, tip, tax then let the app do the rest!
            </p>
        </div>
              <div className={styles.imageDiv}>
        <img
          src={Reciept}
          alt="Picture of a receipt"
          className={styles.recieptImage}
        />
      </div>
    </section>
  );
};

export default HeroSection;