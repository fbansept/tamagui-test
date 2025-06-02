
import {Button, Input} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";
import {Controller, useForm} from "react-hook-form";
import {Text} from "react-native";
import axios from '@/scripts/axiosConfig'; // Ajustez le chemin selon votre structure de fichiers


import * as SecureStore from "expo-secure-store";
import {useRouter} from "expo-router";

export default function ConnexionScreen() {

    const router = useRouter();

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
            email: "a@a.com",
            password: "root",
        },
    })

    const onFormulaireValide = (donneesFormulaire: FormData) => {

        // const options : RequestInit = {
        //     method : "POST",
        //     headers: {"Content-type": "application/json"},
        //     body: JSON.stringify(data)
        // }
        //
        // fetch(process.env.EXPO_PUBLIC_API_URL + "connexion", options)
        //     .then(reponse => reponse.text())
        //     .then(jwt => {
        //         SecureStore.setItem("token" , jwt)
        //         router.replace("/")
        //     })

        axios.post('connexion', donneesFormulaire)
            .then(reponse => {
                SecureStore.setItem("token" , reponse.data)
                router.replace("/")
            })
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

            {errors.password?.type === "required" &&
                <Text style={{color:'red'}}>
                    Le mot de passe est obligatoire
                </Text>}

            <Button size="$3" themeInverse onPress={handleSubmit(onFormulaireValide)} >
                Connexion
            </Button>
        </SafeAreaView>
    );
}

