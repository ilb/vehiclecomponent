import { connectField } from 'uniforms';
import { useEffect, useState } from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

const DropdownAntd = ({
  resource,
  filters = null,
  onSelect,
  onChange,
  serverSearch = false,
  showSearch = false,
  ...params
}) => {
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
    <div>
      <Form.Field>
        {params.label && <label>{params.label}</label>}
        <Dropdown
          fluid
          search={showSearch || serverSearch}
          error={!!params.error && params.error.message}
          selection
          options={options}
          onChange={(event) => {
            onChange(event.target.value);
            onSelect && onSelect(event.target.value);
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
    </div>
  );
};

export default connectField(DropdownAntd);