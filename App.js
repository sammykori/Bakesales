import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ajax from './src/ajax';
import DealList from './src/dealList';
import DealDetail from './src/dealDetail';
import SearchBar from './src/searchBar'

export default class App extends React.Component {
  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
  }
  async componentDidMount(){
    const deals = await ajax.fetchInitialDeals();
    this.setState({deals});
  }
  setCurrentDeal = (dealId) =>{
    this.setState({
      currentDealId : dealId
    });
  }
  unsetCurrentDeal = () =>{
    this.setState({
      currentDealId : null 
    })
  }
  currentDeal = ()=>{
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    );
  }
  searchDeals = async(searchTerm) =>{
    let dealsFromSearch = [];
    if(searchTerm){
       dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);
    }
    this.setState({dealsFromSearch});
    console.log(dealsFromSearch);
  }
  render() {
    if(this.state.currentDealId){
      return ( 
          <View style={styles.main}>
            <DealDetail initialDeal={this.currentDeal()} unset = {this.unsetCurrentDeal}/>
          </View>);
    }
    const dealsToDisplay = this.state.dealsFromSearch.length > 0 ? this.state.dealsFromSearch: this.state.deals;
    if(dealsToDisplay.length > 0){
      return  (
          <View style={styles.main}>
            <SearchBar searchDeals ={this.searchDeals}/>
            <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
          </View>
    )}
    return (
      <View style={styles.container}>
       
            <Text style={styles.header}>BAKESALE</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  },
  main: {
    marginTop:30,
  }
});
