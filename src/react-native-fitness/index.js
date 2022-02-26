import React, {useEffect, useState} from 'react';
import Fitness from '@ovalmoney/react-native-fitness';
import {Alert, NativeModules, Text, View} from 'react-native';
import moment from 'moment';

const RNFitnessPOC = () => {
  const permissions = [
    {
      kind: Fitness.PermissionKinds.Steps,
      access: Fitness.PermissionAccesses.Read,
    },
    {
      kind: Fitness.PermissionKinds.Distances,
      access: Fitness.PermissionAccesses.Read,
    },
    {
      kind: Fitness.PermissionKinds.HeartRate,
      access: Fitness.PermissionAccesses.Read,
    },
  ];

  const [steps, setSteps] = useState([]);
  const [heartRate, setHeartRate] = useState([]);
  const [distance,setDistance]=useState([]);

  const getSteps = () => {
    Fitness.getSteps({
      startDate:moment().subtract('days',1).toISOString(),
      endDate: moment().toISOString(),
      interval: 'days',
    })
      .then(res => {
        console.log('steps', res);
        setSteps(res);
      })
      .catch(errr => {
        console.log('error in steps' + errr);
      });
  };

  const getHeartRate = () => {
    //App crashes when data is there
    Fitness.getHeartRate({
     startDate:moment().subtract('days',2).toISOString(),
      endDate: moment().toISOString()
    })
      .then(res => {
        console.log('heart rate', res);
        setHeartRate(res);
      })
      .catch(errr => {
        console.log('error in heart rate' + errr);
      });
  };

  const getDistance=()=>{
     Fitness.getDistances({
      startDate:moment().subtract('days',1).toISOString(),
      endDate: moment().toISOString(),
      interval: 'days',
    }).then(res => {
        console.log('distance', res);
        setDistance(res);
      })
      .catch(errr => {
        console.log('error in distance' + errr);
      });
  }

  useEffect(() => {
    if (permissions) {
      Fitness.isAuthorized(permissions)
        .then(res => {
          if (!res) {
            Fitness.requestPermissions(permissions)
              .then(result => {
                // Alert.alert('result' + result);
                getSteps();
               
                getDistance();
                 getHeartRate();
              })
              .catch(error => {
                Alert.alert('error in requesting' + error);
              });
          } else {
            // Alert.alert('result' + res);
            getSteps();
           
            getDistance();
             getHeartRate();
          }
        })
        .catch(err => {
          Alert.alert('error' + err);
        });
    }
  }, []);

  return (
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
  );
};

export default RNFitnessPOC;
