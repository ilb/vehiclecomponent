/* eslint-disable no-unused-vars, n/no-missing-import -- Отключаем eslint no-unused-vars и n/no-missing-import */
import { useState } from "react";
import { Grid } from "semantic-ui-react";
import { connectField, useField } from "uniforms";
import { AutoField } from "uniforms-semantic";

import BodyResource from "../resources/BodyResource.mjs";
import ManufacturerResource from "../resources/ManufacturerResource.mjs";
import ModelResource from "../resources/ModelResource.mjs";
import ModificationResource from "../resources/ModificationResource.mjs";
import SteerLocationResource from "../resources/SteerLocationResource.mjs";
import TransmissionResource from "../resources/TransmissionResource.mjs";
import Dropdown from "./DropdownSemantic";

/**
 * @param {Object} root0
 * @param {number} root0.cols
 * @param {Object} root0.fields
 * @param {Array} root0.additionFields
 * @param {Function} root0.onChange
 * @param {Object} root0.params
 * @returns {JSX.Element}
 */
const VehicleFormSemantic = ({
  cols = 2,
  fields = {},
  additionFields = [],
  onChange,
  params = {},
}) => {
  const { manufacturer, model, modification, body, steerLocation, transmission } = fields;
  const [manufacturerField] = useField(fields.manufacturer.name, {});
  const [modelField] = useField(fields.model.name, {});
  const [bodyField] = useField(fields.model.body, { value: null });

  const [manufacturerCode, setManufacturerCode] = useState(manufacturerField.value || null);
  const [modelCode, setModelCode] = useState(modelField.value || null);
  const [bodyCode, setBodyCode] = useState(bodyField.value || null);
  /**
   * @param {string} name
   * @param {string} value
   * @returns {void}
   */
  const otherOnChange = (name, value) => {
    onChange(name, value);
  };

  const AdditionField = connectField(otherParams => (
    <div>
      {otherParams.displayType === "text" && (
        <>
          <span className="addition-field-label" style={{ float: "left" }}>
            {otherParams.label}:
          </span>
          <span className="addition-field-value" style={{ float: "right", fontWeight: 600 }}>
            {otherParams.value}
          </span>
        </>
      )}
      {otherParams.displayType !== "text" && <AutoField {...otherParams} name="" />}
    </div>
  ));

  return (
    <Grid columns={cols}>
      {manufacturer && (
        <Grid.Column>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            showSearch
            onSelect={option => {
              setManufacturerCode(option.value);
            }}
            resource={manufacturer.resource || ManufacturerResource.get}
            {...manufacturer}
          />
        </Grid.Column>
      )}
      {model && (
        <Grid.Column>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            showSearch
            resource={model.resource || ModelResource.get}
            filters={{ manufacturerCode }}
            onSelect={option => {
              setModelCode(option.value);
            }}
            {...model}
          />
        </Grid.Column>
      )}
      {body && (
        <Grid.Column>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={body.resource || BodyResource.get}
            filters={{ modelCode }}
            onSelect={option => {
              setBodyCode(option.value);
            }}
            {...body}
          />
        </Grid.Column>
      )}
      {/** TODO: filter by modelId */}
      {modification && (
        <Grid.Column>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={modification.resource || ModificationResource.get}
            filters={{
              modelCode,
              ...(bodyCode && { bodyCode }),
              ...params.modification?.filters,
            }}
            showSearch
            {...modification}
          />
        </Grid.Column>
      )}
      {transmission && (
        <Grid.Column>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={transmission.resource || TransmissionResource.get}
            {...transmission}
          />
        </Grid.Column>
      )}
      {steerLocation && (
        <Grid.Column>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={steerLocation.resource || SteerLocationResource.get}
            {...steerLocation}
          />
        </Grid.Column>
      )}
      {additionFields.map((otherParams, key) => (
        <Grid.Column key={key}>
          {otherParams.resource && (
            <Dropdown
              resource={otherParams.resource}
              autocatalogsUrl={otherParams.autocatalogsUrl}
              onSelect={value => {
                otherOnChange(otherParams.name, value.value);
              }}
              {...params}
            />
          )}
          {!params.resource && (
            <div>{!params.resource && <AdditionField name={params.name} />}</div>
          )}
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default VehicleFormSemantic;
/* eslint-enable no-unused-vars, n/no-missing-import -- Возвращаем eslint no-unused-vars и n/no-missing-import */
