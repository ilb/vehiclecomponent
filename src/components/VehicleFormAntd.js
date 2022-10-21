import Dropdown from './DropdownAntd';
import { Col, Row } from 'antd';
import ManufacturerResource from '../resources/ManufacturerResource.mjs';
import ModelResource from '../resources/ModelResource.mjs';
import ModificationResource from '../resources/ModificationResource.mjs';
import BodyResource from '../resources/BodyResource.mjs';
import { useState } from 'react';
import SteerLocationResource from '../resources/SteerLocationResource.mjs';
import TransmissionResource from '../resources/TransmissionResource.mjs';
import { AutoField } from 'uniforms-antd';
import { useField } from 'uniforms';

/**
 * @param {int} cols
 * @param {object} fields
 * @param {array} additionFields
 * @param onChange
 * @return {JSX.Element}
 * @constructor
 */
const VehicleFormAntd = ({ cols = 2, fields = {}, additionFields = [], onChange }) => {
  const { manufacturer, model, modification, body, transmission, steerLocation } = fields;
  const [manufacturerField] = useField(fields.manufacturer.name, {});
  const [modelField] = useField(fields.model.name, {});
  const [manufacturerName, setManufacturerName] = useState(manufacturerField.value || null);
  const [modelName, setModelName] = useState(modelField.value || null);

  const _onChange = (name, value) => {
    onChange(name, value);
  };

  return (
    <Row>
      {manufacturer && (
        <Col span={24 / cols}>
          <Dropdown
            showSearch
            onSelect={(value) => {
              setManufacturerName(value);
              _onChange(manufacturer.name, value);
            }}
            resource={ManufacturerResource.get}
            {...manufacturer}
          />
        </Col>
      )}
      {model && (
        <Col span={24 / cols}>
          <Dropdown
            showSearch
            resource={ModelResource.get}
            filters={{ manufacturerName }}
            onSelect={(value) => {
              setModelName(value);
              _onChange(model.name, value);
            }}
            {...model}
          />
        </Col>
      )}
      {modification && (
        <Col span={24 / cols}>
          <Dropdown
            resource={ModificationResource.get}
            filters={{ modelName }}
            showSearch
            onSelect={(value) => {
              _onChange(modification.name, value);
            }}
            {...modification}
          />
        </Col>
      )}
      {body && (
        <Col span={24 / cols}>
          <Dropdown
            resource={BodyResource.get}
            filters={{ modelName }}
            onSelect={(value) => {
              _onChange(body.name, value);
            }}
            {...body}
          />
        </Col>
      )}
      {transmission && (
        <Col span={24 / cols}>
          <Dropdown
            resource={TransmissionResource.get}
            filters={{ modelName }}
            onSelect={(value) => {
              _onChange(transmission.name, value);
            }}
            {...transmission}
          />
        </Col>
      )}
      {steerLocation && (
        <Col span={24 / cols}>
          <Dropdown
            resource={SteerLocationResource.get}
            onSelect={(value) => {
              _onChange(steerLocation.name, value);
            }}
            {...steerLocation}
          />
        </Col>
      )}
      {additionFields.map((params, key) => (
        <Col key={key} span={24 / cols}>
          {params.resource && (
            <Dropdown
              onSelect={(value) => {
                _onChange(params.name, value);
              }}
              {...params}
            />
          )}
          {!params.resource && (
            <div style={{ margin: '0 10px' }}>
              <AutoField {...params} />
            </div>
          )}
        </Col>
      ))}
    </Row>
  );
};

export default VehicleFormAntd;