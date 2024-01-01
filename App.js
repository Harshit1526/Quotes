import React, {useEffect, useState} from 'react';

import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [Quote, setQuote] = useState('Loading...');
  const [Author, setAuthor] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(false);

  const randomQuote = () => {
    setIsLoading(true);

    fetch("https://api.quotable.io/quotes/random")
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then(result => {
        console.log(result);
        setQuote(result.content);
        setAuthor(result.author);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quote:', error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    randomQuote();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ADD8E6',
      }}>
      <View
        style={{
          width: '90%',
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 20,
        }}>
        <Text
          style={{
            color: '#333',
            textAlign: 'center',
            fontSize: 26,
            fontWeight: '600',
            marginBottom: 20,
          }}>
          Quote of the Day
        </Text>
        <Text style={{color: 'black', fontSize: 30, fontWeight: '800'}}>"</Text>
        <Text
          style={{
            color: 'purple',
            fontSize: 16,
            lineHeight: 26,
            letterSpacing: 1.1,
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: 10,
            paddingHorizontal: 30,
          }}>
          {Quote}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            textAlign: 'right',
            fontWeight: '800',
          }}>
          "
        </Text>
        <Text
          style={{
            textAlign: 'right',
            fontWeight: '300',
            fontSize: 16,
            fontStyle: 'italic',
            color: '#000',
          }}>
          -- {Author}
        </Text>
        <TouchableOpacity
          onPress={randomQuote}
          style={{
            backgroundColor: 'black',
            padding: 20,
            borderRadius: 30,
            marginVertical: 20,
          }}>
          <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
            {isLoading ? 'Loading...' : 'New Quote'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
