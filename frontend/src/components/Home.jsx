import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'
import { GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
    const clientId = '578372850823-5unt5jbr4sheg06otshb7rfdnagvher9.apps.googleusercontent.com';
    const logoutSuccess = (user) => {
        localStorage.clear();
        window.location.href = '/';
    }
    let decoded='';
    const token = localStorage.getItem('token');
    if (token) {
        decoded = jwtDecode(token);
    }else{
        // localStorage.clear();
        window.location.href = '/';
    }

    const [items, setItems] = useState([]);
    let [total, setTotal] = useState(0);
    
    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token)
            if (decoded.exp < Date.now() / 1000) {
                alert('Session expired.');
                localStorage.clear();
                window.location.href = '/';
            }
        }
        else {
            alert('Unauthorized access!');
            window.location.href = '/';
        }
    });
    const getCartItems = () => {
        console.log('email', decoded.email);
        axios.post("http://localhost:3000/addToCart/items/", { email: decoded.email })
            .then((response) => {
                console.log(response);
                setItems(response.data);
                var sum = response.data.reduce((a, v) => a = a + v.totalAmount, 0)
                setTotal(sum);
            });
    }

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

    return (
        <div>
            <div className="page-wrapper">
                <div className="top-notice bg-primary text-white">
                    <div className="container text-center">
                        <h5 className="d-inline-block mb-0 mr-2">Get Up to <b>40% OFF</b> New-Season Styles</h5>
                        <a href="category.html" className="category">MEN</a>
                        <a href="category.html" className="category ml-2 mr-3">WOMEN</a>
                        <small>* Limited time only</small>
                        <button title="Close (Esc)" type="button" className="mfp-close">×</button>
                    </div>{/* End .container */}
                </div>{/* End .top-notice */}
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
                                <a onClick={logoutSuccess} className="header-icon login-link"><i className="icon-user-2" /></a>
                                <h6>Welcome {decoded.email},</h6>
                                <div hidden={!decoded.picture}>
                                    <GoogleLogout clientId={clientId} buttonText='Logout' onLogoutSuccess={logoutSuccess}></GoogleLogout>
                                </div>
                                <a href="#" className="header-icon"><i className="icon-wishlist-2" /></a>
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
                                                                    <a href="#" className="btn-remove icon-cancel" title="Remove Product" onClick={() => removeProduct(item._id)}/>
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
                                    <li className="active">
                                        <a href="index-2.html">Home</a>
                                    </li>
                                    <li>
                                        {/* <a href="/product-catalogue">Categories</a> */}
                                        <Link className="forget-pass" to="/product-catalogue">Categories</Link>
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
                                        {/* <Link className="forget-pass" to="/product-catalogue">Products</Link> */}

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
                    <div className="home-slider owl-carousel owl-theme owl-carousel-lazy show-nav-hover nav-big mb-2 text-uppercase" data-owl-options="{
				'loop': false
			}">
                        <div className="home-slide home-slide1 banner">
                            <img className="owl-lazy slide-bg" src="assets/images/lazy.png" data-src="assets/images/slider/slide-1.jpg" alt="slider image" />
                            <div className="container">
                                <div className="banner-layer banner-layer-middle">
                                    <h4 className="text-transform-none m-b-3">Find the Boundaries. Push Through!</h4>
                                    <h2 className="text-transform-none mb-0">Summer Sale</h2>
                                    <h3 className="m-b-3">70% Off</h3>
                                    <h5 className="d-inline-block mb-0">
                                        Starting At
                                        <b className="coupon-sale-text ml-4 mr-1 text-white bg-secondary align-middle">$<em className="align-text-top">199</em>99</b>
                                    </h5>
                                    <a href="category.html" className="btn btn-dark btn-lg ls-10">Shop Now!</a>
                                </div>{/* End .banner-layer */}
                            </div>
                        </div>{/* End .home-slide */}
                        <div className="home-slide home-slide2 banner banner-md-vw">
                            <img className="owl-lazy slide-bg" src="assets/images/lazy.png" data-src="assets/images/slider/slide-2.jpg" alt="slider image" />
                            <div className="container">
                                <div className="banner-layer banner-layer-middle d-flex justify-content-center">
                                    <div className="mx-auto">
                                        <h4 className="m-b-1">Extra</h4>
                                        <h3 className="m-b-2">20% off</h3>
                                        <h3 className="mb-2 heading-border">Accessories</h3>
                                        <h2 className="text-transform-none m-b-4">Summer Sale</h2>
                                        <a href="category.html" className="btn btn-block btn-dark">Shop All Sale</a>
                                    </div>
                                </div>{/* End .banner-layer */}
                            </div>
                        </div>{/* End .home-slide */}
                    </div>{/* End .home-slider */}
                    <div className="container">
                        <div className="info-boxes-slider owl-carousel owl-theme mb-2" data-owl-options="{
					'dots': false,
					'loop': false,
					'responsive': {
						'576': {
							'items': 2
						},
						'992': {
							'items': 3
						}
					}
				}">
                            <div className="info-box info-box-icon-left">
                                <i className="icon-shipping" />
                                <div className="info-box-content">
                                    <h4>FREE SHIPPING &amp; RETURN</h4>
                                    <p className="text-body">Free shipping on all orders over $99.</p>
                                </div>{/* End .info-box-content */}
                            </div>{/* End .info-box */}
                            <div className="info-box info-box-icon-left">
                                <i className="icon-money" />
                                <div className="info-box-content">
                                    <h4>MONEY BACK GUARANTEE</h4>
                                    <p className="text-body">100% money back guarantee</p>
                                </div>{/* End .info-box-content */}
                            </div>{/* End .info-box */}
                            <div className="info-box info-box-icon-left">
                                <i className="icon-support" />
                                <div className="info-box-content">
                                    <h4>ONLINE SUPPORT 24/7</h4>
                                    <p className="text-body">Lorem ipsum dolor sit amet.</p>
                                </div>{/* End .info-box-content */}
                            </div>{/* End .info-box */}
                        </div>{/* End .info-boxes-slider */}
                        <div className="banners-container">
                            <div className="banners-slider owl-carousel owl-theme">
                                <div className="banner banner1 banner-sm-vw">
                                    <figure>
                                        <img src="assets/images/banners/banner-1.jpg" alt="banner" />
                                    </figure>
                                    <div className="banner-layer banner-layer-middle">
                                        <h3 className="m-b-2">Porto Watches</h3>
                                        <h4 className="m-b-3 ls-10 text-primary"><sup className="text-dark"><del>20%</del></sup>30%<sup>OFF</sup></h4>
                                        <a href="#" className="btn btn-sm btn-dark ls-10">Shop Now</a>
                                    </div>
                                </div>{/* End .banner */}
                                <div className="banner banner2 banner-sm-vw text-uppercase">
                                    <figure>
                                        <img src="assets/images/banners/banner-2.jpg" alt="banner" />
                                    </figure>
                                    <div className="banner-layer banner-layer-middle text-center">
                                        <div className="row align-items-lg-center">
                                            <div className="col-lg-7 text-lg-right">
                                                <h3 className="m-b-1">Deal Promos</h3>
                                                <h4 className="pb-4 pb-lg-0 mb-0 text-body">Starting at $99</h4>
                                            </div>
                                            <div className="col-lg-5 text-lg-left px-0 px-xl-3">
                                                <a href="#" className="btn btn-sm btn-dark ls-10">Shop Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>{/* End .banner */}
                                <div className="banner banner3 banner-sm-vw">
                                    <figure>
                                        <img src="assets/images/banners/banner-3.jpg" alt="banner" />
                                    </figure>
                                    <div className="banner-layer banner-layer-middle text-right">
                                        <h3 className="m-b-2">Handbags</h3>
                                        <h4 className="m-b-2 text-secondary text-uppercase">Starting at $99</h4>
                                        <a href="#" className="btn btn-sm btn-dark ls-10">Shop Now</a>
                                    </div>
                                </div>{/* End .banner */}
                            </div>
                        </div>
                    </div>{/* End .container */}
                    <section className="featured-products-section">
                        <div className="container">
                            <h2 className="section-title heading-border ls-20 border-0">Featured Products</h2>
                            <div className="products-slider custom-products owl-carousel owl-theme nav-outer show-nav-hover nav-image-center" data-owl-options="{
						'dots': false,
						'nav': true
					}">
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-10.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-hot">HOT</div>
                                            <div className="product-label label-sale">20% Off</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-3.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-hot">HOT</div>
                                            <div className="product-label label-sale">30% Off</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-13.jpg" alt="product" />
                                        </a>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-2.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-hot">HOT</div>
                                            <div className="product-label label-sale">40% Off</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-8.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-hot">HOT</div>
                                            <div className="product-label label-sale">15% Off</div>
                                        </div>
                                        <div className="label-group">
                                            <div className="product-label label-hot">HOT</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-1.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-hot">HOT</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                            </div>{/* End .featured-proucts */}
                        </div>
                    </section>
                    <section className="new-products-section">
                        <div className="container">
                            <h2 className="section-title heading-border ls-20 border-0">New Arrivals</h2>
                            <div className="products-slider custom-products owl-carousel owl-theme nav-outer show-nav-hover nav-image-center" data-owl-options="{
						'dots': false,
						'nav': true,
						'responsive': {
							'992': {
								'items': 5
							}
						}
					}">
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-10.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-hot">HOT</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-3.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-hot">HOT</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-13.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-sale">20% Off</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-2.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-sale">30% Off</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-8.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-hot">HOT</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                                <div className="product-default">
                                    <figure>
                                        <a href="product.html">
                                            <img src="assets/images/products/product-1.jpg" alt="product" />
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-sale">20% Off</div>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-list">
                                            <a href="category.html" className="product-category">Category</a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href="product.html">Product Short Name</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                <span className="tooltiptext tooltip-top" />
                                            </div>{/* End .product-ratings */}
                                        </div>{/* End .product-container */}
                                        <div className="price-box">
                                            <del className="old-price">$59.00</del>
                                            <span className="product-price">$49.00</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-action">
                                            <a href="#" className="btn-icon-wish"><i className="icon-heart" /></a>
                                            <button className="btn-icon btn-add-cart" data-toggle="modal" data-target="#addCartModal">ADD TO CART</button>
                                            <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt" /></a>
                                        </div>
                                    </div>{/* End .product-details */}
                                </div>
                            </div>{/* End .featured-proucts */}
                            <div className="banner banner-big-sale mb-5" style={{ background: '#2A95CB center/cover url("assets/images/banners/banner-4.jpg")' }}>
                                <div className="banner-content row align-items-center py-4 mx-0">
                                    <div className="col-md-9">
                                        <h2 className="text-white text-uppercase ls-n-20 mb-md-0 px-4">
                                            <b className="d-inline-block mr-4 mb-1 mb-md-0">Big Sale</b>
                                            All new fashion brands items up to 70% off
                                            <small className="text-transform-none align-middle">Online Purchases Only</small>
                                        </h2>
                                    </div>
                                    <div className="col-md-3 text-center text-md-right">
                                        <a className="btn btn-light btn-white btn-lg mr-3" href="#">View Sale</a>
                                    </div>
                                </div>
                            </div>
                            <h2 className="section-title heading-border border-0 mb-5">Browse Categories</h2>
                            <div className="categories-slider owl-carousel owl-theme show-nav-hover nav-outer">
                                <div className="product-category">
                                    <a href="#">
                                        <figure>
                                            <img src="assets/images/products/categories/category-1.jpg" alt="category" />
                                        </figure>
                                        <div className="category-content">
                                            <h3>Dress</h3>
                                            <span><mark className="count">3</mark> products</span>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-category">
                                    <a href="#">
                                        <figure>
                                            <img src="assets/images/products/categories/category-2.jpg" alt="category" />
                                        </figure>
                                        <div className="category-content">
                                            <h3>Watches</h3>
                                            <span><mark className="count">3</mark> products</span>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-category">
                                    <a href="#">
                                        <figure>
                                            <img src="assets/images/products/categories/category-3.jpg" alt="category" />
                                        </figure>
                                        <div className="category-content">
                                            <h3>Watches</h3>
                                            <span><mark className="count">3</mark> products</span>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-category">
                                    <a href="#">
                                        <figure>
                                            <img src="assets/images/products/categories/category-2.jpg" alt="category" />
                                        </figure>
                                        <div className="category-content">
                                            <h3>Watches</h3>
                                            <span><mark className="count">3</mark> products</span>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-category">
                                    <a href="#">
                                        <figure>
                                            <img src="assets/images/products/categories/category-2.jpg" alt="category" />
                                        </figure>
                                        <div className="category-content">
                                            <h3>Watches</h3>
                                            <span><mark className="count">3</mark> products</span>
                                        </div>
                                    </a>
                                </div>
                                <div className="product-category">
                                    <a href="#">
                                        <figure>
                                            <img src="assets/images/products/categories/category-2.jpg" alt="category" />
                                        </figure>
                                        <div className="category-content">
                                            <h3>Watches</h3>
                                            <span><mark className="count">3</mark> products</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="feature-boxes-container">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="feature-box px-sm-5 feature-box-simple text-center">
                                        <i className="icon-earphones-alt" />
                                        <div className="feature-box-content">
                                            <h3 className="m-b-1">Customer Support</h3>
                                            <h5 className="m-b-3">You Won't Be Alone</h5>
                                            <p>We really care about you and your website as much as you do. Purchasing Porto or any other theme from us you get 100% free support.</p>
                                        </div>{/* End .feature-box-content */}
                                    </div>{/* End .feature-box */}
                                </div>{/* End .col-md-4 */}
                                <div className="col-md-4">
                                    <div className="feature-box px-sm-5 feature-box-simple text-center">
                                        <i className="icon-credit-card" />
                                        <div className="feature-box-content">
                                            <h3 className="m-b-1">Fully Customizable</h3>
                                            <h5 className="m-b-3">Tons Of Options</h5>
                                            <p>With Porto you can customize the layout, colors and styles within only a few minutes. Start creating an amazing website right now!</p>
                                        </div>{/* End .feature-box-content */}
                                    </div>{/* End .feature-box */}
                                </div>{/* End .col-md-4 */}
                                <div className="col-md-4">
                                    <div className="feature-box px-sm-5 feature-box-simple text-center">
                                        <i className="icon-action-undo" />
                                        <div className="feature-box-content">
                                            <h3 className="m-b-1">Powerful Admin</h3>
                                            <h5 className="m-b-3">Made To Help You</h5>
                                            <p>Porto has very powerful admin features to help customer to build their own shop in minutes without any special skills in web development.</p>
                                        </div>{/* End .feature-box-content */}
                                    </div>{/* End .feature-box */}
                                </div>{/* End .col-md-4 */}
                            </div>{/* End .row */}
                        </div>{/* End .container*/}
                    </section>{/* End .feature-boxes-container */}
                    <section className="promo-section bg-dark" data-parallax="{'speed': 1.8, 'enableOnMobile': true}" data-image-src="assets/images/banners/banner-5.jpg">
                        <div className="promo-banner banner container text-uppercase">
                            <div className="banner-content row align-items-center text-center">
                                <div className="col-md-4 ml-xl-auto text-md-right">
                                    <h2 className="mb-md-0 text-white">Top Fashion<br />Deals</h2>
                                </div>
                                <div className="col-md-4 col-xl-3 pb-4 pb-md-0">
                                    <a href="#" className="btn btn-dark btn-black ls-10">View Sale</a>
                                </div>
                                <div className="col-md-4 mr-xl-auto text-md-left">
                                    <h4 className="mb-1 coupon-sale-text p-0 d-block ls-10 text-transform-none"><b>Exclusive COUPON</b></h4>
                                    <h5 className="mb-2 coupon-sale-text text-white ls-10 p-0"><i className="ls-0">UP TO</i><b className="text-white bg-secondary">$100</b> OFF</h5>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="blog-section">
                        <div className="container">
                            <h2 className="section-title heading-border border-0 mb-2">Latest News</h2>
                            <div className="owl-carousel owl-theme" data-owl-options="{
						'loop': false,
						'margin': 20,
						'autoHeight': true,
						'autoplay': false,
						'dots': false,
						'items': 2,
						'responsive': {
							'576': {
								'items': 3
							},
							'768': {
								'items': 4
							}
						}
					}">
                                <article className="post">
                                    <div className="post-media">
                                        <a href="single.html">
                                            <img src="assets/images/blog/home/post-1.jpg" alt="Post" width={225} height={280} />
                                        </a>
                                        <div className="post-date">
                                            <span className="day">26</span>
                                            <span className="month">Feb</span>
                                        </div>
                                    </div>{/* End .post-media */}
                                    <div className="post-body">
                                        <h2 className="post-title">
                                            <a href="single.html">Top New Collection</a>
                                        </h2>
                                        <div className="post-content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non tellus sem. Aenean...</p>
                                        </div>{/* End .post-content */}
                                        <a href="single.html" className="post-comment">0 Comments</a>
                                    </div>{/* End .post-body */}
                                </article>{/* End .post */}
                                <article className="post">
                                    <div className="post-media">
                                        <a href="single.html">
                                            <img src="assets/images/blog/home/post-2.jpg" alt="Post" width={225} height={280} />
                                        </a>
                                        <div className="post-date">
                                            <span className="day">26</span>
                                            <span className="month">Feb</span>
                                        </div>
                                    </div>{/* End .post-media */}
                                    <div className="post-body">
                                        <h2 className="post-title">
                                            <a href="single.html">Fashion Trends</a>
                                        </h2>
                                        <div className="post-content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non tellus sem. Aenean...</p>
                                        </div>{/* End .post-content */}
                                        <a href="single.html" className="post-comment">0 Comments</a>
                                    </div>{/* End .post-body */}
                                </article>{/* End .post */}
                                <article className="post">
                                    <div className="post-media">
                                        <a href="single.html">
                                            <img src="assets/images/blog/home/post-3.jpg" alt="Post" width={225} height={280} />
                                        </a>
                                        <div className="post-date">
                                            <span className="day">26</span>
                                            <span className="month">Feb</span>
                                        </div>
                                    </div>{/* End .post-media */}
                                    <div className="post-body">
                                        <h2 className="post-title">
                                            <a href="single.html">Right Choices</a>
                                        </h2>
                                        <div className="post-content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non tellus sem. Aenean...</p>
                                        </div>{/* End .post-content */}
                                        <a href="single.html" className="post-comment">0 Comments</a>
                                    </div>{/* End .post-body */}
                                </article>{/* End .post */}
                                <article className="post">
                                    <div className="post-media">
                                        <a href="single.html">
                                            <img src="assets/images/blog/home/post-4.jpg" alt="Post" width={225} height={280} />
                                        </a>
                                        <div className="post-date">
                                            <span className="day">26</span>
                                            <span className="month">Feb</span>
                                        </div>
                                    </div>{/* End .post-media */}
                                    <div className="post-body">
                                        <h2 className="post-title">
                                            <a href="single.html">Perfect Accessories</a>
                                        </h2>
                                        <div className="post-content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non tellus sem. Aenean...</p>
                                        </div>{/* End .post-content */}
                                        <a href="single.html" className="post-comment">0 Comments</a>
                                    </div>{/* End .post-body */}
                                </article>{/* End .post */}
                            </div>
                            <hr className="mt-0 m-b-5" />
                            <div className="brands-slider owl-carousel owl-theme images-center pb-2">
                                <img src="assets/images/brands/brand1.png" width={140} height={60} alt="brand" />
                                <img src="assets/images/brands/brand2.png" width={140} height={60} alt="brand" />
                                <img src="assets/images/brands/brand3.png" width={140} height={60} alt="brand" />
                                <img src="assets/images/brands/brand4.png" width={140} height={60} alt="brand" />
                                <img src="assets/images/brands/brand5.png" width={140} height={60} alt="brand" />
                                <img src="assets/images/brands/brand6.png" width={140} height={60} alt="brand" />
                            </div>{/* End .brands-slider */}
                            <hr className="mt-4 m-b-5" />
                            <div className="product-widgets-container row mb-2 pb-2">
                                <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                                    <h4 className="section-sub-title mb-2">Featured Products</h4>
                                    <div className="product-default left-details product-widget">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/small/product-1.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
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
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                    <div className="product-default left-details product-widget">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/small/product-2.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top">5.00</span>
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
                                                <img src="assets/images/products/small/product-3.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
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
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                                    <h4 className="section-sub-title mb-2">Best Selling Products</h4>
                                    <div className="product-default left-details product-widget">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/small/product-4.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top">5.00</span>
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
                                                <img src="assets/images/products/small/product-5.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
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
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                    <div className="product-default left-details product-widget">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/small/product-6.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top">5.00</span>
                                                </div>{/* End .product-ratings */}
                                            </div>{/* End .product-container */}
                                            <div className="price-box">
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                                    <h4 className="section-sub-title mb-2">Latest Products</h4>
                                    <div className="product-default left-details product-widget">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/small/product-7.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
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
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                    <div className="product-default left-details product-widget">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/small/product-8.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top">5.00</span>
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
                                                <img src="assets/images/products/small/product-9.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
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
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                                    <h4 className="section-sub-title mb-2">Top Rated Products</h4>
                                    <div className="product-default left-details product-widget">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/small/product-10.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
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
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                    <div className="product-default left-details product-widget">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/small/product-1.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top">5.00</span>
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
                                                <img src="assets/images/products/small/product-2.jpg" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
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
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                </div>
                            </div>{/* End .row */}
                        </div>
                    </section>
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
                        <ul className="mobile-menu mb-3">
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
                        <ul className="mobile-menu">
                            <li><a href="my-account.html">Track Order </a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="category.html">Our Stores</a></li>
                            <li><a href="blog.html">Blog</a></li>
                            <li><a href="contact.html">Contact</a></li>
                            <li><a href="#">Help &amp; FAQs</a></li>
                        </ul>
                    </nav>{/* End .mobile-nav */}
                    <div className="social-icons">
                        <a href="#" className="social-icon" target="_blank"><i className="icon-facebook" /></a>
                        <a href="#" className="social-icon" target="_blank"><i className="icon-twitter" /></a>
                        <a href="#" className="social-icon" target="_blank"><i className="icon-instagram" /></a>
                    </div>{/* End .social-icons */}
                </div>{/* End .mobile-menu-wrapper */}
            </div>{/* End .mobile-menu-container */}
            <div className="newsletter-popup mfp-hide bg-img" id="newsletter-popup-form" style={{ background: '#f1f1f1 no-repeat center/cover url(assets/images/newsletter_popup_bg.jpg)' }}>
                <div className="newsletter-popup-content">
                    <img src="assets/images/logo-black.png" alt="Logo" className="logo-newsletter" />
                    <h2>BE THE FIRST TO KNOW</h2>
                    <p>Subscribe to the Porto eCommerce newsletter to receive timely updates from your favorite products.</p>
                    <form action="#">
                        <div className="input-group">
                            <input type="email" className="form-control" id="newsletter-email" name="newsletter-email" placeholder="Email address" required />
                            <input type="submit" className="btn" defaultValue="Go!" />
                        </div>{/* End .from-group */}
                    </form>
                    <div className="newsletter-subscribe">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" defaultValue={1} />
                                Don't show this popup again
                            </label>
                        </div>
                    </div>
                </div>{/* End .newsletter-popup-content */}
            </div>{/* End .newsletter-popup */}
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
            ;
        </div>
    );

}

export default Home;