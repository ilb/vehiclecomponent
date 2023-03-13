import { connectField } from 'uniforms';
import { useEffect, useState } from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

const DropdownSemantic = ({
  resource,
  filters = null,
  onSelect,
  onChange,
  value,
  serverSearch = false,
  showSearch = false,
  autocatalogsUrl,
  ...params
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [options, setOptions] = useState([]);
  const [prevFilters, setPrevFilters] = useState(null);
  const [query, setQuery] = useState('');

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

    if (!options.find((option) => option.value === value) && !currentValue) {
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
    return resource(filters, autocatalogsUrl);
  };

  return (
    <div>
      {params.displayType === 'text' && (
        <>
          <span className="addition-field-label" style={{ float: 'left' }}>
            {params.label}:
          </span>
          <span className="addition-field-value" style={{ float: 'right', fontWeight: 600 }}>
            {value}
          </span>
        </>
      )}
      {params.displayType !== 'text' && (
        <Form.Field>
          {params.label && <label>{params.label}</label>}
          <Dropdown
            id={params.name}
            fluid
            search={showSearch || serverSearch}
            error={!!params.error && params.error.message}
            selection
            value={currentValue}
            options={options}
            onChange={(event, data) => {
              setCurrentValue(data.value);
              onChange(data.value);
              onSelect && onSelect(data.value);
            }}
            onSearchChange={(query) => {
              if (serverSearch) {
                setQuery(query);
              }
            }}
          />
          {!!params.error && (
            <div
              style={{ width: '100%', textAlign: 'center' }}
              className="ui red basic pointing label">
              {params.error.message}
            </div>
          )}
        </Form.Field>
      )}
    </div>
  );
};

export default connectField(DropdownSemantic);
