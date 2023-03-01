import { FC, ReactElement, useCallback, useState } from 'react';
import clsx from 'clsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './CopyText.module.scss';

type Props = {
  text: string;
  disabled?: boolean;
  children?: ReactElement;
  additionalClass?: string;
};
const CopyText: FC<Props> = ({
  text,
  disabled = false,
  children,
  additionalClass = '',
}) => {
  const [copied, setCopied] = useState(false);

  const onCopyCallback = useCallback(() => {
    if (disabled) return;

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 700);
  }, [setCopied, disabled]);

  return (
    <div className={clsx(styles['copy-text-wrapper'], additionalClass)} onClick={e => e.stopPropagation()}>
      <>{children}</>
      <CopyToClipboard text={text} onCopy={onCopyCallback}>
        <div
          className={clsx(styles['copy-text-inner'], {
            [styles.disabled]: disabled || copied,
          })}
        >
          <div
            className={clsx(styles['copy-text-animation-wrapper'], {
              [styles.animate]: copied,
            })}
          >
            <span className={styles.label}>Copy</span>
            <span className={styles['animating-content']}>Copied</span>
          </div>
        </div>
      </CopyToClipboard>
    </div>
  );
};

export default CopyText;
