import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { format } from "date-fns";
import { createBrowserHistory } from "history";

/* Api */
import api from "../../services/api";

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* Icons */
import typeIcons from "../../utils/typeIcons";

/* Styles */
import {
  Container,
  Form,
  TypeIcons,
  Input,
  TextArea,
  Options,
  Save,
} from "./styles";

/* Importação de temas e css default */
import GlobalStyles from "../../styles/global";
import theme from "../../styles/themes/theme";

/* Verifica se o usuário já esta logado */
import isConnected from "../../utils/isConnected";

/* Swal, notificações */
import Swal from "sweetalert2";

import * as Yup from "yup";

/* BaseUI */
import { DatePicker, TimePicker } from "baseui/datepicker";
import { FormControl } from "baseui/form-control";
import { SIZE } from "baseui/input";

function Task({ match }) {
  const [type, setType] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [hour, setHour] = useState(new Date());
  const [value, setValue] = useState([new Date()]);

  const history = createBrowserHistory();

  const date = [new Date()];

  async function removeTask() {
    Swal.fire({
      title: "Deseja ralmente deletar esta tarefa?",
      text: "O processo não poderá ser desfeito!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        api.delete(`/task/${match.params.id}`).then((response) => {
          Swal.fire({
            timer: 1000,
            icon: "success",
            title: "Tarefa excluída.",
          });
          history.push("/");
        });
      }
    });
  }

  async function handleSave() {
    // Validação dos dados
    let ValidationSchema = Yup.object().shape({
      title: Yup.string().required("Titulo é obrigatório!"),
      description: Yup.string().required("Descrição é obrigatória!"),
      type: Yup.number().required("Tipo é obrigatório!"),
      date: Yup.string().required("Data é obrigatória!"),
      hour: Yup.string().required("Hora é obrigatória!"),
    });

    ValidationSchema.isValid({
      title,
      description,
      type,
      date,
      hour,
    }).then((valid) => {
      if (valid) {
        if (match.params.id) {
          api
            .put(`/task/${match.params.id}/${parseInt(isConnected)}`, {
              macaddress: parseInt(isConnected),
              done,
              type,
              title,
              description,
              when: `${formatDateToSave}T${formatTimeToSave}`,
            })

            .then(() => {
              history.push("/home");
            })

            .catch((error) => {
              alert(error);
            });
        } else {
          api
            .post(`/task`, {
              macaddress: isConnected,
              type,
              title,
              done,
              description,
              when: `${formatDateToSave}T${formatTimeToSave}`,
              userId: parseInt(isConnected, 10),
            })
            .then(() => {
              history.push("/home");
            });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Preencha todos os campos!",
        });
      }
    });
  }

  const formatDateToSave = format(new Date(value), "yyyy-MM-dd");
  const formatTimeToSave = format(new Date(hour), "HH:mm:ss");

  useEffect(() => {
    function LoadTaskDetail() {
      api
        .get(`/task/${match.params.id}`)
        .then((response) => {
          setType(parseInt(response.data.type), 10);
          setDone(response.data.done);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setValue(new Date(response.data.when));
          setHour(new Date(response.data.when));
        })
        .catch((error) => {
          alert(error);
        });
    }
    if (match.params.id) {
      LoadTaskDetail();
    }
  }, [match.params.id]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Header />
          <span>Selecione o tipo da tarefa</span>
          <Form>
            <TypeIcons>
              {typeIcons.map(
                (icon, index) =>
                  index > 0 && (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setType(index)}
                    >
                      <img
                        src={icon}
                        alt="Tipo da Tarefa"
                        className={type && type !== index ? "inative" : ""}
                      />
                    </button>
                  )
              )}
            </TypeIcons>
            <Input>
              <span></span>
              <input
                type="text"
                placeholder="Tutulo da Tarefa"
                onChange={(e) => setTitle(e.target.value)}
                value={title || ""}
              />
            </Input>
            <TextArea>
              <span></span>
              <textarea
                rows={5}
                placeholder="Detalhes da Tarefa"
                onChange={(e) => setDescription(e.target.value)}
                value={description || ""}
              />
            </TextArea>
            <FormControl label="Data">
              <DatePicker
                formatString={"dd/MM/yyyy"}
                value={value || ""}
                size={SIZE.large}
                onChange={({ date }) =>
                  setValue(Array.isArray(date) ? date : [date])
                }
              />
            </FormControl>

            <FormControl label="Hora">
              <TimePicker
                value={hour || ""}
                onChange={(date) => setHour(date)}
                format={24}
                size={SIZE.large}
              />
            </FormControl>

            <Options>
              <div>
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => setDone(!done)}
                />
                <span>CONCLUÍDO</span>
              </div>

              {match.params.id && (
                <button onClick={removeTask} type="button">
                  EXCLUIR
                </button>
              )}
            </Options>
            <Save>
              <button onClick={handleSave} type="button">
                SALVAR
              </button>
            </Save>
          </Form>

          <Footer />
        </Container>
      </ThemeProvider>
      1
    </>
  );
}

export default Task;
