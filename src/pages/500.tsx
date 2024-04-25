import styles from './index.module.less';

export default function Custom500() {
  return (
    <div className={styles['custom500']}>
      <div className={styles['status']}>
        <h1 className={styles['status-code']}>500</h1>
        <span className={styles['status-message']}>Server-side error occurred</span>
      </div>
    </div>
  );
}
