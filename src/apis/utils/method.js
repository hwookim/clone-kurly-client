import auth from '../../utils/auth';

const HTTP_METHOD = {
  GET() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.get()}`,
      },
    };
  },
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.get()}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    };
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.get()}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    };
  },
  DELETE() {
    return {
      headers: {
        Authorization: `Bearer ${auth.get()}`,
      },
      method: 'DELETE',
    };
  },
};

export default HTTP_METHOD;
