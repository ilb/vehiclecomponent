import { connectField } from "uniforms";
import { SelectField } from "uniforms-antd";
import { useEffect, useState } from "react";

const DropdownAntd = ({
  resource,
  filters = null,
  clientFilter = null,
  onSelect,
  onChange,
  onSetOptions,
  value,
  serverSearch = false,
  showSearch = false,
  autocatalogsUrl,
  ...params
}) => {
  const [defaultValue] = useState(value);
  const [options, setOptions] = useState([]);
  const [prevFilters, setPrevFilters] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (resource && !filters) {
      updateOptions().catch(console.error);
    }
  }, [resource]);

  useEffect(() => {
    filters = { ...filters, query };

    if (filters && filtersHasBeenChanged() && filtersIsApplied()) {
      updateOptions().catch(console.error);
    }
  }, [filters, query]);

  useEffect(() => {
    setPrevFilters({ ...filters, query });

    if (options.length && !options.find(option => option.value === defaultValue)) {
      onChange(null);
      return;
    }

    if (!options.find(option => option.value === value) && !defaultValue) {
      onChange(null);
      return;
    }

    if (options.find(option => option.value === value)) {
      itemSelected(value);
    }
  }, [options, defaultValue]);

  const filtersHasBeenChanged = () => {
    return JSON.stringify(filters) !== JSON.stringify(prevFilters);
  };

  const filtersIsApplied = () => {
    return !!filters && !!Object.values(filters).filter(filter => filter !== null).length;
  };

  const getOptions = async filters => {
    return resource(filters, autocatalogsUrl);
  };

  const updateOptions = async () => {
    getOptions(filters).then(options => {
      setOptions(options);
      onSetOptions && onSetOptions(options);
    });
  };

  const filterByInput = (input, option) => {
    return option.text.toLowerCase().indexOf(input.toLowerCase().trim()) !== -1;
  };

  const itemSelected = value => {
    onSelect &&
      onSelect(
        value,
        options.find(option => option.value === value),
      );
  };

  return (
    <div className="vehiclecomponent-dropdown">
      {params.displayType === "text" && (
        <>
          <span style={{ float: "left" }}>{params.label}:</span>
          <span style={{ float: "right", fontWeight: 600 }}>
            {options.find(option => option.value === value)?.text}
          </span>
        </>
      )}
      {params.displayType !== "text" && (
        <SelectField
          showSearch={showSearch || serverSearch}
          options={options}
          onChange={value => {
            onChange(value);
            itemSelected(value);
          }}
          onDeselect={() => {
            onChange(null);
          }}
          onSearch={query => {
            if (serverSearch) setQuery(query || "");
          }}
          filterOption={(input, option) => {
            if (serverSearch) {
              return true;
            }

            return filterByInput(input, option) && (clientFilter ? clientFilter() : true);
          }}
          {...params}
          name=""
        />
      )}
    </div>
  );
};

export default connectField(DropdownAntd);
