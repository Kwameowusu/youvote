import React from 'react';
import styles from './InsightCard.module.css';
import { useHexes } from '../../libs';
import { Spinner } from '../Spinner';
// import clsx from 'clsx';

export interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
  value?: number;
  hexColor: string;
  isValueLoading: boolean
}

export const InsightCard = React.forwardRef<HTMLDivElement, InsightCardProps>((props, ref) => {
  const { className, title, value, hexColor, isValueLoading, ...rest } = props;
  const { AddMidOpacity, AddLightOpacity, AddDeepOpacity } = useHexes()

  return (
    <>
      <div ref={ref} className={styles.root}
        style={{
          border: `1px solid ${AddMidOpacity(hexColor)}`,
          backgroundColor: AddLightOpacity(hexColor),
          color: AddDeepOpacity(hexColor)
        }}
        {...rest}
      >
        <span className={styles.title}>{title}</span>
        {
          
          isValueLoading ?
            <>
              <span className={styles.value} >
                {value}
              </span>
            </> :
            <Spinner />
        }
      </div>
    </>
  );
})

InsightCard.displayName = 'InsightCard';