
import {Button, Input} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";
import {Controller, useForm} from "react-hook-form";
import {Text} from "react-native";

export default function ConnexionScreen() {

    type FormData = {
        email: string
        password: string
    }

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onFormulaireValide = (data: FormData) => {
        console.log(data)
    }

    return (
        <SafeAreaView>
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        size="$4"
                        borderWidth={2}
                        placeholder="Email"
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}/>

                )}
                name="email"
            />
            {errors.email?.type === "required" && <Text style={{color:'red'}}>L&#39;email est obligatoire</Text>}
            {errors.email?.type === "pattern" && <Text style={{color:'red'}}>L&#39;email est mal formé</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        size="$4"
                        secureTextEntry={true}
                        borderWidth={2}
                        placeholder="Mot de passe"
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}/>
                )}
                name="password"
            />

            <Button size="$3" themeInverse onPress={handleSubmit(onFormulaireValide)} >
                Connexion
            </Button>
        </SafeAreaView>
    );
}

