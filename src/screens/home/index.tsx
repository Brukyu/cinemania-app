import { View, Text, TextInput } from "react-native"
import { styles } from "./styles";
import {MagnifyingGlass} from "phosphor-react-native";

export function Home() {
    return( 
        <View style={styles.container}>
            <Text style={styles.headerText}>O que voce quer assistir hoje?</Text>
            <View style={styles.containerInput}>
                <TextInput placeholder="Buscar" style={styles.input}/>
                <MagnifyingGlass color = "#FFf" size={25} weight="light"/>
            </View>
        </View>
    )
}