import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/shared/contexts/GlobalProvider";
import { images } from "@/shared/constants";
import { ISignUpRequestTypes } from "./_types";
import { onSignUpSubmitAsync } from "./_actions/onSignUpSubmit";
import SignUpTitle from "./_components/SignUpTitle";
import ExistingAccountLink from "./_components/NewAccountLink";

const SignUp = () => {
  const [form, setForm] = useState<ISignUpRequestTypes>({
    email: "",
    password: "",
    userName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { SetUser } = useGlobalContext()!;
  const [isLogged, setIsLogged] = useState(false);

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="justify-center w-full h-full px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px]" />

          <SignUpTitle />

          <FormField
            title="UserName"
            value={form.userName}
            handleChangeText={(e) => setForm({ ...form, userName: e })}
            textStyle="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            textStyle="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            textStyle="mt-7"
          />

          <CustomButton
            title="Sign up"
            containerStyle="mt-7"
            onPress={() =>
              onSignUpSubmitAsync({
                form,
                state: {
                  setIsLogged: setIsLogged,
                  setIsSubmitting: setIsSubmitting,
                  SetUser: SetUser,
                },
              })
            }
            isLoading={isSubmitting}
          />

          <ExistingAccountLink />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
