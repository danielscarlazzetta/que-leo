


export {getPaginationProductsWithImages} from './products/product-pagination'
export {getProductBySlug} from './products/get-product-by-slug'
export {getStockBySlug} from './products/get-stock-by-slug'
export {createUpdateProduct} from './products/create-update-product'
export {deleteProductImage} from './products/delete-product-image'

export {authenticate,login} from './auth/login'
export {logout} from './auth/logout'
export {registerUser} from './auth/register'

export {getCountries} from './country/get-countries'


export {setUserAddress} from './address/set-user-address'
export {deleteUserAddress} from './address/delete-user-address'
export {getUserAddress} from './address/get-user-address'


export {placeOrder} from './order/place-order'
export {getOrderById} from './order/get-order-by-id'
export {getOrderByUser} from './order/get-order-by-user'
export {getPaginatedOrders} from './order/get-paginated-orders'
export {changeOrderSend} from './order/change-send'

export {getPaginatedUsers} from './user/get-pagination-users'
export {changeUserRole} from './user/change-user-rol'

export {setTransactionId} from './payments/set-transaction-id'

export {getCategories} from './categories/get-categories'