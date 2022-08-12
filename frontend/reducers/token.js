export default function user(user = '', action) {

    if(action.type === 'saveUser') {
      console.log('REDUCER')
      console.log(action.user)
      return action.user
    } else {
      return user;
    }
  
  }