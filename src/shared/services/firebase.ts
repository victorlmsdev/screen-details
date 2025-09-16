import firebaseRemoteConfig from "@react-native-firebase/remote-config";

export class FirebaseService {
  private static remoteConfig = firebaseRemoteConfig();

  constructor() {
    FirebaseService.remoteConfig.setDefaults({
      TodayRecommendation: JSON.stringify({
        type: "movie",
        id: 808,
      }),
    });
  }

  static initialize = async () => {
    await FirebaseService.remoteConfig.fetchAndActivate();
    await FirebaseService.remoteConfig.fetch(300);
  };

  static getRemoteConfigValue = (remoteKey: string) => {
    const value = FirebaseService.remoteConfig.getValue(remoteKey);

    return value;
  };
}
