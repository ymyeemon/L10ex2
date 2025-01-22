import React,{useState, useEffect} from 'react';
import { StyleSheet, FlatList, StatusBar, Text, TextInput, View} from 'react-native';

let originalData = [];

const styles = StyleSheet.create({

    title: {
        fontFamily: 'fantasy',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#9bbbc2',
    },

    rank: {
        fontFamily: 'fantasy',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 10,
    },

    city: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 10,
    },

    text: {
        fontSize: 14,
        paddingBottom: 10,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        margin: 15,
        backgroundColor: '#9bbbc2',
        borderRadius: 15,
        borderColor: '#69585f',
        borderWidth: 2,
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 10,
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#69585f',
        borderRadius: 15,
    }
});

const App = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {

        fetch("https://mysafeinfo.com/api/data?list=bestlivablecities2015&format=json&case=default")

        .then((response) => {
            return response.json();
        })

        .then((myJson) => {
            if (originalData.length < 1) {
                setMyData(myJson);
                originalData = myJson;
            }
        });
    }, [])

    const FilterData = (text) => {
        if (text!='') {
          let myFilteredData = originalData.filter((item) =>
            item.Country.includes(text));
          setMyData(myFilteredData);
        }
    
        else {
          setMyData(originalData);
        }
      }

    const renderItem = ({item, index}) => {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.rank}>Rank: {item.Rank}</Text>
                    <Text style={styles.city}>{item.City}</Text>
                    <Text style={styles.text}>Year: {item.Year}</Text>
                    <Text style={styles.text}>Country: {item.Country}</Text>
                </View>
            </View>
        );
    }

    return (
        <View>
            <StatusBar/>
            <Text style={styles.title}>Best Livable World Cities</Text>
            <Text style={styles.label}>Search:</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(text) => {FilterData(text)}}/>
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;
