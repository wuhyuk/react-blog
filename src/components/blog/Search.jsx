import React, {useState} from 'react';
import './search.css';

function Search({ onSearch }) {
  const [search, setSearch] = useState('');

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(search);
  };

  return (
    <div className='search-container'>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearchSubmit}>search</button>
    </div>
  );
}

export default Search;