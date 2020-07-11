import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '../../../services/api';

import history from '../../../services/history';

import { addToTaskSuccess } from './actions';

function* addTotask({ payload }) {
  try {
    const task = payload.data;

    const response = yield call(api.post, 'task', task);

    toast.success('Tarefa cadastrada com sucesso');
  } catch (error) {
    toast.success('Erro ao cadastrar tarefa');
  }
}

export default all([
  takeLatest('@task/ADD_REQUEST', addTotask),
  // takeLatest('@task/UPDATE_REQUEST', task),
]);
