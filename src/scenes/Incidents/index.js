import React, {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [max, setMax] = useState(10);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    async function listIncidents({offset = 0, max = 10}){
        if(loading){
            return;
        }
        if(total && incidents.length === total){
            return;
        }
        setLoading(true);
        const response = await api.get('incidents',{
            params:{
                offset,
                max,
            }
        });
        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
        setLoading(false);
        setOffset(offset + max);
    }
    useEffect(()=>{listIncidents(max, offset), [max, offset]});
    const navigation = useNavigation();
    function navigateToDetail(incident){
        navigation.navigate('Detail', {
            incident
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => incident.id}
                onEndReached={listIncidents}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                renderItem={({item:incident})=>(
                    <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>
                        ONG:
                    </Text>
                    <Text style={styles.incidentValue}>
                        {incident.ong_name}
                    </Text>
                    <Text style={styles.incidentProperty}>
                        CASO:
                    </Text>
                    <Text style={styles.incidentValue}>
                        {incident.title}
                    </Text>
                    <Text style={styles.incidentProperty}>
                        VALOR:
                    </Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(incident.value)}
                    </Text>
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>
                            Ver mais detalhes
                        </Text>
                        <Feather 
                            name="arrow-right"
                            size={16}
                            color="#E02041"
                        />
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>
    );
}