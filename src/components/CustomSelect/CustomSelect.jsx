import { useEffect, useRef, useState } from "react"

import "./CustomSelect.css"

function CustomSelect({
  value,
  options,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const selectRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }
  }, [])

  const selectedOption = options.find(
    (option) => option.value === value
  )

  const handleOptionClick = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div
      className="custom-select"
      ref={selectRef}
    >
      <button
        type="button"
        className={`custom-select-button ${isOpen ? "custom-select-button-open" : ""
          }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>
          {selectedOption?.label}
        </span>

        <span
          className={`custom-select-arrow ${isOpen ? "custom-select-arrow-open" : ""
            }`}
        >
          ˅
        </span>
      </button>

      {isOpen && (
        <div className="custom-select-menu">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`custom-select-option ${option.value === value
                  ? "custom-select-option-active"
                  : ""
                }`}
              onClick={() =>
                handleOptionClick(option.value)
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect