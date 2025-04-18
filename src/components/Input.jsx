// InputBox.jsx

import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
  theme = "light"
}) {
  const amountInputId = useId();
  
  const baseClasses = "p-4 rounded-lg text-sm flex items-center";
  const themeClasses = theme === 'dark' 
    ? "bg-gray-800/50 border border-gray-700" 
    : "bg-white/80 border border-gray-100";
  
  return (
    <div className={`${baseClasses} ${themeClasses} ${className}`}>
      <div className="w-1/2 pr-4">
        <label
          htmlFor={amountInputId}
          className={`${theme === 'dark' ? 'text-white/60' : 'text-black/50'} mb-2 inline-block font-medium`}
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className={`outline-none w-full bg-transparent py-2 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/50'} mb-2 w-full font-medium`}>
          Currency Type
        </p>
        <select
          className={`rounded-lg px-3 py-2 cursor-pointer outline-none w-full md:w-auto ${
            theme === 'dark' 
              ? 'bg-gray-700 text-white border border-gray-600' 
              : 'bg-gray-100 text-gray-800 border border-gray-200'
          }`}
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;