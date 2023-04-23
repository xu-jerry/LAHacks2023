import axios from 'axios';

const url = 'http://localhost:5000/dopamind';

const cohere = async (prompt) => {
  try {
    // eventData is sent as request body
    console.log(prompt);
    const res = await axios.post(`${url}/cohere`, prompt);
    console.log(res);
    let response = res.data.body.generations[0].text;
    response += '...';
    return response;
  } catch (error) {
    console.error(error.message);
    console.error('could not get response from cohere');
  }
  return null;
};

export default cohere;
