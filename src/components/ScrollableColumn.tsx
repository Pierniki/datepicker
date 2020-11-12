import React, { useEffect, useRef, useState } from 'react';
import { mod } from '../utility';

const getValuesToDisplay = (
  valuesArray: number[] | string[],
  currentValue: number
) => {
  const step = 3;
  const from = mod(currentValue - step, valuesArray.length);
  const to = mod(currentValue + step, valuesArray.length);
  if (to > from) return valuesArray.slice(from, to + 1);
  return [...valuesArray.slice(from), ...valuesArray.slice(0, to + 1)];
};

const getStyleFromIdx = (idx: number): React.CSSProperties => {
  const centerIdx = 3;
  const idxDifference = centerIdx - idx;
  const heightDecrease = 10;
  const opacityDecrease = 0.44;
  const degreeDecrease = 20;

  return {
    minHeight: 50 - Math.abs(idxDifference) * heightDecrease,
    opacity: 1 - Math.abs(idxDifference) * opacityDecrease,
    transform: `rotateX(${idxDifference * degreeDecrease}deg)`,
  };
};

interface IScrolalbleColumnProps {
  currentValueIdx: number;
  setCurrentValueIdx: React.Dispatch<React.SetStateAction<number>>;
  valuesArray: number[] | string[];
  className?: string;
}

const ScrollableColumn: React.FC<IScrolalbleColumnProps> = ({
  currentValueIdx,
  setCurrentValueIdx,
  valuesArray,
  className,
}) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const prevMouseY = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = 50;
  }, []);

  const onMouseUp = () => {
    setIsScrolling(false);
  };

  const onMouseDown = () => {
    setIsScrolling(true);
  };

  const scroll = (isScrollingTop: boolean) => {
    const length = valuesArray.length;
    const valueToAdd = isScrollingTop ? 1 : -1;
    setCurrentValueIdx(mod(currentValueIdx + valueToAdd, length));
  };

  const onMove = (clientY: number) => {
    if (Math.abs(prevMouseY.current - clientY) < 25) return;
    scroll(prevMouseY.current > clientY);
    prevMouseY.current = clientY;
  };

  const onMouseMove = ({
    clientY,
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isScrolling) onMove(clientY);
  };

  const onTouchMove = ({ touches }: React.TouchEvent<HTMLDivElement>) => {
    if (touches) onMove(touches[0].clientY);
  };

  const onClick = (value: number | string) => {
    if (isScrolling) return;
    const displayArray = getValuesToDisplay(valuesArray, currentValueIdx);
    const indexOfValue = displayArray.indexOf(value);
    const indexOfCurrentValue = displayArray.indexOf(
      valuesArray[currentValueIdx]
    );
    if (indexOfValue === indexOfCurrentValue) return;
    scroll(indexOfValue > indexOfCurrentValue);
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    scroll(e.deltaY > 0);
  };

  return (
    <div
      ref={containerRef}
      className={`scroll_column ${className}`}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseLeave={onMouseUp}
    >
      {getValuesToDisplay(valuesArray, currentValueIdx).map((value, idx) => (
        <button
          style={getStyleFromIdx(idx)}
          className={`scroll_button`}
          key={`scroll-btn-${idx}-$`}
          onClick={() => onClick(value)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default ScrollableColumn;
