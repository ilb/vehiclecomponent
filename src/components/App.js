/* eslint-disable no-unused-vars, n/no-missing-import -- Отключаем eslint no-unused-vars */
import { Card, Divider, Layout, Typography } from "antd";
import { useState } from "react";
import { AutoForm, SubmitField, TextField } from "uniforms-antd";

import { VehicleForm as VehicleFormAntd } from "../antd";
import createSchemaBridge from "../libs/uniforms-bridge.mjs";
import { VehicleForm as VehicleFormSemantic } from "../semantic";

/**
 * @returns {React.ReactNode}
 */
export default function App() {
  const [manufacturerModelValue, setManufacturerModelValue] = useState("");
  const [model] = useState({});
  const [year, setVehicleYear] = useState();

  return (
    <Layout style={{ height: "100vh", alignItems: "center" }} className="layout">
      <Card style={{ margin: 20, width: 700 }}>
        <div>
          <AutoForm
            showInlineError
            model={model}
            schema={createSchemaBridge({
              type: "object",
              properties: {
                vehicleManufacturer: { title: "Марка", type: "string" },
                vehicleModel: { title: "Модель", type: "string", isNotEmpty: true },
                vehicleModification: { title: "Модификация", type: "string" },
                vehicleBody: { title: "Кузов", type: "string" },
                vehicleSteerLocation: { title: "Расположение руля", type: "string" },
                vehicleTransmission: { title: "Коробка передач", type: "string" },
                vehicleYear: { title: "Год выпуска", type: "string" },
                vehicleManufacturerModel: { title: "Марка, модель ТС", type: "string" },
              },
            })}>
            <TextField
              name="vehicleYear"
              step={1}
              min={1900}
              max={2100}
              controls={false}
              value={year}
              onChangeCapture={event => {
                const eventValue = event.target.value;

                setVehicleYear(eventValue);
              }}
            />
            <Typography.Title level={3}>Antd</Typography.Title>
            <VehicleFormAntd
              params={{
                autocatalogsUrl: "https://bb.avclick.ru/autocatalogstest/api",
                modification: {
                  ...(year && { filters: { year } }),
                },
              }}
              cols={2}
              fields={{
                manufacturer: { name: "vehicleManufacturer" },
                model: { name: "vehicleModel" },
                modification: { name: "vehicleModification" },
                steerLocation: { name: "vehicleSteerLocation" },
                body: { name: "vehicleBody" },
                transmission: { name: "vehicleTransmission" },
                manufacturerModel: {
                  name: "vehicleManufacturerModel",
                  setManufacturerModelValue,
                  value: manufacturerModelValue,
                },
              }}
            />
            <Divider />
            <Typography.Title level={3}>Semantic</Typography.Title>
            <VehicleFormSemantic
              params={{
                autocatalogsUrl: "https://bb.avclick.ru/autocatalogstest/api",
                modification: {
                  ...(year && { filters: { year } }),
                },
              }}
              name=""
              fields={{
                manufacturer: { name: "vehicleManufacturer" },
                model: { name: "vehicleModel" },
                modification: { name: "vehicleModification" },
                body: { name: "vehicleBody" },
                transmission: { name: "vehicleTransmission" },
                steerLocation: { name: "vehicleSteerLocation" },
              }}
            />{" "}
            <SubmitField />
          </AutoForm>
        </div>
      </Card>
    </Layout>
  );
}
/* eslint-enable no-unused-vars, n/no-missing-import -- Возвращаем названия переменных */
