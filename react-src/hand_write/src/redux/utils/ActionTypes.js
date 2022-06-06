const randomString = () => Math.random().toString(36).substring(7).split('').join('.');

const ActionTypes = {
    INIT: `@@redux/INIT${randomString()}`,
}

export const ADD1 = 'ADD1';
export const MINUS1 = 'MINUS1';

export const ADD2 = 'ADD2';
export const MINUS2 = 'MINUS2';

export default ActionTypes