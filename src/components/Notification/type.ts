export interface Notification {
    type: 'info' | 'warning' | 'success' | 'error';
    message: string ;
    /* onClose?: () => void */
}