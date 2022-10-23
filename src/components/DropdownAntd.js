import { connectField } from 'uniforms';
import { SelectField } from 'uniforms-antd';
import { useEffect, useState } from 'react';

const DropdownAntd = ({
  resource,
  filters = null,
  onSelect,
  onChange,
  value,
  serverSearch = false,
  showSearch = false,
  ...params
}) => {
  console.log(params.name, params);
  const [defaultValue] = useState(value);
  const [options, setOptions] = useState([]);
  const [prevFilters, setPrevFilters] = useState(null);
  const [query, setQuery] = useState(null);

  useEffect(async () => {
    if (resource && !filters) {
      setOptions(await getOptions(filters));
    }
  }, [resource]);

  useEffect(async () => {
    filters = { ...filters, query };

    if (filters && filtersHasBeenChanged() && filtersIsApplied()) {
      setOptions(await getOptions(filters));
    }
  }, [filters, query]);

  useEffect(() => {
    setPrevFilters({ ...filters, query });

    if (!options.find((option) => option.value === value) && !defaultValue) {
      onChange(null);
    }
  }, [options]);

  const filtersHasBeenChanged = () => {
    return JSON.stringify(filters) !== JSON.stringify(prevFilters);
  };

  const filtersIsApplied = () => {
    return !!filters && !!Object.values(filters).filter((filter) => filter !== null).length;
  };

  const getOptions = async (filters) => {
    return resource(filters);
  };

  return (
    <div style={{ margin: '0 10px' }}>
      {params.displayType === 'text' && (
        <>
          <span style={{ float: 'left' }}>{params.label}:</span>
          <span style={{ float: 'right', fontWeight: 600 }}>{value}</span>
        </>
      )}
      {params.displayType !== 'text' && (
        <SelectField
          showSearch={showSearch || serverSearch}
          options={options}
          onChange={(value) => {
            onChange(value);
            onSelect && onSelect(value);
          }}
          onDeselect={() => {
            onChange(null);
          }}
          onSearch={(query) => {
            if (serverSearch) setQuery(query);
          }}
          filterOption={(input, option) => {
            return (
              serverSearch || option.text.toLowerCase().indexOf(input.toLowerCase().trim()) !== -1
            );
          }}
          {...params}
          name=""
        />
      )}
    </div>
  );
};

export default connectField(DropdownAntd);
