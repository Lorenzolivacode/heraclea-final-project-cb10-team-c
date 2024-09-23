import { useState, useEffect } from "react";

interface CounterProps {
  value: number;
  onChange: (newValue: number) => void;
}

const Counter: React.FC<CounterProps> = ({ value, onChange }) => {
  const [count, setCount] = useState<number>(value);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () =>
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));

  // Esegue l'onChange ogni volta che il valore del contatore cambia
  useEffect(() => {
    onChange(count);
  }, [count]);

  return (
    <>
      <form className="max-w-xs mx-auto ">
        <div className="relative flex items-center">
          <button
            type="button"
            id="decrement-button"
            onClick={decrement}
            className="flex-shrink-0 bg-white border border-sienna p-1 rounded-md"
          >
            <svg
              className="w-2.5 h-2.5 text-sienna"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="counter-input"
            className="flex-shrink-0 text-sienna  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
            value={count}
            readOnly
          />
          <button
            type="button"
            id="increment-button"
            onClick={increment}
            className="flex-shrink-0 bg-white border border-sienna p-1 rounded-md"
          >
            <svg
              className="w-2.5 h-2.5 text-sienna"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
};

export default Counter;
