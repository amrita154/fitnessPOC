/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Button, Platform, Text, View} from 'react-native';
import {BucketUnit} from 'react-native-google-fit';
import RNFitnessPOC from './react-native-fitness';
import {
  authorizeGoogleFit,
  getSteps,
  getHeartRate,
  getDistance,
} from './react-native-google-fit';

const App = () => {
  const [steps, setSteps] = useState([]);
  const [heartRate, setHeartRate] = useState([]);
  const [distance, setDistance] = useState([]);

  const options = {
    startDate: moment().subtract('days', 2).toISOString(),
    endDate: moment().toISOString(),
    bucketUnit: BucketUnit.DAY,
  };

  const getFitnessDataForAndroid = async () => {
    await getSteps(options, res => {
      setSteps(res[2].steps);
    });
    setHeartRate(await getHeartRate(options));
    setDistance(await getDistance(options));
  };

  const getGoogleFitData = () => {
    authorizeGoogleFit(() => {
      getFitnessDataForAndroid();
    });
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      getGoogleFitData();
    }
  }, []);

  console.log(steps);

  return (
    <>
      {Platform.OS === 'android' ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View style={{borderWidth: 2, color: 'black', width: '100%'}}></View>
          <Text style={{fontSize: 16}}>
            Steps:-{'\n' + JSON.stringify(steps)}
          </Text>
          <View style={{borderWidth: 2, color: 'black', width: '100%'}}></View>
          <Text style={{fontSize: 16}}>
            Heart rate:-{'\n' + JSON.stringify(heartRate)}
          </Text>
          <View style={{borderWidth: 2, color: 'black', width: '100%'}}></View>
          <Text style={{fontSize: 16}}>
            Distance:-{'\n' + JSON.stringify(distance)}
          </Text>
          <View style={{borderWidth: 2, color: 'black', width: '100%'}}></View>
        </View>
      ) : (
        <RNFitnessPOC/>
      )}
    </>
  );
};

export default App;
