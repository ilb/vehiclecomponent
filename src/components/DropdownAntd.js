/* eslint-disable no-unused-vars, no-param-reassign, unicorn/prefer-array-some -- Отключаем eslint no-unused-vars и no-param-reassign */
import { useEffect, useState } from "react";
import { connectField } from "uniforms";
import { SelectField } from "uniforms-antd";

/**
 * @param {Object} root0
 * @param {Function} root0.resource
 * @param {Object} root0.filters
 * @param {Function} root0.clientFilter
 * @param {Function} root0.onSelect
 * @param {Function} root0.onChange
 * @param {Function} root0.onSetOptions
 * @param {string} root0.value
 * @param {boolean} root0.serverSearch
 * @param {boolean} root0.showSearch
 * @param {string} root0.autocatalogsUrl
 * @returns {JSX.Element}
 */
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
  const [isLoadDatata, setLoadData] = useState(false);

  /**
   * @returns {boolean}
   */
  const filtersHasBeenChanged = () =>
    prevFilters && JSON.stringify(filters) !== JSON.stringify(prevFilters);

  /**
   * @returns {boolean}
   */
  const filtersIsApplied = () =>
    !!filters && !!Object.values(filters).filter(filter => filter !== null).length;

  /**
   * @param {Object} otherFilters
   * @returns {Promise<Array>}
   */
  const getOptions = async otherFilters => resource(otherFilters, autocatalogsUrl);

  /**
   * @returns {Promise<void>}
   */
  const updateOptions = async () => {
    setLoadData(true);

    getOptions(filters)
      .then(otherOptions => {
        setOptions(otherOptions);
        if (onSetOptions) {
          onSetOptions(otherOptions);
        }
      })
      .catch(console.error)
      .finally(() => setLoadData(false));
  };

  /**
   * @param {string} itemValue
   * @returns {void}
   */
  const itemSelected = itemValue => {
    if (onSelect) {
      onSelect(
        itemValue,
        options.find(option => option.value === itemValue),
      );
    }
  };

  useEffect(() => {
    if (resource && !filters) {
      updateOptions().catch(console.error);
    }
  }, [resource]);

  useEffect(() => {
    filters = { ...filters, query };
    if (filters && filtersHasBeenChanged() && filtersIsApplied() && !isLoadDatata) {
      updateOptions().catch(console.error);
    }
  }, [filters, query]);

  useEffect(() => {
    setPrevFilters({ ...filters, query });

    if (value !== defaultValue && !options.find(option => option.value === value)) {
      onChange(null);
      return;
    }
    if (options.length && !options.find(option => option.value === defaultValue)) {
      onChange(null);
      return;
    }

    if (options.find(option => option.value === value)) {
      itemSelected(value);
    }
  }, [options, defaultValue]);

  /**
   * @param {string} input
   * @param {Object} option
   * @returns {boolean}
   */
  const filterByInput = (input, option) =>
    option.text.toLowerCase().includes(input.toLowerCase().trim());

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
          loading={isLoadDatata}
          onChange={changeValue => {
            onChange(changeValue);
            itemSelected(changeValue);
          }}
          onDeselect={() => {
            onChange(null);
          }}
          onSearch={searchQuery => {
            if (serverSearch) {
              setQuery(searchQuery || "");
            }
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
/* eslint-enable no-unused-vars, no-param-reassign, unicorn/prefer-array-some -- Возвращаем названия переменных */
