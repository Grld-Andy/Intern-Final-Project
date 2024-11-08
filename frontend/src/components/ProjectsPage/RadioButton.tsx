import React from 'react'

interface Props{
    sortBy: string
    setSort: (sortBy: string) => void
    checked: boolean
}

const RadioButton: React.FC<Props> = ({sortBy, setSort, checked}) => {
  return (
    <div className="flex gap-2 items-center">
        <input type="radio" defaultChecked={checked} id={sortBy} value={sortBy} onClick={() => setSort(sortBy)} name="sort" className="w-4 h-4 cursor-pointer" />
        <label htmlFor={sortBy} className="text-sm font-normal text-[#667085] cursor-pointer leading-5">{sortBy}</label>
    </div>
  )
}

export default RadioButton
