import { Card, Divider, Layout, Typography } from 'antd';
import { AutoForm, SubmitField } from 'uniforms-antd';
import createSchemaBridge from '../libs/uniforms-bridge.mjs';
import { VehicleForm as VehicleFormSemantic } from '../semantic';
import { VehicleForm as VehicleFormAntd } from '../antd';
import { useState } from 'react';

export default function App() {
  const [model] = useState({
    vehicleManufacturer: 'Acura',
    vehicleTransmission2: '123'
  });

  return (
    <Layout style={{ height: '100vh', alignItems: 'center' }} className="layout">
      <Card style={{ margin: 20, width: 700 }}>
        <div>
          <AutoForm
            showInlineError
            model={model}
            schema={createSchemaBridge({
              type: 'object',
              properties: {
                vehicleManufacturer: { title: 'Марка', type: 'string' },
                vehicleModel: { title: 'Модель', type: 'string', isNotEmpty: true },
                vehicleModification: { title: 'Модификация', type: 'string' },
                vehicleBody: { title: 'Кузов', type: 'string' },
                vehicleSteerLocation: { title: 'Расположение руля', type: 'string' },
                vehicleTransmission: { title: 'Коробка передач', type: 'string' },
                vehicleTransmission2: { title: 'Коробка передач2', type: 'string' }
              }
            })}>
            <Typography.Title level={3}>Antd</Typography.Title>
            <VehicleFormAntd
              cols={2}
              fields={{
                manufacturer: { name: 'vehicleManufacturer' },
                model: { name: 'vehicleModel' },
                modification: { name: 'vehicleModification' },
                body: { name: 'vehicleBody' },
                transmission: { name: 'vehicleTransmission' },
                steerLocation: { name: 'vehicleSteerLocation' }
              }}
              onChange={console.log}
              additionFields={[
                {
                  name: 'vehicleTransmission2'
                }
              ]}
            />
            <Divider />
            <Typography.Title level={3}>Semantic</Typography.Title>
            <VehicleFormSemantic
              name=""
              fields={{
                manufacturer: { name: 'vehicleManufacturer' },
                model: { name: 'vehicleModel' },
                modification: { name: 'vehicleModification' },
                body: { name: 'vehicleBody' },
                transmission: { name: 'vehicleTransmission' },
                steerLocation: { name: 'vehicleSteerLocation' }
              }}
              additionFields={[
                {
                  name: 'vehicleTransmission2'
                }
              ]}
            />
            <SubmitField />
          </AutoForm>
        </div>
      </Card>
    </Layout>
  );
}
