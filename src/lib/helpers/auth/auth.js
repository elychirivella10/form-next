import Axios from "axios";
import md5 from 'md5'
const TOKEN_KEY = md5('TokenIncidencia');
const TOKEN_NAME = 'name_user';
const TOKEN_ROLE = 'sr';
const TOKEN_AREA = 'sa';
const TOKEN_USER = 'su';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getName() {
  return localStorage.getItem(TOKEN_NAME);
}
export function getRole() {
  return localStorage.getItem(TOKEN_ROLE);
}
export function getArea() {
  return localStorage.getItem(TOKEN_AREA);
}
export function getUser() {
  return localStorage.getItem(TOKEN_USER);
}

export function deleteName(e) {
  localStorage.removeItem(TOKEN_NAME);
}
export function deleteRole(e) {
  localStorage.removeItem(TOKEN_ROLE);
}
export function deleteUser(e) {
  localStorage.removeItem(TOKEN_USER);
}
export function deleteToken(e) {
  localStorage.removeItem(TOKEN_KEY);
  if (getToken() === null) {
    return true
  }
  
}

export async function getCurrentUser() {
  if (!getToken()) return false;
  try {
    let response = await Axios.get("/api/v1/auth/current");
    return response.data;
  } catch (error) {
    return false;
  }
}

export function initAxiosInterceptors() {
  Axios.defaults.headers.post['Content-Type'] = 'application/json'
  Axios.interceptors.request.use(config => {

    config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3QiLCJpYXQiOjE3MzAzOTM2MDksImF1ZCI6IjQzODBhN2ZmODI0ZGEzM2QzYTUwMDE1NTU1NTk4OThkYmFkZDg1ODMiLCJkYXRhIjp7InVzZXJfaWQiOiIzNCIsInNjb3BlIjpbeyJub21icmUiOiJjaXRhcy5jcmVhdGUifSx7Im5vbWJyZSI6ImNpdGFzLmRlbGV0ZSJ9LHsibm9tYnJlIjoiY2l0YXMucmVhZCJ9LHsibm9tYnJlIjoiY2l0YXMudXBkYXRlIn0seyJub21icmUiOiJyZXF1ZXJpbWllbnRvcy5kZWxldGUifSx7Im5vbWJyZSI6InJlcXVlcmltaWVudG9zLnJlYWQifSx7Im5vbWJyZSI6InJlcXVlcmltaWVudG9zLnVwZGF0ZSJ9LHsibm9tYnJlIjoicmVxdWVyaW1pZW50b3MuY3JlYXRlIn0seyJub21icmUiOiJyZXF1ZXJpbWllbnRvcy5jb21wbGV0ZSJ9LHsibm9tYnJlIjoic29saWNpdHVkZXMuY29tcGxldGUifSx7Im5vbWJyZSI6InNvbGljaXR1ZGVzLmNyZWF0ZSJ9LHsibm9tYnJlIjoic29saWNpdHVkZXMuZGVsZXRlIn0seyJub21icmUiOiJzb2xpY2l0dWRlcy5yZWFkIn0seyJub21icmUiOiJzb2xpY2l0dWRlcy51cGRhdGUifSx7Im5vbWJyZSI6ImRhc2gucmVhZCJ9LHsibm9tYnJlIjoic2FwaS5wZXIifSx7Im5vbWJyZSI6InNvbGljaXR1ZGVzLnRyYWJhamFkb3JlcyJ9LHsibm9tYnJlIjoic29saWNpdHVkZXMub2JzZXJ2YWNpb25lcyJ9LHsibm9tYnJlIjoic29saWNpdHVkZXMuY3Jvbm9sb2dpYSJ9LHsibm9tYnJlIjoicmVxdWVyaW1pZW50b3MubWFyY2FzIn0seyJub21icmUiOiJyZXF1ZXJpbWllbnRvcy5wYXRlbnRlcyJ9XX19.D-ACaFyKCnODwx24PCOYSPZK73CrnBRN9TWmFGOSpzw`
    return config
  });

  Axios.interceptors.response.use(
    response => response,
  );
}
