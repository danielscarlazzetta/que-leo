

export const currencyFormat = ( value : number) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'USD',
        // Camvbiar a CLP cuando deje de usar Paypal
        //currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,

    }).format(value);
}