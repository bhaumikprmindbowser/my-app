import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import {useRef, useState} from "react";
import {Button, Pressable, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {AVPlaybackStatusSuccess, ResizeMode, Video} from "expo-av";
import {AntDesign} from "@expo/vector-icons";
import {Feather} from "@expo/vector-icons";
import {FontAwesome6} from "@expo/vector-icons";
import {colors} from "@/theme";

export default function CameraRender() {
  const [permission, requestPermission] = useCameraPermissions();
  const [microPhonePremission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const ref = useRef<CameraView | null>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);
  const [videoPlayStatus, setvideoPlayStatus] = useState<AVPlaybackStatusSuccess|{}>({});

  if (!permission || !microPhonePremission) {
    return null;
  }

  if (!permission.granted || !microPhonePremission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: "center"}}>
          We need your permission to use the camera
        </Text>
        <Button
          onPress={async () => {
            await requestPermission();
            await requestMicrophonePermission();
          }}
          title="Grant permission"
        />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri ?? null);
  };

  const recordVideo = async () => {
    if (recording) {
      setRecording(false);
      ref.current?.stopRecording();
      return;
    }
    if (ref.current) {
      setRecording(true);
      const video = await ref.current?.recordAsync({});
      setUri(video?.uri ?? null);
      setRecording(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = () => {
    return (
      <View>
        <Image
          source={uri ? {uri} : (undefined as any)}
          contentFit="contain"
          style={{width: 300, aspectRatio: 1}}
        />
        <Button onPress={() => setUri(null)} title="Take another picture" />
      </View>
    );
  };

  const renderVideo = () => (
    <View>
      <Video
        source={uri ? {uri} : (undefined as any)}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        style={{width: 300, height: 300}}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={status => setvideoPlayStatus(() => status)}
      />
      <View>
        <Button
          title={videoPlayStatus?.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            videoPlayStatus?.isPlaying ? ref.current?.pauseAsync?.() : ref.current?.playAsync?.()
          }
        />
      </View>
      <Button onPress={() => setUri(null)} title="Record another video" />
    </View>
  );

  const renderCamera = () => {
    return (
      <CameraView
        key={mode}
        style={styles.camera}
        ref={ref}
        mode={mode}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          <Pressable onPress={toggleMode}>
            {mode === "picture" ? (
              <Feather name="video" size={32} color="white" />
            ) : (
              <AntDesign name="picture" size={32} color="white" />
            )}
          </Pressable>
          <Pressable onPress={mode === "picture" ? takePicture : recordVideo}>
            {({pressed}) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1
                  }
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: mode === "picture" ? "white" : "red"
                    }
                  ]}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      {uri
        ? mode === "picture"
          ? renderPicture()
          : renderVideo()
        : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  camera: {
    flex: 1,
    width: "100%"
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center"
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  videoRecordingMessage: {
    color: colors.critical
  }
});
