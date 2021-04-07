function Filter({ searchName, handleSearchChange}) {
  return (
    <div>
        Filter Names: <input value={searchName} onChange={handleSearchChange} />
    </div>
  )
}

export default Filter;