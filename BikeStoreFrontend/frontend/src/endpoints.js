const baseUrl=process.env.REACT_APP_API_URL;
const urlCategory=`${baseUrl}/Category`;
const urlAuth=`${baseUrl}/Auth`;
const urlProducts=`${baseUrl}/Product`;
const urlManufacturer=`${baseUrl}/Manufacturer`;
const urlUser=`${baseUrl}/User`;
const urlOrder=`${baseUrl}/Order`
const urlShipping=`${baseUrl}/Shippinginfo`
const urlPayment=`${baseUrl}/Payment`
const urlOrderItem=`${baseUrl}/Orderitems`
const urlStripe=`${baseUrl}/create-checkout-session`

export {urlCategory, urlAuth, urlProducts, urlManufacturer, urlUser, urlOrder, urlShipping, urlPayment, urlOrderItem, urlStripe};