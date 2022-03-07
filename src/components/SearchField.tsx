type Props = {
    placeholder?: string,
    onChange?: (e: React.FormEvent<HTMLInputElement>) => any
}

const SearchField: React.FC<Props> = ({placeholder, onChange}) => {
    return (
        <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="ri-search-2-line text-gray-400 text-xl" />
            </span>
            <input className="placeholder-gray-400 block bg-white w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-1" 
                onChange={onChange} placeholder={placeholder || "Search for anything..."} type="text" name="search" 
            />
        </label>
    )
}

export default SearchField