
import axios from 'axios';

const api_domian = process.env.REACT_APP_API_HOST as string;
const apiUrl = "http://127.0.0.1:52202";



export const getVoiceText = async () =>{
    const response : any = await axios.post(`${apiUrl}/record-and-transcribe`).then((resp : any) => {return resp.data});
    console.log(response,'repsones')
    if(response)
    {
       //alert('Employee Details added successfully')
       return response
    }
    else
    {
        alert('Error Occurred')
    }

}
