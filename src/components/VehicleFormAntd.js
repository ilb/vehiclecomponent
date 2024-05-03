import Dropdown from "./DropdownAntd";
import Col from "antd/lib/grid/col";
import Row from "antd/lib/grid/row";
import ManufacturerResource from "../resources/ManufacturerResource.mjs";
import ModelResource from "../resources/ModelResource.mjs";
import ModificationResource from "../resources/ModificationResource.mjs";
import BodyResource from "../resources/BodyResource.mjs";
import { useState } from "react";
import SteerLocationResource from "../resources/SteerLocationResource.mjs";
import TransmissionResource from "../resources/TransmissionResource.mjs";
import { AutoField, TextField } from "uniforms-antd";
import { useField, useForm } from "uniforms";

/**
 * @param {int} cols
 * @param {object} fields
 * @param {array} additionFields
 * @param onChange
 * @param {{autocatalogsUrl}} params
 * @return {JSX.Element}
 * @constructor
 */
const VehicleFormAntd = ({
  gutter = [],
  fields = {},
  additionFields = [],
  onChange,
  params = {},
}) => {
  const {
    manufacturer,
    model,
    modification,
    body,
    transmission,
    steerLocation,
    manufacturerModel,
  } = fields;
  const [manufacturerField] = useField(fields.manufacturer.name, {});
  const [modelField] = useField(fields.model.name, {});
  const [bodyField] = useField(fields.model.body, { value: null });
  const [modificationField] = useField(fields.modification.name, {});
  const form = useForm();
  const [manufacturerName, setManufacturerName] = useState(manufacturerField.value || null);
  const [modelId, setModelId] = useState();
  const [modelName, setModelName] = useState(modelField.value || null);
  const [bodyName, setBodyName] = useState(bodyField.value || null);
  // Design params
  const manufacturerCol = manufacturer?.col || 2;
  const modelCol = model?.col || 2;
  const manufacturerModelCol = manufacturerModel?.col || 2;
  const bodyCol = body?.col || 2;
  const modificationCol = modification?.col || 2;
  const steerLocationCol = steerLocation?.col || 2;
  const transmissionCol = transmission?.col || 2;

  const _onChange = (name, value) => {
    onChange && onChange(name, value);
  };

  return (
    <Row gutter={gutter}>
      {manufacturer && (
        <Col span={24 / manufacturerCol}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            showSearch
            onSelect={(value, _params) => {
              setManufacturerName(_params?.text);
              setModelId(null);
              setModelName(null);
              setBodyName(null);
              if (manufacturerField.value !== value) {
                params.setFinalEstimation && params.setFinalEstimation("");
                model && form.onChange(model.name, null);
                body && form.onChange(body.name, null);
                modification && form.onChange(modification.name, null);
                transmission && form.onChange(transmission.name, null);
              }
            }}
            resource={manufacturer.resource || ManufacturerResource.get}
            {...manufacturer}
          />
        </Col>
      )}
      {model && (
        <Col span={24 / modelCol}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            showSearch
            resource={model.resource || ModelResource.get}
            filters={{ manufacturerName }}
            onSelect={(value, _params) => {
              setModelId(_params?.id);
              setModelName(_params?.text);
              setBodyName(null);
              if (modelField.value !== value) {
                params.setFinalEstimation && params.setFinalEstimation("");
                manufacturerModel &&
                  manufacturerModel.setManufacturerModelValue(
                    `${manufacturerName} ${_params?.text}`,
                  );
                body && form.onChange(body.name, null);
                modification && form.onChange(modification.name, null);
                transmission && form.onChange(transmission.name, null);
              }
            }}
            {...model}
          />
        </Col>
      )}
      {manufacturerModel && (
        <Col span={24 / manufacturerModelCol}>
          <TextField
            onInput={event => {
              manufacturerModel.setManufacturerModelValue(event.target.value);
            }}
            {...manufacturerModel}
          />
        </Col>
      )}
      {body && (
        <Col span={24 / bodyCol}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={body.resource || BodyResource.get}
            filters={{ modelName }}
            onSelect={(value, params) => {
              setBodyName(params?.text);
              _onChange(body.name, value);
            }}
            {...body}
          />
        </Col>
      )}
      {modification && (
        <Col span={24 / modificationCol}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={modification.resource || ModificationResource.get}
            filters={{
              modelName,
              ...(bodyName && { bodyName }),
              ...(modelId && { modelId }),
              ...params.modification?.filters,
            }}
            showSearch
            onSelect={(value, _params) => {
              transmission && form.onChange(transmission.name, _params?.data?.transmission.name);
              _onChange(modification.name, value);
              if (modificationField.value !== value) {
                params.setFinalEstimation && params.setFinalEstimation("");
              }
            }}
            {...modification}
          />
        </Col>
      )}
      {steerLocation && (
        <Col span={24 / steerLocationCol}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={steerLocation.resource || SteerLocationResource.get}
            onSelect={value => {
              _onChange(steerLocation.name, value);
            }}
            {...steerLocation}
          />
        </Col>
      )}
      {transmission && (
        <Col span={24 / transmissionCol}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={transmission.resource || TransmissionResource.get}
            filters={{ modelName }}
            onSelect={value => {
              _onChange(transmission.name, value);
            }}
            {...transmission}
          />
        </Col>
      )}
      {additionFields.map((params, key) => (
        <Col key={key} span={24 / 2}>
          {params.resource && (
            <Dropdown
              autocatalogsUrl={params.autocatalogsUrl}
              resource={params.resource}
              onSelect={value => {
                _onChange(params.name, value);
              }}
              {...params}
            />
          )}
          {!params.resource && (
            <div className="vehiclecomponent-input">
              <AutoField {...params} />
            </div>
          )}
        </Col>
      ))}
    </Row>
  );
};

export default VehicleFormAntd;
