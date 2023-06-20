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

const VehicleFormSemantic = ({ cols = 2, fields = {}, additionFields = [], onChange, params = {} }) => {
  const { manufacturer, model, modification, body, steerLocation, transmission } = fields;
  const [manufacturerField] = useField(fields.manufacturer.name, {});
  const [modelField] = useField(fields.model.name, {});
  const [bodyField] = useField(fields.model.body, { value: null });
  const [manufacturerName, setManufacturerName] = useState(manufacturerField.value || null);
  const [modelName, setModelName] = useState(modelField.value || null);
  const [bodyName, setBodyName] = useState(bodyField.value || null);

  const _onChange = (name, value) => {
    onChange(name, value);
  };

  const AdditionField = connectField((params) => {
    return (
      <div>
        {params.displayType === 'text' && (
          <>
            <span className="addition-field-label" style={{ float: 'left' }}>
              {params.label}:
            </span>
            <span className="addition-field-value" style={{ float: 'right', fontWeight: 600 }}>
              {params.value}
            </span>
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
            autocatalogsUrl={params.autocatalogsUrl}
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
            autocatalogsUrl={params.autocatalogsUrl}
            showSearch
            resource={ModelResource.get}
            filters={{ manufacturerName }}
            onSelect={setModelName}
            {...model}
          />
        </Grid.Column>
      )}
      {body && (
        <Grid.Column>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={BodyResource.get}
            filters={{ modelName }}
            onSelect={setBodyName}
            {...body}
          />
        </Grid.Column>
      )}
      {modification && (
        <Grid.Column>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={ModificationResource.get}
            filters={{ modelName, ...(bodyName && { bodyName }), ...params.modification.filters }}
            showSearch
            {...modification}
          />
        </Grid.Column>
      )}
      {transmission && (
        <Grid.Column>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={TransmissionResource.get}
            {...transmission}
          />
        </Grid.Column>
      )}
      {steerLocation && (
        <Grid.Column>
          <Dropdown
            autocatalogsUrl={params.autocatalogsUrl}
            resource={SteerLocationResource.get}
            {...steerLocation}
          />
        </Grid.Column>
      )}
      {additionFields.map((params, key) => (
        <Grid.Column key={key}>
          {params.resource && (
            <Dropdown
              autocatalogsUrl={params.autocatalogsUrl}
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
