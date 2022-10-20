import Dropdown from './Dropdown';
import { Col, Row } from 'antd';
import ManufacturerResource from '../resources/ManufacturerResource.mjs';
import ModelResource from '../resources/ModelResource.mjs';
import ModificationResource from '../resources/ModificationResource.mjs';
import BodyResource from '../resources/BodyResource.mjs';
import { useState } from 'react';
import { AutoField } from 'uniforms-antd';
import SteerLocationResource from '../resources/SteerLocationResource.mjs';

const VehicleForm = ({ cols = 2, fields = {} }) => {
  const { manufacturer, model, modification, body, steerLocation, year } = fields;
  const [manufacturerName, setManufacturerName] = useState(null);
  const [modelName, setModelName] = useState(null);

  return (
    <Row>
      {manufacturer && (
        <Col span={24 / cols}>
          <Dropdown
            showSearch
            onSelect={setManufacturerName}
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
            onSelect={setModelName}
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
            {...modification}
          />
        </Col>
      )}
      {body && (
        <Col span={24 / cols}>
          <Dropdown resource={BodyResource.get} filters={{ modelName }} {...body} />
        </Col>
      )}
      {steerLocation && (
        <Col span={24 / cols}>
          <Dropdown resource={SteerLocationResource.get} {...steerLocation} />
        </Col>
      )}
      {year && (
        <Col span={24 / cols}>
          <div style={{ margin: '0 10px' }}>
            <AutoField {...year} />
          </div>
        </Col>
      )}
    </Row>
  );
};

export default VehicleForm;
