import { Card, Layout } from 'antd';
import { AutoForm } from 'uniforms-antd';
import createSchemaBridge from '../libs/uniforms-bridge.mjs';
import { VehicleForm } from '../antd';

export default function App() {
  return (
    <Layout style={{ height: '100vh', alignItems: 'center' }} className="layout">
      <Card style={{ margin: 20, width: 700 }}>
        <div>
          <AutoForm
            showInlineError
            schema={createSchemaBridge({
              type: 'object',
              properties: {
                vehicleManufacturer: { title: 'Марка', type: 'string' },
                vehicleModel: { title: 'Модель', type: 'string' },
                vehicleModification: { title: 'Модификация', type: 'string' },
                vehicleBody: { title: 'Кузов', type: 'string' },
                vehicleSteerLocation: { title: 'Расположение руля', type: 'string' },
                vehicleYear: { title: 'Год выпуска', type: 'number', min: 1900, max: 2100, step: 1 }
              }
            })}>
            <VehicleForm
              cols={2}
              fields={{
                manufacturer: { name: 'vehicleManufacturer' },
                model: { name: 'vehicleModel' },
                modification: { name: 'vehicleModification' },
                body: { name: 'vehicleBody' },
                steerLocation: { name: 'vehicleSteerLocation' },
                year: { name: 'vehicleYear' }
              }}
            />
          </AutoForm>
        </div>
      </Card>
    </Layout>
  );
}
