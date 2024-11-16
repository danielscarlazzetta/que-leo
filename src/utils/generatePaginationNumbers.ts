


export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

    //si el total es menor a 7 mostraremos sin puntos suspensivos

    if(totalPages <=7){
        return Array.from({ length: totalPages} , ( _ , i ) => i + 1); //[1,2,3,4,5,6,7]
    }

    // si esta dentro de las primeras 3, agregaremos el [...]
    if( currentPage <= 3){
        return [1,2,3,'...', totalPages -1, totalPages]// [1,2,3,...,7,8]
    }

    //si las paginas estan en las ultimas 3
    if(currentPage>= totalPages -2){
        return [1,2,'...', totalPages -2, totalPages -1 , totalPages];//[1,2,'...',7,8,9]
    }

    //si la pagina actual esta en otro lugar(medio), mostrar primera pagina puntos suspensivos pagina actual
    return[
        1,
        '...',
        currentPage -1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ]

}