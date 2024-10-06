import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/shared/contexts/GlobalProvider";
import { images } from "@/shared/constants";
import { ISignInRequestTypes } from "./_types";
import onSignInSubmitAsync from "./_actions/onSignInSubmit";
import LogInTitle from "./_components/LogInTitle";
import NewAccountLink from "./_components/NewAccountLink";

const SignIn = () => {
  const [form, setForm] = useState<ISignInRequestTypes>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { SetUser } = useGlobalContext()!;
  const [isLogged, setIsLogged] = useState(false);

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="justify-center w-full h-full px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px]" />

          <LogInTitle />

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
            title="Sign in"
            containerStyle="mt-7"
            onPress={() =>
              onSignInSubmitAsync({
                form: form,
                state: {
                  setIsLogged: setIsLogged,
                  setIsSubmitting: setIsSubmitting,
                  SetUser: SetUser,
                },
              })
            }
            isLoading={isSubmitting}
          />

          <NewAccountLink />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
