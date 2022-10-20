## Установка:
```
npm install @ilb/vehiclecomponent
```

## Использование:
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
| Название | Значение по умолчанию | Возможные значения                                                                                                          |
|----------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `cols`   | 2                     | 1, 2, 3, 4, 6, 8, 12                                                                                                        |
| `fields` | {}                    | Принимает обьект с параметрами, которые прокидываются компоненту поля. Указываются только те поля которые нужно отобразить. |
