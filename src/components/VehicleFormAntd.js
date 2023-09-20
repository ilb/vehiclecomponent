import Dropdown from './DropdownAntd';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import ManufacturerResource from '../resources/ManufacturerResource.mjs';
import ModelResource from '../resources/ModelResource.mjs';
import ModificationResource from '../resources/ModificationResource.mjs';
import BodyResource from '../resources/BodyResource.mjs';
import { useState } from 'react';
import SteerLocationResource from '../resources/SteerLocationResource.mjs';
import TransmissionResource from '../resources/TransmissionResource.mjs';
import { AutoField } from 'uniforms-antd';
import { useField, useForm } from 'uniforms';

/**
 * @param {int} cols
 * @param {object} fields
 * @param {array} additionFields
 * @param onChange
 * @param {{autocatalogsUrl}} params
 * @return {JSX.Element}
 * @constructor
 */
const VehicleFormAntd = ({ cols = 2, fields = {}, additionFields = [], onChange, params = {} }) => {
  const { manufacturer, model, modification, body, transmission, steerLocation } = fields;
  const [manufacturerField] = useField(fields.manufacturer.name, {});
  const [modelField] = useField(fields.model.name, {});
  const [bodyField] = useField(fields.model.body, { value: null });
  const form = useForm();
  const [manufacturerName, setManufacturerName] = useState(manufacturerField.value || null);
  const [modelId, setModelId] = useState();
  const [modelName, setModelName] = useState(modelField.value || null);
  const [bodyName, setBodyName] = useState(bodyField.value || null);

  const _onChange = (name, value) => {
    onChange && onChange(name, value);
  };

  return (
    <Row>
      {manufacturer && (
        <Col span={24 / cols}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            showSearch
            onSelect={(value, { text }) => {
              setManufacturerName(text);
              _onChange(manufacturer.name, value);
            }}
            resource={manufacturer.resource || ManufacturerResource.get}
            {...manufacturer}
          />
        </Col>
      )}
      {model && (
        <Col span={24 / cols}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            showSearch
            resource={model.resource || ModelResource.get}
            filters={{ manufacturerName }}
            onSelect={(value, { id, text }) => {
              setModelId(id);
              setModelName(text);
              _onChange(model.name, value);
            }}
            {...model}
          />
        </Col>
      )}
      {body && (
        <Col span={24 / cols}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={body.resource || BodyResource.get}
            filters={{ modelName }}
            onSelect={(value, { text }) => {
              setBodyName(text);
              _onChange(body.name, value);
            }}
            {...body}
          />
        </Col>
      )}
      {modification && (
        <Col span={24 / cols}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={modification.resource || ModificationResource.get}
            filters={{
              modelName,
              ...(bodyName && { bodyName }),
              ...(modelId && { modelId }),
              ...params.modification.filters
            }}
            showSearch
            onSelect={(value, { data }) => {
              transmission && form.onChange(transmission.name, data.transmission.name);
              _onChange(modification.name, value);
            }}
            {...modification}
          />
        </Col>
      )}
      {steerLocation && (
        <Col span={24 / cols}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={steerLocation.resource || SteerLocationResource.get}
            onSelect={(value) => {
              _onChange(steerLocation.name, value);
            }}
            {...steerLocation}
          />
        </Col>
      )}
      {transmission && (
        <Col span={24 / cols}>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={transmission.resource || TransmissionResource.get}
            filters={{ modelName }}
            onSelect={(value) => {
              _onChange(transmission.name, value);
            }}
            {...transmission}
          />
        </Col>
      )}
      {additionFields.map((params, key) => (
        <Col key={key} span={24 / cols}>
          {params.resource && (
            <Dropdown
              autocatalogsUrl={params.autocatalogsUrl}
              resource={params.resource}
              onSelect={(value) => {
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
