import { View, Text, TextInput, FlatList } from "react-native"
import { styles } from "./styles";
import { useEffect, useState } from "react";
import {MagnifyingGlass} from "phosphor-react-native";
import { api } from "../../services/api";
import { CardMovies } from "../../components/CardMovies";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

export function Home() {
    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([])

    useEffect(() => {
        loadMoreData();
    }, []);

    const loadMoreData = async () => {
        const response = await api.get("/movie/popular");
        setDiscoveryMovies(response.data.results);
        console.log(JSON.stringify(response.data, null, 2))
    }
    return( 
        <View style={styles.container}>
            <Text style={styles.headerText}>O que voce quer assistir hoje?</Text>
            <View style={styles.containerInput}>
                <TextInput placeholderTextColor="#FFF" placeholder="Buscar" style={styles.input}/>
                <MagnifyingGlass color = "#FFf" size={25} weight="light"/>
            </View>
            <View>
                <FlatList
                  data= {discoveryMovies}
                  numColumns={3}
                  renderItem={(item) => <CardMovies data={item.item}/>}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    padding:35,
                    paddingBottom: 100,
                  }}
                />
            </View>
        </View>
    )
}