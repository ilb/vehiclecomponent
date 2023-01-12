import { useState } from 'react';
import Dropdown from './DropdownSemantic';
import ManufacturerResource from '../resources/ManufacturerResource.mjs';
import ModelResource from '../resources/ModelResource.mjs';
import ModificationResource from '../resources/ModificationResource.mjs';
import BodyResource from '../resources/BodyResource.mjs';
import SteerLocationResource from '../resources/SteerLocationResource.mjs';
import { Grid } from 'semantic-ui-react';
import TransmissionResource from '../resources/TransmissionResource.mjs';
import { AutoField } from 'uniforms-semantic';
import { connectField, useField } from 'uniforms';

const VehicleFormSemantic = ({ cols = 2, fields = {}, additionFields = [], onChange }) => {
  const { manufacturer, model, modification, body, steerLocation, transmission } = fields;
  const [manufacturerField] = useField(fields.manufacturer.name, {});
  const [modelField] = useField(fields.model.name, {});
  const [manufacturerName, setManufacturerName] = useState(manufacturerField.value || null);
  const [modelName, setModelName] = useState(modelField.value || null);

  const _onChange = (name, value) => {
    onChange(name, value);
  };

  const AdditionField = connectField((params) => {
    return (
      <div>
        {params.displayType === 'text' && (
          <>
            <span className="addition-field-label" style={{ float: 'left' }}>{params.label}:</span>
            <span className="addition-field-value" style={{ float: 'right', fontWeight: 600 }}>{params.value}</span>
          </>
        )}
        {params.displayType !== 'text' && <AutoField {...params} name="" />}
      </div>
    );
  });

  return (
    <Grid columns={cols}>
      {manufacturer && (
        <Grid.Column>
          <Dropdown
            showSearch
            onSelect={setManufacturerName}
            resource={ManufacturerResource.get}
            {...manufacturer}
          />
        </Grid.Column>
      )}
      {model && (
        <Grid.Column>
          <Dropdown
            showSearch
            resource={ModelResource.get}
            filters={{ manufacturerName }}
            onSelect={setModelName}
            {...model}
          />
        </Grid.Column>
      )}
      {modification && (
        <Grid.Column>
          <Dropdown
            resource={ModificationResource.get}
            filters={{ modelName }}
            showSearch
            {...modification}
          />
        </Grid.Column>
      )}
      {body && (
        <Grid.Column>
          <Dropdown resource={BodyResource.get} filters={{ modelName }} {...body} />
        </Grid.Column>
      )}
      {transmission && (
        <Grid.Column>
          <Dropdown resource={TransmissionResource.get} {...transmission} />
        </Grid.Column>
      )}
      {steerLocation && (
        <Grid.Column>
          <Dropdown resource={SteerLocationResource.get} {...steerLocation} />
        </Grid.Column>
      )}
      {additionFields.map((params, key) => (
        <Grid.Column key={key}>
          {params.resource && (
            <Dropdown
              onSelect={(value) => {
                _onChange(params.name, value);
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
