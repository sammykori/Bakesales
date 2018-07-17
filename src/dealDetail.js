import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import {priceDisplay} from './utils'
import ajax from './ajax'

export default class DealDetail extends React.Component{
    static propTypes ={
        initialDeal: PropTypes.object.isRequired,
        unset: PropTypes.func.isRequired,
    };
    state={
        deal: this.props.initialDeal
    }
    async componentDidMount(){
        const fullDeal = await ajax.fetchDealData(this.state.deal.key); 
        this.setState({deal: fullDeal});
    }
    render(){
        const {deal} = this.state;
        return(
            <View 
            style={styles.deal}
            >
            <TouchableOpacity onPress={this.props.unset}>
                <Text style={styles.backLink}>Back</Text>
            </TouchableOpacity>
                <Image 
                    source={{uri: deal.media[0]}}
                    style={styles.image}
                />
                <View style={styles.detail}>
                    <View>
                        <Text style={styles.title}>{deal.title}</Text>
                    </View>
                    <View style={styles.footer}>
                        <View style= {styles.info}>
                            <Text style={styles.cause}>{deal.cause.name}</Text>
                            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                        </View>
                
                
                        {deal.user && (<View style={styles.user}>
                            <Image 
                                source = {{uri: deal.user.avatar}}
                                style={styles.avatar}
                            />
                            <Text>{deal.user.name}</Text>
                        </View>)}
                    </View> 
                 
                <View style={styles.description}>
                    <Text>{deal.description}</Text>
                </View>
            </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150,
    },
    price: {
        flex: 1,
        textAlign: 'right',
    },
    cause: {
        flex: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    title: {
        fontSize: 16,
        padding: 10,
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    deal: {
        marginHorizontal: 12,
    },
    detail:{
        borderColor: '#bbb',
        borderWidth: 1,
    },
    avatar:{
        width: 60,
        height: 60,
    },
    backLink:{
        marginBottom: 5,
        color: '#22f'
    }
    
});