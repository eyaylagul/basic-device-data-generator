# IoT Cihaz İzleme Panosu

Bu proje, statik verileri sunan bir REST API ve IoT cihazlarından gerçek zamanlı veri simülasyonu yapan bir WebSocket sunucusu içeren basit bir IoT cihaz izleme panosu sağlar.

## Gereksinimler

- Docker

### Çalıştırma
```bash
docker-compose up
```

## Servisler
- REST API: http://localhost:3000/devices
- WebSocket: ws://localhost:3001

### Örnek Endpoint'ler
#### Cihazların Listesi
- URL: GET /api/devices
- Örnek Yanıt:
```json
[
  {
    "id": "device1",
    "name": "Temperature Sensor",
    "type": "sensor",
    "status": "active",
    "productionLine": "Line A",
    "lastConnected": "2024-05-21T10:00:00Z",
    "location": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  }
]
```


### WebSocket Detayları
WebSocket sunucusu, IoT cihazlarından gelen gerçek zamanlı verileri simüle eder ve varsayılan olarak 3001 portunda çalışır.
#### Device data
- CHANNEL: deviceData
- Örnek Yanıt:
```json
{
    "id": "device2",
    "temperature": 26.87847258988768,
    "pressure": 107.66833076719195,
    "speed": 9.655723294708878,
    "timestamp": "2024-05-24T07:24:54.981Z"
}
```
- CHANNEL: notifications
- Örnek Yanıt:
```json
{
  "id": "872f8b38-be9c-47f1-9311-33f07ab8ca1e",
  "deviceId": "device2",
  "type": "temperature_high",
  "message": "Temperature level is above 25°C",
  "timestamp": "2024-05-24T07:26:28.581Z"
}
```