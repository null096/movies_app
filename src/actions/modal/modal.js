import {
    SHOW_MODAL_WINDOW,
    CLOSE_MODAL_WINDOW,
} from '../actionNames';

export const showModalWindow = (compName, params) => ({
    type: SHOW_MODAL_WINDOW,
    compName,
    params,
});

export const closeModalWindow = () => ({
    type: CLOSE_MODAL_WINDOW,
});