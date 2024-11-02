import React from 'react'

interface Props{
    stack: string
    updateFilters: (stack: string) => void
    checked: boolean
}

const FilterCheckbox: React.FC<Props> = ({checked, stack, updateFilters}) => {
  return (
    <div className="flex gap-2 items-center">
        <input onClick={() => updateFilters(stack)} type="checkbox" value={stack} checked={checked} id={stack} className="w-4 h-4 cursor-pointer" />
        <label htmlFor={stack} className="text-sm font-normal text-[#667085] cursor-pointer leading-5">{stack}</label>
    </div>
  )
}

export default FilterCheckbox
