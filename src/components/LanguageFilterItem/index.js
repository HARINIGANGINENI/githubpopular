
const LanguageFilterItem=props=>{
    const{
        isSelected,
        languageFilter,
        setSelectedLanguageFilter,
    }=props 

    const onClickLanguageFilter=()=>{
        setSelectedLanguageFilter(languageFilter.id)
    }

    return(
        <li>
            <button className="button" type="button" onClick={onClickLanguageFilter}>
            {languageFilter.language}
            </button>
        </li>
    )
    }

export default LanguageFilterItem