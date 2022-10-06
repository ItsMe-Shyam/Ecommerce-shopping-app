
import React, {Fragment, useState} from 'react';

import './Search.css';
const Search = ({history}) => {
    const [keyword, setKeyword] = useState('');

    const inputChangeHandler = e => {
        setKeyword(e.target.value);
    }

    const submitHandler = e => {
        e.preventDefault();
        if(keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push("/products");
        }
    }

  return (
    <Fragment>
        <form className='search-form' onSubmit={submitHandler}>
            <input className='search-input' type="text" placeholder='Search a product...' onChange={inputChangeHandler} />
            <button className='search-btn' type="submit">Search</button>
        </form>
    </Fragment>
  )
}

export default Search