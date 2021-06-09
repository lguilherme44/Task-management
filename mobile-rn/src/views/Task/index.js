import React, { useState, useEffect, useContext } from "react";

import Header from "../../components/Header";

import Footer from "../../components/Footer";

import api from "../../services/api";

import styles from "./styles";

import * as Yup from "yup";

import { format } from "date-fns";

import typeIcons from "../../utils/typeIcons";

import DateTimePicker from "@react-native-community/datetimepicker";

import AppContext from "../../contexts/appContext";

import AuthContext from "../../contexts/auth";

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Switch,
  Text,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

const Task = ({ route, navigation }) => {
  const [done, setDone] = useState(false);
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState();
  const [when, setWhen] = useState();
  const [messageError, setMessageError] = useState("");

  const { removeTask, loadTasks } = useContext(AppContext);
  const { isConnected } = useContext(AuthContext);

  async function loadDetailsTask() {
    const { data } = await api.get(`/task/${route.params.id}`);

    if (data) {
      setType(parseInt(data.type), 10);
      setTitle(data.title);
      setDescription(data.description);
      setWhen(data.when);
      setDone(data.done);
      setUserId(data.userId);
    }
  }

  useEffect(() => {
    if (route.params !== undefined) {
      loadDetailsTask();
    }
  }, []);

  const formatDate = format(new Date(date), "yyyy-MM-dd");
  const formatTime = format(new Date(date), "HH:mm");

  async function handleSave() {
    // Validação dos dados
    let ValidationSchema = Yup.object().shape({
      title: Yup.string().required("Titulo é obrigatório!"),
      description: Yup.string().required("Descrição é obrigatória!"),
      type: Yup.number().required("Tipo é obrigatório!"),
      date: Yup.string().required("Data é obrigatória!"),
    });

    ValidationSchema.validate({
      title,
      description,
      type,
      date,
    })
      .then(() => {
        if (route.params?.id) {
          api
            .put(`/task/${route.params.id}/${isConnected}`, {
              macaddress: isConnected,
              done,
              type,
              title,
              description,
              when: `${formatDate}T${formatTime}`,
            })
            .then(() => {
              navigation.navigate("Home");
              loadTasks();
            })
            .catch((error) => {
              setMessageError(error);
            });
        } else {
          api
            .post(`/task`, {
              macaddress: isConnected,
              type,
              title,
              done,
              description,
              when: `${formatDate}T${formatTime}`,
              userId: isConnected,
            })
            .then(() => {
              navigation.navigate("Home");
              loadTasks();
            })
            .catch((error) => {
              setMessageError(error);
            });
        }
      })
      .catch((err) => {
        setMessageError(err.errors[0]);
        // Alert(err.errors[0]);
      });
  }

  async function handleRemove() {
    const response = removeTask(route);

    if (response) {
      navigation.navigate("Home");
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Header showNotification={false} showBack={true} />

        <ScrollView
          style={{
            width: "100%",
          }}
        >
          <ScrollView horizontal={true} style={{ marginVertical: 10 }}>
            {typeIcons.map(
              (icon, index) =>
                icon !== null && (
                  <TouchableOpacity key={index} onPress={() => setType(index)}>
                    <Image
                      source={icon}
                      style={[
                        styles.imageIcon,
                        type && type !== index && styles.typeIconInative,
                      ]}
                    />
                  </TouchableOpacity>
                )
            )}
          </ScrollView>

          <Text style={styles.label}>Titulo</Text>
          <TextInput
            style={styles.input}
            maxLength={30}
            placeholder="Lembre-me de fazer..."
            onChangeText={(text) => setTitle(text)}
            value={title}
            validationError={messageError}
          />

          <Text style={styles.label}>Detalhes</Text>
          <TextInput
            style={styles.inputArea}
            maxLength={200}
            placeholder="Detalhes da atividade..."
            multiline={true}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />

          <Text style={styles.label}>Data</Text>
          <TextInput
            style={styles.input}
            onTouchStart={showDatepicker}
            onFocus={() => Keyboard.dismiss()}
          >
            {format(new Date(date), "dd/MM/yyyy")}
          </TextInput>

          <Text style={styles.label}>Hora</Text>
          <TextInput
            style={styles.input}
            onTouchStart={showTimepicker}
            onFocus={() => Keyboard.dismiss()}
          >
            {format(new Date(date), "HH:mm")}
          </TextInput>

          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}

          <View style={styles.inLine}>
            <View style={styles.inputInline}>
              <Switch
                onValueChange={() => setDone(!done)}
                value={done}
                thumbColor={done ? "#00761b" : "#7159c1"}
              />
              <Text style={styles.switchLabel}>Concluído</Text>
            </View>

            <TouchableOpacity onPress={handleRemove}>
              <Text style={styles.removeLabel}>EXCLUIR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Footer onPress={handleSave} />
      </KeyboardAvoidingView>
    </>
  );
};

export default Task;
