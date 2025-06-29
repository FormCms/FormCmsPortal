import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {useState} from "react";


export const SearchHeader = (
    {
        searchField, sortFields, sort, onSort, onSearch
    }:
    {
        searchField: string,
        sortFields: { value: string, label: string }[]
        sort: { field: string, order: 1 | -1 }
        onSort: (field: string, order: 1 | -1) => void
        onSearch: (field: string, value: string) => void
    }
) => {
    const [keyword, setKeyword] = useState('');
    const sortOptions = [
        ...sortFields.map(fld => ({
            value: `${fld.value}:-1`,
            label: `${fld.label} Desc`
        })),
        ...sortFields.map(fld => ({
            value: `${fld.value}:1`,
            label: `${fld.label} Asc`
        })),
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
            <Button onClick={() => onSearch(searchField, keyword)}>Search</Button>
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