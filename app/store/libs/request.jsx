import { requestActionTypes } from ".";

export const getAuthToken = () => {
  const token = window?.localStorage.getItem('token') || ''
  return token
}
export const fetchWithTimeout = async (url, options = {}) => {
  const { timeout = 30 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, {
    ...options,
    // signal: controller.signal
  });
  const resj = response.json();
  clearTimeout(id);

  return resj;
}

export const basicReqWithDispatch = async (props) => {
  const { url, options, baseType, dispatch, assets = {}, params = {}, dispatchSuccess = true } = props
  const actionTypes = requestActionTypes(baseType)
  dispatch({ type: actionTypes.request })

  try {
    const data = await fetchWithTimeout(url, options)
    const { error } = data;
    if (error) {
      dispatch({
        type: actionTypes.error,
        payload: error,
        message: error,
        assets,
      })
      return { error }
    }

    if (dispatchSuccess && data) {
      dispatch({
        type: actionTypes.success,
        payload: data,
        assets,
      })
    }
    return { data }
  } catch (error) {
    dispatch({
      type: actionTypes.error,
      payload: error,
      message: error,
      assets,
    })
    return { error }
  }
}
export const basicPostRequestWithHeaders = async (props) => {
  const { url, headers, body, methodType } = props
  const requestOptions = {
    method: methodType,
    headers,
    body,
  };
  const data = await fetchWithTimeout(url, requestOptions)
    .then(response => response.json())
    .then(response => {
      return response
    })
  return data
}

// export const basicGetRequestWithHeaders = async (props) => {
//   const { url, headers, body, methodType } = props
//   const requestOptions = {
//     method: methodType,
//     headers,
//     body,
//   };
//   const data = await fetchWithTimeout(url, requestOptions)
//     .then(response => response.json())
//     .then(response => {
//       return response
//     })
//   return data
// }
