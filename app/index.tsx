import "@/global.css";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import images from "../constants/images";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImageBackground = styled(ImageBackground);

export default function App() {
  // const [image, setImage] = useState<string | null>(null);

  // const handleTakePhoto = async () => {
  //   const hasPermission = await requestCameraPermission();
  //   if (!hasPermission) return;

  //   const result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  return (
    <StyledView className="flex-1">
      <StatusBar barStyle="light-content" />

      <StyledImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
        }}
        className="flex-1"
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.7)"]}
          locations={[0, 0.5, 1]}
          className="flex-1"
        >
          {/* Overlay */}
          <StyledView className="flex-1 bg-black/40">
            {/* Logo and Brand */}
            <StyledView className="items-center pt-32">
              <StyledView className="mb-4">
                <StyledView className="w-16 h-16 bg-white rounded-full items-center justify-center overflow-hidden">
                  <Image
                    source={images.logo}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </StyledView>
              </StyledView>

              <StyledText className="text-white text-4xl font-bold mb-1">
                Milan
              </StyledText>
              <StyledText className="text-white text-lg tracking-widest mt-1">
                Matrimony
              </StyledText>
            </StyledView>

            {/* Spacer */}
            <StyledView className="flex-1" />

            {/* Bottom Buttons Section */}
            <StyledView className="px-6 pb-12">
              {/* Create Account Button */}
              <StyledTouchableOpacity
                className="bg-white rounded-xl py-4 mb-4 shadow-lg"
                activeOpacity={0.8}
              >
                <StyledText className="text-black text-center text-lg font-semibold">
                  New User? Create Account
                </StyledText>
              </StyledTouchableOpacity>

              {/* Login Button */}
              <StyledTouchableOpacity
                className="bg-transparent border-2 border-white rounded-xl py-4 mb-6"
                activeOpacity={0.8}
                onPress={() => router.push("/login")}
              >
                <StyledText className="text-white text-center text-lg font-semibold">
                  Already have an account? Login
                </StyledText>
              </StyledTouchableOpacity>

              {/* Terms and Privacy */}
              <StyledView className="items-center mb-2">
                <StyledView className="flex-row">
                  <StyledText className="text-white/80 text-sm">
                    By continuing, you accept the{" "}
                  </StyledText>
                  <StyledText className="text-blue-400 text-sm">
                    terms
                  </StyledText>
                </StyledView>
                <StyledView className="flex-row">
                  <StyledText className="text-white/80 text-sm">
                    and{" "}
                  </StyledText>
                  <StyledText className="text-blue-400 text-sm">
                    privacy policy
                  </StyledText>
                </StyledView>
              </StyledView>

              {/* App Version */}
              <StyledText className="text-white/60 text-center text-xs mt-2">
                App Version 171 ( 1.0.171 )
              </StyledText>
            </StyledView>
          </StyledView>
        </LinearGradient>
      </StyledImageBackground>
    </StyledView>
  );
}
