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
import { connectField, useField, useForm } from 'uniforms';

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
  const form = useForm();
  const [manufacturerName, setManufacturerName] = useState(manufacturerField.value || null);
  const [modelName, setModelName] = useState(modelField.value || null);

  const _onChange = (name, value) => {
    onChange && onChange(name, value);
  };

  const AdditionField = connectField((params) => {
    return (
      <div style={{ margin: '0 10px' }}>
        {params.displayType === 'text' && (
          <>
            <span style={{ float: 'left' }}>{params.label}:</span>
            <span style={{ float: 'right', fontWeight: 600 }}>{params.value}</span>
          </>
        )}
        {params.displayType !== 'text' && <AutoField {...params} name="" />}
      </div>
    );
  });

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
            onSelect={(value, { data }) => {
              body && form.onChange(body.name, data.vehicleBody.name);
              transmission && form.onChange(transmission.name, data.vehicleTransmission.name);
              _onChange(modification.name, value);
            }}
            {...modification}
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
          {!params.resource && <AdditionField name={params.name} />}
        </Col>
      ))}
    </Row>
  );
};

export default VehicleFormAntd;
