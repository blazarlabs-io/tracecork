import { useRef, useEffect, useState } from "react";
import { useTokenizer } from "@/context/tokenizer";
import { StorageSensors, Wine } from "@/types/db";
("../services/logger");
export const useStorageSensorData = (wine: Wine, wineId: string) => {
  const { getBatch, batchDetails } = useTokenizer();
  const [sensorData, setSensorData] = useState<any>(null);
  const mountRef = useRef<boolean>(false);
  const margin = 5;

  useEffect(() => {
    if (wine && !mountRef.current) {
      mountRef.current = true;
      getBatch(wine?.tokenization?.tokenRefId as string);
    }

    if (batchDetails) {
      //   setSensorData(JSON.parse(batchDetails.batch_data.mdata));
      type SensorData = {
        data: StorageSensors[];
        minValue: {
          temperature: number;
          light: number;
          vibration: number;
          humidity: number;
        };
        maxValue: {
          temperature: number;
          light: number;
          vibration: number;
          humidity: number;
        };
      };

      const _sensorData: SensorData = {
        data: JSON.parse(batchDetails.batch_data.mdata),
        minValue: {
          temperature: 100,
          light: 100,
          vibration: 100,
          humidity: 100,
        },
        maxValue: { temperature: 0, light: 0, vibration: 0, humidity: 0 },
      };

      // for each object in the sensor data array, add new key with minValue and maxValue
      if (_sensorData && _sensorData.data) {
        _sensorData.data.forEach((object: any) => {
          /* 
          calculate and store the min (make sure min is not 0 if there are other values) and max values for each of the following elements in the object: 
              temperature, light, vibration, humidity. 
          At the end we get an object like:
          {
              data: _sensorData,
              minValue: {
                  temperature: 0,
                  light: 0,
                  vibration: 0,
                  humidity: 0
              },
              maxValue: {
                  temperature: 0,
                  light: 0,
                  vibration: 0,
                  humidity: 0
              }
          }
          */

          // Make sure min value is not 0 if there are other min values
          if (object.temperature > 0) {
            // console.log(
            //   "object.temperature",
            //   _sensorData.minValue.temperature,
            //   object.temperature,
            // );
            _sensorData.minValue.temperature = Math.min(
              _sensorData.minValue.temperature,
              object.temperature,
            );
          }

          if (object.light > 0) {
            _sensorData.minValue.light = Math.min(
              _sensorData.minValue.light,
              object.light,
            );
          }

          if (object.vibration > 0) {
            _sensorData.minValue.vibration = Math.min(
              _sensorData.minValue.vibration,
              object.vibration,
            );
          }

          if (object.humidity > 0) {
            _sensorData.minValue.humidity = Math.min(
              _sensorData.minValue.humidity,
              object.humidity,
            );
          }

          _sensorData.maxValue.temperature = Math.max(
            _sensorData.maxValue.temperature,
            object.temperature,
          );
          _sensorData.maxValue.light = Math.max(
            _sensorData.maxValue.light,
            object.light,
          );
          _sensorData.maxValue.vibration = Math.max(
            _sensorData.maxValue.vibration,
            object.vibration,
          );
          _sensorData.maxValue.humidity = Math.max(
            _sensorData.maxValue.humidity,
            object.humidity,
          );

          setSensorData(() => _sensorData);
        });
      }
    }
  }, [wine, batchDetails]);

  return { sensorData };
};
