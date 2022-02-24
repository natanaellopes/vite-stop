import React from 'react';

type ProgressProps = {
  percent: number,
  type: string,
}

export const Progress = ({ percent, type }: ProgressProps) => {
  return (
    <div className="progress">
      <div 
        className={`progress-bar progress-bar-${type}`}
        style={{ width: `${percent}%` }}>
      </div>
    </div>
  );
};
