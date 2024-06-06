'use client';

import useMediaQuery from '@mui/material/useMediaQuery';
import { IoSearch } from 'react-icons/io5';

const Search = () => {
    const matches = useMediaQuery('(min-width:1200px)');

    if (matches) {
        return (
            <form className="h-search w-full flex max-w-[500px] ml-4 mr-[50px] items-center border-2 border-[#f3f3f3] rounded pl-4">
                <input
                    type="text"
                    id="search"
                    name="search"
                    className="outline-none text-smally w-full"
                    placeholder="Tìm kiếm ..."
                />
                <button type="button" className="text-color-icon px-3 top-0 bottom-0 right-0">
                    <IoSearch fontSize={20} />
                </button>
            </form>
        );
    }
};

export default Search;
