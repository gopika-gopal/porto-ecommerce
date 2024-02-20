import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'


const ProductCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  let [total, setTotal] = useState(0);
  
  useEffect(() => {
    getCartItems();
    getWishlistedItems();
  }, []);

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  useEffect(() => {
    // console.log('app is running...');
    axios.get('http://localhost:3000/product-catalogue')
      .then(result => {
        setProducts(result.data);
        // console.log('result',result.data);
        // console.log('image of 3rd element of array',result.data[2].image);


        // result.data.map(details => { 
        //   console.log(details.name);
        // });

        // for (let i = 0; i < result.data.length; i++) {
        //   console.log('description',result.data[i].description)
        // }
      })
      .catch(error => console.log(error))
    // getAllProducts();
  }, []);

  const getCartItems = () => {
    console.log('email', decoded.email);
    axios.post("http://localhost:3000/addToCart/items/", { email: decoded.email })
      .then((response) => {
        // console.log(response);
        setItems(response.data);
        var sum = response.data.reduce((a, v) => a = a + v.totalAmount, 0)
        setTotal(sum);
      });
  }

  const removeProduct = (id) => {
    console.log(id);
    axios.put("http://localhost:3000/deleteItem",{_id:id})
    .then((result)=>{
      // console.log(result.data);
      // alert(result.data);
      window.location.reload();
      // setCartItems(result.data);
    });
  }

  const getWishlistedItems = () => {
    axios.post("http://localhost:3000/isWhishlisted/items", { email: decoded.email })
      .then((response) => {
        console.log('wishlisted items',response.data);
        setWishlist(response.data);
      });
  }

  return (
    <div>
      <div className="page-wrapper">
        <header className="header">
          <div className="header-top">
            <div className="container">
              <div className="header-left d-none d-sm-block">
                <p className="top-message text-uppercase">FREE Returns. Standard Shipping Orders $99+</p>
              </div>{/* End .header-left */}
              <div className="header-right header-dropdowns ml-0 ml-sm-auto w-sm-100">
                <div className="header-dropdown dropdown-expanded d-none d-lg-block">
                  <a href="#">Links</a>
                  <div className="header-menu">
                    <ul>
                      <li><a href="my-account.html">Track Order </a></li>
                      <li><a href="about.html">About</a></li>
                      <li><a href="category.html">Our Stores</a></li>
                      <li><a href="blog.html">Blog</a></li>
                      <li><a href="contact.html">Contact</a></li>
                      <li><a href="#">Help &amp; FAQs</a></li>
                    </ul>
                  </div>{/* End .header-menu */}
                </div>{/* End .header-dropown */}
                <span className="separator" />
                <div className="header-dropdown ">
                  <a href="#">USD</a>
                  <div className="header-menu">
                    <ul>
                      <li><a href="#">EUR</a></li>
                      <li><a href="#">USD</a></li>
                    </ul>
                  </div>{/* End .header-menu */}
                </div>{/* End .header-dropown */}
                <div className="header-dropdown mr-auto mr-sm-3 mr-md-0">
                  <a href="#"><img src="assets/images/flags/en.png" alt="England flag" />ENG</a>
                  <div className="header-menu">
                    <ul>
                      <li><a href="#"><img src="assets/images/flags/en.png" alt="England flag" />ENG</a></li>
                      <li><a href="#"><img src="assets/images/flags/fr.png" alt="France flag" />FRA</a></li>
                    </ul>
                  </div>{/* End .header-menu */}
                </div>{/* End .header-dropown */}
                <span className="separator" />
                <div className="social-icons">
                  <a href="#" className="social-icon social-instagram icon-instagram" target="_blank" />
                  <a href="#" className="social-icon social-twitter icon-twitter" target="_blank" />
                  <a href="#" className="social-icon social-facebook icon-facebook" target="_blank" />
                </div>{/* End .social-icons */}
              </div>{/* End .header-right */}
            </div>{/* End .container */}
          </div>{/* End .header-top */}
          <div className="header-middle">
            <div className="container">
              <div className="header-left col-lg-2 w-auto pl-0">
                <button className="mobile-menu-toggler text-primary mr-2" type="button">
                  <i className="icon-menu" />
                </button>
                <a href="index-2.html" className="logo">
                  <img src="assets/images/logo.png" alt="Porto Logo" />
                </a>
              </div>{/* End .header-left */}
              <div className="header-right w-lg-max">
                <div className="header-icon header-icon header-search header-search-inline header-search-category w-lg-max text-right">
                  <a href="#" className="search-toggle" role="button"><i className="icon-search-3" /></a>
                  <form action="#" method="get">
                    <div className="header-search-wrapper">
                      <input type="search" className="form-control" name="q" id="q" placeholder="Search..." required />
                      <div className="select-custom">
                        <select id="cat" name="cat">
                          <option value>All Categories</option>
                          <option value={4}>Fashion</option>
                          <option value={12}>- Women</option>
                          <option value={13}>- Men</option>
                          <option value={66}>- Jewellery</option>
                          <option value={67}>- Kids Fashion</option>
                          <option value={5}>Electronics</option>
                          <option value={21}>- Smart TVs</option>
                          <option value={22}>- Cameras</option>
                          <option value={63}>- Games</option>
                          <option value={7}>Home &amp; Garden</option>
                          <option value={11}>Motors</option>
                          <option value={31}>- Cars and Trucks</option>
                          <option value={32}>- Motorcycles &amp; Powersports</option>
                          <option value={33}>- Parts &amp; Accessories</option>
                          <option value={34}>- Boats</option>
                          <option value={57}>- Auto Tools &amp; Supplies</option>
                        </select>
                      </div>{/* End .select-custom */}
                      <button className="btn icon-search-3 p-0" type="submit" />
                    </div>{/* End .header-search-wrapper */}
                  </form>
                </div>{/* End .header-search */}
                <div className="header-contact d-none d-lg-flex pl-4 ml-3 mr-xl-5 pr-4">
                  <img alt="phone" src="assets/images/phone.png" width={30} height={30} className="pb-1" />
                  <h6>Call us now<a href="tel:#" className="text-dark font1">+123 5678 890</a></h6>
                </div>
                <a href="login.html" className="header-icon login-link"><i className="icon-user-2" /></a>
                {/* <a href="#" className="header-icon"><i className="icon-wishlist-2" /></a> */}
                <div className="dropdown cart-dropdown">
                  <a href="#" className="dropdown-toggle dropdown-arrow" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                    <i className="icon-wishlist-2" />
                    <span className="cart-count badge-circle">{wishlist.length > 0 ? wishlist.length : ''}</span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdownmenu-wrapper">
                      <div className="dropdown-cart-header">
                        <span>{wishlist.length} Items</span>
                        {/* <a href="/shopping-cart" className="float-right">View Cart</a> */}
                      </div>{/* End .dropdown-cart-header */}
                      <div className="dropdown-cart-products">
                        {wishlist.map((item, i) => (
                          <div className="product" key={i}>
                            <div className="product-details">
                              <h4 className="product-title">
                                <a href="product.html">{item.name}</a>
                              </h4>
                              <span className="cart-product-info">
                                <span className="cart-product-qty">{item.quantity}</span>
                                x ${item.price}
                              </span>
                            </div>{/* End .product-details */}
                            <figure className="product-image-container">
                              <a href="product.html" className="product-image">
                                <img src={item.image} alt="product" width={80} height={80} />
                              </a>
                              <a href="#" className="btn-remove icon-cancel" title="Remove Product" onClick={() => removeProduct(item._id)} />
                            </figure>
                          </div>
                        ))}

                      </div>{/* End .cart-product */}
                      <div className="dropdown-cart-total">
                        {/* <span>Total</span> */}
                        {/* <span className="cart-total-price float-right">${total}</span> */}
                      </div>{/* End .dropdown-cart-total */}
                      <div className="dropdown-cart-action">
                        <a href="/shopping-cart" className="btn btn-dark btn-block">View items</a>
                      </div>{/* End .dropdown-cart-total */}
                    </div>{/* End .dropdownmenu-wrapper */}
                  </div>{/* End .dropdown-menu */}
                </div>{/* End .dropdown */}
                <div className="dropdown cart-dropdown">
                  <a href="#" className="dropdown-toggle dropdown-arrow" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                    <i className="icon-shopping-cart" />
                    <span className="cart-count badge-circle">{items.length > 0 ? items.length : ''}</span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdownmenu-wrapper">
                      <div className="dropdown-cart-header">
                        <span>{items.length} Items</span>
                        <a href="/shopping-cart" className="float-right">View Cart</a>
                      </div>{/* End .dropdown-cart-header */}
                      <div className="dropdown-cart-products">
                        {items.map((item, i) => (
                          <div className="product" key={i}>
                            <div className="product-details">
                              <h4 className="product-title">
                                <a href="product.html">{item.name}</a>
                              </h4>
                              <span className="cart-product-info">
                                <span className="cart-product-qty">{item.quantity}</span>
                                x ${item.price}
                              </span>
                            </div>{/* End .product-details */}
                            <figure className="product-image-container">
                              <a href="product.html" className="product-image">
                                <img src={item.image} alt="product" width={80} height={80} />
                              </a>
                              <a href="#" className="btn-remove icon-cancel" title="Remove Product" onClick={() => removeProduct(item._id)} />
                            </figure>
                          </div>
                        ))}

                      </div>{/* End .cart-product */}
                      <div className="dropdown-cart-total">
                        <span>Total</span>
                        <span className="cart-total-price float-right">${total}</span>
                      </div>{/* End .dropdown-cart-total */}
                      <div className="dropdown-cart-action">
                        <a href="/shopping-cart" className="btn btn-dark btn-block">Checkout</a>
                      </div>{/* End .dropdown-cart-total */}
                    </div>{/* End .dropdownmenu-wrapper */}
                  </div>{/* End .dropdown-menu */}
                </div>{/* End .dropdown */}
              </div>{/* End .header-right */}
            </div>{/* End .container */}
          </div>{/* End .header-middle */}
          <div className="header-bottom sticky-header d-none d-lg-block">
            <div className="container">
              <nav className="main-nav w-100">
                <ul className="menu">
                  <li>
                    {/* <a href="/home">Home</a> */}
                    <Link to="/home">Home </Link>
                  </li>
                  <li className="active">
                    <a href="category.html">Categories</a>
                    <div className="megamenu megamenu-fixed-width megamenu-3cols">
                      <div className="row">
                        <div className="col-lg-4">
                          <a href="#" className="nolink">VARIATION 1</a>
                          <ul className="submenu">
                            <li><a href="category.html">Fullwidth Banner</a></li>
                            <li><a href="category-banner-boxed-slider.html">Boxed Slider Banner</a></li>
                            <li><a href="category-banner-boxed-image.html">Boxed Image Banner</a></li>
                            <li><a href="category.html">Left Sidebar</a></li>
                            <li><a href="category-sidebar-right.html">Right Sidebar</a></li>
                            <li><a href="category-flex-grid.html">Product Flex Grid</a></li>
                            <li><a href="category-horizontal-filter1.html">Horizontal Filter1</a></li>
                            <li><a href="category-horizontal-filter2.html">Horizontal Filter2</a></li>
                          </ul>
                        </div>
                        <div className="col-lg-4">
                          <a href="#" className="nolink">VARIATION 2</a>
                          <ul className="submenu">
                            <li><a href="category-list.html">List Types</a></li>
                            <li><a href="category-infinite-scroll.html">Ajax Infinite Scroll</a></li>
                            <li><a href="category.html">3 Columns Products</a></li>
                            <li><a href="category-4col.html">4 Columns Products</a></li>
                            <li><a href="category-5col.html">5 Columns Products</a></li>
                            <li><a href="category-6col.html">6 Columns Products</a></li>
                            <li><a href="category-7col.html">7 Columns Products</a></li>
                            <li><a href="category-8col.html">8 Columns Products</a></li>
                          </ul>
                        </div>
                        <div className="col-lg-4 p-0">
                          <img src="assets/images/menu-banner.jpg" alt="Menu banner" />
                        </div>
                      </div>
                    </div>{/* End .megamenu */}
                  </li>
                  <li>
                    <a href="product.html">Products</a>
                    <div className="megamenu megamenu-fixed-width">
                      <div className="row">
                        <div className="col-lg-3">
                          <a href="#" className="nolink">Variations 1</a>
                          <ul className="submenu">
                            <li><a href="product.html">Horizontal Thumbs</a></li>
                            <li><a href="product-full-width.html">Vertical Thumbnails</a></li>
                            <li><a href="product.html">Inner Zoom</a></li>
                            <li><a href="product-addcart-sticky.html">Addtocart Sticky</a></li>
                            <li><a href="product-sidebar-left.html">Accordion Tabs</a></li>
                          </ul>
                        </div>{/* End .col-lg-4 */}
                        <div className="col-lg-3">
                          <a href="#" className="nolink">Variations 2</a>
                          <ul className="submenu">
                            <li><a href="product-sticky-tab.html">Sticky Tabs</a></li>
                            <li><a href="product-simple.html">Simple Product</a></li>
                            <li><a href="product-sidebar-left.html">With Left Sidebar</a></li>
                          </ul>
                        </div>{/* End .col-lg-4 */}
                        <div className="col-lg-3">
                          <a href="#" className="nolink">Product Layout Types</a>
                          <ul className="submenu">
                            <li><a href="product.html">Default Layout</a></li>
                            <li><a href="product-extended-layout.html">Extended Layout</a></li>
                            <li><a href="product-full-width.html">Full Width Layout</a></li>
                            <li><a href="product-grid-layout.html">Grid Images Layout</a></li>
                            <li><a href="product-sticky-both.html">Sticky Both Side Info</a></li>
                            <li><a href="product-sticky-info.html">Sticky Right Side Info</a></li>
                          </ul>
                        </div>{/* End .col-lg-4 */}
                        <div className="col-lg-3 p-0">
                          <img src="assets/images/menu-bg.png" alt="Menu banner" className="product-promo" />
                        </div>{/* End .col-lg-4 */}
                      </div>{/* End .row */}
                    </div>{/* End .megamenu */}
                  </li>
                  <li>
                    <a href="#">Pages</a>
                    <ul>
                      <li><a href="cart.html">Shopping Cart</a></li>
                      <li><a href="#">Checkout</a>
                        <ul>
                          <li><a href="checkout-shipping.html">Checkout Shipping</a></li>
                          <li><a href="checkout-shipping-2.html">Checkout Shipping 2</a></li>
                          <li><a href="checkout-review.html">Checkout Review</a></li>
                        </ul>
                      </li>
                      <li><a href="#">Dashboard</a>
                        <ul>
                          <li><a href="dashboard.html">Dashboard</a></li>
                          <li><a href="my-account.html">My Account</a></li>
                        </ul>
                      </li>
                      <li><a href="about.html">About Us</a></li>
                      <li><a href="#">Blog</a>
                        <ul>
                          <li><a href="blog.html">Blog</a></li>
                          <li><a href="single.html">Blog Post</a></li>
                        </ul>
                      </li>
                      <li><a href="contact.html">Contact Us</a></li>
                      <li><a href="#" className="login-link">Login</a></li>
                      <li><a href="forgot-password.html">Forgot Password</a></li>
                    </ul>
                  </li>
                  <li><a href="blog.html">Blog</a></li>
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="contact.html">Contact Us</a></li>
                  <li className="float-right"><a href="https://1.envato.market/DdLk5" className="px-4" target="_blank">Buy Porto!<span className="tip tip-new tip-top">New</span></a></li>
                  <li className="float-right mr-0"><a href="#" className="px-4">Special Offer!</a></li>
                </ul>
              </nav>
            </div>{/* End .container */}
          </div>{/* End .header-bottom */}
        </header>{/* End .header */}
        <main className="main">
          <div className="category-banner-container bg-gray">
            <div className="category-banner banner text-uppercase" style={{ background: 'no-repeat 60%/cover url("assets/images/banners/banner-top.jpg")' }}>
              <div className="container position-relative">
                <div className="row">
                  <div className="pl-lg-5 pb-5 pb-md-0 col-md-5 col-xl-4 col-lg-4 offset-1">
                    <h3 className="ml-lg-5 mb-2 ls-10">Electronic<br />Deals</h3>
                    <a href="#" className="ml-lg-5 btn btn-dark btn-black ls-10">Get Yours!</a>
                  </div>
                  <div className="pl-lg-5 col-md-4 offset-md-0 offset-1 pt-4">
                    <div className="coupon-sale-content">
                      <h4 className="m-b-2 coupon-sale-text bg-white ls-10 text-transform-none">Exclusive COUPON</h4>
                      <h5 className="mb-2 coupon-sale-text d-block ls-10 p-0"><i className="ls-0">UP TO</i><b className="text-dark">$100</b> OFF</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="index-2.html"><i className="icon-home" /></a></li>
                <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Men</a></li>
                <li className="breadcrumb-item active" aria-current="page">Accessories</li>
              </ol>
            </nav>
            <div className="row">
              <div className="col-lg-9 main-content">
                <nav className="toolbox">
                  <div className="toolbox-left">
                    <div className="toolbox-item toolbox-sort">
                      <label>Sort By:</label>
                      <div className="select-custom">
                        <select name="orderby" className="form-control">
                          <option value="menu_order">Default sorting</option>
                          <option value="popularity">Sort by popularity</option>
                          <option value="rating">Sort by average rating</option>
                          <option value="date">Sort by newness</option>
                          <option value="price">Sort by price: low to high</option>
                          <option value="price-desc">Sort by price: high to low</option>
                        </select>
                      </div>{/* End .select-custom */}
                    </div>{/* End .toolbox-item */}
                  </div>{/* End .toolbox-left */}
                  <div className="toolbox-right">
                    <div className="toolbox-item toolbox-show">
                      <label>Show:</label>
                      <div className="select-custom">
                        <select name="count" className="form-control">
                          <option value={12}>12</option>
                          <option value={24}>24</option>
                          <option value={36}>36</option>
                        </select>
                      </div>{/* End .select-custom */}
                    </div>{/* End .toolbox-item */}
                    <div className="toolbox-item layout-modes">
                      <a href="category.html" className="layout-btn btn-grid active" title="Grid">
                        <i className="icon-mode-grid" />
                      </a>
                      <a href="category-list.html" className="layout-btn btn-list" title="List">
                        <i className="icon-mode-list" />
                      </a>
                    </div>{/* End .layout-modes */}
                  </div>{/* End .toolbox-right */}
                </nav>

                <div className="row">
                  {products.map((product, i) => (
                    <div className="col-6 col-sm-4" key={i}>
                      <div className="product-default inner-quickview inner-icon">
                        <figure>
                          <Link to={`/${product._id}`}>
                            <img src={product.image} />
                          </Link>
                          {/* <div className="label-group">
                             <div className="product-label label-hot">HOT</div>
                             <div className="product-label label-sale">-20%</div>
                           </div> */}
                          <div className="btn-icon-group">
                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                          </div>
                          <button className="btn-quickview" title="Quick View" >Quick View</button>
                        </figure>
                        <div className="product-details">
                          <div className="category-wrap">
                            <div className="category-list">
                              {/* <a href="category.html" className="product-category">category</a> */}
                            </div>
                            {/* <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a> */}
                          </div>
                          <h2 className="product-title">
                            <span >{product.name}</span>
                            <div className="category-wrap">
                              <div className="category-list">
                                <a href="category.html" className="product-category" key={i}>{product.description}</a>
                              </div>
                            </div>
                          </h2>
                          <div className="ratings-container">
                            <div className="product-ratings">
                              <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                              <span className="tooltiptext tooltip-top" />
                            </div>{/* End .product-ratings */}
                          </div>{/* End .product-container */}
                          <div className="price-box">
                            {/* <span className="old-price">$90.00</span> */}
                            <span className="product-price" key={i}>${product.price}</span>
                          </div>{/* End .price-box */}
                        </div>{/* End .product-details */}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row" hidden>
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <Link to='/product-details' href="product.html">
                          <img src="assets/images/products/product-1.jpg" />
                        </Link>
                        <div className="label-group">
                          <div className="product-label label-hot">HOT</div>
                          <div className="product-label label-sale">-20%</div>
                        </div>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Fleece Jacket</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-2.jpg" />
                        </a>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Ray Ban 5228</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="product-price">$33.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-3.jpg" />
                        </a>
                        <div className="label-group">
                          <div className="product-label label-sale">-20%</div>
                        </div>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Product Short Name</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-5.jpg" />
                        </a>
                        <div className="label-group">
                          <div className="product-label label-sale">-30%</div>
                        </div>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Product Short Name</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-6.jpg" />
                        </a>
                        <div className="label-group">
                          <div className="product-label label-hot">HOT</div>
                        </div>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Product Short Name</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-7.jpg" />
                        </a>
                        <div className="label-group">
                          <div className="product-label label-sale">-8%</div>
                        </div>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Product Short Name</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-4.jpg" />
                        </a>
                        <div className="label-group">
                          <div className="product-label label-sale">-40%</div>
                        </div>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Product Short Name</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-8.jpg" />
                        </a>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Product Short Name</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-9.jpg" />
                        </a>
                        <div className="label-group">
                          <div className="product-label label-hot">HOT</div>
                        </div>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Product Short Name</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-10.jpg" />
                        </a>
                        <div className="label-group">
                          <div className="product-label label-sale">-30%</div>
                        </div>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Product Short Name</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-11.jpg" />
                        </a>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Product Short Name</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                  <div className="col-6 col-sm-4">
                    <div className="product-default inner-quickview inner-icon">
                      <figure>
                        <a href="product.html">
                          <img src="assets/images/products/product-12.jpg" />
                        </a>
                        <div className="label-group">
                          <div className="product-label label-hot">HOT</div>
                        </div>
                        <div className="btn-icon-group">
                          <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal"><i className="icon-shopping-cart" /></button>
                        </div>
                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick View</a>
                      </figure>
                      <div className="product-details">
                        <div className="category-wrap">
                          <div className="category-list">
                            <a href="category.html" className="product-category">category</a>
                          </div>
                          <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                        </div>
                        <h2 className="product-title">
                          <a href="product.html">Product Short Name</a>
                        </h2>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                            <span className="tooltiptext tooltip-top" />
                          </div>{/* End .product-ratings */}
                        </div>{/* End .product-container */}
                        <div className="price-box">
                          <span className="old-price">$90.00</span>
                          <span className="product-price">$70.00</span>
                        </div>{/* End .price-box */}
                      </div>{/* End .product-details */}
                    </div>
                  </div>{/* End .col-sm-4 */}
                </div>{/* End .row */}
                <nav className="toolbox toolbox-pagination">
                  <div className="toolbox-item toolbox-show">
                    <label>Show:</label>
                    <div className="select-custom">
                      <select name="count" className="form-control">
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                      </select>
                    </div>{/* End .select-custom */}
                  </div>{/* End .toolbox-item */}
                  <ul className="pagination toolbox-item">
                    <li className="page-item disabled">
                      <a className="page-link page-link-btn" href="#"><i className="icon-angle-left" /></a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">1 <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                    <li className="page-item"><span className="page-link">...</span></li>
                    <li className="page-item">
                      <a className="page-link page-link-btn" href="#"><i className="icon-angle-right" /></a>
                    </li>
                  </ul>
                </nav>
              </div>{/* End .col-lg-9 */}
              <div className="sidebar-overlay" />
              <div className="sidebar-toggle"><i className="fas fa-sliders-h" /></div>
              <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar">
                <div className="sidebar-wrapper">
                  <div className="widget">
                    <h3 className="widget-title">
                      <a data-toggle="collapse" href="#widget-body-2" role="button" aria-expanded="true" aria-controls="widget-body-2">Categories</a>
                    </h3>
                    <div className="collapse show" id="widget-body-2">
                      <div className="widget-body">
                        <ul className="cat-list">
                          <li><a href="#">Accessories</a></li>
                          <li><a href="#">Watch Fashion</a></li>
                          <li><a href="#">Tees, Knits &amp; Polos</a></li>
                          <li><a href="#">Pants &amp; Denim</a></li>
                        </ul>
                      </div>{/* End .widget-body */}
                    </div>{/* End .collapse */}
                  </div>{/* End .widget */}
                  <div className="widget">
                    <h3 className="widget-title">
                      <a data-toggle="collapse" href="#widget-body-3" role="button" aria-expanded="true" aria-controls="widget-body-3">Price</a>
                    </h3>
                    <div className="collapse show" id="widget-body-3">
                      <div className="widget-body">
                        <form action="#">
                          <div className="price-slider-wrapper">
                            <div id="price-slider" />{/* End #price-slider */}
                          </div>{/* End .price-slider-wrapper */}
                          <div className="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
                            <button type="submit" className="btn btn-primary">Filter</button>
                            <div className="filter-price-text">
                              Price:
                              <span id="filter-price-range" />
                            </div>{/* End .filter-price-text */}
                          </div>{/* End .filter-price-action */}
                        </form>
                      </div>{/* End .widget-body */}
                    </div>{/* End .collapse */}
                  </div>{/* End .widget */}
                  <div className="widget">
                    <h3 className="widget-title">
                      <a data-toggle="collapse" href="#widget-body-4" role="button" aria-expanded="true" aria-controls="widget-body-4">Size</a>
                    </h3>
                    <div className="collapse show" id="widget-body-4">
                      <div className="widget-body">
                        <ul className="cat-list">
                          <li><a href="#">Small</a></li>
                          <li><a href="#">Medium</a></li>
                          <li><a href="#">Large</a></li>
                          <li><a href="#">Extra Large</a></li>
                        </ul>
                      </div>{/* End .widget-body */}
                    </div>{/* End .collapse */}
                  </div>{/* End .widget */}
                  <div className="widget">
                    <h3 className="widget-title">
                      <a data-toggle="collapse" href="#widget-body-5" role="button" aria-expanded="true" aria-controls="widget-body-5">Brand</a>
                    </h3>
                    <div className="collapse show" id="widget-body-5">
                      <div className="widget-body">
                        <ul className="cat-list">
                          <li><a href="#">Adidas</a></li>
                          <li><a href="#">Calvin Klein (26)</a></li>
                          <li><a href="#">Diesel (3)</a></li>
                          <li><a href="#">Lacoste (8)</a></li>
                        </ul>
                      </div>{/* End .widget-body */}
                    </div>{/* End .collapse */}
                  </div>{/* End .widget */}
                  <div className="widget">
                    <h3 className="widget-title">
                      <a data-toggle="collapse" href="#widget-body-6" role="button" aria-expanded="true" aria-controls="widget-body-6">Color</a>
                    </h3>
                    <div className="collapse show" id="widget-body-6">
                      <div className="widget-body">
                        <ul className="config-swatch-list">
                          <li className="active">
                            <a href="#" style={{ backgroundColor: '#000' }} />
                            <span>Black</span>
                          </li>
                          <li>
                            <a href="#" style={{ backgroundColor: '#0188cc' }} />
                            <span>Blue</span>
                          </li>
                          <li>
                            <a href="#" style={{ backgroundColor: '#81d742' }} />
                            <span>Green</span>
                          </li>
                          <li>
                            <a href="#" style={{ backgroundColor: '#6085a5' }} />
                            <span>Indigo</span>
                          </li>
                          <li>
                            <a href="#" style={{ backgroundColor: '#ab6e6e' }} />
                            <span>Red</span>
                          </li>
                          <li>
                            <a href="#" style={{ backgroundColor: '#ddb373' }} />
                            <span>Brown</span>
                          </li>
                          <li>
                            <a href="#" style={{ backgroundColor: '#6b97bf' }} />
                            <span>Light-Blue</span>
                          </li>
                          <li>
                            <a href="#" style={{ backgroundColor: '#eded68' }} />
                            <span>Yellow</span>
                          </li>
                        </ul>
                      </div>{/* End .widget-body */}
                    </div>{/* End .collapse */}
                  </div>{/* End .widget */}
                  <div className="widget widget-featured">
                    <h3 className="widget-title">Featured</h3>
                    <div className="widget-body">
                      <div className="owl-carousel widget-featured-products">
                        <div className="featured-col">
                          <div className="product-default left-details product-widget">
                            <figure>
                              <a href="product.html">
                                <img src="assets/images/products/product-10.jpg" />
                              </a>
                            </figure>
                            <div className="product-details">
                              <h2 className="product-title">
                                <a href="product.html">T-shirt</a>
                              </h2>
                              <div className="ratings-container">
                                <div className="product-ratings">
                                  <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                  <span className="tooltiptext tooltip-top" />
                                </div>{/* End .product-ratings */}
                              </div>{/* End .product-container */}
                              <div className="price-box">
                                <span className="product-price">$30.00</span>
                              </div>{/* End .price-box */}
                            </div>{/* End .product-details */}
                          </div>
                          <div className="product-default left-details product-widget">
                            <figure>
                              <a href="product.html">
                                <img src="assets/images/products/product-11.jpg" />
                              </a>
                            </figure>
                            <div className="product-details">
                              <h2 className="product-title">
                                <a href="product.html">Sweat Shirt</a>
                              </h2>
                              <div className="ratings-container">
                                <div className="product-ratings">
                                  <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                  <span className="tooltiptext tooltip-top" />
                                </div>{/* End .product-ratings */}
                              </div>{/* End .product-container */}
                              <div className="price-box">
                                <span className="product-price">$40.00</span>
                              </div>{/* End .price-box */}
                            </div>{/* End .product-details */}
                          </div>
                          <div className="product-default left-details product-widget">
                            <figure>
                              <a href="product.html">
                                <img src="assets/images/products/product-12.jpg" />
                              </a>
                            </figure>
                            <div className="product-details">
                              <h2 className="product-title">
                                <a href="product.html">Cap</a>
                              </h2>
                              <div className="ratings-container">
                                <div className="product-ratings">
                                  <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                  <span className="tooltiptext tooltip-top" />
                                </div>{/* End .product-ratings */}
                              </div>{/* End .product-container */}
                              <div className="price-box">
                                <span className="product-price">$25.00</span>
                              </div>{/* End .price-box */}
                            </div>{/* End .product-details */}
                          </div>
                        </div>{/* End .featured-col */}
                        <div className="featured-col">
                          <div className="product-default left-details product-widget">
                            <figure>
                              <a href="product.html">
                                <img src="assets/images/products/product-13.jpg" />
                              </a>
                            </figure>
                            <div className="product-details">
                              <h2 className="product-title">
                                <a href="product.html">Cap</a>
                              </h2>
                              <div className="ratings-container">
                                <div className="product-ratings">
                                  <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                  <span className="tooltiptext tooltip-top" />
                                </div>{/* End .product-ratings */}
                              </div>{/* End .product-container */}
                              <div className="price-box">
                                <span className="product-price">$49.00</span>
                              </div>{/* End .price-box */}
                            </div>{/* End .product-details */}
                          </div>
                          <div className="product-default left-details product-widget">
                            <figure>
                              <a href="product.html">
                                <img src="assets/images/products/product-14.jpg" />
                              </a>
                            </figure>
                            <div className="product-details">
                              <h2 className="product-title">
                                <a href="product.html">Sweat Shirt</a>
                              </h2>
                              <div className="ratings-container">
                                <div className="product-ratings">
                                  <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                  <span className="tooltiptext tooltip-top" />
                                </div>{/* End .product-ratings */}
                              </div>{/* End .product-container */}
                              <div className="price-box">
                                <span className="product-price">$50.00</span>
                              </div>{/* End .price-box */}
                            </div>{/* End .product-details */}
                          </div>
                          <div className="product-default left-details product-widget">
                            <figure>
                              <a href="product.html">
                                <img src="assets/images/products/product-8.jpg" />
                              </a>
                            </figure>
                            <div className="product-details">
                              <h2 className="product-title">
                                <a href="product.html">Shoes</a>
                              </h2>
                              <div className="ratings-container">
                                <div className="product-ratings">
                                  <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                  <span className="tooltiptext tooltip-top" />
                                </div>{/* End .product-ratings */}
                              </div>{/* End .product-container */}
                              <div className="price-box">
                                <span className="product-price">$65.00</span>
                              </div>{/* End .price-box */}
                            </div>{/* End .product-details */}
                          </div>
                        </div>{/* End .featured-col */}
                      </div>{/* End .widget-featured-slider */}
                    </div>{/* End .widget-body */}
                  </div>{/* End .widget */}
                  <div className="widget widget-block">
                    <h3 className="widget-title">Custom HTML Block</h3>
                    <h5>This is a custom sub-title.</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non placerat mi. </p>
                  </div>{/* End .widget */}
                </div>{/* End .sidebar-wrapper */}
              </aside>{/* End .col-lg-3 */}
            </div>{/* End .row */}
          </div>{/* End .container */}
          <div className="mb-3" />{/* margin */}
        </main>{/* End .main */}
        <footer className="footer bg-dark">
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
            <ul className="mobile-menu mb-3 border-0">
              <li>
                <a href="#">USD</a>
                <ul>
                  <li><a href="#">EUR</a></li>
                  <li><a href="#">USD</a></li>
                </ul>
              </li>
              <li>
                <a href="#">ENG</a>
                <ul>
                  <li><a href="#">ENG</a></li>
                  <li><a href="#">FRE</a></li>
                </ul>
              </li>
            </ul>
            <ul className="mobile-menu">
              <li className="active"><a href="index-2.html">Home</a></li>
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
    </div>
  )
}

export default ProductCatalogue;