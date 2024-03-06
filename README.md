## Установка:

```
npm install @ilb/vehiclecomponent
```

## Использование:

### Подключение:

#### Для antd:

```
import { VehicleForm } from "@ilb/vehiclecomponent/src/antd";
```

#### Для semantic:

```

```

### Использование:

```
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
```

## Параметры VehicleForm:

| Название | Описание                                                                                                          | Значение по умолчанию |
| -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- |
| `cols`   | Количество колонок                                                                                                | 2                     |
| `fields` | Обьект с параметрами, которые прокидываются компоненту поля. Указываются только те поля которые нужно отобразить. | {}                    |
