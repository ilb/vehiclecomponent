/* eslint-disable no-unused-vars, no-param-reassign, unicorn/prefer-array-some -- Отключаем eslint no-unused-vars и no-param-reassign */
import { useEffect, useState } from "react";
import { Dropdown, Form } from "semantic-ui-react";
import { connectField } from "uniforms";

/**
 * @param {Object} root0
 * @param {Function} root0.resource
 * @param {Object} root0.filters
 * @param {Function} root0.onSelect
 * @param {Function} root0.onChange
 * @param {string} root0.value
 * @param {boolean} root0.serverSearch
 * @param {boolean} root0.showSearch
 * @param {string} root0.autocatalogsUrl
 * @returns {JSX.Element}
 */
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
  const [query, setQuery] = useState("");
  const [isLoadDatata, setLoadData] = useState(false);

  /**
   * @param {Object} otherFilters
   * @returns {Promise<void>}
   */
  const getOptions = async otherFilters => {
    setLoadData(true);
    resource(otherFilters, autocatalogsUrl)
      .then(res => {
        setOptions(res);
      })
      .catch(console.error)
      .finally(() => setLoadData(false));
  };

  /**
   * @returns {boolean}
   */
  const filtersHasBeenChanged = () => prevFilters && JSON.stringify(filters) !== JSON.stringify(prevFilters);

  /**
   * @returns {boolean}
   */
  const filtersIsApplied = () => !!filters && !!Object.values(filters).filter(filter => filter !== null).length;

  useEffect(async () => {
    if (resource && !filters) {
      setOptions(await getOptions(filters));
    }
  }, [resource]);

  useEffect(async () => {
    filters = { ...filters, query };
    if (filters && filtersHasBeenChanged() && filtersIsApplied() && !isLoadDatata) {
      getOptions(filters).catch(console.error);
    }
  }, [filters, query]);

  /**
   * @param {string} otherValue
   * @param {Array} otherOptions
   * @returns {void}
   */
  const itemSelected = (otherValue, otherOptions) => {
    if (onSelect) {
      onSelect(otherOptions.find(option => option.value === otherValue));
    }
  };

  useEffect(() => {
    setPrevFilters({ ...filters, query });

    if (options && !options.find(option => option.value === value) && !currentValue) {
      onChange(null);
      return;
    }

    if (options && options.find(option => option.value === value)) {
      itemSelected(value, options);
    }
  }, [options]);


  return (
    <div>
      {params.displayType === "text" && (
        <>
          <span className="addition-field-label" style={{ float: "left" }}>
            {params.label}:
          </span>
          <span className="addition-field-value" style={{ float: "right", fontWeight: 600 }}>
            {value}
          </span>
        </>
      )}
      {params.displayType !== "text" && (
        <Form.Field>
          {params.label && <label>{params.label}</label>}
          <Dropdown
            id={params.name}
            fluid
            search={showSearch || serverSearch}
            error={!!params.error && params.error.message}
            selection
            value={currentValue}
            options={options?.map(({ label, ...option }) => option)}
            onChange={(event, changeData) => {
              setCurrentValue(changeData.value);
              onChange(changeData.value);
              itemSelected(changeData.value, changeData.options);
            }}
            onSearchChange={otherQuery => {
              if (serverSearch) {
                setQuery(otherQuery);
              }
            }}
          />
          {!!params.error && (
            <div
              style={{ width: "100%", textAlign: "center" }}
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
/* eslint-enable no-unused-vars, no-param-reassign, unicorn/prefer-array-some -- Возвращаем eslint no-unused-vars и no-param-reassign */
