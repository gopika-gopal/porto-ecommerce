import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ShoppingCart = () =>{

  const[cartItems,setCartItems]=useState([]);
  // const[quantity,setQty]=useState([]);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  
  useEffect(()=>{
    displayCartItems();
  },[]);

  const setQty=(item,qty)=>{
    console.log(item);
    item.quantity = Number(qty);
    //console.log(qty);
  }

    const displayCartItems=()=>{
      axios.post("http://localhost:3000/addToCart/items",{email:decoded.email})
      .then((result)=>{
        console.log(result.data);
        setCartItems(result.data);
      });
    }

    //code for update quantity of product
    const updateQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
  };

    //code for remove product from the cart
    const removeProductOld = (index) => {
      const updatedCartItems = [...cartItems];
      const currentItem = updatedCartItems[index];
  
      if (currentItem.quantity > 1) {
        // If quantity is greater than 1 then decrease quantity by 1
        currentItem.quantity -= 1;
      } else {
        // If quantity is 1 then remove the product from the cart
        updatedCartItems.splice(index, 1);
      }
      setCartItems(updatedCartItems);
    };

      const removeProduct = (id) => {
      console.log(id);
      axios.put("http://localhost:3000/deleteItem",{_id:id})
      .then((result)=>{
        console.log(result.data);
        // alert(result.data);
        window.location.reload();
        // setCartItems(result.data);
      });
    }

    const increaseQuantity = (id) => {
      console.log(id);
      axios.put("http://localhost:3000/increaseQuantity",{_id:id})
      .then((result)=>{
        console.log(result.data);
        // alert(result.data);

        window.location.reload();
        // setCartItems(result.data);
      });
    }
    const decreaseQuantity = (id) => {
      console.log(id);
      axios.put("http://localhost:3000/decreaseQuantity",{_id:id})
      .then((result)=>{
        console.log(result.data);
        // alert(result.data);
        window.location.reload();
        // setCartItems(result.data);
      });
    }

    const clearCart = () => {
      // setCartItems([]); 
      cartItems.forEach(element => {
        removeProduct(element._id);
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    };
 
      const itemCheckedOut = (id) => {
      console.log(id);
      axios.put("http://localhost:3000/checkedOutItem",{_id:id})
      .then((result)=>{
        console.log(result.data);
        // alert(result.data);
        window.location.reload();
        // setCartItems(result.data);
      });
      // if (itemCheckedOut = "true") {
      //   cartItems.forEach(element => {
      //     removeProduct(element._id);
      //   });
      // }
    }

    const wishlistedItem = (id) => {
      console.log(id);
      axios.put("http://localhost:3000/isWhishlisted",{_id:id})
      .then((result)=>{
        console.log(result.data);
        alert(result.data);
        window.location.reload();
        // setCartItems(result.data);
      });
    }

    const calculateTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };
  
    return(
<div>
  <div className="page-wrapper">
    
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index-2.html"><i className="icon-home" /></a></li>
            <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
          </ol>
        </div>{/* End .container */}
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <div className="cart-table-container">
              <table className="table table-cart">
                <thead>
                  <tr>
                    <th className="product-col">Product</th>
                    <th className="price-col">Size</th>
                    <th className="price-col">Price</th>
                    <th className="qty-col">Qty</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item,i)=>(
                     <tr className="product-row" key={i}>
                     <td className="product-col">
                       <figure className="product-image-container">
                         <a href="product.html" className="product-image">
                           <img src={item.image} alt="product" />
                         </a>
                       </figure>
                       <h2 className="product-title">
                         <a href="product.html">{item.name}</a>
                       </h2>
                     </td>
                     <td>{item.size}</td>
                     <td>${item.price}</td>
                     <td>
                        <button type="button" style={{ marginRight: '0.5rem', color: 'blue', cursor: 'pointer', border: 'none'}} onClick={() => decreaseQuantity(item._id)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                        {item.quantity}
                        <button type="button" style={{ marginLeft: '0.5rem', color: 'blue', cursor: 'pointer', border: 'none' }} onClick={() => increaseQuantity(item._id)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                      </td>
                     <td>${item.totalAmount}</td>
                     <td>
                     <button type="button" style={{ marginRight: '0.5rem', color: item.isWishlisted == true ? 'red' : 'blue', cursor: 'pointer', border: 'none' }} onClick={() => wishlistedItem(item._id)}><i className="fa fa-heart" aria-hidden="true"></i></button>
                      <button type="button" style={{ marginRight: '0.5rem', color: 'blue', cursor: 'pointer', border: 'none' }} onClick={() => removeProduct(item._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </td>
                   </tr>
                   
                   
                  ))}
                  {/* <tr className="product-action-row">
                    <td colSpan={4} className="clearfix">
                      <div className="float-left">
                        <a href="#" className="btn-move">Move to Wishlist</a>
                      </div>
                      <div className="float-right">
                        <a href="#" title="Edit product" className="btn-edit"><span className="sr-only">Edit</span><i className="icon-pencil" /></a>
                        <a href="#" title="Remove product" className="btn-remove"><span className="sr-only">Remove</span></a>
                      </div>
                    </td>
                  </tr> */}
                   <tr>
                    <td colSpan="3">Total Price</td>
                    <td>${calculateTotalPrice()}</td>
                  </tr>
                
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="clearfix">
                      <div className="float-left">
                        <a href="/product-catalogue" className="btn btn-outline-secondary">Continue Shopping</a>
                      </div>{/* End .float-left */}
                      <div className="float-right">
                        <a href="#" className="btn btn-outline-secondary btn-clear-cart" onClick={clearCart}>Clear Shopping Cart</a>
                        <a href="/order-summary" className="btn btn-outline-secondary btn-update-cart">Proceed to Checkout </a>
                      </div>{/* End .float-right */}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>{/* End .cart-table-container */}
            <div className="cart-discount">
              <h4>Apply Discount Code</h4>
              <form action="#">
                <div className="input-group">
                  <input type="text" className="form-control form-control-sm" placeholder="Enter discount code" required />
                  <div className="input-group-append">
                    <button className="btn btn-sm btn-primary" type="submit">Apply Discount</button>
                  </div>
                </div>{/* End .input-group */}
              </form>
            </div>{/* End .cart-discount */}
          </div>{/* End .col-lg-8 */}
          <div className="col-lg-4">
       
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

export default ShoppingCart;