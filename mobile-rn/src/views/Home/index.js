import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

/* Styles */
import styles from './styles';

/* Components */
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';

/* Api */
import api from '../../services/api';

export default function Home({ navigation }) {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTasks() {
      setLoading(true);
      await api
        .get(`/task/filter/${filter}/${parseInt(1, 10)}`)
        .then((response) => {
          setTasks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }

    getTasks();
  }, [filter]);

  function Notification() {
    setFilter('late');
  }

  function newTask() {
    navigation.navigate('Task');
  }

  return (
    <>
      <Header
        showNotification={true}
        showBack={false}
        notifications={Notification}
      />

      <View style={styles.container}>
        <View style={styles.filter}>
          <TouchableOpacity onPress={() => setFilter('all')}>
            <Text
              style={
                filter === 'all'
                  ? styles.filterTextActived
                  : styles.filterTextInative
              }
            >
              Todos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFilter('today')}>
            <Text
              style={
                filter === 'today'
                  ? styles.filterTextActived
                  : styles.filterTextInative
              }
            >
              Hoje
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFilter('week')}>
            <Text
              style={
                filter === 'week'
                  ? styles.filterTextActived
                  : styles.filterTextInative
              }
            >
              Semana
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFilter('month')}>
            <Text
              style={
                filter === 'month'
                  ? styles.filterTextActived
                  : styles.filterTextInative
              }
            >
              Mês
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFilter('year')}>
            <Text
              style={
                filter === 'year'
                  ? styles.filterTextActived
                  : styles.filterTextInative
              }
            >
              Ano
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.title}>
          <Text style={styles.titleText}>Tarefas</Text>
        </View>

        {loading ? (
          <ActivityIndicator color='#7159c1' size={50} />
        ) : (
          <FlatList
            data={tasks}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            numColumns={2}
            keyExtractor={(item) => item.id}
            style={styles.content}
            renderItem={({ item }) => {
              return (
                <TaskCard
                  id={item.id}
                  type={item.type}
                  title={item.title}
                  description={item.description}
                  when={item.when}
                  done={item.done}
                  userId={item.userId}
                  navigation={navigation}
                />
              );
            }}
          ></FlatList>
        )}

        <Footer icon={'add'} onPress={newTask} />
      </View>
    </>
  );
}
