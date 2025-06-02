
import {StyleSheet, Text} from 'react-native';
import {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import axios from "@/scripts/axiosConfig";

export default function DetailsProduitScreen() {

    const [produit, setProduit] = useState<Produit | null>(null)

    //On recupère l'identifiant du produit
    const params = useLocalSearchParams<{ produit: string }>();

    useEffect(() => {
        axios.get(`produit/${params.produit}`)
            .then(reponse => {
                setProduit(reponse.data)
                console.log(produit)
            })
    }, []);

  return (
    <SafeAreaView>
        <Text>{ produit?.nom }</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
