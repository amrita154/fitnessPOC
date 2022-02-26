import { Alert } from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';

const authorizeGoogleFit = callBackFunction => {
  const options = {
    scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_BODY_READ,Scopes.FITNESS_HEART_RATE_READ],
  };

  GoogleFit.checkIsAuthorized(options).then(() => {
    if (!GoogleFit.isAuthorized) {
      GoogleFit.authorize(options)
        .then(authResult => {
          if (authResult.success) {
            callBackFunction();
          }
          else{
              Alert.alert("Authorize google fit First");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
        callBackFunction();
    }
  });
};

const getSteps = (opt, callBackFunction) => {
  GoogleFit.getDailyStepCountSamples(opt)
    .then((res)=>{
        callBackFunction(res)
    })
    .catch(err => {
      console.log(err);
    });
};

const getDailySteps = (date, callBackFunction) => {
  GoogleFit.getDailySteps(date)
    .then((res)=>callBackFunction(res))
    .catch(err => {
      console.log(err);
    });
};

const getHeartRate=async(opt)=>{
     const heartrate = await GoogleFit.getHeartRateSamples(opt);
  
  return heartrate;

}

const getDistance=async(opt)=>{
    const res = await GoogleFit.getDailyDistanceSamples(opt);
    return res;
  }

export {authorizeGoogleFit, getSteps, getDailySteps,getHeartRate,getDistance};
