import {Button, CardProps,Card, H2, Paragraph, Image, XStack} from "tamagui";

export function ProduitCard(props: CardProps & {produit: Produit}) {
    return (
        <Card elevate size="$4" bordered {...props}>
            <Card.Header padded>
                <H2>{props.produit.nom}</H2>
                <Paragraph theme="alt2">{props.produit.prix}€</Paragraph>
            </Card.Header>
            <Card.Footer padded>
                <XStack flex={1} />
                <Button borderRadius="$10">Voir les détails</Button>
            </Card.Footer>
            <Card.Background>
                <Image
                    objectFit="contain"
                    alignSelf="center"
                    source={{
                        width: 300,
                        height: 300,
                        uri: process.env.EXPO_PUBLIC_SERVEUR_STATIC_URL +
                            props.produit.nomImage
                }}
                />
            </Card.Background>
        </Card>
    )
}