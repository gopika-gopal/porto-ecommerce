import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const OrderSummary = () => {

  const [orders, setOrders] = useState([]);
  const [subTotal, setSubTotal] = useState();
  const [totalTax, setTotalTax] = useState(0);
  const [formData, setFormData] = useState({
    flatHouseApt: '',
    areaStreet: '',
    landmark: '',
    country: 'India',
    stateProvince: 'Kerala',
    zipCode: '',
    flatRate: false,
    bestRate: false,
    orderItems: [],
    subTotal: 0,
    totalTax: 0,
    total: 0,
    userId: ''
  });


  useEffect(() => {
    displayOrderedItems();
  }, []);

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  const displayOrderedItems = () => {
    axios.post("http://localhost:3000/addToCart/items", { email: decoded.email })
      .then((result) => {
        console.log('orderitems',result.data);
        setOrders(result.data);
        setSubTotal(result.data.reduce((total, item) => total + item.quantity * item.price, 0));
        setTotalTax(result.data.reduce((total, item) => total + item.quantity * item.price * 18 / 100, 0));
      });
  }

  const calculateTotalPrice = () => {
    return orders.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateTotalTax = () => {
    return orders.reduce((total, item) => total + item.quantity * item.price * 18 / 100, 0);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // const handleFormChange =(event) =>{
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setFormData(values => ({ ...values, [name]: value }));
  // }

  const handlePlaceOrder = () => {
    formData.orderItems = orders;
    formData.subTotal = subTotal;
    formData.totalTax = totalTax;
    formData.total = formData.subTotal + formData.totalTax;
    formData.userId = decoded.email;
    console.log('Form Data:', formData);

    axios.post("http://localhost:3000/place-order", formData)
      .then(res => {
        console.log(res);
        if (res.statusText == "OK") {
          alert(res.data.message);
          orders.forEach(element => {
            checkout(element._id);
          });
          window.location = "/product-catalogue";
        }
      })
      .catch(err => {
        console.log(err);
        alert(err.response.data.message);
      })
  };

    const checkout = (id) => {
      console.log(id);
      axios.put("http://localhost:3000/checkOutItem",{_id:id})
      .then((result)=>{
       console.log(result.data);
        // alert(result.data);
       // window.location.reload();
        // setCartItems(result.data);
      });
    }
  return (
    <div>
      <div className="page-wrapper">

        <main className="main">
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="index-2.html"><i className="icon-home" /></a></li>
                <li className="breadcrumb-item active" aria-current="page">ORDER SUMMARY</li>
              </ol>
            </div>{/* End .container */}
          </nav>
          <div className="container">
            <div className="row">

              <div className="col-lg-4">
                <div className="cart-summary">
                  <h3>Summary ({orders.length} Items)</h3>
                  <h4>
                    <a data-toggle="collapse" href="#total-estimate-section" className="collapsed" role="button" aria-expanded="false" aria-controls="total-estimate-section">Estimate Shipping and Tax</a>
                  </h4>
                  <div className="collapse" id="total-estimate-section">
                    <form action="#">
                      <div className="form-group form-group-sm">
                        <label>Flat, House no:, Apartment</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your flat/house/apartment details"
                          name="flatHouseApt"
                          value={formData.flatHouseApt}
                          onChange={handleFormChange}
                        />
                      </div>

                      <div className="form-group form-group-sm">
                        <label>Area, Street</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your area and street details"
                          name="areaStreet"
                          value={formData.areaStreet}
                          onChange={handleFormChange}
                        />
                      </div>

                      <div className="form-group form-group-sm">
                        <label>Landmark</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter a landmark"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="form-group form-group-sm">
                        <label>Country</label>
                        <div className="select-custom">
                          <select className="form-control form-control-sm"
                            name="country"
                            value={formData.country}
                            onChange={handleFormChange}>
                            <option value="India">India</option>
                            <option value="USA">United States</option>
                            <option value="Turkey">Turkey</option>
                            <option value="China">China</option>
                            <option value="Germany">Germany</option>
                          </select>
                        </div>{/* End .select-custom */}
                      </div>{/* End .form-group */}
                      <div className="form-group form-group-sm">
                        <label>State/Province</label>
                        <div className="select-custom"
                          name="stateProvince"
                          value={formData.stateProvince}
                          onChange={handleFormChange}>
                          <select className="form-control form-control-sm">
                            <option value="MH">Maharashtra</option>
                            <option value="KL">Kerala</option>
                            <option value="KA">Karnataka</option>
                            <option value="MP">Madhya Pradesh</option>
                            <option value="CA">California</option>
                            <option value="TX">Texas</option>
                          </select>
                        </div>{/* End .select-custom */}
                      </div>{/* End .form-group */}
                      <div className="form-group form-group-sm">
                        <label>Zip/Postal Code</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleFormChange} />
                      </div>{/* End .form-group */}
                      <div className="form-group form-group-custom-control">
                        <label>Flat Way</label>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="flat-rate"
                            name="flatRate"
                            checked={formData.flatRate}
                            onChange={handleFormChange} />
                          <label className="custom-control-label" htmlFor="flat-rate">Fixed $5.00</label>
                        </div>{/* End .custom-checkbox */}
                      </div>{/* End .form-group */}
                      <div className="form-group form-group-custom-control">
                        <label>Best Rate</label>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="best-rate"
                            name="bestRate"
                            checked={formData.bestRate}
                            onChange={handleFormChange} />
                          <label className="custom-control-label" htmlFor="best-rate">Table Rate $15.00</label>
                        </div>{/* End .custom-checkbox */}
                      </div>{/* End .form-group */}
                    </form>
                  </div>{/* End #total-estimate-section */}
                  <table className="table table-totals">
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td>${calculateTotalPrice()}</td>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <td>${calculateTotalTax()}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Order Total</td>
                        <td>${subTotal + totalTax}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <div className="checkout-methods">
                    <button onClick={handlePlaceOrder} className="btn btn-block btn-sm btn-primary"> Place order </button>
                    <a href="#" className="btn btn-link btn-block">Check Out with Multiple Addresses</a>
                  </div>{/* End .checkout-methods */}
                </div>{/* End .cart-summary */}
              </div>{/* End .col-lg-4 */}
            </div>{/* End .row */}
          </div>{/* End .container */}
          <div className="mb-6" />{/* margin */}
        </main>{/* End .main */}
        <footer className="footer bg-dark" hidden>
          <div className="footer-middle">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-sm-6">
                  <div className="widget">
                    <h4 className="widget-title">Contact Info</h4>
                    <ul className="contact-info">
                      <li>
                        <span className="contact-info-label">Address</span>123 Street Name, City, England
                      </li>
                      <li>
                        <span className="contact-info-label">Phone</span>Toll Free <a href="tel:">(123) 456-7890</a>
                      </li>
                      <li>
                        <span className="contact-info-label">Email</span> <a href="mailto:mail@example.com">mail@example.com</a>
                      </li>
                      <li>
                        <span className="contact-info-label">Working Days/Hours</span>
                        Mon - Sun / 9:00AM - 8:00 PM
                      </li>
                    </ul>
                    <div className="social-icons">
                      <a href="#" className="social-icon social-instagram icon-instagram" target="_blank" title="Instagram" />
                      <a href="#" className="social-icon social-twitter icon-twitter" target="_blank" title="Twitter" />
                      <a href="#" className="social-icon social-facebook icon-facebook" target="_blank" title="Facebook" />
                    </div>{/* End .social-icons */}
                  </div>{/* End .widget */}
                </div>{/* End .col-lg-3 */}
                <div className="col-lg-3 col-sm-6">
                  <div className="widget">
                    <h4 className="widget-title">Customer Service</h4>
                    <ul className="links">
                      <li><a href="#">Help &amp; FAQs</a></li>
                      <li><a href="#">Order Tracking</a></li>
                      <li><a href="#">Shipping &amp; Delivery</a></li>
                      <li><a href="#">Orders History</a></li>
                      <li><a href="#">Advanced Search</a></li>
                      <li><a href="my-account.html">My Account</a></li>
                      <li><a href="about.html">About Us</a></li>
                      <li><a href="#">Careers</a></li>
                      <li><a href="#">Corporate Sales</a></li>
                      <li><a href="#">Privacy</a></li>
                    </ul>
                  </div>{/* End .widget */}
                </div>{/* End .col-lg-3 */}
                <div className="col-lg-3 col-sm-6">
                  <div className="widget">
                    <h4 className="widget-title">Popular Tags</h4>
                    <div className="tagcloud">
                      <a href="#">Bag</a>
                      <a href="#">Black</a>
                      <a href="#">Blue</a>
                      <a href="#">Clothes</a>
                      <a href="#">Hub</a>
                      <a href="#">Shirt</a>
                      <a href="#">Shoes</a>
                      <a href="#">Skirt</a>
                      <a href="#">Sports</a>
                      <a href="#">Sweater</a>
                    </div>
                  </div>{/* End .widget */}
                </div>{/* End .col-lg-3 */}
                <div className="col-lg-3 col-sm-6">
                  <div className="widget widget-newsletter">
                    <h4 className="widget-title">Subscribe newsletter</h4>
                    <p>Get all the latest information on events, sales and offers. Sign up for newsletter:</p>
                    <form action="#" className="mb-0">
                      <input type="email" className="form-control m-b-3" placeholder="Email address" required />
                      <input type="submit" className="btn btn-primary shadow-none" defaultValue="Subscribe" />
                    </form>
                  </div>{/* End .widget */}
                </div>{/* End .col-lg-3 */}
              </div>{/* End .row */}
            </div>{/* End .container */}
          </div>{/* End .footer-middle */}
          <div className="container">
            <div className="footer-bottom d-flex justify-content-between align-items-center flex-wrap">
              <p className="footer-copyright py-3 pr-4 mb-0">© Porto eCommerce. 2020. All Rights Reserved</p>
              <img src="assets/images/payments.png" alt="payment methods" className="footer-payments py-3" />
            </div>{/* End .footer-bottom */}
          </div>{/* End .container */}
        </footer>{/* End .footer */}
      </div>{/* End .page-wrapper */}
      <div className="mobile-menu-overlay" />{/* End .mobil-menu-overlay */}
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close"><i className="icon-cancel" /></span>
          <nav className="mobile-nav">
            <ul className="mobile-menu">
              <li><a href="index-2.html">Home</a></li>
              <li>
                <a href="category.html">Categories</a>
                <ul>
                  <li><a href="https://www.portotheme.com/html/porto_ecommerce/demo_5/category-banner-full-width.html">Full Width Banner</a></li>
                  <li><a href="category-banner-boxed-slider.html">Boxed Slider Banner</a></li>
                  <li><a href="category-banner-boxed-image.html">Boxed Image Banner</a></li>
                  <li><a href="https://www.portotheme.com/html/porto_ecommerce/demo_5/category-sidebar-left.html">Left Sidebar</a></li>
                  <li><a href="category-sidebar-right.html">Right Sidebar</a></li>
                  <li><a href="category-flex-grid.html">Product Flex Grid</a></li>
                  <li><a href="category-horizontal-filter1.html">Horizontal Filter 1</a></li>
                  <li><a href="category-horizontal-filter2.html">Horizontal Filter 2</a></li>
                  <li><a href="#">List Types</a></li>
                  <li><a href="category-infinite-scroll.html">Ajax Infinite Scroll<span className="tip tip-new">New</span></a></li>
                  <li><a href="category.html">3 Columns Products</a></li>
                  <li><a href="category-4col.html">4 Columns Products</a></li>
                  <li><a href="category-5col.html">5 Columns Products</a></li>
                  <li><a href="category-6col.html">6 Columns Products</a></li>
                  <li><a href="category-7col.html">7 Columns Products</a></li>
                  <li><a href="category-8col.html">8 Columns Products</a></li>
                </ul>
              </li>
              <li>
                <a href="product.html">Products</a>
                <ul>
                  <li>
                    <a href="#">Variations</a>
                    <ul>
                      <li><a href="product.html">Horizontal Thumbs</a></li>
                      <li><a href="product-full-width.html">Vertical Thumbnails<span className="tip tip-hot">Hot!</span></a></li>
                      <li><a href="product.html">Inner Zoom</a></li>
                      <li><a href="product-addcart-sticky.html">Addtocart Sticky</a></li>
                      <li><a href="product-sidebar-left.html">Accordion Tabs</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Variations</a>
                    <ul>
                      <li><a href="product-sticky-tab.html">Sticky Tabs</a></li>
                      <li><a href="product-simple.html">Simple Product</a></li>
                      <li><a href="product-sidebar-left.html">With Left Sidebar</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Product Layout Types</a>
                    <ul>
                      <li><a href="product.html">Default Layout</a></li>
                      <li><a href="product-extended-layout.html">Extended Layout</a></li>
                      <li><a href="product-full-width.html">Full Width Layout</a></li>
                      <li><a href="product-grid-layout.html">Grid Images Layout</a></li>
                      <li><a href="product-sticky-both.html">Sticky Both Side Info<span className="tip tip-hot">Hot!</span></a></li>
                      <li><a href="product-sticky-info.html">Sticky Right Side Info</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Pages<span className="tip tip-hot">Hot!</span></a>
                <ul>
                  <li><a href="cart.html">Shopping Cart</a></li>
                  <li>
                    <a href="#">Checkout</a>
                    <ul>
                      <li><a href="checkout-shipping.html">Checkout Shipping</a></li>
                      <li><a href="checkout-shipping-2.html">Checkout Shipping 2</a></li>
                      <li><a href="checkout-review.html">Checkout Review</a></li>
                    </ul>
                  </li>
                  <li><a href="about.html">About</a></li>
                  <li><a href="#" className="login-link">Login</a></li>
                  <li><a href="forgot-password.html">Forgot Password</a></li>
                </ul>
              </li>
              <li><a href="blog.html">Blog</a>
                <ul>
                  <li><a href="single.html">Blog Post</a></li>
                </ul>
              </li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="#">Special Offer!<span className="tip tip-hot">Hot!</span></a></li>
              <li><a href="https://1.envato.market/DdLk5" target="_blank">Buy Porto!<span className="tip tip-new">New</span></a></li>
            </ul>
          </nav>{/* End .mobile-nav */}
          <div className="social-icons">
            <a href="#" className="social-icon" target="_blank"><i className="icon-facebook" /></a>
            <a href="#" className="social-icon" target="_blank"><i className="icon-twitter" /></a>
            <a href="#" className="social-icon" target="_blank"><i className="icon-instagram" /></a>
          </div>{/* End .social-icons */}
        </div>{/* End .mobile-menu-wrapper */}
      </div>{/* End .mobile-menu-container */}
      {/* Add Cart Modal */}
      <div className="modal fade" id="addCartModal" tabIndex={-1} role="dialog" aria-labelledby="addCartModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body add-cart-box text-center">
              <p>You've just added this product to the<br />cart:</p>
              <h4 id="productTitle" />
              <img src="#" id="productImage" width={100} height={100} alt="adding cart image" />
              <div className="btn-actions">
                <a href="cart.html"><button className="btn-primary">Go to cart page</button></a>
                <a href="#"><button className="btn-primary" data-dismiss="modal">Continue</button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a id="scroll-top" href="#top" title="Top" role="button"><i className="icon-angle-up" /></a>
      {/* Plugins JS File */}
      {/* Main JS File */}
    </div>
  )
}

export default OrderSummary;