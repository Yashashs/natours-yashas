/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

//type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
    // console.log(email, password);

    try {
        const url = type === 'password' ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword' : 'http://127.0.0.1:3000/api/v1/users/updateMe'

        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if (res.data.status === 'success') {
            // alert('Logged in successfully');
            showAlert('success', `${type.toUpperCase()} Updated successfully`);
            // window.setTimeout(1500)
        }

        // console.log(res);
    } catch (err) {
        // console.log(err.response.data);
        // alert(err.response.data.message);
        showAlert('error', err.response.data.message);
    }
};