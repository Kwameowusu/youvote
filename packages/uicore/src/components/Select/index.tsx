
import React from "react"
import styles from "./Select.module.css"
import clsx from "clsx"

type SelectProps = {
  selected: string
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  optionList: Array<{ id: string; option: string; value: string }>
  placeholder: string
  className?: string,
  isFullwidth?: boolean
} & React.HTMLAttributes<HTMLSelectElement>

export const Select = ({ selected, handleChange, optionList, placeholder, className, isFullwidth,...props }: SelectProps) => {

  const classes = clsx([
    styles.root,
    {
      [styles.isFullwidth]: isFullwidth,
    },
    className
  ])

  return (
    <>
      <select
      required
        {...props}
        className={classes}
        value={selected || ""}
        onChange={handleChange}>
        <option className={styles.placeholder} value="" hidden>
          {placeholder}
        </option>
        {optionList.length !== 0
          ? optionList.map((option,index) => (
            <option key={index} value={option.value}>
              {option.option}
            </option>
          ))
          : ""}
      </select>
    </>
  )
}

Select.displayName = "Select"