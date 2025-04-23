import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {useState} from "react";



export const SearchHeader = (
    {
        sort, onSort, onSearch,engagedAtLabel
    }:
    {
        engagedAtLabel :string,
        sort: { field: string, order: 1 | -1 }
        onSort: (field: string, order: 1 | -1) => void
        onSearch: (field: string, value: string) => void
    }
) => {
    const [keyword, setKeyword] = useState('');
    const sortOptions = [
        { value: 'updatedAt:-1', label: engagedAtLabel +' Desc' },
        { value: 'publishedAt:-1', label: 'Published At Desc' },
        { value: 'title:-1', label: 'Title Desc' },
        { value: 'updatedAt:1', label: engagedAtLabel+' Asc' },
        { value: 'publishedAt:1', label: 'Published At Asc' },
        { value: 'title:1', label: 'Title Asc' }
    ];
    function handleSort(e: DropdownChangeEvent) {
        if (!e.target.value) return;
        const parts = e.target.value.split(":");
        const field = parts[0];
        const order = parts[1] === '1' ? 1 : -1;
        onSort(field, order);
    }

    return <>
        <IconField iconPosition="left">
            <InputIcon className="pi pi-search"/>
            <InputText
                value={keyword}
                placeholder="Keyword Search"
                onChange={e => setKeyword(e.target.value)}
            />
            <Button onClick={() => onSearch('title', keyword)}>Search</Button>
        </IconField>

        <span>
                <span>Sort:</span>
                <Dropdown
                    options={sortOptions}
                    value={sort.field + ":" + sort.order}
                    optionLabel="label"
                    placeholder="Sort "
                    onChange={handleSort}
                    className="w-full sm:w-14rem"
                />
            </span>
    </>;
};