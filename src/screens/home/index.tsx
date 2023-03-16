import { View, Text, TextInput, FlatList, ActivityIndicator } from "react-native"
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "phosphor-react-native";
import { api } from "../../services/api";
import { CardMovies } from "../../components/CardMovies";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

export function Home() {
    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
    const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadMoreData();
    }, []);

    const loadMoreData = async () => {
        setLoading(true);
        const response = await api.get("/movie/popular", {
            params: {
                page,
            }
        });
        setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
        setPage(page + 1);
        setLoading(false);
    };

    const searchMovies = async (query: string) => {
        setLoading(true);
        const response = await api.get("/search/movie", {
            params: {
                query,
                page,
            }
        });

        if (response.data.results.length === 0) {
            setNoResult(true);
        } else {
            setSearchResultMovies(response.data.results);
        }
        setLoading(false);
    };

    const handleSearch = (text: string) => {
        setSearch(text);
        if (text.length > 2) {
            searchMovies(text);
        } else {
            setSearchResultMovies([]);
        }
    };

    const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
                <View style={styles.containerInput}>
                    <TextInput
                        placeholderTextColor="#FFF"
                        placeholder="Buscar"
                        style={styles.input}
                        value={search}
                        onChangeText={handleSearch}
                    />
                    <MagnifyingGlass color="#FFF" size={25} weight="light" />
                </View>
            </View>
            <View>
                <FlatList
                    data={movieData}
                    numColumns={3}
                    renderItem={(item) => <CardMovies data={item.item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 35,
                        paddingBottom: 100,
                    }}
                    onEndReached={()=> loadMoreData()}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => (
                    loading && <ActivityIndicator color="#FFF" size={30} />
                    )}
                    ListEmptyComponent={() => (
                    noResult ? (
                    <Text style={styles.noResultText}>
                    Nenhum resultado encontrado para "{search}"
                    </Text>
                    ) : (
                    loading ? null : (
                    <Text style={styles.noResultText}>
                    Não há filmes para exibir.
                    </Text>
                    )
                    )
                    )}
                    />
                    </View>
                    </View>
                    );
                    }
