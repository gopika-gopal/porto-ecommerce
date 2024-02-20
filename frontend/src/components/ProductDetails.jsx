import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

const ProductDetails = () => {

    const [items, setItems] = useState([]);
    const [productId, setProductId] = useState('');
    let [total, setTotal] = useState(0);
    const [product, setProduct] = useState({});
    const params = useParams();
    // const [show, setShow] = useState(true);
    const [cart, setCart] = useState([]);
    const [qty, setQty] = useState(0);
    const [size, setSize] = useState('');
    const [email, setEmail] = useState('');
   

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    useEffect(() => {
        setProductId(params.productId);
        callProductDetailsById(params.productId);
        getCartItems();
    }, []);

    const callProductDetailsById = (id) => {
        // console.log('Id is', id);
        axios.get('http://localhost:3000/' + id)
            .then(result => {
                setProduct(result.data);
                console.log(result.data);
            })
            .catch(error => console.log(error))
    }

    const handleClick = (item) => {
        var cartItem = new Object({
            name: item.name,
            description: item.description,
            image: item.image,
            price: item.price
        });
        // Update cart item quantity if already in cart
        if (Number(qty) <= 0) {
            alert('Please enter quantity.');
        } else if (!size)
            alert('Please select a size.');
        else {
            addItemToCart(cartItem, qty, size);
            //api call ends here/
            // items.push(cartItem);
            // console.log('product details', items);
            // var sum = items.reduce((a, v) => a = a + v.totalAmount, 0)
            // setTotal(sum);
            // console.log('totalamount', sum);
        }
    };

    function addItemToCart(cartItem, qty, size) {
        
        cartItem.quantity = Number(qty);
        cartItem.size = size;
        cartItem.totalAmount = cartItem.quantity * cartItem.price;
        cartItem.isItemCheckout = false;
        cartItem.isDeleted = false;
        cartItem.isWishlisted = false;
        cartItem.userEmail = decoded.email;
        console.log(cartItem);

        // api call starts here/
        axios.post("http://localhost:3000/addToCart", cartItem)
            .then((result) => {
                // alert(result.data.message);
                // window.location.href='/';
                console.log(result);
                if (result.statusText == "OK") {
                    alert('Item added to cart.');
                    window.location.reload();
                }
            }).catch(err => alert('error: ' + err.response.data.error));
    }

    const getCartItems = () => {
       console.log('email',decoded.email);
        axios.post("http://localhost:3000/addToCart/items/",{email:decoded.email})
        .then((response)=>{
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

    // const deleteByValue = value => {
    //     setItems(oldValues => {
    //       return oldValues.filter(item => item !== value)
    //     })
    //   }

    return (
        <div>
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
                                    <a href="login.html" className="header-icon login-link"><i className="icon-user-2" />
                                    </a>
                                    <a href="#" className="header-icon"><i className="icon-wishlist-2" />
                                    </a>
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
                                                                    <a href="#" className="btn-remove icon-cancel" title="Remove Product"  onClick={() => removeProduct(item._id)}></a>
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
                        <div className="container">
                            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index-2.html"><i className="icon-home" /></a></li>
                                    <li className="breadcrumb-item"><a href="#">Shoes</a></li>
                                </ol>
                            </nav>
                            <div className="product-single-container product-single-default">
                                <div className="row">
                                    <div className="col-md-5 product-single-gallery">
                                        <div className="product-slider-container">

                                            <span className="prod-full-screen">
                                                <i className="icon-plus" />
                                            </span>
                                        </div>
                                        <div className="prod-thumbnail owl-dots" id="carousel-custom-dots">
                                            {/* <div className="owl-dot">
                          <img src="assets/images/products/zoom/product-1.jpg" />
                        </div> */}
                                            {/* <div className="owl-dot">
                          <img src="assets/images/products/zoom/product-2.jpg" />
                        </div> */}
                                            {/* <div className="owl-dot">
                          <img src="assets/images/products/zoom/product-3.jpg" />
                        </div> */}
                                            <div className="owl-dot">
                                                <img src={product.image} />
                                            </div>

                                        </div>
                                    </div>{/* End .product-single-gallery */}
                                    <div className="col-md-7 product-single-details">
                                        <h1 className="product-title">{product.name}</h1>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{ width: '60%' }} />{/* End .ratings */}
                                            </div>{/* End .product-ratings */}
                                            <a href="#" className="rating-link">( 6 Reviews )</a>
                                        </div>{/* End .ratings-container */}
                                        <hr className="short-divider" />
                                        <div className="price-box">
                                            <span className="product-price">${product.price}</span>
                                        </div>{/* End .price-box */}
                                        <div className="product-desc">
                                            <p>
                                                {product.description} <br />
                                                <a href="#">(read more)</a>
                                            </p>
                                        </div>{/* End .product-desc */}
                                        <div className="product-filters-container">
                                            <div className="product-single-filter mb-2">
                                                <label>Sizes:</label>
                                                <ul className="config-size-list">
                                                    <li><Link onClick={e => setSize('S')}>S</Link></li>
                                                    <li><Link onClick={e => setSize('M')}>M</Link></li>
                                                    <li><Link onClick={e => setSize('L')}>L</Link></li>
                                                    <li><Link onClick={e => setSize('XL')}>XL</Link></li>
                                                </ul>
                                            </div>{/* End .product-single-filter */}
                                        </div>{/* End .product-filters-container */}
                                        <hr className="divider" />
                                        <div className="product-action">
                                            <div className="product-single-qty">
                                                <input className=" form-control" style={{ width: '7rem', marginTop: '1rem' }} type="number" id="quantity" onInput={event => setQty(event.target.value)} />
                                            </div>
                                            {/* End .product-single-qty */}
                                            {/* <a  href="cart.html" className="btn btn-dark add-cart icon-shopping-cart" title="Add to Cart">Add to Cart</a> */}
                                            <button onClick={() => handleClick(product)} className="btn btn-dark add-cart icon-shopping-cart" title="Add to Cart">Add to Cart</button>

                                        </div>{/* End .product-action */}
                                        <hr className="divider mb-1" />
                                        <div className="product-single-share">
                                            <label className="sr-only">Share:</label>
                                            <div className="social-icons mr-2">
                                                <a href="#" className="social-icon social-facebook icon-facebook" target="_blank" title="Facebook" />
                                                <a href="#" className="social-icon social-twitter icon-twitter" target="_blank" title="Twitter" />
                                                <a href="#" className="social-icon social-linkedin fab fa-linkedin-in" target="_blank" title="Linkedin" />
                                                <a href="#" className="social-icon social-gplus fab fa-google-plus-g" target="_blank" title="Google +" />
                                                <a href="#" className="social-icon social-mail icon-mail-alt" target="_blank" title="Mail" />
                                            </div>{/* End .social-icons */}
                                            <a href="#" className="add-wishlist" title="Add to Wishlist">Add to Wishlist</a>
                                        </div>{/* End .product single-share */}
                                    </div>{/* End .product-single-details */}
                                </div>{/* End .row */}
                            </div>{/* End .product-single-container */}
                            <div className="product-single-tabs">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="product-tab-desc" data-toggle="tab" href="#product-desc-content" role="tab" aria-controls="product-desc-content" aria-selected="true">Description</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="product-tab-more-info" data-toggle="tab" href="#product-more-info-content" role="tab" aria-controls="product-more-info-content" aria-selected="false">More Info</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="product-tab-tags" data-toggle="tab" href="#product-tags-content" role="tab" aria-controls="product-tags-content" aria-selected="false">Tags</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="product-tab-reviews" data-toggle="tab" href="#product-reviews-content" role="tab" aria-controls="product-reviews-content" aria-selected="false">Reviews (3)</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="product-desc-content" role="tabpanel" aria-labelledby="product-tab-desc">
                                        <div className="product-desc-content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.</p>
                                            <ul>
                                                <li><i className="fa fa-check-circle" />Any Product types that You want - Simple, Configurable</li>
                                                <li><i className="fa fa-check-circle" />Downloadable/Digital Products, Virtual Products</li>
                                                <li><i className="fa fa-check-circle" />Inventory Management with Backordered items</li>
                                            </ul>
                                            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <br />quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                        </div>{/* End .product-desc-content */}
                                    </div>{/* End .tab-pane */}
                                    <div className="tab-pane fade fade" id="product-more-info-content" role="tabpanel" aria-labelledby="product-tab-more-info">
                                        <div className="product-desc-content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.</p>
                                        </div>{/* End .product-desc-content */}
                                    </div>{/* End .tab-pane */}
                                    <div className="tab-pane fade" id="product-tags-content" role="tabpanel" aria-labelledby="product-tab-tags">
                                        <div className="product-tags-content">
                                            <form action="#">
                                                <h4>Add Your Tags:</h4>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-sm" required />
                                                    <input type="submit" className="btn btn-dark" defaultValue="Add Tags" />
                                                </div>{/* End .form-group */}
                                            </form>
                                            <p className="note">Use spaces to separate tags. Use single quotes (') for phrases.</p>
                                        </div>{/* End .product-tags-content */}
                                    </div>{/* End .tab-pane */}
                                    <div className="tab-pane fade" id="product-reviews-content" role="tabpanel" aria-labelledby="product-tab-reviews">
                                        <div className="product-reviews-content">
                                            <div className="row">
                                                <div className="col-xl-7">
                                                    <h2 className="reviews-title">3 reviews for Product Long Name</h2>
                                                    <ol className="comment-list">
                                                        <li className="comment-container">
                                                            <div className="comment-avatar">
                                                                <img src="assets/images/avatar/avatar1.jpg" width={65} height={65} alt="avatar" />
                                                            </div>{/* End .comment-avatar*/}
                                                            <div className="comment-box">
                                                                <div className="ratings-container">
                                                                    <div className="product-ratings">
                                                                        <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                                    </div>{/* End .product-ratings */}
                                                                </div>{/* End .ratings-container */}
                                                                <div className="comment-info mb-1">
                                                                    <h4 className="avatar-name">John Doe</h4> - <span className="comment-date">Novemeber 15, 2019</span>
                                                                </div>{/* End .comment-info */}
                                                                <div className="comment-text">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                                                                </div>{/* End .comment-text */}
                                                            </div>{/* End .comment-box */}
                                                        </li>{/* comment-container */}
                                                        <li className="comment-container">
                                                            <div className="comment-avatar">
                                                                <img src="assets/images/avatar/avatar2.jpg" width={65} height={65} alt="avatar" />
                                                            </div>{/* End .comment-avatar*/}
                                                            <div className="comment-box">
                                                                <div className="ratings-container">
                                                                    <div className="product-ratings">
                                                                        <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                                    </div>{/* End .product-ratings */}
                                                                </div>{/* End .ratings-container */}
                                                                <div className="comment-info mb-1">
                                                                    <h4 className="avatar-name">John Doe</h4> - <span className="comment-date">Novemeber 15, 2019</span>
                                                                </div>{/* End .comment-info */}
                                                                <div className="comment-text">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                                                                </div>{/* End .comment-text */}
                                                            </div>{/* End .comment-box */}
                                                        </li>{/* comment-container */}
                                                        <li className="comment-container">
                                                            <div className="comment-avatar">
                                                                <img src="assets/images/avatar/avatar3.jpg" width={65} height={65} alt="avatar" />
                                                            </div>{/* End .comment-avatar*/}
                                                            <div className="comment-box">
                                                                <div className="ratings-container">
                                                                    <div className="product-ratings">
                                                                        <span className="ratings" style={{ width: '80%' }} />{/* End .ratings */}
                                                                    </div>{/* End .product-ratings */}
                                                                </div>{/* End .ratings-container */}
                                                                <div className="comment-info mb-1">
                                                                    <h4 className="avatar-name">John Doe</h4> - <span className="comment-date">Novemeber 15, 2019</span>
                                                                </div>{/* End .comment-info */}
                                                                <div className="comment-text">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                                                                </div>{/* End .comment-text */}
                                                            </div>{/* End .comment-box */}
                                                        </li>{/* comment-container */}
                                                    </ol>{/* End .comment-list */}
                                                </div>
                                                <div className="col-xl-5">
                                                    <div className="add-product-review">
                                                        <form action="#" className="comment-form m-0">
                                                            <h3 className="review-title">Add a Review</h3>
                                                            <div className="rating-form">
                                                                <label htmlFor="rating">Your rating</label>
                                                                <span className="rating-stars">
                                                                    <a className="star-1" href="#">1</a>
                                                                    <a className="star-2" href="#">2</a>
                                                                    <a className="star-3" href="#">3</a>
                                                                    <a className="star-4" href="#">4</a>
                                                                    <a className="star-5" href="#">5</a>
                                                                </span>
                                                                <select name="rating" id="rating" required style={{ display: 'none' }}>
                                                                    <option value>Rate…</option>
                                                                    <option value={5}>Perfect</option>
                                                                    <option value={4}>Good</option>
                                                                    <option value={3}>Average</option>
                                                                    <option value={2}>Not that bad</option>
                                                                    <option value={1}>Very poor</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Your Review</label>
                                                                <textarea cols={5} rows={6} className="form-control form-control-sm" defaultValue={""} />
                                                            </div>{/* End .form-group */}
                                                            <div className="row">
                                                                <div className="col-md-6 col-xl-12">
                                                                    <div className="form-group">
                                                                        <label>Your Name</label>
                                                                        <input type="text" className="form-control form-control-sm" required />
                                                                    </div>{/* End .form-group */}
                                                                </div>
                                                                <div className="col-md-6 col-xl-12">
                                                                    <div className="form-group">
                                                                        <label>Your E-mail</label>
                                                                        <input type="text" className="form-control form-control-sm" required />
                                                                    </div>{/* End .form-group */}
                                                                </div>
                                                            </div>
                                                            <input type="submit" className="btn btn-dark ls-n-15" defaultValue="Submit" />
                                                        </form>
                                                    </div>{/* End .add-product-review */}
                                                </div>
                                            </div>
                                        </div>{/* End .product-reviews-content */}
                                    </div>{/* End .tab-pane */}
                                </div>{/* End .tab-content */}
                            </div>{/* End .product-single-tabs */}
                            <div className="products-section pt-0">
                                <h2 className="section-title">Related Products</h2>
                                <div className="products-slider owl-carousel owl-theme dots-top">
                                    <div className="product-default inner-quickview inner-icon">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/product-14.jpg" />
                                            </a>
                                            <div className="label-group">
                                                <span className="product-label label-sale">-20%</span>
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
                                            </div>
                                            <h3 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h3>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top" />
                                                </div>{/* End .product-ratings */}
                                            </div>{/* End .ratings-container */}
                                            <div className="price-box">
                                                <span className="old-price">$59.00</span>
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                    <div className="product-default inner-quickview inner-icon">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/product-13.jpg" />
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
                                            </div>
                                            <h3 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h3>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top" />
                                                </div>{/* End .product-ratings */}
                                            </div>{/* End .ratings-container */}
                                            <div className="price-box">
                                                <span className="old-price">$59.00</span>
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                    <div className="product-default inner-quickview inner-icon">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/product-12.jpg" />
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
                                            </div>
                                            <h3 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h3>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top" />
                                                </div>{/* End .product-ratings */}
                                            </div>{/* End .ratings-container */}
                                            <div className="price-box">
                                                <span className="old-price">$59.00</span>
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                    <div className="product-default inner-quickview inner-icon">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/product-11.jpg" />
                                            </a>
                                            <div className="label-group">
                                                <span className="product-label label-hot">HOT</span>
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
                                            </div>
                                            <h3 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h3>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top" />
                                                </div>{/* End .product-ratings */}
                                            </div>{/* End .ratings-container */}
                                            <div className="price-box">
                                                <span className="old-price">$59.00</span>
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                    <div className="product-default inner-quickview inner-icon">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/product-10.jpg" />
                                            </a>
                                            <div className="label-group">
                                                <span className="product-label label-hot">HOT</span>
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
                                            </div>
                                            <h3 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h3>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top" />
                                                </div>{/* End .product-ratings */}
                                            </div>{/* End .ratings-container */}
                                            <div className="price-box">
                                                <span className="old-price">$59.00</span>
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                    <div className="product-default inner-quickview inner-icon">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/product-9.jpg" />
                                            </a>
                                            <div className="label-group">
                                                <span className="product-label label-sale">-30%</span>
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
                                            </div>
                                            <h3 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h3>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top" />
                                                </div>{/* End .product-ratings */}
                                            </div>{/* End .ratings-container */}
                                            <div className="price-box">
                                                <span className="old-price">$59.00</span>
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                    <div className="product-default inner-quickview inner-icon">
                                        <figure>
                                            <a href="product.html">
                                                <img src="assets/images/products/product-8.jpg" />
                                            </a>
                                            <div className="label-group">
                                                <span className="product-label label-sale">-20%</span>
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
                                            </div>
                                            <h3 className="product-title">
                                                <a href="product.html">Product Short Name</a>
                                            </h3>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: '100%' }} />{/* End .ratings */}
                                                    <span className="tooltiptext tooltip-top" />
                                                </div>{/* End .product-ratings */}
                                            </div>{/* End .ratings-container */}
                                            <div className="price-box">
                                                <span className="old-price">$59.00</span>
                                                <span className="product-price">$49.00</span>
                                            </div>{/* End .price-box */}
                                        </div>{/* End .product-details */}
                                    </div>
                                </div>{/* End .products-slider */}
                            </div>{/* End .products-section */}
                        </div>{/* End .container */}
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
                <a id="scroll-top" href="#top" title="Top" role="button"><i className="icon-angle-up" />          </a>
            </div>
            <a id="scroll-top" href="#top" title="Top" role="button">        </a>
        </div>
    )
}

export default ProductDetails

