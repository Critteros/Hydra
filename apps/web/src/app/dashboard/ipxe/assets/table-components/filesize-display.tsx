import { useState, useLayoutEffect } from 'react';

type FilesizeDisplayProps = {
  filesizeBytes: number;
};

const filesizePrefixes = ['B', 'kB', 'MB', 'GB', 'TB'] as const;

export function FilesizeDisplay({ filesizeBytes }: FilesizeDisplayProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [unit, setUnit] = useState('');

  useLayoutEffect(() => {
    let curentUnitIndex = 0;
    let currentValue = filesizeBytes;

    while (currentValue > 1024) {
      currentValue /= 1024;
      curentUnitIndex++;
    }
    setDisplayValue(currentValue);
    setUnit(filesizePrefixes[curentUnitIndex]!);
  }, [filesizeBytes]);

  return (
    <div className="flex flex-row gap-1">
      <span>{displayValue.toFixed(2)}</span>
      <span>{unit}</span>
    </div>
  );
}
